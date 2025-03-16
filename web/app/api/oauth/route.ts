/*
** EPITECH PROJECT, 2024
** area
** File description:
** route
*/

import Oauth from "@shared/Oauth";
import { OauthInfo } from "@shared/types";
import { NextResponse } from "next/server";


/**
 * @swagger
 * /oauth:
 *   get:
 *     description: Get all oauth services
 *     responses:
 *       200:
 *         description: Returns all oauth services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OauthInfo'
 * components:
 *   schemas:
 *     OauthInfo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         imageURL:
 *           type: string
 *       required:
 *         - id
 *         - imageURL
 */
export const GET = () => {
    const response : OauthInfo[] = Oauth.map((oauth) => ({
            id: oauth.id,
            imageURL: oauth.imageURL,
        }));

    return NextResponse.json({
        data: response
    });
};
