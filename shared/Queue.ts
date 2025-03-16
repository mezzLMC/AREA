/*
** EPITECH PROJECT, 2024
** area
** File description:
** Queue
*/

import { RedisClientType, RedisFunctions, RedisModules, RedisScripts } from "@redis/client";
import { TriggerInfo } from "@shared/services/types";
import Redis from "./Redis";

class Queue {
    redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

    connected: boolean;

    constructor() {
        this.redisClient = Redis();
        this.connected = false;
    }

    async connect() {
        if (this.connected) return;
        await this.redisClient.connect();
        this.connected = true;
    }

    async disconnect() {
        if (!this.connected) return;
        await this.redisClient.disconnect();
        this.connected = false;
    }

    async push(triggerInfo: TriggerInfo) {
        await this.connect();
        await this.redisClient.rPush("queue", JSON.stringify(triggerInfo));
    }

    async pop(): Promise<TriggerInfo | null> {
        await this.connect();
        const length = await this.redisClient.lLen("queue");
        if (length === 0) {
            await this.disconnect();
            return null;
        }
        const message = await this.redisClient.lPop("queue");
        if (!message) return null;
        return JSON.parse(message) as TriggerInfo;
    }
}

const queue = new Queue();

export default queue;
