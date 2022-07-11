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
export class artistServices extends RESTDataSource {
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
    getArtist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret;
            try {
                if (id) {
                    ret = yield this.get(`/${id}`);
                    ret.id = ret._id;
                    if (ret.bandsId) {
                        ret.bands = yield this.bandResolver(ret.bandsIds);
                    }
                }
                else {
                    ret = yield this.get('/');
                    ret = ret.items;
                    ret = yield Promise.all(ret.map((artist) => __awaiter(this, void 0, void 0, function* () {
                        artist.id = artist._id;
                        if (artist.bandsIds) {
                            artist.bands = yield this.bandResolver(artist.bandsIds);
                        }
                        return artist;
                    })));
                }
            }
            catch (error) {
                console.log(error);
                console.log('Get artist problem');
            }
            return yield ret;
        });
    }
    createArtist(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.post('/', JSON.stringify(obj));
            }
            catch (error) {
                console.log('Post artist problem');
                return 'Post artist problem';
            }
        });
    }
    updateArtist(id, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.put(`/${id}`, JSON.stringify(obj));
            }
            catch (error) {
                console.log('Update artist problem');
                return 'Update artist problem';
            }
        });
    }
    deleteArtist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.delete(`/${id}`);
            }
            catch (error) {
                console.log('Delete artist problem');
                return 'Delete artist problem';
            }
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
    bandResolver(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(ids.map((bandId) => __awaiter(this, void 0, void 0, function* () {
                const retBand = yield this.context.dataSources.bandAPI.getBand(bandId);
                return retBand;
            })));
        });
    }
}
