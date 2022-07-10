import { Track, TrackResolvers } from './resolvers/tracks.resolver.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const typeTrackReturn = {
    types: [Track, TrackResolvers],
    path: __dirname + '/schemas/tracks.schema.graphql',
    typegen: __dirname + '/schemas/tracks.typings.ts',
}

export { typeTrackReturn }
