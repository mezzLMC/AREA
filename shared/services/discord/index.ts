/*
** EPITECH PROJECT, 2024
** web
** File description:
** index
*/

import webHookReaction from "@shared/services/discord/WebhookReaction";
import AreaService from "../AreaService";

class DiscordService extends AreaService {
    description = "Discord service";

    id = "discord";

    name = "Discord";

    oauthId = "discord";

    actions = [];

    reactions = [
        webHookReaction,
    ]

    imageURL = "https://upload.wikimedia.org/wikipedia/fr/4/4f/Discord_Logo_sans_texte.svg";

}

const discordService = new DiscordService();

export default discordService;
