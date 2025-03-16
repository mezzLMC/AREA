/*
** EPITECH PROJECT, 2024
** area
** File description:
** dailyTrigger
*/

import client from "@shared/database";
import { dailyModel } from "@shared/models/timer";
import { Field } from "@shared/types";
import queue from "../../Queue";
import AreaAction from "../AreaAction";

class DailyTrigger extends AreaAction {
    description = "Triggered every day at a specific hour";

    name = "Daily Hour Trigger";

    id = "daily_hour_trigger";

    fields : Field[] = [
        {
            id: "When do you want to trigger the action?",
            name: "hour",
            type: "hour",
        },
    ]

    enrichments = [];

    async add(userId: number, fields: { [key: string]: string }) {
        const db = await client();
        const inserted = await db
            .insert(dailyModel)
            .values({ time: fields.hour, userId })
            .returning({ id: dailyModel.id })
            .execute();
        await db.$client.release();
        return inserted[0].id;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async generateFields(userId: number): Promise<Field[]> {
        return this.fields;
    }

    async setup() : Promise<void> {
        const db = await client();
        const dailyTriggers = await db.select().from(dailyModel).execute();
        dailyTriggers.forEach(triggerInfo => {
            const now = new Date();
            const triggerDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(triggerInfo.time, 10), 0, 0, 0);
            if (now > triggerDate) {
                triggerDate.setDate(triggerDate.getDate() + 1);
            }
            const timeToWait = triggerDate.getTime() - now.getTime();
            setTimeout(() => {
                queue.push({
                    action: this.id,
                    id: triggerInfo.id
                });
                setInterval(() => {
                    queue.push({
                        action: this.id,
                        id: triggerInfo.id
                    });
                }, 24 * 60 * 60 * 1000);
            }, timeToWait);
        });
        await db.$client.release();
    }
}

const dailyTrigger = new DailyTrigger();

export default dailyTrigger; 
