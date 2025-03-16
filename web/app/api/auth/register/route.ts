/*
** EPITECH PROJECT, 2024
** area
** File description:
** register
*/

import { NextResponse } from "next/server";
import { ZodError } from "zod";
import UserRepository from "@shared/database/UserRepository";
import LocalAuthRepository from "@shared/database/LocalAuthRepository";
import SessionRepository from "@shared/database/SessionRepository";
import { registerUserValidator } from "@/lib/validators";

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create a new user
 *     tags:
 *     - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns the created user id and username
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *             example:
 *               id: 1
 *               username: "johnDoe"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Invalid email"
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 */
export async function POST(req: Request) {
    const data = await req.json();
    try {
        await registerUserValidator.parseAsync(data);
    }
    catch (err) {
        if (err instanceof ZodError)
            return NextResponse.json({ error: err.errors }, {status: 400});
    }
    const { id } = await UserRepository.create({authType: 'local', ...data});
    await LocalAuthRepository.create({
        userId: id,
        password: data.password,
    });
    const token = await SessionRepository.create(id);
    return NextResponse.json({ id, token });
}
