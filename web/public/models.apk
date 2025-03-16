/*
** EPITECH PROJECT, 2024
** AREA
** File description:
** schema
*/


import { pgTable, serial, text, varchar, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('user', {
    id: serial('id').primaryKey(),
    username: varchar('username').unique().notNull(),
    email: varchar('email').unique().notNull(),
    authType: varchar('auth_type').notNull().default('local'),
});

export const userSession = pgTable('session', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id).notNull(),
    token: varchar('token').unique().notNull(),
});

export const sessionRelation = relations(userSession, ({ one }) => ({
    user: one(users, { fields: [userSession.userId], references: [users.id] }),
}));

export const authLocal = pgTable('auth_local', {
    id: serial('id').primaryKey(),
    password: text('password').notNull(),
    userId: integer('user_id').references(() => users.id),
});

export const authServices = pgTable('auth_services', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id).notNull(),
    accessToken: text('access_token').notNull(),
    refreshToken: text('refresh_token').notNull(),
    expiresAt: text('expires_at').notNull(),
    scope: text('scope').notNull(),
    service: text('service').notNull()
});

export const authServiceRelation = relations(authServices, ({ one }) => ({
    user: one(users, { fields: [authServices.userId], references: [users.id] }),
}));

export const authLocalRelation = relations(authLocal, ({ one }) => ({
    user: one(users, { fields: [authLocal.userId], references: [users.id] }),
}));

export const userRelation = relations(users, ({ many, one }) => ({
    googleAuth: one(authServices, { fields: [users.id], references: [authServices.userId] }),
    localAuth: one(authLocal, { fields: [users.id], references: [authLocal.userId] }),
    sessions: many(userSession),
}));

export const areaModel = pgTable('area', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id).notNull(),
    active: varchar('active').notNull().default('true'),
    reactionId: integer('reaction_id').notNull(),
    actionId: integer('action_id').notNull(),
    actionTypeId: varchar('action_service_id').notNull(),
    reactionTypeId: varchar('reaction_service_id').notNull(),
    actionServiceId: varchar('action_service').notNull(),
    reactionServiceId: varchar('reaction_service').notNull(),
});

export const areaRelation = relations(areaModel, ({ one }) => ({
    user: one(users, { fields: [areaModel.userId], references: [users.id] }),
}));
