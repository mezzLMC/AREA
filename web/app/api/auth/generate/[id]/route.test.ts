/**
 * @jest-environment node
 */
/* eslint-disable */

import * as appHandler from './route';
import { testApiHandler } from "next-test-api-route-handler";
import client from '@shared/database';
import {users} from '@shared/models';
import { eq } from 'drizzle-orm';
import { Oauth } from '@shared/services/types'

jest.mock('@shared/database/OAuthRepository', () => ({
    __esModule: true,
    default: {
        createState: jest.fn().mockResolvedValue(Promise.resolve("state123")),
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
        } as Oauth
    ]
}));

jest.mock('@shared/database/SessionRepository', () => ({
    __esModule: true,
    default: {
        create: jest.fn().mockResolvedValue(Promise.resolve("new_token")),
        getAttachedUser: jest.fn().mockImplementation(async (token: string) => {
            if (token !== "good-token") {
                return null;
            }
            const db = await client();
            const user = await db.select().from(users).where(eq(users.email, "area2@area.com")).execute();
            await db.$client.release();
            return user[0];
        }),
    },
}));

describe('/api/auth/generate/[id]', () => {
    describe('POST', () => {

        beforeAll(async () => {
            const db = await client();
            const user = db.insert(users).values({
                email: "area2@area.com",
                authType: "local",
                username: "area2",
            }).execute();
            await db.$client.release();
        });

        afterAll(async () => {
            const db = await client();
            await db.delete(users).where(eq(users.email, "area2@area.com")).execute();
            await db.$client.release();
        });

        it("should return 200 with the OAuth URL when passing a redirectURL", async () => {
            await testApiHandler({
                appHandler,
                params: { id: 'oauth1' },
                test: async ({ fetch }) => {
                    const response = await fetch({ 
                        method: "POST",
                        headers: { Authorization: "Bearer good-token" },
                        body: JSON.stringify({ redirectURL: "http://localhost:8080" }),
                    });
                    expect(response.status).toBe(200);
                    const body = await response.json();
                    expect(body.url).toBe("http://localhost:8080/api/authorize?state=state123");
                },
            });
        });

        it("should return 200 with the OAuth URL when passing no redirect URL", async () => {
            await testApiHandler({
                appHandler,
                params: { id: 'oauth1' },
                test: async ({ fetch }) => {
                    const response = await fetch({ 
                        method: "POST",
                        headers: { Authorization: "Bearer good-token" },
                        body: JSON.stringify({ redirectURL: undefined }),
                    });
                    expect(response.status).toBe(200);
                    const body = await response.json();
                    expect(body.url).toBe("http://localhost:8080/api/authorize?state=state123");
                },
            });
        });

        it("should return 404 when the OAuth service is not found", async () => {
            await testApiHandler({
                appHandler,
                params: { id: 'oauth2' },
                test: async ({ fetch }) => {
                    const response = await fetch({ 
                        method: "POST",
                        headers: { Authorization: "Bearer good-token" },
                        body: JSON.stringify({ redirectURL: "http://localhost:8080" }),
                    });
                    expect(response.status).toBe(404);
                    const body = await response.json();
                    expect(body.error).toBe("Service not found");
                },
            });
        });

        it("should return 401 when the token is missing", async () => {
            await testApiHandler({
                appHandler,
                params: { id: 'oauth1' },
                test: async ({ fetch }) => {
                    const response = await fetch({ 
                        method: "POST",
                        body: JSON.stringify({ redirectURL: "http://localhost:8080" }),
                    });
                    expect(response.status).toBe(401);
                    const body = await response.json();
                    expect(body.error).toBe("Unauthorized");
                },
            });
        });
    });
});

