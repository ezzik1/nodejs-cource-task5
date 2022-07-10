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
import { Artist } from '../schemas/artists.schema.js';
const queryArtist = queryField('artists', {
    type: nullable(list(nullable(Artist))),
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.artistAPI.getArtist();
    }),
});
const queryArtists = queryField('artist', {
    type: nullable(Artist),
    args: {
        id: nonNull(idArg()),
    },
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.artistAPI.getArtist(args.id);
    }),
});
const createArtist = mutationField('createArtist', {
    type: nullable(Artist),
    args: {
        firstName: nonNull(stringArg()),
        secondName: stringArg(),
        middleName: stringArg(),
        birthDate: stringArg(),
        birthPlace: stringArg(),
        country: stringArg(),
        bands: list(idArg()),
        instruments: list(stringArg()),
    },
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.artistAPI.createArtist(args);
    }),
});
const updateArtist = mutationField('updateArtist', {
    type: nullable(Artist),
    args: {
        id: nonNull(idArg()),
        firstName: stringArg(),
        secondName: stringArg(),
        middleName: stringArg(),
        birthDate: stringArg(),
        birthPlace: stringArg(),
        country: stringArg(),
        bands: list(idArg()),
        instruments: list(stringArg()),
    },
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.artistAPI.updateArtist(args);
    }),
});
const deleteArtist = mutationField('deleteArtist', {
    type: 'String',
    args: {
        id: nonNull(idArg()),
    },
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.artistAPI.deleteArtist(args.id);
    }),
});
const ArtistResolvers = [
    queryArtist,
    queryArtists,
    createArtist,
    updateArtist,
    deleteArtist,
];
export { Artist, ArtistResolvers };
