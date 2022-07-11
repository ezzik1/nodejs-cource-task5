import { Album, AlbumResolvers } from './resolvers/albums.resolver.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const typeAlbumReturn = {
    types: [Album, AlbumResolvers],
    path: __dirname + '/schemas/albums.schema.graphql',
    typegen: __dirname + '/schemas/albums.typings.ts',
}

export { typeAlbumReturn }
