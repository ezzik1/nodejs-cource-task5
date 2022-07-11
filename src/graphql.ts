import { typeAlbumReturn } from './modules/albums/albums.module.js'
import { typeArtistReturn } from './modules/artists/artists.module.js'
import { typeBandReturn } from './modules/bands/bands.module.js'
import { typeFavoriteReturn } from './modules/favorites/favorites.module.js'
import { typeGenreReturn } from './modules/genres/genres.module.js'
import { typeTrackReturn } from './modules/tracks/tracks.module.js'
import { typeUserReturn } from './modules/users/users.module.js'
import { makeSchema } from 'nexus'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { mergeSchemas } from '@graphql-tools/schema'

async function typesCreator() {
    const types = [
        typeAlbumReturn,
        typeArtistReturn,
        typeBandReturn,
        typeFavoriteReturn,
        typeGenreReturn,
        typeTrackReturn,
        typeUserReturn,
    ]
    const typesArray = types.map((obj) => {
        return makeSchema({
            types: obj.types,
            outputs: {
                schema: obj.path,
                typegen: obj.typegen,
            },
        })
    })

    return mergeSchemas({
        schemas: await Promise.all(typesArray),
    })
}

export { typesCreator }
