/*
** EPITECH PROJECT, 2024
** area
** File description:
** route
*/

import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import SessionRepository from "@shared/database/SessionRepository";
import OAuthRepository from "@shared/database/OAuthRepository";
import Oauth from "@shared/Oauth";

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get currently logged in user
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Returns the user associated with the session token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
    */

export const GET = async (req: Request) => {
    const token = req.headers.get('Authorization');
    if (!token) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }
    const tokenValue = token.split(' ')[1];
    const oauthModel = OAuthRepository.model;
    const user = await SessionRepository.getAttachedUser(tokenValue);
    if (!user) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }
    const oAuthLogged = await Promise.all(Oauth.map(async (service) => {
        const isLogged = await OAuthRepository.findOne(and(eq(oauthModel.userId, user.id), eq(oauthModel.service, service.id)));
        if (!isLogged) return { [service.id]: null };
        const identifier = await service.getIdentifier(isLogged.accessToken);
        return { [service.id]: identifier };
    })).then(results => results.reduce((acc, result) => ({ ...acc, ...result }), {} as { [key: string]: string | null }));
    return NextResponse.json({
        id: user.id,
        email: user.email,
        username: user.username,
        authType: user.authType,
        Oauth: oAuthLogged,

    }, { status: 200 });
};
