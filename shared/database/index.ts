/*
** EPITECH PROJECT, 2024
** area
** File description:
** client
*/

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool, Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config({
    path: "../.env"
});

const config = {
    database: process.env.NODE_ENV === 'test' ? process.env.POSTGRES_TEST_DB : process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST
};

export const pool = new Pool(config);
export const client = new Client(config);
export default async () => {
    const poolConnection = await pool.connect();
    return drizzle(poolConnection);
};
