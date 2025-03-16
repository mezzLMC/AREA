/*
** EPITECH PROJECT, 2024
** area
** File description:
** ApiInstance
*/

import { TwitchApi } from 'ts-twitch-api';
import client from "@shared/database";
import { AppAccessTokenModel } from '@shared/models/twitch';

export default (accessToken: string) => new TwitchApi({
    clientId: process.env.TWITCH_CLIENT_ID,
    accessToken,
});

interface AccessTokenResponse {
    access_token: string;
    expires_in: number;
    scope: string;
}

const newAccessToken = async () : Promise<AccessTokenResponse> => {
    const res = await fetch("https://id.twitch.tv/oauth2/token", {
        method: "POST",
        body: new URLSearchParams({
            client_id: process.env.TWITCH_CLIENT_ID!,
            client_secret: process.env.TWITCH_CLIENT_SECRET!,
            grant_type: "client_credentials",
            scope: "user:read:follows",
        }).toString(),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    const data = await res.json();
    return data as AccessTokenResponse;
};

export const getAppAccessToken = async () => {
    const db = await client();
    const res = await db.select().from(AppAccessTokenModel).execute();
    if (res.length === 0 || new Date(res[0].expires_at) < new Date()) {
        const newToken = await newAccessToken();
        await db.insert(AppAccessTokenModel).values({
            access_token: newToken.access_token,
            expires_at: (Date.now() + newToken.expires_in * 1000).toString(),
        }).execute();
        await db.$client.release();
        return newToken.access_token;
    }
    await db.$client.release();
    return res[0].access_token;
}; 
