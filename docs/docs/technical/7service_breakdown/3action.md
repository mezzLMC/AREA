---
sidebar_position: 3
---

# Action

An Action is a specific event that can be detected using polling or webhooks. It can be based on a user interaction, a change in a specific state, or a specific event that can be detected by the service. Each action is composed of a set of parameters that can be used to configure the action and a function that will be called when the action is triggered.

## Structure

Each Action implements the following structure:

```ts
export interface Action {
    // an unique identifier for the action, will be used to reference the action in the database and the API requests
    id: string;
    // a display name for the action that will be shown to the user
    name: string;
    // a short description of the action
    description: string;
    // an array of enrichments that will be filled on action trigger and passed to the reaction.
    enrichments: Enrichment[];
    // an array of fields that can be used to configure the action
    generateFields: (userId: number) => Promise<Field[]>;
    // a function that will be called when the action is triggered.
    // it should finaly save the action in the database in a custom table and return the id of the action
    add: (userId: number, fields: Record<string, string>) => Promise<number>;
    // a function that will be called in an interval to check if the action is triggered
    // it must finally push the action to the redis queue to trigger the linked reaction
    poll: () => Promise<void>;
    // a function that will be called at server startup to initialize the action
    setup: () => Promise<void>;
    // a function that will be called when the action is triggered by a webhook
    // it must finally push the action to the redis queue to trigger the linked reaction
    webhook: (id: number, req: Request) => Promise<Response>;
}
```

## Implementation
 
Here is an example of a service implementation:

```ts

class SomeoneFollowedMe extends AreaAction {
    description = 'Triggers when someone follows you'
    name = 'Someone Followed Me'
    id = 'someone_followed_me'

    enrichments = [
        {
            name: 'Twitch Follower ID',
            description: 'The ID of the user who followed you',
            id: 'TWITCH_FOLLOWER_ID'
        },
        {
            name: 'Twitch Follower Username',
            description: 'The username of the user who followed you',
            id: 'TWITCH_FOLLOWER_USERNAME'
        }
    ]


    static async getMe(accessToken: string) {
        const api = TwitchApiInstance(accessToken)
        const users = await api.users.getUsers()
        if (users.status !== 200) return null
        return users.data.data[0]
    }

    async setUpWebhook(action: Action) {
        //retrieve the oauth token for the user
        const oauth = await OAuthRepository.findByService('twitch', action.userId)
        if (!oauth) return
        const api = TwitchApiInstance(oauth.accessToken)
        const me = await SomeoneFollowedMe.getMe(oauth.accessToken)

        if (!me) return
        const payload = {
            broadcaster_user_id: me.id,
            moderator_user_id: me.id
        } as unknown as Record<string, never>

        const accessToken = await getAppAccessToken()

        //generate the webhook url using ngrok if in development mode that will redirect to the webhook function
        const url = await createWebHookUrl('twitch', "someone_followed_me")

        await api.eventSub.createEventSubSubscription(
            {
                transport: {
                    method: 'webhook',
                    callback: `${url}/${action.id}`,
                    secret: crypto.randomBytes(16).toString('hex')
                },
                condition: payload,
                type: 'channel.follow',
                version: '2'
            },
            {
                clientId: process.env.TWITCH_CLIENT_ID!,
                accessToken
            }
        )
    }

    async generateFields(userId: number) {
        return [] // no fields needed
    }

    // add the action to the database and set up the webhook
    async add(userId: number, _fields: Record<string, string>) {
        const db = await client()
        const res = await db.insert(someoneFollowedMeModel).values({ userId }).returning().execute()
        await db.$client.release()
        this.setUpWebhook({ userId, id: res[0].id })
        return res[0].id
    }

    //setup webhooks for all the existing actions
    async setup(): Promise<void> {
        const db = await client()
        const triggers = await db.select().from(someoneFollowedMeModel).execute()
        await db.$client.release()
        await Promise.all(triggers.map(this.setUpWebhook))
    }

    async webhook(id: number, req: Request) {
        const body = await req.json();

        // if the request is a verification request, return the challenge
        if (req.headers.get("Twitch-Eventsub-Message-Type") === "webhook_callback_verification") {
            const { challenge } = body;
            return new Response(challenge, { status: 200, headers: { 'Content-Type': challenge.length.toString() } });
        }

        //retrieve the usefull data from the request
        const userid = body.event.user_id as string;
        const userLogin = body.event.user_login as string;

        //push the action to the redis queue
        queue.push({
            action: this.id,
            id,
            enrichments: {
                TWITCH_FOLLOWER_ID: userid,
                TWITCH_FOLLOWER_USERNAME: userLogin
            }
        });
        return new Response(null, { status: 200 })
    }
}

//export an instance of the action
export default new SomeoneFollowedMe()
```
