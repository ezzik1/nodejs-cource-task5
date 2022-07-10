import { Genre, GenreResolvers } from './resolvers/genres.resolver.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const typeGenreReturn = {
    types: [Genre, GenreResolvers],
    path: __dirname + '/schemas/genres.schema.graphql',
    typegen: __dirname + '/schemas/genres.typings.ts',
};
export { typeGenreReturn };
