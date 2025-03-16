'use client'

import React, { useState, useEffect } from 'react'
import { useCookies } from 'next-client-cookies'
import API from '@shared/Api'
import { RoseGlow, VioletGlow } from '@/app/components/bgGlow'
import LoginButtons from '@/app/components/buttons/login'
import { ConnectButtons } from '@/app/components/buttons/classicButtons'
import { LoginModal, RegisterModal } from '@/app/components/connectionModals'

export default function Home() {
    const [showNewButtons, setShowNewButtons] = useState(false)
    const [register, setRegister] = useState(false)
    const [showRegisterButtons, setShowRegisterButtons] = useState(false)
    const [shown, setShown] = useState(false)
    const cookies = useCookies();

    const handleLoginPress = () => {
        setShowNewButtons(true)
        setRegister(false)
        setShowRegisterButtons(false)
    }

    const handleRegisterPress = () => {
        setShowRegisterButtons(true)
        setShowNewButtons(false)
        setRegister(true)
    }

    const BHolder = ({ children }: { children: React.ReactNode }) => <div className={`transition-opacity h-full flex duration-500 ${shown ? 'opacity-0' : 'opacity-100'}`}>{children}</div>

    useEffect(() => {
        (async () => {
            const api = new API(process.env.NEXT_PUBLIC_API_URL!);
            const token = cookies.get('accessToken');
            if (!token) return;
            if (await api.isTokenValid(token)) {
                window.location.href = '/dashboard';
            }
        })()
    }, [cookies])

    return (
        <main data-testid="home-page">
            <div className={'w-full h-1/2 justify-end items-center z-[-1] flex flex-col'}>
                <h1 className={`font-bold text-9xl pb-10`}>AREA</h1>
            </div>
            {register ? <RegisterModal shown={shown} data-testid="register-modal" /> : <LoginModal shown={shown} data-testid="login-modal" />}
            <RoseGlow />
            <VioletGlow />
            <div className={'w-full h-1/2 flex justify-center items-start relative'} id="zebi">
                {showNewButtons && (
                    <BHolder>
                        <LoginButtons setShown={setShown} data-testid="login-buttons" />
                    </BHolder>
                )}
                {!showNewButtons && showRegisterButtons && (
                    <BHolder>
                        <LoginButtons setShown={setShown} data-testid="login-buttons" />
                    </BHolder>
                )}
                {!showNewButtons && !showRegisterButtons && (
                    <BHolder>
                        <ConnectButtons onLoginPress={handleLoginPress} onSignUpPress={handleRegisterPress} data-testid="connect-buttons" />
                    </BHolder>
                )}
                <p className="text-gray-500 z-[-1] text-xl absolute bottom-10 text-center w-[400px]">
                    By connecting, you agree to our Terms of Use. Learn how we collect, use, and share your data.
                </p>
            </div>
            <img src={'/images/Image.png'} alt={'bubbles'} className={'absolute top-0 left-0 rotate-190 animate-bounce-decayed-custom'}></img>
            <img src={'/images/Image.png'} alt={'bubbles'} className={'absolute rotate-190 right-[-80px] bottom-[-80px] animate-bounce-custom'} style={{ transform: 'rotate(45deg)' }}></img>
        </main>
    )
}
