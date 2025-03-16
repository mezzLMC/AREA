/*
** EPITECH PROJECT, 2024
** area
** File description:
** route
*/

import { NextResponse } from "next/server";
import client from "@shared/database";
import SessionRepository from "@shared/database/SessionRepository";
import { areaModel } from "@shared/models"; 
import { eq } from "drizzle-orm";
import services from "@shared/services";

/**
 * @swagger
 * /services/me:
 *   get:
 *      tags:
 *          - Services
 *     summary: Retrieve areas for the authenticated user
 *     description: Fetches a list of areas associated with the authenticated user. Each area includes an action and a reaction with service images and names.
 *     security:
 *       - BearerAuth: []  # Specifies that this endpoint requires a bearer token
 *     responses:
 *       200:
 *         description: A list of areas for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier for the area
 *                   action:
 *                     type: object
 *                     properties:
 *                       image:
 *                         type: string
 *                         description: URL of the image representing the action's service
 *                       name:
 *                         type: string
 *                         description: Name of the action
 *                   reaction:
 *                     type: object
 *                     properties:
 *                       image:
 *                         type: string
 *                         description: URL of the image representing the reaction's service
 *                       name:
 *                         type: string
 *                         description: Name of the reaction
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid or missing authorization token"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 * 
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
export const GET = async (req: Request) => {
    const token = req.headers.get("Authorization")!.split(" ")[1];
    const user = (await SessionRepository.getAttachedUser(token))!;
    const db = await client();
    const areas = await db.select().from(areaModel).where(eq(areaModel.userId, user.id)).execute();
    const formatted = areas.map((area) => {
        const actionService = services.find((service) => service.id === area.actionServiceId);
        const reactionService = services.find((service) => service.id === area.reactionServiceId);
        if (!actionService || !reactionService) return null;
        const action = actionService.actions.find((a) => a.id === area.actionTypeId);
        const reaction = reactionService.reactions.find((r) => r.id === area.reactionTypeId);
        if (!action || !reaction) return null;
        return {
            id: area.id,
            action: {
                image: actionService.imageURL,
                name: action.name,
            },
            reaction: {
                image: reactionService.imageURL,
                name: reaction.name,
            },
        };
    });
    const response = formatted.filter((area) => area !== null);
    return NextResponse.json(response);
};
