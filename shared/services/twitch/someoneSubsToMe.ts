/*
 ** EPITECH PROJECT, 2024
 ** area
 ** File description:
 ** someoneFollowedMe
 */

import client from '@shared/database'
import { someoneSubsToMeModel } from '@shared/models/twitch'
import OAuthRepository from '@shared/database/OAuthRepository'
import crypto from 'crypto'
import queue from '@shared/Queue'
import createWebHookUrl from '@shared/ngrok'
import TwitchApiInstance, { getAppAccessToken } from './TwitchApi'
import AreaAction from '../AreaAction'

type TriggerType = typeof someoneSubsToMeModel.$inferSelect

class SomeoneSubsToMe extends AreaAction {
    description = 'Triggers when someone subscribe to your channel'

    name = 'Someone subs to me'

    id = 'someone_subs_to_me'

    enrichments = [
        {
            name: 'Twitch Follower ID',
            description: 'The ID of the user who followed you',
            id: 'TWITCH_SUBSCRIBER_ID'
        },
        {
            name: 'Twitch Follower Username',
            description: 'The username of the user who followed you',
            id: 'TWITCH_SUBSCRIBER_USERNAME'
        }
    ]

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async generateFields(userId: number) {
        return []
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async add(userId: number, _fields: Record<string, string>) {
        const db = await client()
        const res = await db.insert(someoneSubsToMeModel).values({ userId }).returning().execute()
        await db.$client.release()
        this.setUpWebhook({ userId, id: res[0].id })
        return res[0].id
    }

    async getMe(accessToken: string) {
        const api = TwitchApiInstance(accessToken)
        const users = await api.users.getUsers()
        if (users.status !== 200) return null
        return users.data.data[0]
    }

    async setUpWebhook(trigger: TriggerType) {
        const oauth = await OAuthRepository.findByService('twitch', trigger.userId)
        if (!oauth) return
        const api = TwitchApiInstance(oauth.accessToken)
        const me = await this.getMe(oauth.accessToken)

        if (!me) return
        const payload = {
            broadcaster_user_id: me.id,
            moderator_user_id: me.id
        } as unknown as Record<string, never>


        const accessToken = await getAppAccessToken()

        const url = await createWebHookUrl('twitch', "someone_subs_to_me")

        await api.eventSub.createEventSubSubscription(
            {
                transport: {
                    method: 'webhook',
                    callback: `${url}/${trigger.id}`,
                    secret: crypto.randomBytes(16).toString('hex')
                },
                condition: payload,
                type: 'channel.subscribe',
                version: '1'
            },
            {
                clientId: process.env.TWITCH_CLIENT_ID!,
                accessToken
            }
        )
    }

    async setup(): Promise<void> {
        const db = await client()
        const triggers = await db.select().from(someoneSubsToMeModel).execute()
        await db.$client.release()
        await Promise.all(triggers.map(this.setUpWebhook))
    }

    async webhook(id: number, req: Request) {
        const body = await req.json();
        if (req.headers.get("Twitch-Eventsub-Message-Type") === "webhook_callback_verification") {
            const { challenge } = body;
            return new Response(challenge, { status: 200, headers: { 'Content-Type': challenge.length.toString() } });
        }
        const userid = body.event.user_id as string;
        const userLogin = body.event.user_login as string;
        queue.push({
            action: this.id,
            id,
            enrichments: {
                TWITCH_SUBSCRIBER_ID: userid,
                TWITCH_SUBSCRIBER_USERNAME: userLogin
            }
        });
        return new Response(null, { status: 200 });
    }
}

export default new SomeoneSubsToMe()
