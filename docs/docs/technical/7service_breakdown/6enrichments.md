---
sidebar_position: 6
---

# Enrichments

Enrichments are used to simplify the passage of data from action to reaction using a variable interpolation system. They are used to replace variables in the data with their actual values. Enrichments let you use create more dynamic and content based reactions.

## Structure

Each Field implements the following simple structure:

```ts
export interface Enrichment {
    id: string;
    name: string;
    description: string;
}
```

## Implementation on Action side

```ts
class SomeoneFollowedMe extends AreaAction {

    description = 'Triggers when someone follows you'
    name = 'Someone Followed Me'
    id = 'someone_followed_me'
    async generateFields(userId: number) {...}
    async add(userId: number, _fields: Record<string, string>) {...}
    static async getMe(accessToken: string) {...}
    async setUpWebhook(action: Action) {...}
    async setup(): Promise<void> {...}

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

    async webhook(actionId: number, req: Request) {
        const body = await req.json();
        const userid = body.event.user_id as string;
        const userLogin = body.event.user_login as string;

        queue.push({
            action: this.id,
            id: actionId,
            enrichments: {
                TWITCH_FOLLOWER_ID: userid,
                TWITCH_FOLLOWER_USERNAME: userLogin
            }
        });
        return new Response(null, { status: 200 })
    }
}
```

The front-end and mobile app will retrieve the available variables and let the user use them in the reaction configuration.

<img src="/img/choose_enrichment.jpeg" alt="enrichments" width="300" style={{marginBottom: 10}}/>

## Implementation on Reaction side

The service worker will then generate a function that will replace the variables with their actual values and pass it to the reaction when it is triggered.

```ts
    const enrichedContent = {
        content: 'User with ID {{TWITCH_FOLLOWER_ID}} and username {{TWITCH_FOLLOWER_USERNAME}} followed you',
    }

    const enriched = enrich(enrichedContent);
    // enriched = {
    //     content: 'User with ID 123456 and username user123 followed you'
    //}
```
