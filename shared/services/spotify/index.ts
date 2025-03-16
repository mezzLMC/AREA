/*
** EPITECH PROJECT, 2024
** api
** File description:
** timer
*/

import playlistUpdatedAction from "./PlaylistUpdatedAction";
import AreaService from "../AreaService";

class SpotifyService extends AreaService {
    description = "Spotify est un service suédois de streaming musical sous la forme d'un logiciel propriétaire et d'un site web. Cette plateforme de distribution numérique permet une écoute quasi instantanée de fichiers musicaux.";

    id = "spotify";

    name = "Spotify";

    actions = [
        playlistUpdatedAction,
    ]

    oauthId = "spotify";

    reactions = [];

    imageURL = "https://cdn.iconscout.com/icon/free/png-256/spotify-11-432546.png";
}

export default new SpotifyService();
