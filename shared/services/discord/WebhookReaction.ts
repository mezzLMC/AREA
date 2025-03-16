/*
** EPITECH PROJECT, 2024
** area
** File description:
** WebhookReaction
*/

import client from "@shared/database";
import { eq } from "drizzle-orm";
import { webHookReactionModel } from "@shared/models/discord";
import { Field } from "@shared/types";
import { Enricher, Reaction } from "../types";

interface DiscordWebHookPayload {
    content: string;
    username?: string;
    avatar_url?: string;
}

class WebHookReaction implements Reaction {
    id: string;

    name: string;

    description: string;

    fields: Field[];

    constructor() {
        this.id = "discord_webhook";
        this.name = "Send a message to a Discord webhook";
        this.description = "Send a message to a Discord webhook";
        this.fields = [
            {
                id: "webhookUrl",
                name: "URL of the discord webhook",
                type: "text_field",
            },
            {
                id: "content",
                name: "Content of the message",
                type: "text_field",
            },
        ];
    }

    async add(userId: number, fields: Record<string, string>): Promise<number> {
        const db = await client();
        const { webhookUrl, content } = fields;
        const inserted = await db
            .insert(webHookReactionModel)
            .values({
                webhookUrl,
                content,
            })
            .returning({ id: webHookReactionModel.id })
            .execute();
        await db.$client.release();
        return inserted[0].id;
    }

    async trigger(triggerId: number, enrich: Enricher): Promise<void> {
        const db = await client();
        const query = await db
            .select()
            .from(webHookReactionModel)
            .where(eq(webHookReactionModel.id, triggerId))
            .execute();
        await db.$client.release();
        const triggerData = query[0];

        const payload : DiscordWebHookPayload = enrich({
            content: triggerData.content
        });

        await fetch(triggerData.webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
    }

}

const webHookReaction = new WebHookReaction();

export default webHookReaction;
