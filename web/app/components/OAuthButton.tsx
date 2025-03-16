"use client";

/*
** EPITECH PROJECT, 2024
** area
** File description:
** OAuthButton
*/

import React from 'react';
import API from '@shared/Api';
import { useCookies } from 'next-client-cookies';

interface Props {
    serviceId: string;
    connected: boolean;
    disabled?: boolean;
    blank?: boolean;
    testID?: string; // Ajout de la prop testID
}

export default function OAuthButton({ serviceId, connected, blank = false, disabled = false, testID }: Props) {
    const api = new API(process.env.NEXT_PUBLIC_API_URL!);
    const cookieStore = useCookies();
    const token = cookieStore.get('accessToken')!;

    const getOauthUrl = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const oauthUrl = await api.oauth.generate(serviceId, "http://localhost:8080/settings", token);
        if (blank) {
            window.open(oauthUrl, '_blank');
        } else {
            window.location.href = oauthUrl;
        }
    }

    const disconnect = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await api.oauth.disconnect(serviceId, token); // Ajoutez await ici
        window.location.reload();
    }

    return (
        connected ? 
            <button
                data-testid={`${testID}-disconnect`} // Ajout du testID ici
                disabled={disabled}
                onClick={disconnect}
                className={'border border-red-500 px-4 py-1 rounded-md'}
            >
                disconnect
            </button>
        : 
            <button
                data-testid={`${testID}-connect`} // Ajout du testID ici
                onClick={getOauthUrl}
                className={'bg-blue-500 text-white px-4 py-1 bold rounded-md'}
            >
                connect
            </button>
    );
}
