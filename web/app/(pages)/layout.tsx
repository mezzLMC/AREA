/*
** EPITECH PROJECT, 2024
** area
** File description:
** layout
*/

import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import API from "@shared/Api";

export default async function ProtectedLayout({ children }: Readonly<{ children?: React.ReactNode }> = {}) {
    const cookiesStore = cookies();
    const token = cookiesStore.get('accessToken');
    const api = new API(process.env.NEXT_PUBLIC_API_URL!);
    if (!token) {
        redirect("http://localhost:8080/");
        return null;
    }
    const valid = await api.isTokenValid(token.value);
    if (!valid) {
        redirect("http://localhost:8080/");
        return null;
    }

    return <>{children}</>;
}