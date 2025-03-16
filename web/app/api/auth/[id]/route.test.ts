/**
 * @jest-environment node
 */
 /* eslint-disable */

import { testApiHandler } from "next-test-api-route-handler";
import client from '@shared/database';
import { authServices, users } from '@shared/models';
import { eq } from 'drizzle-orm';
import { Oauth } from "@shared/services/types";
import { NewAuthServices } from "@shared/types";
import * as appHandler from "./route";

interface StateData {
    userId: number;
    service: string;
    redirectURL: string;
}

interface AccessTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}

jest.mock('@shared/database/OAuthRepository', () => ({
    __esModule: true,
    default: {
        createState: jest.fn().mockResolvedValue(Promise.resolve("state123")),
        getState: jest.fn().mockImplementation(async (state: string) => {
            const db = await client();
            const user = (await db.select().from(users).where(eq(users.email, "area1@area.com")).execute())[0];
            await db.$client.release();
            if (state !== "state123") {
                return null;
            }
            return { userId: user.id, service: "oauth1", redirectURL: "http://localhost:8080", } as StateData;
        }),
        create: async (auth: NewAuthServices) => {
            const db = await client();
            const res = await db.insert(authServices).values(auth).returning().execute();
            return res[0];
        }
    }
}));

jest.mock('@shared/Oauth', () => ({
    __esModule: true,
    default: [
        { 
            id: 'oauth1',
            imageURL: 'image1.png',
            generateOauth(state) {
                return `http://localhost:8080/api/authorize?state=${state}`;
            },
            getAccessToken(code) {
                return Promise.resolve({
                    access_token: "access_token",
                    expires_in: 3600,
                    refresh_token: "refresh_token",
                    scope: "scope",
                    token_type: "bearer",
                } as AccessTokenResponse);
            },
        },
        {
            id: 'oauth2',
            imageURL: 'image2.png',
            generateOauth(state) {
                return `http://localhost:8080/api/authorize?state=${state}`;
            }
        }
        
    ] as Oauth[]
}));

describe('/api/auth/generate/[id]', () => {
    describe('GET', () => {
        beforeAll(async () => {
            const db = await client();
            const user = await db.select().from(users).where(eq(users.email, "area1@area.com")).execute();
            if (user.length > 0) {
                await db.$client.release();
                return;
            }
            await db.insert(users).values({
                email: "area1@area.com",
                authType: "local",
                username: "area1",
            }).execute();
            await db.$client.release();
        });

        afterAll(async () => {
            const db = await client();
            const userId = (await db.select().from(users).where(eq(users.email, "area1@area.com")).execute())[0].id;
            await db.delete(authServices).where(eq(authServices.userId, userId)).execute();
            await db.delete(users).where(eq(users.email, "area1@area.com")).execute();
            await db.$client.release();
        });

        it('Should return a 400 error if no code is provided', async () => {
            await testApiHandler({
                appHandler,
                params: {
                    state: "state123",
                    id: "oauth1",
                },
                url: "/api/auth/generate/oauth1?state=state123",
                test: async ({ fetch }) => {
                    const res = await fetch({
                        method: 'GET',
                    });
                    const body = await res.json();
                    expect(res.status).toEqual(400);
                    expect(body).toEqual({
                        error: 'Invalid code or state',
                    });
                },
            });
        });

        it('Should return a 400 error if no state is provided', async () => {
            await testApiHandler({
                appHandler,
                params: {
                    code: "code123",
                    id: "oauth1",
                },
                url: "/api/auth/generate/oauth1?code=code123",
                test: async ({ fetch }) => {
                    const res = await fetch({
                        method: 'GET',
                    });
                    const body = await res.json();
                    expect(res.status).toEqual(400);
                    expect(body).toEqual({
                        error: 'Invalid code or state',
                    });
                },
            });
        });

        it('Should return a 400 error if the service is not found', async () => {
            await testApiHandler({
                appHandler,
                params: {
                    id: "oauth_wrong",
                },
                url: "/api/auth/generate/oauth_wrong?code=code123&state=state123",
                test: async ({ fetch }) => {
                    const res = await fetch({
                        method: 'GET',
                    });
                    const body = await res.json();
                    expect(res.status).toEqual(400);
                    expect(body).toEqual({
                        error: 'Invalid code or state',
                    });
                },
            });
        });

        it ("sshould return a 400 error if the state is invalid", async () => {
            await testApiHandler({
                appHandler,
                params: {
                    id: "oauth1",
                },
                url: "/api/auth/generate/oauth1?code=code123&state=invalidState",
                test: async ({ fetch }) => {
                    const res = await fetch({
                        method: 'GET',
                    });
                    expect(res.status).toEqual(400);
                },
            });
        });

        it("should return 400 if the state doesnt match the service", async () => {
            await testApiHandler({
                appHandler,
                params: {
                    id: "oauth2",
                },
                url: "/api/auth/generate/oauth2?code=code123&state=state123",
                test: async ({ fetch }) => {
                    const res = await fetch({
                        method: 'GET',
                    });
                    const body = await res.json();
                    expect(res.status).toEqual(400);
                    expect(body).toEqual({
                        error: 'Invalid state',
                    });
                },
            });
        });

        it("should return 302 if the state matches the service", async () => {
            await testApiHandler({
                appHandler,
                params: {
                    id: "oauth1",
                },
                url: "/api/auth/generate/oauth1?code=code123&state=state123",
                test: async ({ fetch }) => {
                    const res = await fetch({
                        method: 'GET',
                    });
                    // check if i have been redirected to http://localhost:8080
                    expect(res.headers.get('Location')).toEqual("http://localhost:8080/");
                    expect(res.status).toEqual(307);
                },
            });
        });
    });


});