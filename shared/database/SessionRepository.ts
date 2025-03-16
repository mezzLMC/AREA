/*
** EPITECH PROJECT, 2024
** web
** File description:
** SessionRepository
*/

import { users } from '@shared/models';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import Redis from '@shared/Redis';
import UserRepository from './UserRepository';


class SessionRepository {

    redisClient = Redis();

    create = async (userId: number) => {
        if (!this.redisClient.isOpen) await this.redisClient.connect();
        const token = uuidv4();
        const expiracyTime = 60 * 60 * 24 * 7; // 1 week
        this.redisClient.set(token, userId, {
            EX: expiracyTime,
        });
        return token;
    }

    getAttachedUser = async (sessionToken: string) => {
        if (!this.redisClient.isOpen) await this.redisClient.connect();
        const userId = await this.redisClient.get(sessionToken);
        if (!userId) return null;
        const res = UserRepository.findOne(eq(users.id, parseInt(userId, 10)));
        if (res === null) return null;
        return res;
    }
};

export default new SessionRepository();
