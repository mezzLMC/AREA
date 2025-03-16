/*
** EPITECH PROJECT, 2024
** area
** File description:
** twitch
*/

import { users } from "@shared/models";
import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const followedBroadcastModel = pgTable("followed_broadcasters_trigger", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id).notNull(),
});

export const someoneFollowedMeModel = pgTable("someone_followed_me", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id).notNull(),
});

export const someoneSubsToMeModel = pgTable("someone_subs_to_me", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id).notNull(),
});

export const followedBroadcastModelRelation = relations(followedBroadcastModel, ({ one }) => ({
    user: one(users, { fields: [followedBroadcastModel.userId], references: [users.id] }),
}));

export const someoneFollowedMeModelRelation = relations(someoneFollowedMeModel, ({ one }) => ({
    user: one(users, { fields: [someoneFollowedMeModel.userId], references: [users.id] }),
}));


export const AppAccessTokenModel = pgTable("app_access_token", {
    id: serial("id").primaryKey(),
    access_token: varchar("access_token").notNull(),
    expires_at: varchar("expires_at").notNull(),
});
