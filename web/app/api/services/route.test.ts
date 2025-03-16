/**
 * @jest-environment node
 */
/* eslint-disable */

import { testApiHandler } from "next-test-api-route-handler";
import { Enricher, Reaction, Service } from "@shared/services/types";
import AreaAction from "@shared/services/AreaAction";
import services from "@shared/services";
import { Field } from "@shared/types";
import * as appHandler from './route';
import client from "@shared/database";
import { users, areaModel } from "@shared/models";
import { eq } from "drizzle-orm";

class UselessAction extends AreaAction {
    id: string;

    enrichments = [];

    name = "lalalal";

    description = "lalallalal";

    constructor(id: string) {
        super();
        this.id = id;
    }

    generateFields(userId: number) {
        return Promise.resolve([]);
    }

    add(userId: number, fields: Record<string, string>): Promise<number> {
        return Promise.resolve(1);
    }
}

class UselessReaction implements Reaction {
    id: string;

    enrichments = [];

    name = "lalalal";

    description = "lalallalal";

    constructor(id: string) {
        this.id = id;
    }

    generateFields(userId: number) {
        return Promise.resolve([]);
    }

    add(userId: number, fields: Record<string, string>): Promise<number> {
        return Promise.resolve(1);
    }

    fields = [] as Field[];

    trigger: (triggerId: number, enrich: Enricher) => Promise<void> = async () => {
        
    };
}

// Mock @shared/services after defining fakeServiceList
jest.mock('@shared/services', () => ({
    __esModule: true,
    default: [],
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
            const user = await db.select().from(users).where(eq(users.email, "area5@area.com")).execute();
            await db.$client.release();
            return user[0];
        }),
    }
}));

