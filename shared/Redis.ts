/*
** EPITECH PROJECT, 2024
** area
** File description:
** redis
*/

import { createClient } from "@redis/client";

const Redis = () => createClient({
    url: `redis://${process.env.REDIS_HOST}:6379`,
})

export default Redis; 
