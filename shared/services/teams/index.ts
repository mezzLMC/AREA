/*
** EPITECH PROJECT, 2024
** area
** File description:
** index
*/

import AreaService from "../AreaService";
import OnTeamMessage from "./OnTeamMessage";
import OnChatMessage from "./OnChatMessage";

class TeamsService extends AreaService {
    id = "teams";

    name = "Teams";

    description = "Teams service";

    actions = [
        OnTeamMessage,
        OnChatMessage
    ];

    oauthId = "microsoft";

    reactions = [];

    imageURL = "https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg";
}

export default new TeamsService();

