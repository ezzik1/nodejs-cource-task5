import { nonNull, objectType } from 'nexus';
export const User = objectType({
    name: 'User',
    definition(t) {
        t.field('id', {
            type: nonNull('ID'),
        });
        t.field('firstName', {
            type: 'String',
        });
        t.field('lastName', {
            type: 'String',
        });
        t.field('password', {
            type: 'String',
        });
        t.field('email', {
            type: nonNull('String'),
        });
    },
});
