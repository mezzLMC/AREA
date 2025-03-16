/*
** EPITECH PROJECT, 2024
** area
** File description:
** index
*/

import { Oauth } from "@shared/services/types";

class MicrosoftOauth implements Oauth {
    id = "microsoft";

    scope = "User.Read offline_access Chat.Read Chat.ReadWrite ChannelMessage.Send Team.ReadBasic.All";

    imageURL = "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg";

    generateOauth(state: string) {
        const searchParams = new URLSearchParams({
            client_id: process.env.MICROSOFT_CLIENT_ID!,
            redirect_uri: "http://localhost:8080/api/auth/microsoft",
            state,
            response_type: "code",
            response_mode: "query",
            scope: this.scope,
        });
        return `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${searchParams.toString()}`;
    };

    async getAccessToken(code: string) {
        const tokenResponseData = await fetch("https://login.microsoftonline.com/common/oauth2/v2.0/token", {
            method: "POST",
            body: new URLSearchParams({
                client_id: process.env.MICROSOFT_CLIENT_ID!,
                client_secret: process.env.MICROSOFT_CLIENT_SECRET!,
                code,
                redirect_uri: "http://localhost:8080/api/auth/microsoft",
                grant_type: "authorization_code",
                scope: this.scope,
            }).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "accept": "application/json",
            },
        });
        const response = await tokenResponseData.json();
        return response;
    };

    async refreshAccessToken(refreshToken: string) {
        const tokenResponseData = await fetch("https://login.microsoftonline.com/common/oauth2/v2.0/token", {
            method: "POST",
            body: new URLSearchParams({
                client_id: process.env.MICROSOFT_CLIENT_ID!,
                client_secret: process.env.MICROSOFT_CLIENT_SECRET!,
                refresh_token: refreshToken,
                grant_type: "refresh_token",
            }).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "accept": "application/json",
            },
        });
        const response = await tokenResponseData.json();
        return response;
    };

    async getIdentifier(accessToken: string) {
        const userInfoResponse = await fetch("https://graph.microsoft.com/v1.0/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const response = await userInfoResponse.json();
        return response.mail;
    };

    async revoke(accessToken: string) {
        await fetch("https://login.microsoftonline.com/common/oauth2/v2.0/logout", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    };
}

export default new MicrosoftOauth();
