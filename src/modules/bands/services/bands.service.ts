import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest'
import { Genre } from '../../genres/genres.typings'
import { Band, Member } from '../bands.typings'

export class bandServices extends RESTDataSource {
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

    async getBand(id?: string) {
        let ret
        try {
            if (id) {
                ret = await this.get(`/${id}`)
                ret.id = ret._id
                if (ret.members) {
                    ret.members = await this.memberResolver(ret.members)
                }
                if (ret.genresIds) {
                    ret.genres = await this.genreResolver(ret.genresIds)
                }
            } else {
                ret = await this.get('/')
                ret = await Promise.all(
                    ret.map(async (band: Band) => {
                        band.id = band._id
                        if (band.members) {
                            band.members = this.memberResolver(band.members)
                        }
                        if (band.genresIds) {
                            band.genres = await this.genreResolver(
                                band.genresIds
                            )
                        }
                    })
                )
            }
            return ret
        } catch (error) {
            console.log('Get band problem')
        }
    }

    async createBand(obj?: Band) {
        try {
            return await this.post('', obj)
        } catch (error) {
            console.log('Post band problem')
            return 'Post band problem'
        }
    }

    async updateBand(id: string, obj?: Band) {
        try {
            const ret = await this.put(`/${id}`, obj)
            ret.id = ret._id
            return ret
        } catch (error) {
            console.log('Update band problem')
            return 'Update band problem'
        }
    }

    async deleteBand(id: string) {
        try {
            return await this.delete(`/${id}`)
        } catch (error) {
            console.log('Delete band problem')
            return 'Delete band problem'
        }
    }

    memberResolver(members: Member[]) {
        return members.map((member) => {
            member.id = member._id
            return member
        })
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
}
