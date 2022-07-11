import { Genre } from './resolvers/genres.resolver.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const typeGenreReturn = {
    types: Genre,
    path: __dirname + '/schemas/genres.schema.graphql',
    typegen: __dirname + '/schemas/genres.typings.ts',
};
export { typeGenreReturn };
