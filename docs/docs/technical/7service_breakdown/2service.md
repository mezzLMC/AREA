---
sidebar_position: 2
---

# Service

A Service is a third-party application that provides a set of functionalities that can be used to create automations. It can be based on a precise external application or tool such as a social network, a messaging platform, or a cloud service. Each service is composed of a set of actions and reactions that can be used to create automations.

## Structure

Each service implements the following structure:

```ts
export interface Service {
    // an unique identifier for the service, will be used to reference the service in the database and the API requests
    id: string;
    // a display name for the service that will be shown to the user
    name: string;
    // a short description of the service
    description: string;
    // an array of actions that the service provides
    actions: Action[];
    // an array of reactions that the service provides
    reactions: Reaction[];
    // a URL to an image representing the service
    imageURL: string;
    // an unique identifier for the service in the OAuth flow, force the end user to authenticate before using the service
    oauthId?: string;
    /* a function that will be called on server startup to initialize the service,
       it can be used to clear webhooks, setup polling, etc. */
    setup: () => Promise<void>;
}
```

## Implementation
 
Here is an example of a service implementation:

```ts

// AreaService is an abstract base class that implements the Service interface.
// It provides a default empty implementation for the setup method.
class TwitchService extends AreaService {

    description = "Twitch is a live streaming platform for gamers and other lifestyle casters...";
    id = "twitch";
    name = "Twitch";
    imageURL = "/images/twitch-purple.svg";
    //setting the oauthId to "twitch" will set the login mandatory for the service
    oauthId = "twitch";

    //array of class instances extending AreAreaAction
    actions = [
        FollowedBroadcasterIsStreaming,
        someoneFollowedMe,
        someoneSubsToMe
    ]

    reactions = [
        // no reactions for now
    ];

    static async deleteSubscription(id:string, accessToken: string) : Promise<void> {
        const api = TwitchApiInstance(accessToken);
        await api.eventSub.deleteEventSubSubscription({ id });;
    }

    //get all the running webhooks subscriptions and delete them
    async setup() {
        const accessToken = await getAppAccessToken();
        const api = TwitchApiInstance(accessToken);
        const eventSubs = await api.eventSub.getEventSubSubscriptions();
        if (eventSubs.status !== 200) return;
        const subs = eventSubs.data.data;
        for (const sub of subs) {
            await TwitchService.deleteSubscription(sub.id, accessToken); 
        }
        console.log("Deleted all twitch webhooks");
    }
}

// Exporting an instance of the service
export default new TwitchService();
```
