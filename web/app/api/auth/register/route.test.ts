/**
 * @jest-environment node
 */
/* eslint-disable */

import * as appHandler from './route';
import { testApiHandler } from "next-test-api-route-handler";
import client from '@shared/database';
import { users, authLocal } from '@shared/models';
import { eq } from 'drizzle-orm';

describe('/api/auth/register', () => {

    afterAll(async () => {
        const db = await client();
        const user = (await db.select().from(users).where(eq(users.email, "area3@area.com")).execute())[0];
        await db.delete(authLocal).where(eq(authLocal.userId, user.id)).execute();
        await db.delete(users).where(eq(users.id, user.id)).execute();
    });

    describe('POST', () => {
        it('should return 200 if user is created', async () => {
            const response = await testApiHandler({
                appHandler,
                test: async ({ fetch }) => {
                    const response = await fetch({
                        method: 'POST',
                        body: JSON.stringify({ username: 'test67200', password: 'test1234', email: "area3@area.com" }),
                    });
                    const body = await response.json();
                    expect(response.status).toBe(200);
                    expect(body.id).toBeDefined();
                    expect(body.token).toBeDefined();
                }
            });
        });

        it ('should return 400 if email is invalid', async () => {
            const response = await testApiHandler({
                appHandler,
                test: async ({ fetch }) => {
                    const response = await fetch({
                        method: 'POST',
                        body: JSON.stringify({ username: 'test67200', password: 'test1234', email: "area@area" }),
                    });
                    expect(response.status).toBe(400);
                }
            });
        });
 
        
    });
});