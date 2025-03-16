/* eslint-disable class-methods-use-this */
/*
** EPITECH PROJECT, 2024
** area
** File description:
** LocalAuthRepository
*/

import { DatabaseRepository } from "@shared/types";
import { authLocal } from "@shared/models";
import type { AuthLocal, NewAuthLocal, Where } from "@shared/types";
import { eq } from "drizzle-orm";
import client from "@shared/database";
import bcrypt from "bcrypt";

type LocalAuthRepositoryType = DatabaseRepository<AuthLocal, NewAuthLocal>

class LocalAuthRepository implements LocalAuthRepositoryType {

    model: typeof authLocal = authLocal;

    create = async (auth: NewAuthLocal) => {

        const {password} = auth;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newAuth = {...auth, password: hashedPassword};

        const db = await client();
        const res = await db.insert(authLocal).values(newAuth).returning().execute();
        await db.$client.release();
        return res[0];
    }

    getById = async (id: number) => {
        const db = await client();
        const res: AuthLocal[] = await db.select().from(authLocal).where(eq(authLocal.id, id)).execute();
        await db.$client.release();
        return res[0];
    }

    getAll = async () => {
        const db = await client();
        return db.select().from(authLocal).execute().finally(() => db.$client.release());
    }

    update = async (id: number, auth: Partial<AuthLocal>) => {
        const db = await client();
        await db.update(authLocal).set(auth).where(eq(authLocal.id, id)).execute();
        await db.$client.release();
    }

    delete = async (id: number) => {
        const db = await client();
        await db.delete(authLocal).where(eq(authLocal.id, id)).execute();
        await db.$client.release();
    }

    findOne = async (condition: Where) => {
        const db = await client();
        const res: AuthLocal[] = await db.select().from(authLocal).where(condition).execute();
        await db.$client.release();
        return res[0] || null;
    }

    findMany = async (condition: Where) => {
        const db = await client();
        return db.select().from(authLocal).where(condition).execute().finally(() => db.$client.release());
    }
};

export default new LocalAuthRepository();

