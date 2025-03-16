/*
** EPITECH PROJECT, 2024
** area
** File description:
** route
*/

import { NextResponse } from "next/server";
import servicesManager from "@shared/services";
import SessionRepository from "@shared/database/SessionRepository";
import { DetailedService } from "@shared/types";

interface requestParams {
    params: {
        id: string;
    };
}

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     tags:
 *      - Services
 *     summary: Get service by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the service to retrieve
 *     responses:
 *       200:
 *         description: Returns a service
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/DetailedService'
 */
export const GET = async (req: Request, {params} : requestParams) => {
    const serviceId = params.id;
    const service = servicesManager.find((s) => s.id === serviceId);
    if (!service) {
        return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }
    const token = req.headers.get("Authorization")!.split(" ")[1];
    const { id } = (await SessionRepository.getAttachedUser(token))!;
    const actions = await Promise.all(service.actions.map(async (action) => ({
        name: action.name,
        id: action.id,
        description: action.description,
        fields: await action.generateFields(id),
        enrichments: action.enrichments,
    })));

    const response = {
        name: service.name,
        id: service.id,
        description: service.description,
        actions,
        reactions: service.reactions.map((reaction) => ({
            name: reaction.name,
            id: reaction.id,
            description: reaction.description,
            fields: reaction.fields,
        })),
        imageURL: service.imageURL,
    } as DetailedService;
    return NextResponse.json(response, { status: 200 });
};
