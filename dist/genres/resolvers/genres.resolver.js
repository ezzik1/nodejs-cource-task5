import { nonNull, objectType } from 'nexus';
const Genre = objectType({
    name: 'Genre',
    definition(t) {
        t.field('id', {
            type: nonNull('ID'),
        });
        t.field('name', {
            type: 'String',
        });
        t.field('description', {
            type: 'String',
        });
        t.field('country', {
            type: 'String',
        });
        t.field('year', {
            type: 'Int',
        });
    },
});
export { Genre };
