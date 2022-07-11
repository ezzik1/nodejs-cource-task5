import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest'
import { Track } from '../tracks.typings'

export class tracksServices extends RESTDataSource {
    constructor(url: string | undefined) {
        super()
        this.baseURL = url
    }

    willSendRequest(request: RequestOptions) {
        if (this.context.authorization) {
            if (!this.context.authorization.includes('Bearer')) {
                request.headers.set(
                    'Authorization',
                    `Bearer ${this.context.authorization}`
                )
            } else {
                request.headers.set('Authorization', this.context.authorization)
            }
        }
    }

    async getTrack(id?: string) {
        let ret
        try {
            if (id) {
                ret = await this.get(`/${id}`)
                ret.id = ret._id
                if (ret.albumId) {
                    ret.album =
                        await this.context.dataSources.albumAPI.getAlbum(
                            ret.albumId
                        )
                }
                if (ret.artistsIds) {
                    ret.artists = await this.artistResolver(ret.artistsIds)
                }
                if (ret.bandsIds) {
                    ret.bands = await this.bandResolver(ret.bandsIds)
                }
                if (ret.genresIds) {
                    ret.genres = await this.genreResolver(ret.genresIds)
                }
            } else {
                ret = await this.get('/')
                ret = ret.items
                ret = await Promise.all(
                    ret.map(async (track: Track) => {
                        track.id = track._id
                        if (track.albumId) {
                            track.album =
                                await this.context.dataSources.albumAPI.getAlbum(
                                    track.albumId
                                )
                        }
                        if (track.artistsIds) {
                            track.artists = await this.artistResolver(
                                track.artistsIds
                            )
                        }
                        if (track.bandsIds) {
                            track.bands = await this.bandResolver(
                                track.bandsIds
                            )
                        }
                        if (track.genresIds) {
                            track.genres = await this.genreResolver(
                                track.genresIds
                            )
                        }
                    })
                )
            }
        } catch (error) {
            console.log('Get track problem')
        }
        return ret
    }

    async createTrack(obj?: Track) {
        try {
            const ret = await this.post('', obj)
            ret.id = ret._id
            return ret
        } catch (error) {
            console.log('Post track problem')
            return 'Post track problem'
        }
    }

    async updateTrack(id: string, obj?: Track) {
        try {
            return await this.put(`/${id}`, obj)
        } catch (error) {
            console.log('Update track problem')
            return 'Update track problem'
        }
    }

    async deleteTrack(id: string) {
        try {
            return await this.delete(`/${id}`)
        } catch (error) {
            console.log('Delete track problem')
            return 'Delete track problem'
        }
    }

    async artistResolver(ids: string[]) {
        return await Promise.all(
            ids.map(async (artistId) => {
                return await this.context.dataSources.artistAPI.getArtist(
                    artistId
                )
            })
        )
    }

    async bandResolver(ids: string[]) {
        return await Promise.all(
            ids.map(async (bandId) => {
                return await this.context.dataSources.bandAPI.getBand(bandId)
            })
        )
    }

    async genreResolver(ids: string[]) {
        return await Promise.all(
            ids.map(async (genreId) => {
                return await this.context.dataSources.genreAPI.getGenre(genreId)
            })
        )
    }
}
