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

// https://id.twitch.tv/oauth2/authorize
//     ?response_type=code
//     &client_id=hof5gwx0su6owfnys0nyan9c87zr6t
//     &redirect_uri=http://localhost:8080
//     &scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls
//     &state=c3ab8aa609ea11e793ae92361f002671

class TwitchOAuth implements Oauth {

    id = "twitch";

    imageURL = "/images/twitch-purple.svg";

    scope = "channel:manage:polls channel:read:polls user:read:follows moderator:read:followers";


    generateOauth(state: string) {
        const params = new URLSearchParams({
            client_id: process.env.TWITCH_CLIENT_ID!,
            redirect_uri: "http://localhost:8080/api/auth/twitch",
            response_type: "code",
            scope: this.scope,
            state
        });
        return `https://id.twitch.tv/oauth2/authorize?${params.toString()}`;
    };

    async getAccessToken(code: string) {
        const tokenResponseData = await fetch('https://id.twitch.tv/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: process.env.TWITCH_CLIENT_ID!,
                client_secret: process.env.TWITCH_CLIENT_SECRET!,
                code,
                grant_type: 'authorization_code',
                redirect_uri: `http://localhost:8080/api/auth/twitch`,
                scope: this.scope
            }).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const data = await tokenResponseData.json();
        return data;
    }

    async refreshAccessToken(refreshToken: string) {
        const tokenResponseData = await fetch('https://id.twitch.tv/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: process.env.TWITCH_CLIENT_ID!,
                client_secret: process.env.TWITCH_CLIENT_SECRET!,
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                scope: this.scope
            }).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return tokenResponseData.json();
    };

    async getIdentifier(accessToken: string) {
        const userInfoResponse = await fetch('https://api.twitch.tv/helix/users', {
            headers: {
                'Client-Id': process.env.TWITCH_CLIENT_ID!,
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'GET'
        });
        const userInfo = await userInfoResponse.json();
        return userInfo.data[0].display_name;
    };

    async revoke(accessToken: string) {
        await fetch('https://id.twitch.tv/oauth2/revoke', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: process.env.TWITCH_CLIENT_ID!,
                token: accessToken
            }).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    };
}

export default new TwitchOAuth();
