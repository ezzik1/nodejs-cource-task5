var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { typeAlbumReturn } from './modules/albums/albums.module.js';
import { typeArtistReturn } from './modules/artists/artists.module.js';
import { typeBandReturn } from './modules/bands/bands.module.js';
import { typeFavoriteReturn } from './modules/favorites/favorites.module.js';
import { typeGenreReturn } from './modules/genres/genres.module.js';
import { typeTrackReturn } from './modules/tracks/tracks.module.js';
import { typeUserReturn } from './modules/users/users.module.js';
import { makeSchema } from 'nexus';
import { mergeSchemas } from '@graphql-tools/schema';
function typesCreator() {
    return __awaiter(this, void 0, void 0, function* () {
        const types = [
            typeAlbumReturn,
            typeArtistReturn,
            typeBandReturn,
            typeFavoriteReturn,
            typeGenreReturn,
            typeTrackReturn,
            typeUserReturn,
        ];
        const typesArray = types.map((obj) => {
            return makeSchema({
                types: obj.types,
                outputs: {
                    schema: obj.path,
                    typegen: obj.typegen,
                },
            });
        });
        return mergeSchemas({
            schemas: yield Promise.all(typesArray),
        });
    });
}
export { typesCreator };
