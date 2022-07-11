var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { idArg, intArg, list, mutationField, nonNull, nullable, queryField, stringArg, } from 'nexus';
import { Genre } from '../schemas/genres.schema.js';
const queryGenre = queryField('genre', {
    type: nullable(Genre),
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.genreAPI.getGenre();
    }),
});
const queryGenres = queryField('genres', {
    type: nullable(list(nullable(Genre))),
    args: {
        id: nonNull(idArg()),
    },
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.genreAPI.getGenre(args.id);
    }),
});
const createGenre = mutationField('createGenre', {
    type: nullable(Genre),
    args: {
        name: nonNull(stringArg()),
        description: stringArg(),
        country: stringArg(),
        year: intArg(),
    },
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.genreAPI.createGenre(args);
    }),
});
const updateGenre = mutationField('updateGenre', {
    type: nullable(Genre),
    args: {
        id: nonNull(idArg()),
        name: stringArg(),
        description: stringArg(),
        country: stringArg(),
        year: intArg(),
    },
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.genreAPI.updateGenre(args);
    }),
});
const deleteGenre = mutationField('deleteGenre', {
    type: 'String',
    args: {
        id: nonNull(idArg()),
    },
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.genreAPI.deleteGenre(args.id);
    }),
});
const GenreResolvers = [
    queryGenre,
    queryGenres,
    createGenre,
    updateGenre,
    deleteGenre,
];
export { Genre, GenreResolvers };
