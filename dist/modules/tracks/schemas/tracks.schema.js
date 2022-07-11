import { list, nonNull, objectType } from 'nexus';
import { Album } from '../../albums/resolvers/albums.resolver.js';
import { Artist } from '../../artists/resolvers/artists.resolver.js';
import { Band } from '../../bands/resolvers/bands.resolver.js';
import { Genre } from '../../genres/resolvers/genres.resolver.js';
export const Track = objectType({
    name: 'Track',
    definition(t) {
        t.field('id', {
            type: nonNull('ID'),
        });
        t.field('title', {
            type: nonNull('String'),
        });
        t.field('album', {
            type: Album,
        });
        t.field('artists', {
            type: list(Artist),
        });
        t.field('bands', {
            type: list(Band),
        });
        t.field('duration', {
            type: 'Int',
        });
        t.field('released', {
            type: 'Int',
        });
        t.field('genres', {
            type: list(Genre),
        });
    },
});
