"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Wrapper from './wrapper';

const NavLink = ({ children, href }: { children: string; href: string }) => (
    <div className={'h-full flex justify-end items-center p-1'}>
        <a href={href} className={'h-full flex justify-end items-center p-5 text-xl z-20'}>
            {children}
        </a>
    </div>
);

export default function Menu() {
    const pathname = usePathname();

    const backToMenu = () => {
        if (pathname !== '/dashboard') {
            window.location.href = '/dashboard';
        }
    };

    return (
        <div className={'w-full h-24 z-50 mt-3 absolute flex justify-center items-center px-4'} data-testid="menu">
            <Wrapper line={false}>
                <button onClick={backToMenu} className="h-full text-7xl font-bold text-white flex justify-center items-center pl-2" data-testid="back-to-menu-button">
                    AREA
                </button>
                <div className={'h-full w-full flex items-center justify-end mr-5'} data-testid="nav-links">
                    <NavLink href="/dashboard" data-testid="nav-link-dashboard">Home</NavLink>
                    <NavLink href="/applications" data-testid="nav-link-applications">Applications</NavLink>
                    <NavLink href="/settings" data-testid="nav-link-settings">Settings</NavLink>
                    <img src={'/images/persona.jpg'} className={'h-20 w-20 rounded-2xl'} alt={'persona'} data-testid="user-avatar" />
                </div>
            </Wrapper>
        </div>
    );
}
