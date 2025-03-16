/*
 ** EPITECH PROJECT, 2024
 ** area
 ** File description:
 ** validators
 */

import { users } from '@shared/models';
import { eq } from 'drizzle-orm';
import { z } from "zod";
import UserRepository from '@shared/database/UserRepository';

export const registerUserValidator = z.object({
    email: z
        .string()
        .email()
        .refine(
            async (email) => {
                const res = await UserRepository.findOne(eq(users.email, email));
                return !res;
            },
            { message: 'email already exists' }
        ),
    username: z
        .string()
        .min(3, { message: 'Username must contain at least 3 characters' })
        .refine(
            async (username) => {
                const res = await UserRepository.findOne(eq(users.username, username));
                return !res;
            },
            { message: 'Username already exists' }
        ),
    password: z.string().min(8, { message: 'Password must contain at least 8 characters' })
})

const codeBasedBody = z.object({
    code: z.string()
})

export const updateUserValidator = z.object({
    username: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
});

export const loginBody = z.object({
    email: z.string().email()
    .superRefine(async (email, ctx) => {
        const res = await UserRepository.findOne(eq(users.email, email));
        if (res === null) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'No user found with this email!',
                fatal: true,
            });
            return;
        }
        if (res.authType !== 'local') {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'This user have been registered with google, please use google login!',
            });
        }

    }),
    password: z.string(),
});


export const googleAuthBodyValidator = codeBasedBody;
