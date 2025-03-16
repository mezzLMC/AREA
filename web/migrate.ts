/*
** EPITECH PROJECT, 2024
** area
** File description:
** migration
*/

import { migrate } from "drizzle-orm/node-postgres/migrator"
import { drizzle } from "drizzle-orm/node-postgres";
import { client } from "@shared/database";
 
(async () => {
    await client.connect();
    const db = drizzle(client);
    await migrate(db, {
        migrationsFolder: "./migrations",
    })
    await client.end();
})()
