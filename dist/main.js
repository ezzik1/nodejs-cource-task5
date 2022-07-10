var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { typesCreator } from './graphql.js';
import { albumServices } from './modules/albums/services/albums.service.js';
import { artistServices } from './modules/artists/services/artists.service.js';
import { genresServices } from './modules/genres/services/genres.service.js';
import { bandServices } from './modules/bands/services/bands.service.js';
import { userServices } from './modules/users/services/users.service.js';
import { tracksServices } from './modules/tracks/services/tracks.service.js';
import { favoriteServices } from './modules/favorites/services/favorites.services.js';
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = yield typesCreator();
        const server = new ApolloServer({
            schema: schema,
            csrfPrevention: true,
            cache: 'bounded',
            dataSources: () => {
                return {
                    albumAPI: new albumServices(process.env.ALBUMS_URL),
                    artistAPI: new artistServices(process.env.ARTISTS_URL),
                    genreAPI: new genresServices(process.env.GENRES_URL),
                    bandAPI: new bandServices(process.env.BANDS_URL),
                    userAPI: new userServices(process.env.USERS_URL),
                    trackAPI: new tracksServices(process.env.TRACKS_URL),
                    favoritesAPI: new favoriteServices(process.env.FAVORITES_URL),
                };
            },
            context: ({ req }) => {
                const token = req.headers.autorization || '';
                return token;
            },
            plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
        });
        const { url } = yield server.listen({ port: process.env.PORT });
        console.log(`🚀 Server ready at ${url}`);
    });
}
startApolloServer();
