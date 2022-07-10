var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { idArg, list, mutationField, nonNull, nullable, queryField, stringArg, } from 'nexus';
import { User } from '../schemas/users.schema.js';
const queryJWT = queryField('jwt', {
    type: 'String',
    args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
    },
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const ret = yield context.dataSources.userAPI.login(args);
        return ret.jwt;
    }),
});
const queryUser = queryField('user', {
    type: User,
    args: {
        id: nonNull(idArg()),
    },
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.userAPI.getUser(args.id);
    }),
});
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
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.userAPI.register(args);
    }),
});
const UserResolvers = [queryJWT, queryUser, registerUser];
export { User, UserResolvers };
