import {
    idArg,
    list,
    mutationField,
    nonNull,
    nullable,
    queryField,
    stringArg,
} from 'nexus'
import { Band } from '../schemas/bands.schema.js'

const queryBand = queryField('bands', {
    type: nullable(list(nullable(Band))),
    resolve: async (root, args, context) => {
        return context.dataSources.bandAPI.getBand()
    },
})

const queryBands = queryField('band', {
    type: nullable(Band),
    args: {
        id: nonNull(idArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.bandAPI.getBand(args.id)
    },
})

const createBand = mutationField('createBand', {
    type: nullable(Band),
    args: {
        name: nonNull(stringArg()),
        origin: stringArg(),
        members: stringArg(),
        website: stringArg(),
        genresIds: list(idArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.bandAPI.createBand(args)
    },
})

const updateBand = mutationField('updateBand', {
    type: nullable(Band),
    args: {
        id: nonNull(idArg()),
        name: stringArg(),
        origin: stringArg(),
        members: stringArg(),
        website: stringArg(),
        genresIds: list(idArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.bandAPI.updateBand(args)
    },
})

const deleteBand = mutationField('deleteBand', {
    type: 'String',
    args: {
        id: nonNull(idArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.bandAPI.deleteBand(args.id)
    },
})

const BandResolvers = [
    queryBand,
    queryBands,
    createBand,
    updateBand,
    deleteBand,
]

export { Band, BandResolvers }
