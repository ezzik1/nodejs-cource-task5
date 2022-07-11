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
import { Genre } from '../schemas/genres.schema.js'

const queryGenre = queryField('genre', {
    type: nullable(Genre),
    resolve: async (root, args, context) => {
        return context.dataSources.genreAPI.getGenre()
    },
})

const queryGenres = queryField('genres', {
    type: nullable(list(nullable(Genre))),
    args: {
        id: nonNull(idArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.genreAPI.getGenre(args.id)
    },
})

const createGenre = mutationField('createGenre', {
    type: nullable(Genre),
    args: {
        name: nonNull(stringArg()),
        description: stringArg(),
        country: stringArg(),
        year: intArg(),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.genreAPI.createGenre(args)
    },
})

const updateGenre = mutationField('updateGenre', {
    type: nullable(Genre),
    args: {
        id: nonNull(idArg()),
        name: stringArg(),
        description: stringArg(),
        country: stringArg(),
        year: intArg(),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.genreAPI.updateGenre(args)
    },
})

const deleteGenre = mutationField('deleteGenre', {
    type: 'String',
    args: {
        id: nonNull(idArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.genreAPI.deleteGenre(args.id)
    },
})

const GenreResolvers = [
    queryGenre,
    queryGenres,
    createGenre,
    updateGenre,
    deleteGenre,
]

export { Genre, GenreResolvers }
