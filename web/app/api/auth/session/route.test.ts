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

jest.mock('@shared/database/SessionRepository', () => ({
    __esModule: true,
    default: {
        create: jest.fn().mockResolvedValue(Promise.resolve("new_token")),
        getAttachedUser: jest.fn().mockImplementation(async (token: string) => {
            if (token !== "good-token") {
                return null;
            }
            const db = await client();
            const user = await db.select().from(users).where(eq(users.email, "area4@area.com")).execute();
            await db.$client.release();
            return user[0];
        }),
    },
}));

describe('/api/auth/session', () => {
    describe('GET', () => {

        beforeAll(async () => {
            const db = await client();
            const user = db.insert(users).values({
                email: "area4@area.com",
                authType: "local",
                username: "area4",
            }).execute();
            await db.$client.release();
        });

        afterAll(async () => {
            const db = await client();
            await db.delete(users).where(eq(users.email, "area4@area.com")).execute();
            await db.$client.release();
        });

        it('should return 401 if no token', async () => {
            const response = await testApiHandler({
                appHandler,
                test: async ({ fetch }) => {
                    const response = await fetch({
                        method: 'GET',
                        headers: {},
                    });
                    expect(response.status).toBe(401);
                }
            });
        });

        it('should return 401 if no session', async () => {
            const response = await testApiHandler({
                appHandler,
                test: async ({ fetch }) => {
                    const response = await fetch({
                        method: 'GET',
                        headers: {
                            "Authorization": "Bearer bad-token"
                        }
                    });
                    expect(response.status).toBe(401);
                }    
            });
        });

        it('should return 200 if session', async () => {
            await testApiHandler({
                appHandler,
                test: async ({ fetch }) => {
                    const response = await fetch({
                        method: 'GET',
                        headers: {
                            "Authorization": "bearer good-token"
                        }
                    });
                    expect(response.status).toBe(200);
                }
            });
        });
    });
});