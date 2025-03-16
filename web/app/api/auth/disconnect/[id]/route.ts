/*
** EPITECH PROJECT, 2024
** area
** File description:
** route
*/

import OAuthRepository from "@shared/database/OAuthRepository";
import SessionRepository from "@shared/database/SessionRepository";
import { authServices } from "@shared/models";
import Oauth from "@shared/Oauth";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface QueryParams {
    params: {
        id: string;
    }
}

export async function POST(req: Request, { params }: QueryParams) {
    const { id } = params;
    const token = req.headers.get("Authorization")!.split(" ")[1];
    const user = await SessionRepository.getAttachedUser(token);
    if (!user)
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    const oauth = await OAuthRepository.findOne(and(eq(authServices.userId, user.id), eq(authServices.service, id)));
    if (!oauth)
        return NextResponse.json({ error: "Service not found" }, { status: 404 });
    const oauthService = Oauth.find(s => s.id === id)!;
    await oauthService.revoke(oauth.accessToken);
    await OAuthRepository.delete(oauth.id);
    return NextResponse.json({ message: "Service disconnected" });
}
