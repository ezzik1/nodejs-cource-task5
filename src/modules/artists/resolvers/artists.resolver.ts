import {
    idArg,
    list,
    mutationField,
    nonNull,
    nullable,
    queryField,
    stringArg,
} from 'nexus'
import { Artist } from '../schemas/artists.schema.js'

const queryArtist = queryField('artists', {
    type: nullable(list(nullable(Artist))),
    resolve: async (root, args, context) => {
        return context.dataSources.artistAPI.getArtist()
    },
})

const queryArtists = queryField('artist', {
    type: nullable(Artist),
    args: {
        id: nonNull(idArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.artistAPI.getArtist(args.id)
    },
})

const createArtist = mutationField('createArtist', {
    type: nullable(Artist),
    args: {
        firstName: nonNull(stringArg()),
        secondName: stringArg(),
        middleName: stringArg(),
        birthDate: stringArg(),
        birthPlace: stringArg(),
        country: stringArg(),
        bands: list(idArg()),
        instruments: list(stringArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.artistAPI.createArtist(args)
    },
})

const updateArtist = mutationField('updateArtist', {
    type: nullable(Artist),
    args: {
        id: nonNull(idArg()),
        firstName: stringArg(),
        secondName: stringArg(),
        middleName: stringArg(),
        birthDate: stringArg(),
        birthPlace: stringArg(),
        country: stringArg(),
        bands: list(idArg()),
        instruments: list(stringArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.artistAPI.updateArtist(args)
    },
})

const deleteArtist = mutationField('deleteArtist', {
    type: 'String',
    args: {
        id: nonNull(idArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.artistAPI.deleteArtist(args.id)
    },
})

const ArtistResolvers = [
    queryArtist,
    queryArtists,
    createArtist,
    updateArtist,
    deleteArtist,
]

export { Artist, ArtistResolvers }
