---
sidebar_position: 5
---

# Fields

Fields are the parameters that can be used to configure an action. They are used to define the behavior of the action and can be used to customize the action to the user's needs. On the frontend and mobile app, fields are used to generate forms that the user can fill out to configure the action based on the type of each field.

## Structure

Each Field implements the following structure:

```ts
export type FieldTypes = "hour" | "date" | "text_field" | "select_field";

export interface SelectFieldValue {
    name: string;
    value: string;
}

export interface Field {
    name: string;
    id: string;
    type: FieldTypes;
    values?: SelectFieldValue[];
}
```

## Implementation

Here is an example of a field generation implementation:

```ts
class PlaylistUpdatedAction extends AreaAction {

    description = "Triggers when a playlist is updated";
    name = "Playlist Updated";
    id = "playlist_updated";
    enrichments : Enrichment[] = [...];

    static getDifference(trackedPlaylist: TrackedPlaylist, currentPlaylist: Playlist<Track>): [string[], string[]] {...}
    static async updatePlaylistState(trackedPlaylist: TrackedPlaylist, currentPlaylist: Playlist<Track>) {...}
    static async getPlaylistWithTracks(id: string, spotifyApi: SpotifyApi) {...}
    async processPlaylistDifference(trackedPlaylist: TrackedPlaylist) {...}
    static async addToQueue(api: SpotifyApi, trackId: string, trackedPlaylist: TrackedPlaylist) {...}
    async add(userId: number, fields: Record<string, string>) : Promise<number> {...}
    async poll(): Promise<void> {...}

    static async getOauth(userId: number) {
        const oauth = await OAuthRepository.findOne(and(eq(authServices.service, "spotify"), eq(authServices.userId, userId)));
        return oauth;
    }

    async generateFields(userId: number) {
        const oauth = await PlaylistUpdatedAction.getOauth(userId);
        if (!oauth) return [];
        const spotifyApi = getSpotifyApiInstance(oauth);
        const playlists = await spotifyApi.currentUser.playlists.playlists();
        const playlistFields : SelectFieldValue[] = playlists.items.map(({id, name}) => ({ name, value: id }));
        const res : Field[] = [
            {
                name: "Choose a playlist:",
                id: "playlistId",
                type: "select_field",
                values: playlistFields,
            },
        ];
        return res;
    }
}
```
