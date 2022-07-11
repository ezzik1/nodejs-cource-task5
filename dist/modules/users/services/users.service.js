var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RESTDataSource } from 'apollo-datasource-rest';
export class userServices extends RESTDataSource {
    constructor(url) {
        super();
        this.baseURL = url;
    }
    willSendRequest(request) {
        if (this.context.autorization) {
            if (!this.context.autorization.includes('Bearer')) {
                request.headers.set('Authorization', `Bearer ${this.context.autorization}`);
            }
            else {
                request.headers.set('Authorization', this.context.autorization);
            }
        }
    }
    login(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.post('/login', obj);
            }
            catch (error) {
                console.log('login problem');
            }
        });
    }
    register(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ret = yield this.post('/register', obj);
                ret.id = ret._id;
                return ret;
            }
            catch (error) {
                console.log('register problem');
                return 'register problem';
            }
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ret = yield this.get(`/${id}`);
                ret.id = ret._id;
                return ret;
            }
            catch (error) {
                console.log('Get user problem');
                return 'Get user problem';
            }
        });
    }
}
