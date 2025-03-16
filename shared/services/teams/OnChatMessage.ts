/*
** EPITECH PROJECT, 2024
** area
** File description:
** OnChatMessage
*/

import client from "@shared/database"
import OAuthRepository from "@shared/database/OAuthRepository";
import { Client } from "@microsoft/microsoft-graph-client";
import { Field } from "@shared/types";
import createWebHookUrl from "@shared/ngrok";
import { teamsOnMessageModel } from "@shared/models/teams";
import { eq } from "drizzle-orm";
import queue from "@shared/Queue";
import AreaAction from "../AreaAction";
import { Enrichment } from "../types";


type Action = typeof teamsOnMessageModel.$inferSelect;

interface Conversation {
    id: string;
    topic: string | null;
}

interface NewMessageWebhook {
    value: {
        resourceData: {
            id: string;
        };
        resource: string;
    }[]
}

interface TeamMember {
    id: string;
    displayName: string;
    userId: string;
}

class OnChatMessage extends AreaAction {
    id = "on_chat_message";

    name = "On Chat Message";

    description = "On Chat Message";

    enrichments : Enrichment[] = [
        {
            id: "MESSAGE_TEXT",
            name: "Message content",
            description: "The content of the message",
        },
        {
            id: "MESSAGE_SENDER",
            name: "Message sender",
            description: "The sender of the message",
        },
        {
            id: "MESSAGE_TOPIC",
            name: "Message topic",
            description: "participants or topic of the chat",
        }
    ];

    async getConvTopic(conversation: Conversation, teamsClient: Client) {
        if (conversation.topic) {
            return conversation.topic;
        }
        // get the members of the conversation
        const me = (await teamsClient.api("/me").get()).id;
        const members = (await teamsClient.api(`/chats/${conversation.id}/members`).get()).value as TeamMember[];
        const membersWithoutMe = members.filter(member => member.userId !== me);
        return membersWithoutMe.map(member => member.displayName).join(", ");
    }

    async generateFields(userId: number) {
        const oauth = await OAuthRepository.findByService("microsoft", userId);
        if (!oauth) {
            return [];
        }
        const teamsClient = await this.getTeamsClient(oauth.accessToken);
        const conversations = (await teamsClient.api("/me/chats").get()).value as Conversation[];
        const values = await Promise.all(conversations.map(async (conv) => ({
            name: await this.getConvTopic(conv, teamsClient),
            value: conv.id
        })));

        const selectConv = {
            type: "select_field",
            id: "chatId",
            name: "select the chat you want to listen to",
            values
        } as Field;
        return [selectConv];
    }

    fetchMessageText = async (chatId: string, messageId: string, accessToken: string) => {
        const response = await fetch(`https://graph.microsoft.com/v1.0/chats/${chatId}/messages/${messageId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
    
        if (!response.ok) {
            throw new Error(`Failed to fetch message: ${response.statusText}`);
        }

    
        const messageData = await response.json();
        return [messageData.from.user.displayName, messageData.body.content] as [string, string];
    };


    static async addSubscription(action: Action) {
        const oauth = await OAuthRepository.findByService("microsoft", action.userId);
        if (!oauth) return;
        const ngrokUrl = await createWebHookUrl("teams", "on_chat_message");
        await fetch("https://graph.microsoft.com/v1.0/subscriptions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${oauth.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                changeType: "created",
                resource: `/chats/${action.chatId}/messages`,
                notificationUrl: `${ngrokUrl}/${action.id}`,
                expirationDateTime: new Date(Date.now() + 3600000).toISOString(),
                clientState: action.id.toString(),
            })
        });
    }

    static async deleteRequest(subId: string, accessToken: string) {
        await fetch(`https://graph.microsoft.com/v1.0/subscriptions/${subId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
    }

    static async deleteSubscription(action: typeof teamsOnMessageModel.$inferSelect) {
        const oauth = await OAuthRepository.findByService("microsoft", action.userId);
        if (!oauth) return;
        const response = await fetch("https://graph.microsoft.com/v1.0/subscriptions", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${oauth.accessToken}`,
            }
        });
        const subscriptions = await response.json();
        const values = subscriptions.value as { resource: string, id: string }[];
        const toDelete = values.filter((sub) => sub.resource === `/chats/${action.chatId}/messages`);
        await Promise.all(toDelete.map((sub) => OnChatMessage.deleteRequest(sub.id, oauth.accessToken)));
    }

    async setup(): Promise<void> {
        const db = await client();
        const actions = await db.select().from(teamsOnMessageModel).execute();
        await Promise.all(actions.map(action => OnChatMessage.deleteSubscription(action)));
        await Promise.all(actions.map(action => OnChatMessage.addSubscription(action)));
        await db.$client.release();
    }

    async getTeamsClient(accessToken: string) {
        return Client.init({
            authProvider: (done) => {
                done(null, accessToken);
            }
        });
    }

    async add(userId: number, fields: Record<string, string>) {
        const db = await client();
        const res = await db.insert(teamsOnMessageModel)
        .values({
            userId,
            chatId: fields.chatId,
        })
        .returning()
        .execute();
        await db.$client.release();
        await OnChatMessage.addSubscription(res[0]);
        return res[0].id;
    }

    async webhook(id: number, req: Request): Promise<Response> {
        const { searchParams } = new URL(req.url);
        const validationToken = searchParams.get("validationToken");
        if (validationToken) {
            return new Response(validationToken, { status: 200 });
        }
        const body = await req.json() as NewMessageWebhook;
        const { value } = body;
        const db = await client();
        const actions = (await db.select().from(teamsOnMessageModel).where(eq(teamsOnMessageModel.id, id)).execute());
        if (!actions.length) {
            await db.$client.release();
            return new Response(null, { status: 404 });
        }
        const oauth = await OAuthRepository.findByService("microsoft", actions[0].userId);
        if (!oauth) {
            await db.$client.release();
            return new Response(null, { status: 200 });
        }
        const action = actions[0] as Action;
        value.forEach(async (message) => {
            const discussionId = message.resource.split("'")[1];
            const topic = await this.getConvTopic({ id: discussionId, topic: null }, await this.getTeamsClient(oauth.accessToken));
            const [from, text] = await this.fetchMessageText(action.chatId, message.resourceData.id, oauth.accessToken);
            queue.push({
                action: this.id,
                id: action.id,
                enrichments: {
                    MESSAGE_TEXT: text,
                    MESSAGE_SENDER: from,
                    MESSAGE_TOPIC: topic,
                }
            })
        });
        return new Response(null, { status: 200 });
    }
}

export default new OnChatMessage();
