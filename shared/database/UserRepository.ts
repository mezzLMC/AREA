/* eslint-disable class-methods-use-this */
/*
** EPITECH PROJECT, 2024
** area
** File description:
** UserRepository
*/

import { users } from "@shared/models";
import { DatabaseRepository, User, NewUser, Where } from "@shared/types";
import { eq } from "drizzle-orm";
import client from "@shared/database";

interface UserRepositoryType extends DatabaseRepository<User, NewUser> {
    model: typeof users;
}

class UserRepository implements UserRepositoryType { 

    model = users;

    create = async (user: NewUser) => {
        const db = await client();
        const res = await db.insert(users).values(user).returning().execute();
        await db.$client.release();
        return res[0];
    }

    getById = async (id: number) => {
        const db = await client();
        const res: User[] = await db.select().from(users).where(eq(users.id, id)).execute();
        await db.$client.release();
        return res[0];
    }

    getAll = async () => {
        const db = await client();
        return db.select().from(users).execute().finally(() => db.$client.release());
    }

    update = async (id: number, user: Partial<User>) => {
        const db = await client();
        db.update(users).set(user).where(eq(users.id, id)).execute();
        await db.$client.release();
    }

    delete = async (id: number) => {
        const db = await client();
        await db.delete(users).where(eq(users.id, id)).execute();
        await db.$client.release();
    }

    findOne = async (condition: Where) => {
        const db = await client();
        const res: User[] = await db.select().from(users).where(condition).execute();
        await db.$client.release();
        return res[0] || null;
    }

    findMany = async (condition: Where) => {
        const db = await client();
        return db.select().from(users).where(condition).execute().finally(() => db.$client.release());
    }
}

export default new UserRepository();
