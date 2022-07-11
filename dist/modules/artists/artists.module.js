import { Artist, ArtistResolvers } from './resolvers/artists.resolver.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const typeArtistReturn = {
    types: [Artist, ArtistResolvers],
    path: __dirname + '/schemas/artists.schema.graphql',
    typegen: __dirname + '/schemas/artists.typings.ts',
};
export { typeArtistReturn };
