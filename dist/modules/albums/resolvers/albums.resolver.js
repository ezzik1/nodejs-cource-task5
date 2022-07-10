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
import { Album } from '../schemas/albums.schema.js';
const queryAlbums = queryField('albums', {
    type: nullable(Album),
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.albumAPI.getAlbum();
    }),
});
const queryAlbum = queryField('album', {
    type: nullable(list(nullable(Album))),
    args: {
        id: nonNull(idArg()),
    },
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.albumAPI.getAlbum(args.id);
    }),
});
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
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.albumAPI.createAlbum(args);
    }),
});
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
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.albumAPI.updateAlbum(args);
    }),
});
const deleteAlbum = mutationField('deleteAlbum', {
    type: 'String',
    args: {
        id: nonNull(idArg()),
    },
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.albumAPI.deleteAlbum(args.id);
    }),
});
const AlbumResolvers = [
    queryAlbum,
    queryAlbums,
    createAlbum,
    updateAlbum,
    deleteAlbum,
];
export { Album, AlbumResolvers };
