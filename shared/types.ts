/*
** EPITECH PROJECT, 2024
** area
** File description:
** types
*/

import { SQL } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { PoolClient } from "pg";
import * as Schema from "./models";
import { Enrichment } from "./services/types";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Where = SQL<unknown> | ((aliases: any) => SQL | undefined) | undefined; 
export type Database = NodePgDatabase<Record<string, never>> & {
    $client: PoolClient;
}

export interface DatabaseRepository<Type, InsertType> {
    create(user: InsertType): Promise<Type>;
    getById(id: number): Promise<Type | null>;
    getAll(): Promise<Type[]>;
    update(id: number, user: Partial<Type>): Promise<void>;
    delete(id: number): Promise<void>;
    findOne(condition: Where): Promise<Type | null>;
    findMany(condition: Where): Promise<Type[]>;
}

export interface SelectField {
    name: string;
    values: string[];
}

export type FieldTypes = "hour" | "date" | "text_field" | "select_field";

export interface SelectFieldValue {
    name: string;
    value: string;
}

export interface Field {
    name: string;
    id: string;
    type: FieldTypes;
    values?: SelectFieldValue[];
}

export interface AReaInfo {
    id: string;
    name: string;
    description: string;
    fields: Field[];
    enrichments: Enrichment[];
}

export interface ServiceInfo {
    id: string;
    name: string;
    description: string;
    imageURL: string;
    actionCount: number;
    reactionCount: number;
    oauthId?: string;
}

export interface DetailedService {
    id: string;
    name: string;
    description: string;
    imageURL: string;
    actions: AReaInfo[];
    reactions: AReaInfo[];
}

export interface OauthInfo {
    id: string;
    imageURL: string;
}

export type Session = typeof Schema.userSession.$inferSelect;
export type NewSession = typeof Schema.userSession.$inferInsert;
export type User = typeof Schema.users.$inferSelect;
export type NewUser = typeof Schema.users.$inferInsert;
export type AuthLocal = typeof Schema.authLocal.$inferSelect;
export type NewAuthLocal = typeof Schema.authLocal.$inferInsert;
export type AuthServices = typeof Schema.authServices.$inferSelect;
export type NewAuthServices = typeof Schema.authServices.$inferInsert;
