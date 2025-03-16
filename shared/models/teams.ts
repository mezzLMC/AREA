/*
** EPITECH PROJECT, 2024
** area
** File description:
** teams
*/

import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { users } from "@shared/models";

export const teamsOnMessageModel = pgTable("on_teams_message", {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull(),
    chatId: varchar('chat_id').notNull(),
});

export const teamsOnTeamPostModel = pgTable("on_teams_team_post", {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull(),
    teamId: varchar('team_id').notNull(),
});

export const teamsOnMessageRelation = relations(teamsOnMessageModel, ({ one }) => ({
    user: one(users, { fields: [teamsOnMessageModel.userId], references: [users.id] }),
}));

export const teamsOnTeamPostRelation = relations(teamsOnTeamPostModel, ({ one }) => ({
    user: one(users, { fields: [teamsOnTeamPostModel.userId], references: [users.id] }),
}));
