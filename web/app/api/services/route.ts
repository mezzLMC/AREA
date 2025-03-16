/*
** EPITECH PROJECT, 2024
** area
** File description:
** route
*/

import { NextResponse } from 'next/server';
import SessionRepository from '@shared/database/SessionRepository';
import servicesManager from '@shared/services';
import client from '@shared/database';
import { areaModel } from '@shared/models';
import { ServiceInfo } from '@shared/types';

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all services
 *     tags:
 *      - Services
 *     responses:
 *       200:
 *         description: Get all services
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 services:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ServiceInfo'
 */
export const GET = async () => {
    const response = {
        services: servicesManager.map((service) => {
            const { id, name, description, imageURL, actions, reactions, oauthId } = service;
            return { id, name, description, imageURL, actionCount: actions.length, reactionCount: reactions.length, oauthId } as ServiceInfo;
        }),
    };
    return NextResponse.json(response);
};

interface requestBody {
    action: {
        id: string;
        service: string;
        fields: Record<string, string>;
    };
    reaction: {
        id: string;
        service: string;
        fields: Record<string, string>;
    };
}

/**
 * @swagger
 * /services:
 *   post:
 *     tags:
 *       - Services
 *     summary: Executes an action and triggers a reaction.
 *     description: This endpoint allows you to execute a specified action and trigger a corresponding reaction based on the provided input.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the action to be executed.
 *                   fields:
 *                     type: object
 *                     description: The fields required by the action.
 *               reaction:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the reaction to be triggered.
 *                   fields:
 *                     type: object
 *                     description: The fields required by the reaction.
 *             required:
 *               - action
 *               - reaction
 *     responses:
 *       200:
 *         description: Successfully executed action and triggered reaction.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *       404:
 *         description: Action or reaction not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message when action or reaction is not found.
 */

export const POST = async (req: Request) => {
    const body = await req.json() as requestBody;
    const tokenHeader = req.headers.get("Authorization");
    if (!tokenHeader) {
        return NextResponse.json({ message: "Missing Authorization header" }, { status: 401 });
    }
    const token = tokenHeader.split(" ")[1];
    const user = await SessionRepository.getAttachedUser(token);
    if (!user) {
        return NextResponse.json({ message: "Invalid session" }, { status: 401 });
    }
    const userId = user.id;
    const actionService = servicesManager.find((service) => service.id === body.action.service);
    const reactionService = servicesManager.find((service) => service.id === body.reaction.service);
    if (!reactionService) {
        return NextResponse.json({ message: "Reaction service not found" }, { status: 404 });
    }
    if (!actionService) {
        return NextResponse.json({ message: "Action service not found" }, { status: 404 });
    }
    const chosenAction = actionService.actions.find((action) => action.id === body.action.id);
    const chosenReaction = reactionService.reactions.find((reaction) => reaction.id === body.reaction.id);
    if (!chosenAction || !chosenReaction) {
        return NextResponse.json({ message: `${!chosenAction ? "Action" : "Reaction"} not found` }, { status: 404 });
    }

    const reactionId = await chosenReaction.add(user.id, body.reaction.fields);
    const actionId = await chosenAction.add(user.id, body.action.fields);
    const db = await client();
    db.insert(areaModel).values({
        userId,
        actionId,
        reactionId,
        actionServiceId: actionService.id,
        reactionServiceId: reactionService.id,
        actionTypeId: chosenAction.id,
        reactionTypeId: chosenReaction.id,
    }).execute();
    await db.$client.release();
    return NextResponse.json({}); 
};
