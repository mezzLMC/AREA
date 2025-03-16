/*
** EPITECH PROJECT, 2024
** web
** File description:
** index
*/

import dotenv from "dotenv";
import path from "path";
import { Oauth } from "@shared/services/types";

dotenv.config({
    path: path.resolve(process.cwd(), "../.env")
});

class SpotifyOauth implements Oauth {
    id = "spotify";

    imageURL = "https://cdn.iconscout.com/icon/free/png-256/spotify-11-432546.png";

    generateOauth(state: string) {
        const params = new URLSearchParams({
            client_id: "11c626240c2948168ff4cbc08567066c",
            redirect_uri: "http://localhost:8080/api/auth/spotify",
            response_type: "code",
            scope: "user-read-private user-read-email",
            state
        });
        return `https://accounts.spotify.com/authorize?${params.toString()}`;
    };

    async refreshAccessToken(refreshToken: string) {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64")}`
            },
            body: new URLSearchParams({
                refresh_token: refreshToken,
                grant_type: "refresh_token"
            }).toString()
        });
        return response.json();
    };

    async getAccessToken(code: string) {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64")}`
            },
            body: new URLSearchParams({
                code,
                redirect_uri: "http://localhost:8080/api/auth/spotify",
                grant_type: "authorization_code"
            }).toString()
        });

        const data = await response.json();
        return data;
    };

    async getIdentifier(accessToken: string) {
        const response = await fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        return data.display_name;
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    revoke(accessToken: string) {
        return Promise.resolve();
    };
    
}

export default new SpotifyOauth();
