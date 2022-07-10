import {
    idArg,
    list,
    mutationField,
    nonNull,
    nullable,
    queryField,
    stringArg,
} from 'nexus'
import { User } from '../schemas/users.schema.js'

const queryJWT = queryField('jwt', {
    type: 'String',
    args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
    },
    resolve: async (root, args, context) => {
        const ret = await context.dataSources.userAPI.login(args)
        return ret.jwt
    },
})

const queryUser = queryField('user', {
    type: User,
    args: {
        id: nonNull(idArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.userAPI.getUser(args.id)
    },
})

const registerUser = mutationField('register', {
    type: nullable(User),
    args: {
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        favouriteArtistIds: list(stringArg()),
        favouriteSongsIds: list(stringArg()),
        favouriteBandsIds: list(stringArg()),
        favouriteGenresIds: list(stringArg()),
    },
    resolve: async (root, args, context) => {
        return context.dataSources.userAPI.register(args)
    },
})

const UserResolvers = [queryJWT, queryUser, registerUser]

export { User, UserResolvers }
