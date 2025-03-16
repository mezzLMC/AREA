/*
** EPITECH PROJECT, 2024
** area
** File description:
** index
*/

import { Oauth } from "@shared/services/types";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(process.cwd(), ".env"),
});

class GithubOauth implements Oauth {
    id = "github";

    imageURL = "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg";

    generateOauth(state: string) {
        const searchParams = new URLSearchParams({
            client_id: process.env.GITHUB_CLIENT_ID!,
            redirect_uri: "http://localhost:8080/api/auth/github",
            state,
            scope: "repo user",
            allow_signup: "true",
        });
        return `https://github.com/login/oauth/authorize?${searchParams.toString()}`;
    }

    async getAccessToken(code: string) {
        const tokenResponseData = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            body: new URLSearchParams({
                client_id: process.env.GITHUB_CLIENT_ID!,
                client_secret: process.env.GITHUB_CLIENT_SECRET!,
                code,
                redirect_uri: "http://localhost:8080/api/auth/github",
            }).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "accept": "application/json",
            },
        });
        const response = await tokenResponseData.json();
        return response;
    }

    async refreshAccessToken(refreshToken: string) {
        const tokenResponseData = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            body: new URLSearchParams({
                client_id: process.env.GITHUB_CLIENT_ID!,
                client_secret: process.env.GITHUB_CLIENT_SECRET!,
                refresh_token: refreshToken,
                grant_type: "refresh_token",
            }).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "accept": "application/json",
            },
        });
        return tokenResponseData.json();
    }

    async getIdentifier(accessToken: string) {
        const response = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `token ${accessToken}`,
            },
        });
        return response.json().then((data) => data.login);
    }
    
    async revoke(accessToken: string) {
        await fetch(`https://api.github.com/applications/${process.env.GITHUB_CLIENT_ID}/tokens`, {
            method: "DELETE",
            body: JSON.stringify({
                access_token: accessToken
            }),
        });
    };
}

export default new GithubOauth();
