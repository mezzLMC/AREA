/* eslint-disable no-empty-function */
/*
** EPITECH PROJECT, 2024
** area
** File description:
** DateTrigger
*/

import client from "@shared/database";
import { Field } from "@shared/types";
import { singleDateModel } from "@shared/models/timer";
import Redis from "@shared/Redis";
import { eq } from "drizzle-orm";
import queue from "../../Queue";
import AreaAction from "../AreaAction";

class DateTrigger extends AreaAction {
    description: string;

    name: string;

    id: string;

    fields: Field[];

    constructor() {
        super();
        this.description = "Triggered at a specific date";
        this.name = "Single Date Trigger";
        this.id = "single_date_trigger";
        this.fields = [
            {
                id: "date",
                name: "when do you want to trigger the action?",
                type: "date"
            },
        ];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async generateFields(userId: number): Promise<Field[]> {
        return this.fields;
    }

    async add(userId: number, fields: { [key: string]: string }) {
        const db = await client();
        const inserted = await db
            .insert(singleDateModel)
            .values({ date: fields.date, userId })
            .returning({ id: singleDateModel.id })
            .execute();
        await db.$client.release();
        return inserted[0].id;
    }

    async poll(): Promise<void> {
        const db = await client();
        const redis = await Redis().connect();
        const dateTriggers = await db.select().from(singleDateModel).execute();
        dateTriggers.forEach(async (triggerInfo) => {
            const date = new Date(triggerInfo.date);
            const timeout = date.getTime() - new Date().getTime();
            if (timeout <= 0) {
                queue.push({
                    action: this.id,
                    id: triggerInfo.id
                });
                await db.delete(singleDateModel).where(eq(singleDateModel.id, triggerInfo.id)).execute();
            }
        });
        await db.$client.release();
        await redis.quit();
    }

    async setup() : Promise<void> {}
}

const instance = new DateTrigger();

export default instance;

