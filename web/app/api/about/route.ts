/*
** EPITECH PROJECT, 2024
** api
** File description:
** route
*/

import { NextResponse, NextRequest } from "next/server";
import servicesManager from "@shared/services"

export const GET = (req: NextRequest) => {

    console.log(req.headers);

    const ip = req.headers.get("X-Real-IP");

    console.log(ip);

    const response = {
        "client": {
            "host:": req.headers.get("request-ip"),
        },
        "server": {
            // current type indicates the server time in the Epoch Unix Time Stamp format
            "current_time": Math.floor(Date.now() / 1000),
            "services": servicesManager.map((service) => ({
                name: service.name,
                actions: service.actions.map((action) => ({
                    name: action.name,
                    description: action.description
                }))
            }))
        },
    }
    return NextResponse.json(response);
};
