import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest'
import { Band } from '../../bands/bands.typings'
import { Genre } from '../../genres/genres.typings'
import { Artist } from '../artists.typings'

export class artistServices extends RESTDataSource {
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

    async getArtist(id?: string): Promise<Artist | Artist[]> {
        let ret
        try {
            if (id) {
                ret = await this.get(`/${id}`)
                ret.id = ret._id
                if (ret.bandsId) {
                    ret.bands = await this.bandResolver(ret.bandsIds)
                }
            } else {
                ret = await this.get('/')
                ret = ret.items
                ret = await Promise.all(
                    ret.map(async (artist: Artist) => {
                        artist.id = artist._id
                        if (artist.bandsIds) {
                            artist.bands = await this.bandResolver(
                                artist.bandsIds
                            )
                        }
                        return artist
                    })
                )
            }
        } catch (error) {
            console.log(error)
            console.log('Get artist problem')
        }

        return await ret
    }

    async createArtist(obj?: Artist) {
        try {
            return await this.post('/', JSON.stringify(obj))
        } catch (error) {
            console.log('Post artist problem')
            return 'Post artist problem'
        }
    }

    async updateArtist(id: string, obj?: Artist) {
        try {
            return await this.put(`/${id}`, JSON.stringify(obj))
        } catch (error) {
            console.log('Update artist problem')
            return 'Update artist problem'
        }
    }

    async deleteArtist(id: string) {
        try {
            return await this.delete(`/${id}`)
        } catch (error) {
            console.log('Delete artist problem')
            return 'Delete artist problem'
        }
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

    async bandResolver(ids: string[]) {
        return await Promise.all(
            ids.map(async (bandId) => {
                const retBand: Band =
                    await this.context.dataSources.bandAPI.getBand(bandId)
                return retBand
            })
        )
    }
}
