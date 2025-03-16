/*
** EPITECH PROJECT, 2024
** web
** File description:
** index
*/

import { Oauth } from "../services/types";
import spotify from "./spotify";
import google from "./google";
import discord from "./discord";
import twitch from "./twitch";
import github from "./github";
import microsoft from "./microsoft";

export default [
    spotify,
    google,
    discord,
    twitch,
    github,
    microsoft,
] as Oauth[];
