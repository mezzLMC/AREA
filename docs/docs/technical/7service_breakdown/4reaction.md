---
sidebar_position: 4
---

# Reaction

Reactions are a specific action that are triggered when a linked action is executed. They are used to perform an action in response to another action. Reactions are used to automate tasks and can be used to create complex workflows.

## Structure

Each Reaction implements the following structure:

```ts


// The enricher is a function that takes any content and returns the same content with variables replaced by their values
export type Enricher = <T extends Record<string, string>>(fields: T) => T;

export interface Reaction {
    // The unique identifier of the reaction
    id: string;
    // The name of the reaction that is displayed to the user
    name: string;
    // The description of the reaction that is displayed to the user
    description: string;
    // The fields that are used to configure the reaction
    fields: Field[];
    // Same as the action, saves the reaction in the desired database table and returns an id
    add: (fields: Record<string, string>) => Promise<number>;
    // called when the linked action is triggered
    // triggerId is the id of the reaction in the database, the one returned by the add function
    trigger: (triggerId: number, enrich: Enricher) => Promise<void>;
}

```

## Implementation

Here is an example of a reaction generation implementation:

```ts
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

    async add(fields: Record<string, string>): Promise<number> {
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

        //retrieve the reaction data from the database
        const query = await db
            .select()
            .from(webHookReactionModel)
            .where(eq(webHookReactionModel.id, triggerId))
            .execute();
        const triggerData = query[0];

        //fullfill the payload with the enriched content
        const payload : DiscordWebHookPayload = enrich({
            content: triggerData.content
        });

        //send the payload to the webhook
        await fetch(triggerData.webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        await db.$client.release();
    }

}

// Export a new instance of the reaction
export default webHookReaction();
```