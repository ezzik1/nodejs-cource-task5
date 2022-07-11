var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { idArg, intArg, list, mutationField, nonNull, nullable, objectType, queryField, stringArg, } from 'nexus';
import { Artist } from '../../artists/resolvers/artists.resolver.js';
import { Band } from '../../bands/resolvers/bands.resolver.js';
import { Genre } from '../../genres/resolvers/genres.resolver.js';
import { Track } from '../../tracks/resolvers/tracks.resolver.js';
import { albumServices } from '../services/albums.service.js';
const albumClass = new albumServices();
const Album = objectType({
    name: 'Album',
    definition(t) {
        t.nonNull.id('id');
        t.string('name');
        t.int('released');
        t.field('artists', {
            type: list(Artist),
        });
        t.field('bands', {
            type: list(Band),
        });
        t.field('tracks', {
            type: list(Track),
        });
        t.field('genres', {
            type: list(Genre),
        });
        t.string('image');
    },
});
const queryAlbums = queryField('albums', {
    type: nullable(list(nonNull(Album))),
    resolve: () => __awaiter(void 0, void 0, void 0, function* () {
        return albumClass.getAlbum();
    }),
});
const queryAlbum = queryField('album', {
    type: nullable(Album),
    args: {
        id: nonNull(idArg()),
    },
    resolve: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
        return albumClass.getAlbum(args.id);
    }),
});
const createAlbum = mutationField('createAlbum', {
    type: nullable(Album),
    args: {
        name: nonNull(stringArg()),
        released: intArg(),
        artistsId: list(idArg()),
        bandsId: list(idArg()),
        trackId: list(idArg()),
        genresId: list(idArg()),
        image: stringArg(),
    },
    resolve: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
        return albumClass.createAlbum(args);
    }),
});
const updateAlbum = mutationField('updateAlbum', {
    type: nullable(Album),
    args: {
        id: nonNull(idArg()),
        name: stringArg(),
        released: intArg(),
        artistsId: list(idArg()),
        bandsId: list(idArg()),
        trackId: list(idArg()),
        genresId: list(idArg()),
        image: stringArg(),
    },
    resolve: (root, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(root);
        return null;
    }),
});
const deleteAlbum = mutationField('deleteAlbum', {
    type: 'String',
    args: {
        id: nonNull(idArg()),
    },
    resolve: (root, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(root, args);
        return null;
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
