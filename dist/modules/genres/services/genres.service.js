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
export class genresServices extends RESTDataSource {
    constructor(url) {
        super();
        this.baseURL = url;
    }
    willSendRequest(request) {
        console.log(this.httpCache, this.context.Authorization);
        if (this.context.authorization) {
            if (!this.context.authorization.includes('Bearer')) {
                request.headers.set('Authorization', `Bearer ${this.context.authorization}`);
            }
            else {
                request.headers.set('Authorization', this.context.authorization);
            }
        }
    }
    getGenre(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret;
            try {
                if (id) {
                    ret = yield this.get(`/${id}`);
                    ret.id = ret._id;
                }
                else {
                    ret = yield this.get('/');
                    ret = ret.items;
                    ret = ret.map((genre) => {
                        genre.id = genre._id;
                        return genre;
                    });
                }
            }
            catch (error) {
                console.log('Get genre problem');
            }
            return yield ret;
        });
    }
    createGenre(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(obj);
                const ret = yield this.post('/', obj);
                console.log(ret);
            }
            catch (error) {
                console.log('Post genre problem');
                return 'Post genre problem';
            }
        });
    }
    updateGenre(id, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.put(`/${id}`, obj);
            }
            catch (error) {
                console.log('Update genre problem');
                return 'Update genre problem';
            }
        });
    }
    deleteGenre(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.delete(`/${id}`);
            }
            catch (error) {
                console.log('Delete genre problem');
                return 'Delete genre problem';
            }
        });
    }
}
