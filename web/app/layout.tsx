import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { GeistSans } from 'geist/font/sans';
import { CookiesProvider } from "next-client-cookies/server";
import { GoogleOAuthProvider } from "@react-oauth/google";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(process.cwd(), "../.env")
});

export const metadata: Metadata = {
    title: 'AREA',
    description: 'By US',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <CookiesProvider>
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
            <html lang="en">
                <body className={`${GeistSans.className} antialiased`}>{children}</body>
            </html>
        </GoogleOAuthProvider>

        </CookiesProvider>

    )
}
