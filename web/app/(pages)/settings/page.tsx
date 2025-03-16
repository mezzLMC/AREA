import React from 'react'
import { cookies } from 'next/headers'
import { CookiesProvider } from 'next-client-cookies/server'
import API, { getMeResponse } from '@shared/Api'
import { RoseGlow, VioletGlow } from '@/app/components/bgGlow'
import Menu from '@/app/components/menu'
import OAuthContainer from './OAuthContainer'
import Wrapper from '@/app/components/wrapper'

// interface MeResponse {
//     id: number;
//     email: string;
//     username: string;
// }

const Settings = async () => {

    const cookiesStore = cookies();
    const accessToken = cookiesStore.get('accessToken')!.value;
    const api = new API(process.env.NEXT_PUBLIC_API_URL!);
    const { body, status } = await api.users.getMe(accessToken);
    if (status !== 200) return null;
    const me = body;

    return (<div className={`w-full h-screen flex flex-col items-center justify-center`}>
        <div className={'w-1/4 h-5/6 flex flex-col justify-start items-center'}>
            <div className={'w-auto h-1/3 flex flex-col items-center justify-center'}>
                <div className={'w-[160px] h-[160px] bg-black rounded-3xl'}></div>
                <h1 className={'text-4xl font-bold mt-5'}>{me.username}</h1>
                <h2 className={'text-xl mt-2 text-gray-300'}>{me.email}</h2>
            </div>
            <div className={'w-full h-2/3 flex flex-col justify-center items-center'}>
                <Wrapper line={true}>
                    <div className='w-full h-full flex flex-col gap-4 pt-4'>
                        {Object.keys(me.Oauth).map((service) => {
                            const oauthService = service as keyof getMeResponse['Oauth'];
                            return <OAuthContainer disabled={me.authType === service} key={service} serviceId={service} identifier={me.Oauth[oauthService]} />;
                        })}
                    </div>
                </Wrapper>
            </div>
        </div>
    </div>)
}

export default async function SettingsPage() {
    return (
        <CookiesProvider>
            <main>
                <VioletGlow />
                <RoseGlow />
                <Menu />
                <div className="w-full h-full justify-end items-center flex flex-col">
                    <RoseGlow />
                    <VioletGlow />
                    <Settings />
                </div>
            </main>
        </CookiesProvider>
    )
}
