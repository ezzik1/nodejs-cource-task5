import {
    idArg,
    intArg,
    list,
    mutationField,
    nonNull,
    nullable,
    queryField,
    stringArg,
} from 'nexus'
import { Track } from '../schemas/tracks.schema.js'

const queryTrack = queryField('tracks', {
    type: nullable(list(nullable(Track))),
    resolve: async (root, args, context) => {
        return context.dataSources.trackAPI.getTrack()
    },
})

const queryTracks = queryField('track', {
    type: nullable(Track),
    args: {
        id: nonNull(idArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.trackAPI.getTrack(args.id)
    },
})

const createTrack = mutationField('createTrack', {
    type: nullable(Track),
    args: {
        title: nonNull(stringArg()),
        albumId: idArg(),
        bandsIds: list(idArg()),
        artistsIds: list(idArg()),
        duration: intArg(),
        released: intArg(),
        genresIds: list(idArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.trackAPI.createTrack(args)
    },
})

const updateTrack = mutationField('updateTrack', {
    type: nullable(Track),
    args: {
        id: nonNull(idArg()),
        title: nonNull(stringArg()),
        albumId: idArg(),
        bandsIds: list(idArg()),
        artistsIds: list(idArg()),
        duration: intArg(),
        released: intArg(),
        genresIds: list(idArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.trackAPI.updateTrack(args)
    },
})

const deleteTrack = mutationField('deleteTrack', {
    type: 'String',
    args: {
        id: nonNull(idArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.trackAPI.deleteTrack(args.id)
    },
})

const TrackResolvers = [
    queryTrack,
    queryTracks,
    createTrack,
    updateTrack,
    deleteTrack,
]

export { Track, TrackResolvers }
