/* eslint-disable no-console */
/*
 ** EPITECH PROJECT, 2024
 ** area
 ** File description:
 ** index
 */

import services from '@shared/services'
import client from '@shared/database'
import { areaModel } from '@shared/models'
import { and, eq } from 'drizzle-orm'
import queue from '@shared/Queue'
import { TriggerInfo } from '@shared/services/types'
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(__dirname, "../.env")
})

const setupServices = async () => {
    services.forEach(async (service) => {
        console.log("Setting up service", service.id);
        await service.setup();
        service.actions.forEach((action) => {
            console.log("\tSetting up action", action.id);
            action.setup();
        });
    })
}


const enrich = <T extends Record<string, string>>(enrichments: Record<string, string>, fields: T): T => {
    const enrichedObject = {} as T;
    Object.keys(fields).forEach((key: keyof T) => {
        enrichedObject[key] = Object.keys(enrichments).reduce((acc, curr) => acc.replaceAll(`{{${curr}}}`, enrichments[curr]), fields[key]) as T[keyof T];
    });
    return enrichedObject;
}

const handleQueueMessage = async ({action, id, enrichments = {}}: TriggerInfo) => {
    const db = await client();
    const req = await db.select().from(areaModel)
        .where(and(eq(areaModel.actionId, id), eq(areaModel.actionTypeId, action)))
        .execute();
    await db.$client.release();
    if (req.length === 0) {
        console.log("No area found for action", action, "id", id);
        return;
    }
    const { reactionId, reactionTypeId, reactionServiceId } = req[0];
    const reactionService = services.find((s) => s.id === reactionServiceId)!;
    const reaction = reactionService.reactions.find((r) => r.id === reactionTypeId)!;
    const enricher = <T extends Record<string, string>>(fields : T) => enrich(enrichments, fields);
    reaction.trigger(reactionId, enricher);
}

const processQueue = async () => {
    const message = await queue.pop();
    if (!message)
        return;
    console.log("triggered action", message);
    await handleQueueMessage(message);
}

const pollActions = async () => {
    services.forEach((service) => {
        service.actions.forEach((action) => {
            action.poll();
        });
    });
}

let isWebUp = false;
let isNgrokUp = false;

const interval = setInterval(async () => {
    try {
        if (!isWebUp) {
            await fetch(`http://${process.env.WEB_HOST || "localhost"}:8080`);
            isWebUp = true;
            console.log("Web is up");
        }
        if (!isNgrokUp) {
            await fetch(`http://${process.env.NGROK_HOST || "localhost"}:4040`);

            isNgrokUp = true;
            console.log("Ngrok is up");
        }

    } catch {
        if (isWebUp && !isNgrokUp) {
            console.log("Ngrok is not up yet");
        }
        if (!isWebUp && isNgrokUp) {
            console.log("Web is not up yet");
        }
        if (!isWebUp && !isNgrokUp) {
            console.log("Web and Ngrok are not up yet");
        }
    }
}, 1000);


(async () => {
    while (!isWebUp || !isNgrokUp) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => {setTimeout(resolve, 1000)});
    }
    clearInterval(interval);
    await setupServices();
    setInterval(processQueue, 1000);
    setInterval(pollActions, 15000);
})();

console.log("Worker started");
