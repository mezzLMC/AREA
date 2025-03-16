/*
** EPITECH PROJECT, 2024
** api
** File description:
** types
*/

import { Field } from "@shared/types";

interface AccessTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}

export interface Oauth {
    id: string;
    generateOauth: (state: string) => string;
    getAccessToken: (code: string) => Promise<AccessTokenResponse>;
    refreshAccessToken: (refreshToken: string) => Promise<AccessTokenResponse>;
    getIdentifier: (accessToken: string) => Promise<string>;
    revoke: (accessToken: string) => Promise<void>;
    imageURL: string;
}

export type Enricher = <T extends Record<string, string>>(fields: T) => T;

export interface Reaction {
    id: string;
    name: string;
    description: string;
    fields: Field[];
    add: (userId: number, fields: Record<string, string>) => Promise<number>;
    trigger: (triggerId: number, enrich: Enricher) => Promise<void>;
}

export interface Enrichment {
    id: string;
    name: string;
    description: string;
}

export interface Action {
    id: string;
    name: string;
    description: string;
    generateFields: (userId: number) => Promise<Field[]>;
    add: (userId: number, fields: Record<string, string>) => Promise<number>;
    poll: () => Promise<void>;
    setup: () => Promise<void>;
    enrichments: Enrichment[];
    webhook: (id: number, req: Request) => Promise<Response>;
}

export interface Service {
    id: string;
    name: string;
    description: string;
    actions: Action[];
    reactions: Reaction[];
    imageURL: string;
    oauthId?: string;
    setup: () => Promise<void>;
}

export interface TriggerInfo {
    action: string;
    id: number;
    enrichments?: Record<string, string>;
};

export abstract class AService {
    abstract description: string;

    abstract id: string;

    abstract name: string;

    abstract reactions: Reaction[];

    abstract actions: Action[];

    abstract imageURL: string;
}
