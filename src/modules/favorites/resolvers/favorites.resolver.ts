import { idArg, list, mutationField, nonNull, queryField } from 'nexus'
import { Favorite } from '../schemas/favorites.schema.js'

const queryFavorites = queryField('favorites', {
    type: list(Favorite),
    resolve: (root, args, context) => {
        return context.dataSources.favoriteAPI.getFavorites()
    },
})

const addTrack = mutationField('addTrackToFavorites', {
    type: 'string',
    args: {
        id: nonNull(idArg()),
    },
})

export { Favorite }
