import { list, nonNull, objectType } from 'nexus'
import { Artist } from '../../artists/resolvers/artists.resolver.js'
import { Band } from '../../bands/resolvers/bands.resolver.js'
import { Genre } from '../../genres/resolvers/genres.resolver.js'
import { Track } from '../../tracks/resolvers/tracks.resolver.js'

export const Favorite = objectType({
    name: 'Favorites',
    definition(t) {
        t.field('id', {
            type: nonNull('ID'),
        })
        t.field('userId', {
            type: 'ID',
        })
        t.field('bands', {
            type: list(Band),
        })
        t.field('genres', {
            type: list(Genre),
        })
        t.field('artists', {
            type: list(Artist),
        })
        t.field('tracks', {
            type: list(Track),
        })
    },
})
