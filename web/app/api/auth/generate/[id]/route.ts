/*
** EPITECH PROJECT, 2024
** web
** File description:
** route
*/

import { NextRequest, NextResponse } from "next/server";
import Oauth from "@shared/Oauth";
import SessionRepository from "@shared/database/SessionRepository";
import OAuthRepository from "@shared/database/OAuthRepository";


interface QueryParams {
    params: {
        id: string;
    };
}

/**
 * @swagger
 * /auth/generate/{id}:
 *   post:
 *     summary: Initiate OAuth login flow
 *     tags:
 *      - OAuth
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the OAuth service (e.g., google, github, etc.)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               redirectURL:
 *                 type: string
 *                 description: The URL to redirect the user to after successful OAuth authentication
 *                 example: "https://example.com/callback"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the OAuth redirect URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: The OAuth service authorization URL
 *                   example: "https://accounts.google.com/o/oauth2/v2/auth?..."
 *       401:
 *         description: Unauthorized, missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: OAuth service not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Service not found"
 */
export const POST = async (req: NextRequest, { params }: QueryParams) => {
    const { id } = params;
    const body = await req.json();
    const redirectURL = body.redirectURL || "/";
    const token = req.headers.get("Authorization");
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const tokenValue = token.split(" ")[1];
    const OauthService = Oauth.find((service) => service.id === id);
    if (!OauthService) {
        return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    const user = (await SessionRepository.getAttachedUser(tokenValue))!;
    const state = await OAuthRepository.createState({ userId: user.id, service: OauthService.id, redirectURL });
    const url = OauthService.generateOauth(state);
    return NextResponse.json({ url });
};
