import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest'
import { Artist } from '../../artists/artists.typings'
import { Band } from '../../bands/bands.typings'
import { Track } from '../../tracks/tracks.typings'
import { Album } from '../albums.typings'

export class albumServices extends RESTDataSource {
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

    async getAlbum(id?: string) {
        let ret
        try {
            if (id) {
                ret = await this.get(`/${id}`)

                ret.id = ret._id
                if (ret.artistsIds) {
                    ret.artists = await this.artistResolver(ret.artistsIds)
                }
                if (ret.bandsIds) {
                    ret.bands = await this.bandResolver(ret.bandsIds)
                }
                if (ret.tracksIds) {
                    ret.tracks = await this.trackResolver(ret.tracksIds)
                }
            } else {
                ret = await this.get('/')
                ret = ret.items
                ret = await Promise.all(
                    ret.map(async (album: Album) => {
                        album.id = album._id
                        if (album.artistsIds) {
                            album.artists = await this.artistResolver(
                                album.artistsIds
                            )
                        }
                        if (album.bandsIds) {
                            album.bands = await this.bandResolver(
                                album.bandsIds
                            )
                        }
                        if (album.tracksIds) {
                            album.tracks = await this.trackResolver(
                                album.tracksIds
                            )
                        }
                        return album
                    })
                )
            }
        } catch (error) {
            console.log('Get album problem')
        }

        return ret
    }

    async createAlbum(obj?: Album) {
        try {
            return await this.post('/', JSON.stringify(obj))
        } catch (error) {
            console.log('Post album problem')
            return 'Post album problem'
        }
    }

    async updateAlbum(id: string, obj?: Album) {
        try {
            return await this.put(`/${id}`, JSON.stringify(obj))
        } catch (error) {
            console.log('Update album problem')
            return 'Update album problem'
        }
    }

    async deleteAlbum(id: string) {
        try {
            return await this.delete(`/${id}`)
        } catch (error) {
            console.log('Delete album problem')
            return 'Delete album problem'
        }
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

    async bandResolver(ids: string[]) {
        return await Promise.all(
            ids.map(async (bandId) => {
                const retBand: Band =
                    await this.context.dataSources.bandAPI.getBand(bandId)
                return retBand
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
}
