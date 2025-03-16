/*
** EPITECH PROJECT, 2024
** area
** File description:
** route
*/

import { NextResponse } from "next/server";
import getApiDocs from "@/lib/swagger";

export const GET = async () => {
    const apiDocs = await getApiDocs();
    return NextResponse.json(apiDocs);
};
