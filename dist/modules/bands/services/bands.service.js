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
export class bandServices extends RESTDataSource {
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
    getBand(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret;
            try {
                if (id) {
                    ret = yield this.get(`/${id}`);
                    ret.id = ret._id;
                    if (ret.members) {
                        ret.members = yield this.memberResolver(ret.members);
                    }
                    if (ret.genresIds) {
                        ret.genres = yield this.genreResolver(ret.genresIds);
                    }
                }
                else {
                    ret = yield this.get('/');
                    ret = yield Promise.all(ret.map((band) => __awaiter(this, void 0, void 0, function* () {
                        band.id = band._id;
                        if (band.members) {
                            band.members = this.memberResolver(band.members);
                        }
                        if (band.genresIds) {
                            band.genres = yield this.genreResolver(band.genresIds);
                        }
                    })));
                }
                return ret;
            }
            catch (error) {
                console.log('Get band problem');
            }
        });
    }
    createBand(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.post('/', JSON.stringify(obj));
            }
            catch (error) {
                console.log('Post band problem');
                return 'Post band problem';
            }
        });
    }
    updateBand(id, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ret = yield this.put(`/${id}`, JSON.stringify(obj));
                ret.id = ret._id;
                return ret;
            }
            catch (error) {
                console.log('Update band problem');
                return 'Update band problem';
            }
        });
    }
    deleteBand(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.delete(`/${id}`);
            }
            catch (error) {
                console.log('Delete band problem');
                return 'Delete band problem';
            }
        });
    }
    memberResolver(members) {
        return members.map((member) => {
            member.id = member._id;
            return member;
        });
    }
    genreResolver(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(ids.map((genreId) => __awaiter(this, void 0, void 0, function* () {
                const retGenre = yield this.context.dataSources.genreAPI.getGenre(genreId);
                return retGenre;
            })));
        });
    }
}
