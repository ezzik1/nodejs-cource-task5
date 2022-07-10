import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest'
import { User, UserRegister } from '../users.typings'

export class userServices extends RESTDataSource {
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

    async login(obj: User) {
        try {
            return await this.post('/login', obj)
        } catch (error) {
            console.log('login problem')
        }
    }

    async register(obj: UserRegister) {
        try {
            const ret = await this.post('/register', obj)
            ret.id = ret._id
            return ret
        } catch (error) {
            console.log('register problem')
            return 'register problem'
        }
    }

    async getUser(id: string) {
        try {
            const ret = await this.get(`/${id}`)
            ret.id = ret._id
            return ret
        } catch (error) {
            console.log('Get user problem')
            return 'Get user problem'
        }
    }
}
