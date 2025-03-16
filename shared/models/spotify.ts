/*
** EPITECH PROJECT, 2024
** area
** File description:
** spotify
*/

import { relations } from 'drizzle-orm';
import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';
import { users } from '@shared/models';

export const trackedPlaylists = pgTable('tracked_playlists', {
    id: serial('id').primaryKey(),
    playlistId: varchar('playlist_id').notNull(),
    userId: integer('user_id').notNull(),
    lastSnapshotId: varchar('last_snapshot_id').notNull(),
    tracks: varchar('tracks').notNull(),
})

export const trackPlaylistRelation = relations(trackedPlaylists, ({ one }) => ({
    user: one(users, { fields: [trackedPlaylists.userId], references: [users.id] }),
}));
