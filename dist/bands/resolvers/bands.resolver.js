import { list, nonNull, objectType } from 'nexus';
import { Genre } from '../../genres/resolvers/genres.resolver.js';
const Band = objectType({
    name: 'Band',
    definition(t) {
        t.field('id', {
            type: nonNull('ID'),
        });
        t.field('name', {
            type: 'String',
        });
        t.field('origin', {
            type: 'String',
        });
        t.field('members', {
            type: list('String'),
        });
        t.field('website', {
            type: 'String',
        });
        t.field('genres', {
            type: list(Genre),
        });
    },
});
export { Band };
