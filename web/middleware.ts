/*
** EPITECH PROJECT, 2024
** area
** File description:
** middleware
*/

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = req.headers.get("Authorization");
    if (!token) {
        return NextResponse.json({ message: "Unauthorized. missing Authorization" }, { status: 401 });
    }
    const headers = {
        Authorization: token,
    }
    const session = await fetch("http://localhost:8080/api/auth/session", { 
        headers,
        method: "GET"
    });
    if (!session.ok) {
        return NextResponse.json({ message: "Unauthorized. Invalid token" }, { status: 401 });
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/api/users/:path*",
        "/api/services/:path*",
        "/api/auth/generate/:path*",
        "/api/auth/disconnect/:path*",
        "/api/services/:path*",
    ]
};
