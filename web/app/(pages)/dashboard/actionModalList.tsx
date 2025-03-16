"use client";

import React, { useEffect } from 'react'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AReaInfo, DetailedService, ServiceInfo, OauthInfo } from '@shared/types'
import API, { getMeResponse } from '@shared/Api';
import { useCookies } from 'next-client-cookies';
import { modalState } from './areaModal';
import OAuthButton from '@/app/components/OAuthButton';

export interface ActionModalListProps {
    app: ServiceInfo | null;
    setModalNextState: () => void;
    setSelectedArea: React.Dispatch<React.SetStateAction<AReaInfo | null>>;
    handleClose: () => void;
    state: modalState;
}

interface SmallOAuthContainerProps {
    serviceId: string;
    updateMe: () => void;
}

export const SmallOAuthContainer = ({ serviceId, updateMe } : SmallOAuthContainerProps)  => {
    const api = new API(process.env.NEXT_PUBLIC_API_URL!);
    const [services, setServices] = React.useState<OauthInfo[] | null>(null);
    const [service, setService] = React.useState<OauthInfo | null>(null);

    useEffect(() => {
        if (services) return;
        api.oauth.getAll().then((res) => setServices(res));
    }, [])

    useEffect(() => {
        if (!services) return;
        const found = services.find((serviceEl) => serviceEl.id === serviceId);
        if (found) setService(found);
    }, [services])

    if (!service) return null;

    return (
        <div className='h-1/2 w-full m-0 flex gap-4 flex-col justify-center items-center'>
            <p className='text-center text-3xl w-2/4 font-semibold m-0'>
                To use this service, your first need to login to {service.id[0].toUpperCase().concat(service.id.slice(1))}
            </p>
            <div className={'py-4 flex h-1/2 flex-col justify-between gap-4 items-center rounded'}>
                <img src={service.imageURL} className='h-full' data-testid="oauth-service-image" />
                <OAuthButton connected={false} serviceId={serviceId} blank />
                <button onClick={() => updateMe()} className='text-blue-500 underline'>I&apos;ve just logged myself in</button>
            </div>
        </div>
    )
};

export default function ActionModalList({
    app,
    setSelectedArea,
    handleClose,
    setModalNextState,
    state,
}: ActionModalListProps) {
    const [service, setService] = React.useState<DetailedService | null>(null);
    const [areaList, setAreaList] = React.useState<AReaInfo[]>([]);
    const cookiesStore = useCookies();
    const [authenticated, setAuthenticated] = React.useState(!app?.oauthId);
    const [isLoading, setIsLoading] = React.useState(true);
    const accessToken = cookiesStore.get('accessToken')!;
    const api = new API(process.env.NEXT_PUBLIC_API_URL!);
    const [me, setMe] = React.useState<getMeResponse | null>(null);
    
    if (!app) return null;

    const updateMe = () => {
        api.users.getMe(accessToken).then(({body}) => {
            setMe(body)
        }).finally(() => setIsLoading(false))
    }

    useEffect(() => {
        if (authenticated) return;
        updateMe()
    }, [])

    useEffect(() => {
        if (!app.oauthId || !me) return;
        if (me.Oauth[app.oauthId]) {
            setAuthenticated(true);
        }
    }, [me])

    useEffect(() => {
        if (!app || service !== null || !authenticated) return;
        api.services.getById(app.id, accessToken).then((res) => {
            setService(res.body)
            setIsLoading(false);
        })
    }, [authenticated])

    useEffect(() => {
        if (!service) return;
        if (state === modalState.ACTION_CHOOSE_ACTION)
            setAreaList(service.actions)
        else 
            setAreaList(service.reactions)
    }, [service])

    const ActionPerApp = ({ value }: { value: AReaInfo }) => (
        <button
            className="w-full h-[60px] flex items-center justify-center text-xl"
            onClick={() => {
                setSelectedArea(value)
                setModalNextState()
            }}
            data-testid={`action-${value.id}`} // Ajout de test ID pour chaque action
        >
            <p>{value.name}</p>
        </button>
    )

    if (isLoading)
        return (
        <div className={'w-full h-full flex flex-col items-center justify-center'}>
            <p data-testid="loading-text">Loading...</p>
        </div>
        )

    if (!authenticated && app.oauthId)
        return (
        <div className={'w-full h-full flex flex-col items-center justify-center'}>
            <SmallOAuthContainer serviceId={app.oauthId} updateMe={updateMe} />
        </div>
        )

    return (
    <div className={'w-full h-full flex flex-col items-center justify-center'}>
        <div className={'w-10 h-10 absolute top-10 right-5'}>
            <button onClick={handleClose} className="w-3 h-3 flex justify-center items-center" data-testid="close-button">
                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
            </button>
        </div>
        <div className={'w-auto h-1/5 flex justify-start items-center'} data-testid="app-image">
            <img src={app.imageURL} alt={app.id} className={'w-[110px] h-auto'} />
        </div>
        <div className={'w-full h-1/2 text-center overflow-y-auto z-20 scrollbar-track-rounded-full scrollbar-thumb-gray-800/50 scrollbar-track-transparent custom-scrollbar mb-10'} data-testid="action-list">
            {areaList.map((e) => <ActionPerApp key={e.id} value={e} />)}
        </div>
    </div>
);
}
