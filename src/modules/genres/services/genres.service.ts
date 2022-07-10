import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest'
import { Genre } from '../genres.typings'

export class genresServices extends RESTDataSource {
    constructor(url: string | undefined) {
        super()
        this.baseURL = url
    }

    willSendRequest(request: RequestOptions) {
        console.log(this.httpCache, this.context.Authorization)
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

    async getGenre(id?: string) {
        let ret
        try {
            if (id) {
                ret = await this.get(`/${id}`)
                ret.id = ret._id
            } else {
                ret = await this.get('/')
                ret = ret.items
                ret = ret.map((genre: Genre) => {
                    genre.id = genre._id
                    return genre
                })
            }
        } catch (error) {
            console.log('Get genre problem')
        }

        return await ret
    }

    async createGenre(obj?: Genre) {
        try {
            console.log(obj)
            const ret = await this.post('/', obj)
            console.log(ret)
        } catch (error) {
            console.log('Post genre problem')
            return 'Post genre problem'
        }
    }

    async updateGenre(id: string, obj?: Genre) {
        try {
            return await this.put(`/${id}`, obj)
        } catch (error) {
            console.log('Update genre problem')
            return 'Update genre problem'
        }
    }

    async deleteGenre(id: string) {
        try {
            return await this.delete(`/${id}`)
        } catch (error) {
            console.log('Delete genre problem')
            return 'Delete genre problem'
        }
    }
}
