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
import { Album } from '../schemas/albums.schema.js'

const queryAlbums = queryField('albums', {
    type: nullable(Album),
    resolve: async (root, args, context) => {
        return context.dataSources.albumAPI.getAlbum()
    },
})

const queryAlbum = queryField('album', {
    type: nullable(list(nullable(Album))),
    args: {
        id: nonNull(idArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.albumAPI.getAlbum(args.id)
    },
})

const createAlbum = mutationField('createAlbum', {
    type: nullable(Album),
    args: {
        name: nonNull(stringArg()),
        released: intArg(),
        artistsIds: list(idArg()),
        bandsIds: list(idArg()),
        trackIds: list(idArg()),
        genresIds: list(idArg()),
        image: stringArg(),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.albumAPI.createAlbum(args)
    },
})

const updateAlbum = mutationField('updateAlbum', {
    type: nullable(Album),
    args: {
        id: nonNull(idArg()),
        name: stringArg(),
        released: intArg(),
        artistsIds: list(idArg()),
        bandsIds: list(idArg()),
        trackIds: list(idArg()),
        genresIds: list(idArg()),
        image: stringArg(),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.albumAPI.updateAlbum(args)
    },
})

const deleteAlbum = mutationField('deleteAlbum', {
    type: 'String',
    args: {
        id: nonNull(idArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.albumAPI.deleteAlbum(args.id)
    },
})

const AlbumResolvers = [
    queryAlbum,
    queryAlbums,
    createAlbum,
    updateAlbum,
    deleteAlbum,
]

export { Album, AlbumResolvers }
