/*
** EPITECH PROJECT, 2024
** api
** File description:
** servicesManager
*/

import { Service } from "@shared/services/types";
import timerService from "./timer";
import discordService from "./discord";
import spotifyService from "./spotify";
import twitchService from "./twitch";
import teamsService from "./teams";

export default [
    timerService,
    discordService,
    twitchService,
    spotifyService,
    teamsService
] as Service[];
