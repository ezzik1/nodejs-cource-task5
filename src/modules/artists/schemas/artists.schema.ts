import { list, nonNull, objectType } from 'nexus'
import { Band } from '../../bands/resolvers/bands.resolver.js'

export const Artist = objectType({
    name: 'Artist',
    definition(t) {
        t.field('id', {
            type: nonNull('ID'),
        })
        t.field('firstName', {
            type: 'String',
        })
        t.field('secondName', {
            type: 'String',
        })
        t.field('middleName', {
            type: 'String',
        })
        t.field('birthDate', {
            type: 'String',
        })
        t.field('birthPlace', {
            type: 'String',
        })
        t.field('country', {
            type: 'String',
        })
        t.field('bands', {
            type: list(Band),
        })
        t.field('instruments', {
            type: list('String'),
        })
    },
})
