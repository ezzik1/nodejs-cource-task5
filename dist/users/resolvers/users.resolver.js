import { nonNull, objectType } from 'nexus';
const User = objectType({
    name: 'User',
    definition(t) {
        t.field('id', {
            type: nonNull('ID'),
        });
        t.field('firstName', {
            type: 'String',
        });
        t.field('secondName', {
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
export { User };
