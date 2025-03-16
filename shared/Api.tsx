/*
** EPITECH PROJECT, 2024
** area
** File description:
** Api
*/

import { DetailedService, OauthInfo, ServiceInfo } from "./types";

export interface ValidationError {
    message: string;
    path: string[];
}

export interface Login {
    id: number;
    token: string;
}

export interface Register {
    userId: string
    username: string
    accessToken: string
}

export interface RegisterPayload {
    username: string
    email: string
    password: string
}

export interface FetchResponse<T> {
    status: number,
    body: T,
    error?: string | ValidationError[];
}

interface ServiceGetAllResponse {
    services: ServiceInfo[]
}

export interface getMeResponse {
    id: number;
    email: string;
    username: string;
    authType: string;
    Oauth: {
        [key: string]: string | null
    };
}

export interface AreaPayload {
    id: string;
    service: string;
    fields: Record<string, string>;
}

export interface HistoryArea {
    id: string;
    action: {
        image: string;
        name: string;
    };
    reaction: {
        image: string;
        name: string;
    };
}

interface OauthResponse {
    data: OauthInfo[]
}

class API {

    baseURL: string;

    constructor (baseURL: string) {
        this.baseURL = baseURL;
    }

    async fetch<T>(url: string, method: string, body?: object, accessToken?: string) {
        const response = await fetch(`${this.baseURL}${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(accessToken && { Authorization: `Bearer ${accessToken}` }) },
            body: body ? JSON.stringify(body) : undefined
        })

        const responseBody = await response.json();

        return {
            status: response.status,
            body: responseBody,
            error: responseBody.error
        } as FetchResponse<T>
    }

    get<T>(url: string, accessToken?: string) {
        return this.fetch<T>(url, 'GET', undefined, accessToken);
    }

    post<T>(url: string, body: object, accessToken?: string) {
        return this.fetch<T>(url, 'POST', body, accessToken);
    }

    put<T>(url: string, body: object, accessToken?: string) {
        return this.fetch<T>(url, 'PUT', body, accessToken);
    }

    async isTokenValid(accessToken: string) {
        const { status } = await this.get('/auth/session', accessToken);
        return status === 200;
    }

    oauth = {
        getAll: async () => (await this.get<OauthResponse>('/oauth')).body.data,
        generate: async (serviceId: string, redirectURL: string, accessToken: string) => {
            const { body } = await this.post<{ url: string }>(`/auth/generate/${serviceId}`, { redirectURL }, accessToken);
            return body.url;
        },
        disconnect: async (serviceId: string, accessToken: string) => {
            await this.post(`/auth/disconnect/${serviceId}`, {}, accessToken);
        }
    }

    auth = {
        login: (email: string, password: string): Promise<FetchResponse<Login>> => this.post<Login>('/auth/login', { email, password }),
        register: (registerData: RegisterPayload): Promise<FetchResponse<Login>> => this.post<Login>('/auth/register', registerData),
        loginWithGoogle: async (code: string): Promise<FetchResponse<Login>> => {
            const { body, error, status } = await this.post<Login>('/auth/login/google', { code });
            return { body, error, status };
        }
    }

    users = {
        getById: (id: string) => this.get(`/users/${id}`),
        getAll: () => this.get('/users'),
        getMe: (accessToken: string) => this.get<getMeResponse>('/users/me', accessToken),
        updateUser: (id: string, username: string, email: string, accessToken: string) => this.put(`/users/${id}`, { username, email }, accessToken)
    }

    services = {
        getById: (id: string, accessToken: string) => this.get<DetailedService>(`/services/${id}`, accessToken),
        getAll: (accessToken: string) => this.get<ServiceGetAllResponse>('/services', accessToken),
        sendService: (action: AreaPayload, reaction: AreaPayload, accessToken: string) =>  this.post("/services", {
                action,
                reaction
            }, accessToken),
        getMe: (accessToken: string) => this.get<HistoryArea[]>('/services/me', accessToken)
    }

}

export default API;
