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
export class favoriteServices extends RESTDataSource {
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
    getFavorites() {
        return __awaiter(this, void 0, void 0, function* () {
            const ret = yield this.get('/');
            ret.id = ret._id;
            if (ret.bandsIds) {
                ret.bands = yield this.bandResolver(ret.bandsIds);
            }
            if (ret.genresIds) {
                ret.genres = yield this.genreResolver(ret.genresIds);
            }
            if (ret.artistsIds) {
                ret.artists = yield this.artistResolver(ret.artistsIds);
            }
            if (ret.tracksIds) {
                ret.tracks = yield this.trackResolver(ret.tracksIds);
            }
            return ret;
        });
    }
    addTrack(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = {
                type: 'track',
                id: id,
            };
            return yield this.post('/add', JSON.stringify(obj));
        });
    }
    addBand(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = {
                type: 'band',
                id: id,
            };
            return yield this.post('/add', JSON.stringify(obj));
        });
    }
    addArtist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = {
                type: 'artist',
                id: id,
            };
            return yield this.post('/add', JSON.stringify(obj));
        });
    }
    addGenre(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = {
                type: 'genre',
                id: id,
            };
            return yield this.post('/add', JSON.stringify(obj));
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
    genreResolver(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(ids.map((genreId) => __awaiter(this, void 0, void 0, function* () {
                const retGenre = yield this.context.dataSources.genreAPI.getGenre(genreId);
                return retGenre;
            })));
        });
    }
    artistResolver(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(ids.map((artistId) => __awaiter(this, void 0, void 0, function* () {
                const retArtist = yield this.context.dataSources.artistAPI.getArtist(artistId);
                return retArtist;
            })));
        });
    }
    trackResolver(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(ids.map((trackId) => __awaiter(this, void 0, void 0, function* () {
                const retTrack = yield this.context.dataSources.trackAPI.getTrack(trackId);
                return retTrack;
            })));
        });
    }
}
