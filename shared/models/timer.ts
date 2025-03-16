/*
** EPITECH PROJECT, 2024
** area
** File description:
** timer
*/

import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { users } from "@shared/models";

export const dailyModel = pgTable("daily_trigger", {
    id: serial('id').primaryKey(),
    time: varchar('time').notNull(),
    userId: integer('user_id').notNull(),
});

export const singleDateModel = pgTable("single_date_trigger", {
    id: serial('id').primaryKey(),
    date: varchar('date').notNull(),
    userId: integer('user_id').notNull(),
});

export const dailyTriggerRealtion = relations(dailyModel, ({ one }) => ({
    user: one(users, { fields: [dailyModel.userId], references: [users.id] }),
}));

export const singleDateTriggerRelation = relations(singleDateModel, ({ one }) => ({
    user: one(users, { fields: [singleDateModel.userId], references: [users.id] }),
}));
