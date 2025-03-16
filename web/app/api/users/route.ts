/*
** EPITECH PROJECT, 2024
** AREA
** File description:
** route
*/

import { NextResponse } from "next/server";
import UserRepository from "@shared/database/UserRepository";
import client from "@shared/database";

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Returns all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             example:
 *               - id: 1
 *                 username: "johnDoe"
 *                 email: "john.doe@acme.com"
 *               - id: 2
 *                 username: "janeDoe"
 *                 email: "jane.doe@acme.com"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

export async function GET() {
    const db = await client();
    const users = await UserRepository.getAll();
    await db.$client.release();
    return NextResponse.json(users);
}
