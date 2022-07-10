import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest'
import { Artist } from '../../artists/artists.typings'
import { Band } from '../../bands/bands.typings'
import { Genre } from '../../genres/genres.typings'
import { Track } from '../../tracks/tracks.typings'

export class favoriteServices extends RESTDataSource {
    constructor(url: string | undefined) {
        super()
        this.baseURL = url
    }

    willSendRequest(request: RequestOptions) {
        if (this.context.autorization) {
            if (!this.context.autorization.includes('Bearer')) {
                request.headers.set(
                    'Authorization',
                    `Bearer ${this.context.autorization}`
                )
            } else {
                request.headers.set('Authorization', this.context.autorization)
            }
        }
    }

    async getFavorites() {
        const ret = await this.get('/')
        ret.id = ret._id
        if (ret.bandsIds) {
            ret.bands = await this.bandResolver(ret.bandsIds)
        }
        if (ret.genresIds) {
            ret.genres = await this.genreResolver(ret.genresIds)
        }
        if (ret.artistsIds) {
            ret.artists = await this.artistResolver(ret.artistsIds)
        }
        if (ret.tracksIds) {
            ret.tracks = await this.trackResolver(ret.tracksIds)
        }
        return ret
    }

    async addTrack(id: string) {
        const obj = {
            type: 'track',
            id: id,
        }
        return await this.post('/add', JSON.stringify(obj))
    }

    async addBand(id: string) {
        const obj = {
            type: 'band',
            id: id,
        }
        return await this.post('/add', JSON.stringify(obj))
    }

    async addArtist(id: string) {
        const obj = {
            type: 'artist',
            id: id,
        }
        return await this.post('/add', JSON.stringify(obj))
    }

    async addGenre(id: string) {
        const obj = {
            type: 'genre',
            id: id,
        }
        return await this.post('/add', JSON.stringify(obj))
    }

    async bandResolver(ids: string[]) {
        return await Promise.all(
            ids.map(async (bandId) => {
                const retBand: Band =
                    await this.context.dataSources.bandAPI.getBand(bandId)
                return retBand
            })
        )
    }

    async genreResolver(ids: string[]) {
        return await Promise.all(
            ids.map(async (genreId) => {
                const retGenre: Genre =
                    await this.context.dataSources.genreAPI.getGenre(genreId)
                return retGenre
            })
        )
    }

    async artistResolver(ids: string[]) {
        return await Promise.all(
            ids.map(async (artistId) => {
                const retArtist: Artist =
                    await this.context.dataSources.artistAPI.getArtist(artistId)
                return retArtist
            })
        )
    }

    async trackResolver(ids: string[]) {
        return await Promise.all(
            ids.map(async (trackId) => {
                const retTrack: Track =
                    await this.context.dataSources.trackAPI.getTrack(trackId)
                return retTrack
            })
        )
    }
}
