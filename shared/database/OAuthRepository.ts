/* eslint-disable class-methods-use-this */
/*
** EPITECH PROJECT, 2024
** area
** File description:
** GoogleAuthRepository
*/

import { DatabaseRepository, AuthServices, NewAuthServices, Where } from "@shared/types";
import { authServices } from "@shared/models";
import { and, eq } from "drizzle-orm";
import { RedisClientType, RedisFunctions, RedisModules, RedisScripts } from "@redis/client";
import Oauth from "@shared/Oauth";
import Redis from "@shared/Redis";
import client from "@shared/database";

type OAuthRepositoryType = DatabaseRepository<AuthServices, NewAuthServices>;

interface StateData {
    userId: number;
    service: string;
    redirectURL: string;
}

const generateRandomString = (length: number) => {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }).reduce((text) => text + possible.charAt(Math.floor(Math.random() * possible.length)), "") as string;
};

class OAuthRepository implements OAuthRepositoryType {

    model:typeof authServices;


    redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;


    constructor() {
        this.model = authServices;
        this.redisClient = Redis();
    }

    create = async (auth: NewAuthServices) => {
        const db = await client();
        const res = await db.insert(authServices).values(auth).returning().execute();
        return res[0];
    }

    getById = async (id: number) => {
        const db = await client();
        const res: AuthServices[] = await db.select().from(authServices).where(eq(authServices.id, id)).execute();
        return res[0];
    }

    delete = async (id: number) => {
        const db = await client();
        await db.delete(authServices).where(eq(authServices.id, id)).execute();
    }

    getAll = async () => {
        const db = await client();
        const res = db.select().from(authServices).execute();
        return res;
    }

    update = async (id: number, auth: Partial<AuthServices>) => {
        const db = await client();
        await db.update(authServices).set(auth).where(eq(authServices.id, id)).returning().execute();
    }

    findOne = async (condition: Where) => {
        const db = await client();
        const res: AuthServices[] = await db.select().from(authServices).where(condition).execute().finally(() => db.$client.release());
        if (res.length === 0) return null;
        const auth = res[0];
        if (new Date(auth.expiresAt) > new Date())
            return auth;
        const authService = Oauth.find((service) => service.id === auth.service)!;
        const newToken = await authService.refreshAccessToken(auth.refreshToken);
        try {
            await this.update(auth.id, {
                accessToken: newToken.access_token,
                refreshToken: newToken.refresh_token,
                expiresAt: new Date(Date.now() + newToken.expires_in * 1000).toISOString(),
            });
        } catch {
            await this.delete(auth.id);
            return null;
        }
        return this.getById(auth.id);
    }

    findByService = async (service: string, userId: number) => this.findOne(and(eq(authServices.service, service), eq(authServices.userId, userId)));

    findMany = async (condition: Where) => {
        const db = await client();
        return db.select().from(authServices).where(condition).execute().finally(() => db.$client.release());
    }

    createState = async (data : StateData) => {
        await this.redisClient.connect();
        const state = generateRandomString(16);
        this.redisClient.set(state, JSON.stringify(data));
        this.redisClient.expire(state, 300); // 5 minutes
        await this.redisClient.quit();
        return state;
    }

    getState = async (state: string) => {
        await this.redisClient.connect();
        const data = await this.redisClient.get(state);
        await this.redisClient.quit();
        if (!data) return null;
        const parsedData = JSON.parse(data) as StateData;
        return parsedData;
    }
}

export default new OAuthRepository();
