/*
** EPITECH PROJECT, 2024
** area
** File description:
** discord
*/

import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const webHookReactionModel = pgTable("webhook_reaction", {
    id: serial('id').primaryKey(),
    webhookUrl: varchar('webhook_url').notNull(),
    content: varchar('content').notNull(),
});
