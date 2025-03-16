/*
** EPITECH PROJECT, 2024
** area
** File description:
** index
*/

import dotenv from "dotenv";
import path from "path";
import { Oauth } from "@shared/services/types";

dotenv.config({
    path: path.resolve(process.cwd(), "../.env")
});

class DiscordOAuth implements Oauth {
    imageURL = "https://upload.wikimedia.org/wikipedia/fr/4/4f/Discord_Logo_sans_texte.svg";

    id = "discord";

    generateOauth (state: string) {
        const params = new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID!,
            redirect_uri: "http://localhost:8080/api/auth/discord",
            response_type: "code",
            scope: "identify email connections guilds.members.read",
            state
        });
        const url = `https://discord.com/oauth2/authorize?${params.toString()}`;
        return url;
    };
    
    async getAccessToken(code: string) {
        const tokenResponseData = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: process.env.DISCORD_CLIENT_ID!,
                client_secret: process.env.DISCORD_CLIENT_SECRET!,
                code,
                grant_type: 'authorization_code',
                redirect_uri: `http://localhost:8080/api/auth/discord`,
                scope: 'identify',
            }).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return tokenResponseData.json();
    }
    
    async refreshAccessToken(refreshToken: string) {
        const tokenResponseData = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: process.env.DISCORD_CLIENT_ID!,
                client_secret: process.env.DISCORD_CLIENT_SECRET!,
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                redirect_uri: `http://localhost:8080/api/auth/discord`,
                scope: 'identify',
            }).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return tokenResponseData.json();
    };
    
    async getIdentifier(accessToken: string) {
        const userInfo = await fetch('https://discord.com/api/v10/users/@me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            method: "GET",
        });
        const data = await userInfo.json();
        return data.global_name;
    };

    async revoke(accessToken: string) {
        await fetch(`https://discord.com/api/v10/oauth2/token/revoke`, {
            method: "POST",
            body: new URLSearchParams({
                token: accessToken,
                client_id: process.env.DISCORD_CLIENT_ID!,
                client_secret: process.env.DISCORD_CLIENT_SECRET!,
            }).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    };
}

export default new DiscordOAuth();
