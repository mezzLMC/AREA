/*
** EPITECH PROJECT, 2024
** area
** File description:
** OnChatMessage
*/

import OAuthRepository from "@shared/database/OAuthRepository";
import { Client } from "@microsoft/microsoft-graph-client";
import AreaAction from "../AreaAction";
import { Field } from "@/types";

interface Team {
    id: string;
    displayName: string;
}

class OnTeamMessage extends AreaAction {
    id = "on_team_message";

    name = "On team Message";

    description = "On team Message";

    async generateFields(userId: number) {
        const oauth = await OAuthRepository.findByService("microsoft", userId);
        if (!oauth) return [];
        const teamsClient = await this.getTeamsClient(oauth.accessToken);
        const teams = (await teamsClient.api("/me/joinedTeams").get()).value as Team[];
        const selectTeam = {
            type: "select_field",
            id: "team",
            name: "Team",
            values : teams.map(team => ({
                name: team.displayName,
                value: team.id
            }))
        } as Field;
        return [selectTeam];
    }

    async getTeamsClient(accessToken: string) {
        return Client.init({
            authProvider: (done) => {
                done(null, accessToken);
            }
        });
    }

    async add(userId: number, fields: Record<string, string>) {
        return 0;
    }
}

export default new OnTeamMessage();
