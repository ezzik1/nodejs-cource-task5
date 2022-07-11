import { Favorite } from './resolvers/favorites.resolver.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const typeFavoriteReturn = {
    types: Favorite,
    path: __dirname + '/schemas/favorites.schema.graphql',
    typegen: __dirname + '/schemas/favorites.typings.ts',
};
export { typeFavoriteReturn };
