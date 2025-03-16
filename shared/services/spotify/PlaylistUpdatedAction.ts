/*
** EPITECH PROJECT, 2024
** area
** File description:
** PlaylistUpdatedAction
*/

import client from "@shared/database"
import { trackedPlaylists } from "@shared/models/spotify";
import { Action, Enrichment } from "@shared/services/types";
import { and, eq } from "drizzle-orm";
import { Playlist, SpotifyApi, Track } from "@spotify/web-api-ts-sdk";
import { authServices } from "@shared/models";
import OAuthRepository from "@shared/database/OAuthRepository";
import { Field, SelectFieldValue } from "@shared/types";
import queue from "@shared/Queue";
import getSpotifyApiInstance from "./getSpotifyInstance";
import AreaAction from "../AreaAction";

type TrackedPlaylist = typeof trackedPlaylists.$inferSelect;

class PlaylistUpdatedAction extends AreaAction {

    description = "Triggers when a playlist is updated";

    name = "Playlist Updated";

    id = "playlist_updated";

    enrichments : Enrichment[] = [
        {
            id: "SPOTIFY_SONG_NAME",
            name: "Song Name",
            description: "Name of the song that was added to the playlist",
        },
        {
            id: "SPOTIFY_SONG_ARTIST",
            name: "Artist Name",
            description: "Name of the artist of the song that was added to the playlist",
        },
        {
            id: "SPOTIFY_PLAYLIST_NAME",
            name: "Playlist Name",
            description: "Name of the playlist that was updated",
        },
        {
            id: "SPOTIFY_PLAYLIST_URL",
            name: "Playlist URL",
            description: "URL of the playlist that was updated",
        }
    ]

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

    static getDifference(trackedPlaylist: TrackedPlaylist, currentPlaylist: Playlist<Track>): [string[], string[]] {
        const oldTracks = JSON.parse(trackedPlaylist.tracks) as string[];
        const newTracks = currentPlaylist.tracks.items.map((track) => track.track.id);
        const added = newTracks.filter((track) => !oldTracks.includes(track));
        const removed = oldTracks.filter((track) => !newTracks.includes(track));
        return [added, removed];
    }

    static async updatePlaylistState(trackedPlaylist: TrackedPlaylist, currentPlaylist: Playlist<Track>) {
        const db = await client();
        const tracks = JSON.stringify(currentPlaylist.tracks.items.map((track) => track.track.id));
        db.update(trackedPlaylists).set({lastSnapshotId: currentPlaylist.snapshot_id, tracks}).where(eq(trackedPlaylists.id, trackedPlaylist.id)).execute();
        await db.$client.release();
    }

    static async getOauth(userId: number) {
        const oauth = await OAuthRepository.findOne(and(eq(authServices.service, "spotify"), eq(authServices.userId, userId)));
        return oauth;
    }

    static async getPlaylistWithTracks(id: string, spotifyApi: SpotifyApi) {
        const playlist = (await spotifyApi.playlists.getPlaylist(id));
    
        if (playlist.tracks.total > playlist.tracks.limit) {
            const promises = [];
            for (let i = 1; i < Math.ceil(playlist.tracks.total / playlist.tracks.limit); i += 1) {
                const offset = playlist.tracks.limit * i;
                promises.push(spotifyApi.playlists.getPlaylistItems(id, undefined, undefined, undefined, offset));
            }
            const results = await Promise.all(promises);
            results.forEach((trackToAdd) => {
                trackToAdd.items.forEach((item) => playlist.tracks.items.push(item));
            });
        }
    
        return playlist
      }

    async processPlaylistDifference(trackedPlaylist: TrackedPlaylist) {
        const oauth = await PlaylistUpdatedAction.getOauth(trackedPlaylist.userId);
        if (!oauth) return;
        const spotifyApi = getSpotifyApiInstance(oauth);
        const playlist = await spotifyApi.playlists.getPlaylist(trackedPlaylist.playlistId, undefined, "snapshot_id, id, tracks");
        if (trackedPlaylist.lastSnapshotId === playlist.snapshot_id) {
            return;
        }
        const playlistWithTracks = await PlaylistUpdatedAction.getPlaylistWithTracks(trackedPlaylist.playlistId, spotifyApi);
        const [added, removed] = PlaylistUpdatedAction.getDifference(trackedPlaylist, playlistWithTracks);
        if (added.length || removed.length) {
            await PlaylistUpdatedAction.updatePlaylistState(trackedPlaylist, playlist);
            await Promise.all(added.map((trackId) => PlaylistUpdatedAction.addToQueue(spotifyApi, trackId, trackedPlaylist)));
        }
    }

    static async addToQueue(api: SpotifyApi, trackId: string, trackedPlaylist: TrackedPlaylist) {
        const track = await api.tracks.get(trackId);
        const playlist = await api.playlists.getPlaylist(trackedPlaylist.playlistId);
        const playlistName = playlist.name;
        const playlistUrl = playlist.external_urls.spotify;
        const songName = track.name;
        const artistName = track.artists[0].name;
        const enrichments = {
            SPOTIFY_SONG_NAME: songName,
            SPOTIFY_SONG_ARTIST: artistName,
            SPOTIFY_PLAYLIST_NAME: playlistName,
            SPOTIFY_PLAYLIST_URL: playlistUrl,
        };
        await queue.push({ action: "playlist_updated", id: trackedPlaylist.id, enrichments });
    }

    async add(userId: number, fields: Record<string, string>) : Promise<number> {
        const db = await client();
        const { playlistId } = fields;
        const oauth = await PlaylistUpdatedAction.getOauth(userId);
        const spotifyApi = getSpotifyApiInstance(oauth!);
        const playlist = await spotifyApi.playlists.getPlaylist(playlistId);
        const newAction = await db
            .insert(trackedPlaylists)
            .values({
                playlistId,
                userId,
                lastSnapshotId: playlist.snapshot_id,
                tracks: JSON.stringify([]),
            })
            .returning({
                id: trackedPlaylists.id,
            })
            .execute();
        await db.$client.release();
        return newAction[0].id;
    }

    async poll(): Promise<void> {
        const db = await client();
        const trackedPlaylistsList = await db.select().from(trackedPlaylists).execute();
        await Promise.all(trackedPlaylistsList.map(this.processPlaylistDifference));
        await db.$client.release();
    }
}

const playlistUpdatedAction: Action = new PlaylistUpdatedAction();

export default playlistUpdatedAction;
