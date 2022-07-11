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
import { Band } from '../schemas/bands.schema.js';
const queryBand = queryField('band', {
    type: nullable(Band),
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.bandAPI.getBand();
    }),
});
const queryBands = queryField('bands', {
    type: nullable(list(nullable(Band))),
    args: {
        id: nonNull(idArg()),
    },
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.bandAPI.getBand(args.id);
    }),
});
const createBand = mutationField('createBand', {
    type: nullable(Band),
    args: {
        name: nonNull(stringArg()),
        origin: stringArg(),
        members: stringArg(),
        website: stringArg(),
        genresIds: list(idArg()),
    },
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.bandAPI.createBand(args);
    }),
});
const updateBand = mutationField('updateBand', {
    type: nullable(Band),
    args: {
        id: nonNull(idArg()),
        name: stringArg(),
        origin: stringArg(),
        members: stringArg(),
        website: stringArg(),
        genresIds: list(idArg()),
    },
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.bandAPI.updateBand(args);
    }),
});
const deleteBand = mutationField('deleteBand', {
    type: 'String',
    args: {
        id: nonNull(idArg()),
    },
    resolve: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.dataSources.bandAPI.deleteBand(args.id);
    }),
});
const BandResolvers = [
    queryBand,
    queryBands,
    createBand,
    updateBand,
    deleteBand,
];
export { Band, BandResolvers };
