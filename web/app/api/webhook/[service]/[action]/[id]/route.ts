/*
** EPITECH PROJECT, 2024
** area
** File description:
** route
*/

import services from "@shared/services";

interface QueryParams {
    params: {
        service: string;
        action: string;
        id: string;
    }
}

export async function POST(req: Request, { params }: QueryParams) {
    const { service, action, id } = params;

    const serviceHandler = services.find((s) => s.id === service);
    if (!serviceHandler) return new Response(null, { status: 404 });
    const actionHandler = serviceHandler.actions.find((a) => a.id === action);
    if (!actionHandler) return new Response(null, { status: 404 });
    return actionHandler.webhook(parseInt(id, 10), req);
}
