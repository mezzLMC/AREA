/*
** EPITECH PROJECT, 2024
** area
** File description:
** OAuthButton
*/

import React from 'react';
import API from '@shared/Api';
import OAuthButton from '../../components/OAuthButton';

interface Props {
    serviceId: string;
    identifier: string | null;
    disabled: boolean;
}

export default async function OAuthContainer({serviceId, identifier, disabled} : Props) {
    const api = new API(process.env.NEXT_PUBLIC_API_URL!);
    const services = await api.oauth.getAll();
    const service = services.find((serviceEl) => serviceEl.id === serviceId);
    if (!service) return null;

    return (
        <div className={'mx-4 px-4 py-4 h-20 flex justify-between items-center border-2 border-white rounded'}>
            <div className={"flex h-full flex-row items-center"}>
                <img src={service.imageURL} className='h-full' />
                <h1 className={'text-m ml-4 w-2/3'}>
                    {identifier ? `Connected as ${identifier}` : `Not connected`}
                </h1>
            </div>
            <OAuthButton connected={!!identifier} serviceId={serviceId} disabled={disabled} />
        </div>
    )
};
