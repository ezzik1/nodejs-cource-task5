import { Band } from './resolvers/bands.resolver.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const typeBandReturn = {
    types: Band,
    path: __dirname + '/schemas/bands.schema.graphql',
    typegen: __dirname + '/schemas/bands.typings.ts',
};
export { typeBandReturn };
