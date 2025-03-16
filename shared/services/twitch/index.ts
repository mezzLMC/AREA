/* eslint-disable no-console */
/*
** EPITECH PROJECT, 2024
** area
** File description:
** index
*/

import FollowedBroadcasterIsStreaming from "./FollowedChannelStreams";
import someoneFollowedMe from "./someoneFollowedMe";
import TwitchApiInstance, { getAppAccessToken } from "./TwitchApi";
import someoneSubsToMe from "./someoneSubsToMe";
import AreaService from "../AreaService";

class TwitchService extends AreaService {

    description = "Twitch est une plateforme de streaming vidéo en direct appartenant à Amazon. Elle est principalement utilisée pour la diffusion en direct de jeux vidéo, y compris les diffusions en direct d'e-sport, de musique, de créations artistiques, de talk-shows et de la télé-réalité.";

    id = "twitch";

    name = "Twitch";

    imageURL = "/images/twitch-purple.svg";

    actions = [
        FollowedBroadcasterIsStreaming,
        someoneFollowedMe,
        someoneSubsToMe
    ]

    oauthId = "twitch";

    reactions = [];

    static async deleteSubscription(id:string, accessToken: string) : Promise<void> {
        const api = TwitchApiInstance(accessToken);
        try {
            await api.eventSub.deleteEventSubSubscription({ id });;
        }
        catch {
            return this.deleteSubscription(id, accessToken);
        }
        return Promise.resolve();
    }

    async setup() {
        const accessToken = await getAppAccessToken();
        const api = TwitchApiInstance(accessToken);
        const eventSubs = await api.eventSub.getEventSubSubscriptions();
        if (eventSubs.status !== 200) return;
        const subs = eventSubs.data.data;
        // eslint-disable-next-line no-restricted-syntax
        for (const sub of subs) {
            // eslint-disable-next-line no-await-in-loop
            await TwitchService.deleteSubscription(sub.id, accessToken); 
        }
        console.log("Deleted all twitch webhooks");
    }
}

export default new TwitchService();
