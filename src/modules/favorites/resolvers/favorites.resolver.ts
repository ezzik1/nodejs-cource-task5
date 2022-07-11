import { idArg, list, mutationField, nonNull, queryField } from 'nexus'
import { Favorite } from '../schemas/favorites.schema.js'

const queryFavorites = queryField('favorites', {
    type: list(Favorite),
    resolve: (root, args, context) => {
        return context.dataSources.favoriteAPI.getFavorites()
    },
})

const addTrack = mutationField('addTrackToFavorites', {
    type: 'String',
    args: {
        id: nonNull(idArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.favoriteAPI.addTrack(args)
    },
})

const addBand = mutationField('addBandToFavorites', {
    type: 'String',
    args: {
        id: nonNull(idArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.favoriteAPI.addBand(args)
    },
})

const addArtist = mutationField('addArtistToFavorites', {
    type: 'String',
    args: {
        id: nonNull(idArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.favoriteAPI.addArtist(args)
    },
})

const addGenre = mutationField('addGenreToFavorites', {
    type: 'String',
    args: {
        id: nonNull(idArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.favoriteAPI.addGenre(args)
    },
})

const favoritesResolver = [addTrack, addArtist, addBand, addGenre]

export { Favorite, favoritesResolver }
