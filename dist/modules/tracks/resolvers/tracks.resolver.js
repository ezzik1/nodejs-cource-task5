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
import { Track } from '../schemas/tracks.schema.js';
const queryTrack = queryField('track', {
    type: nullable(Track),
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.trackAPI.getTrack();
    }),
});
const queryTracks = queryField('tracks', {
    type: nullable(list(nullable(Track))),
    args: {
        id: nonNull(idArg()),
    },
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.trackAPI.getTrack(args.id);
    }),
});
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
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.trackAPI.createTrack(args);
    }),
});
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
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.trackAPI.updateTrack(args);
    }),
});
const deleteTrack = mutationField('deleteTrack', {
    type: 'String',
    args: {
        id: nonNull(idArg()),
    },
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.trackAPI.deleteTrack(args.id);
    }),
});
const TrackResolvers = [
    queryTrack,
    queryTracks,
    createTrack,
    updateTrack,
    deleteTrack,
];
export { Track, TrackResolvers };
