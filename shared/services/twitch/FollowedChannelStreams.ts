/*
** EPITECH PROJECT, 2024
** area
** File description:
** FollowedBroadcasterIsStreaming
*/

import client from "@shared/database";
import { followedBroadcastModel } from "@shared/models/twitch";
import { TwitchApi } from "ts-twitch-api";
import OAuthRepository from "@shared/database/OAuthRepository";
import crypto from "crypto";
import createWebHookUrl from "@shared/ngrok";
import TwitchApiInstance, { getAppAccessToken } from "./TwitchApi";
import AreaAction from "../AreaAction";
import { Enrichment } from "../types";

type TriggerType = typeof followedBroadcastModel.$inferSelect;

class FollowedBroadcasterIsStreaming extends AreaAction {

    enrichments: Enrichment[] = [];

    description = "Triggers when a followed broadcaster is streaming";

    name = "Followed Broadcaster Is Streaming";

    id = "followed_broadcaster_is_streaming";

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async generateFields(userId: number) {
        return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async add(userId: number, _fields: Record<string, string>) {
        const db = await client();
        const res = await db.insert(followedBroadcastModel).values({ userId }).returning().execute();
        await db.$client.release();
        return res[0].id;
    }

    // eslint-disable-next-line no-empty-function
    async poll() : Promise<void> {};

    static async getFollowedIds(accessToken: string) {
        const api = TwitchApiInstance(accessToken);
        const user = await api.users.getUsers();
        if (user.status !== 200) return null;
        const me = user.data.data[0];
        const followed = await api.channels.getFollowedChannels({user_id: me.id});
        if (followed.status !== 200) return null;
        const followedIds = followed.data.data.map((follow) => follow.broadcaster_id);
        return followedIds;
    }

    static async dispatchFollowedBroadcasters(broadcasterId: string, api: TwitchApi, triggerId: number) {
        const payload = {
            broadcaster_user_id: broadcasterId,
        } as unknown as Record<string, never>;

        const accessToken = await getAppAccessToken();
        const webHookUrl = await createWebHookUrl("twitch", "followed_broadcaster_is_streaming");

        await api.eventSub.createEventSubSubscription({
            transport: {
                method: "webhook",
                callback: `${webHookUrl}/${triggerId}`,
                secret: crypto.randomBytes(16).toString("hex"),
            },
            condition: payload,
            type: "stream.online",
            version: "1",
            },
            {
                clientId: process.env.TWITCH_CLIENT_ID!,
                accessToken
            }
        );
    }

    async webhook(id: number, req: Request): Promise<Response> {
        const body = await req.json();
        if (req.headers.get("Twitch-Eventsub-Message-Type") === "webhook_callback_verification") {
            const { challenge } = body;
            return new Response(challenge, { status: 200, headers: { 'Content-Type': challenge.length.toString() } });
        }
        return new Response("ok", { status: 200 });
    }

    static async setUpWebhook(trigger: TriggerType) {
        const oauth = await OAuthRepository.findByService("twitch", trigger.userId);
        if (!oauth) return;
        const followedIds = await FollowedBroadcasterIsStreaming.getFollowedIds(oauth.accessToken);
        if (!followedIds) return;
        const api = TwitchApiInstance(oauth.accessToken);
        followedIds.forEach((broadcasterId) => FollowedBroadcasterIsStreaming.dispatchFollowedBroadcasters(broadcasterId, api, trigger.id));
    }

    async setup() : Promise<void> {
        const db = await client();
        const triggers = await db.select().from(followedBroadcastModel).execute();
        await db.$client.release();
        await Promise.all(triggers.map(FollowedBroadcasterIsStreaming.setUpWebhook));
    };
}

export default new FollowedBroadcasterIsStreaming();
