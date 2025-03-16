/*
** EPITECH PROJECT, 2024
** area
** File description:
** route
*/

import { NextResponse, NextRequest } from "next/server";
import UserRepository from "@shared/database/UserRepository";
import { ZodError } from "zod";
import { updateUserValidator } from "@/lib/validators";

interface RequestParams {
    params: {
        id: string;
    };
}

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by id
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns user by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
export async function GET(req: NextRequest, { params } : RequestParams) {
    const id = parseInt(params.id, 10);
    const user = await UserRepository.getById(id);
    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
}

/** 
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user by id
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns user updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "User updated"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       400:
 *         description: Validation error
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export async function PUT(req: NextRequest, { params } : RequestParams) {
    const id = parseInt(params.id, 10);
    const user = await UserRepository.getById(id);
    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const body = await req.json();
    try {
        const updateData = updateUserValidator.parse(body);
        await UserRepository.update(id, updateData);
        return NextResponse.json({ message: "User updated" });
    } catch (e) {
        if (e instanceof ZodError)
            return NextResponse.json({ message: e.errors }, { status: 400 });
    }
}

/** 
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by id
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns user deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "User deleted"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export async function DELETE(req: NextRequest, { params } : RequestParams) {
    const id = parseInt(params.id, 10);
    const user = await UserRepository.getById(id);
    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    await UserRepository.delete(id);
    return NextResponse.json({ message: "User deleted" });
}