describe('/api/services', () => {

    describe("GET", () => {

        beforeAll(async () => {
            services.push({
                id: '1',
                name: 'service1',
                description: 'description1',
                imageURL: 'image1.png',
                reactions: [new UselessReaction("service1_action1"), new UselessReaction("service1_action2")],
                actions: [new UselessAction('service1_action1'), new UselessAction('service1_action2')],
                setup: () => Promise.resolve(),
            } as Service);
        });

        it('should return a list of all services with an id, name, description and imageURL', async () => {
            await testApiHandler({
                appHandler,
                test: async ({ fetch }) => {
                    const response = await fetch({ method: "GET" });
                    const body = await response.json();
                    expect(response.status).toBe(200);
                    expect(body).toEqual({
                        services: [
                            {
                                id: '1',
                                name: 'service1',
                                description: 'description1',
                                imageURL: 'image1.png',
                                actionCount: 2,
                                reactionCount: 2,
                                oauthId: undefined,
                            }
                        ]
                    });
                },
            });
        });
    });

    describe('POST', () => {
        beforeAll(async () => {
            const db = await client();
            const user = db.insert(users).values({
                email: "area5@area.com",
                authType: "local",
                username: "area5",
            }).execute();
            await db.$client.release();
    
            services.push({
                id: '1',
                name: 'service1',
                description: 'description1',
                imageURL: 'image1.png',
                reactions: [new UselessReaction("service1_action1"), new UselessReaction("service1_action2")],
                actions: [new UselessAction('service1_action1'), new UselessAction('service1_action2')],
                setup: () => Promise.resolve(),
            })
        });
    
        afterAll(async () => {
            const db = await client();
            const user = (await db.select().from(users).where(eq(users.email, "area5@area.com")).execute())[0];
            await db.delete(areaModel).where(eq(areaModel.userId, user.id)).execute();
            await db.delete(users).where(eq(users.id, user.id)).execute();
            await db.$client.release();
        });
    
        it('should return 401 when no Authorization header is available', async () => {
            await testApiHandler({
                appHandler,
                test: async ({ fetch }) => {
                    const response = await fetch({
                        method: "POST",
                        body: JSON.stringify({})
                    });
                    expect(response.status).toBe(401);
                },
            });
        });
    
        it('should return 401 when a wrong token is provided', async () => {
            await testApiHandler({
                appHandler,
                test: async ({ fetch }) => {
                    const response = await fetch({ 
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer wrong-token"
                        },
                        body: JSON.stringify({})
                    });
                    expect(response.status).toBe(401);
                },
            });
        });
    
        it('should return 404 when a wrong action service id is provided', async () => {
            await testApiHandler({
                appHandler,
                test: async ({ fetch }) => {
                    const response = await fetch({
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer good-token"
                        },
                        body: JSON.stringify({
                            action: {
                                id: '1',
                                service: "wrong-id",
                                fields: {
                                    field1: 'value1',
                                    field2: 'value2',
                                },
                            },
                            reaction: {
                                id: '2',
                                service: "1",
                                fields: {
                                    field1: 'value1',
                                    field2: 'value2',
                                },
                            },
                        })
                    });
                    const body = await response.json();
                    expect(response.status).toBe(404);
                    expect(body.message).toBe('Action service not found');
                },
            });
        });
    
        it('should return 404 when a wrong Reaction service id is provided', async () => {
            await testApiHandler({
                appHandler,
                test: async ({ fetch }) => {
                    const response = await fetch({
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer good-token"
                        },
                        body: JSON.stringify({
                            action: {
                                id: '1',
                                service: "1",
                                fields: {
                                    field1: 'value1',
                                    field2: 'value2',
                                },
                            },
                            reaction: {
                                id: '1',
                                service: "wrong-id",
                                fields: {
                                    field1: 'value1',
                                    field2: 'value2',
                                },
                            },
                        })
                    });
                    const body = await response.json();
                    expect(response.status).toBe(404);
                    expect(body.message).toBe('Reaction service not found');
                },
            });
        });
    
        it('should return 404 when a wrong action id is provided', async () => {
            await testApiHandler({
                appHandler,
                test: async ({ fetch }) => {
                    const response = await fetch({
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer good-token"
                        },
                        body: JSON.stringify({
                            action: {
                                id: '1',
                                service: "1",
                                fields: {
                                    field1: 'value1',
                                    field2: 'value2',
                                },
                            },
                            reaction: {
                                id: '1',
                                service: "1",
                                fields: {
                                    field1: 'value1',
                                    field2: 'value2',
                                },
                            },
                        })
                    });
                    const body = await response.json();
                    expect(response.status).toBe(404);
                    expect(body.message).toBe('Action not found');
                },
            });
        });
    
        it('should return 404 when a wrong reaction id is provided', async () => {
            await testApiHandler({
                appHandler,
                test: async ({ fetch }) => {
                    const response = await fetch({
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer good-token"
                        },
                        body: JSON.stringify({
                            action: {
                                id: 'service1_action1',
                                service: "1",
                                fields: {
                                    field1: 'value1',
                                    field2: 'value2',
                                },
                            },
                            reaction: {
                                service: "1",
                                id: 'service1_wrong_id',
                                fields: {
                                    field1: 'value1',
                                    field2: 'value2',
                                },
                            },
                        })
                    });
                    const body = await response.json();
                    expect(response.status).toBe(404);
                    expect(body.message).toBe('Reaction not found');
                },
            });
        });
    
        it ('should return 200 when a valid action and reaction are provided', async () => {
            await testApiHandler({
                appHandler,
                test: async ({ fetch }) => {
                    const response = await fetch({
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer good-token"
                        },
                        body: JSON.stringify({
                            action: {
                                id: 'service1_action1',
                                service: "1",
                                fields: {
                                    field1: 'value1',
                                    field2: 'value2',
                                },
                            },
                            reaction: {
                                id: 'service1_action1',
                                service: "1",
                                fields: {
                                    field1: 'value1',
                                    field2: 'value2',
                                },
                            },
                        })
                    });
                    expect(response.status).toBe(200);
                },
            });
        });
    });
});
