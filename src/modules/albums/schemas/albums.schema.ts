import { list, objectType } from 'nexus'

import { Artist } from '../../artists/resolvers/artists.resolver.js'
import { Band } from '../../bands/resolvers/bands.resolver.js'
import { Genre } from '../../genres/resolvers/genres.resolver.js'
import { Track } from '../../tracks/resolvers/tracks.resolver.js'

export const Album = objectType({
    name: 'Album',
    definition(t) {
        t.nonNull.id('id')
        t.string('name')
        t.int('released')
        t.field('artists', {
            type: list(Artist),
        })
        t.field('bands', {
            type: list(Band),
        })
        t.field('tracks', {
            type: list(Track),
        })
        t.field('genres', {
            type: list(Genre),
        })
        t.string('image')
    },
})
