/*
** EPITECH PROJECT, 2024
** AREA
** File description:
** route
*/

import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import UserRepository from "@shared/database/UserRepository";
import LocalAuthRepository from "@shared/database/LocalAuthRepository";
import SessionRepository from "@shared/database/SessionRepository";
import bcrypt from "bcrypt";
import { loginBody } from "@/lib/validators";

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags:
 *      - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a new session
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSession'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 * 
 *
 */

export async function POST(req: Request) {
    const data = await req.json();
    try {
        const body = await loginBody.parseAsync(data);
        const userModel = UserRepository.model;
        const user = await UserRepository.findOne(eq(userModel.email, body.email))!;
        const authModel = LocalAuthRepository.model;
        const auth = await LocalAuthRepository.findOne(eq(authModel.userId, user.id))!;
        const samePassword = await bcrypt.compare(body.password, auth.password);
        if (samePassword === false) {
            return NextResponse.json({ error: "Invalid password" }, {status: 400});
        }
        const token = await SessionRepository.create(user.id);
        return NextResponse.json({ id: user.id, token }, {status: 200});
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json({ error: err.errors }, {status: 400});
        }
        return NextResponse.json({ error: "Internal server error" }, {status: 500});
    }
}
