/*
** EPITECH PROJECT, 2024
** area
** File description:
** route
*/

import { NextResponse } from "next/server";
import SessionRepository from "@shared/database/SessionRepository";

export const GET = async (req: Request) => {
    const token = req.headers.get("Authorization");
    if (!token)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const tokenValue = token.split(" ")[1];
    const session = await SessionRepository.getAttachedUser(tokenValue);
    if (!session)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ message: "Authorized" });
};
