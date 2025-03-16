/*
** EPITECH PROJECT, 2024
** area
** File description:
** getSpotifyInstance
*/

import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { AuthServices } from "@shared/types";

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    throw new Error("Missing Spotify credentials");
}

const getSpotifyApiInstance = (oAuth : AuthServices) => SpotifyApi.withAccessToken(process.env.SPOTIFY_CLIENT_ID!, {
    access_token: oAuth.accessToken,
    refresh_token: oAuth.refreshToken,
    expires_in: new Date(oAuth.expiresAt).getTime(),
    token_type: "Bearer"
});

export default getSpotifyApiInstance;
