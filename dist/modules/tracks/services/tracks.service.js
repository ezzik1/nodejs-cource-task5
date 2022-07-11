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
export class tracksServices extends RESTDataSource {
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
    getTrack(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret;
            try {
                if (id) {
                    ret = yield this.get(`/${id}`);
                    ret.id = ret._id;
                    if (ret.albumId) {
                        ret.album =
                            yield this.context.dataSources.albumAPI.getAlbum(ret.albumId);
                    }
                    if (ret.artistsIds) {
                        ret.artists = yield this.artistResolver(ret.artistsIds);
                    }
                    if (ret.bandsIds) {
                        ret.bands = yield this.bandResolver(ret.bandsIds);
                    }
                    if (ret.genresIds) {
                        ret.genres = yield this.genreResolver(ret.genresIds);
                    }
                }
                else {
                    ret = yield this.get('/');
                    ret = ret.items;
                    ret = yield Promise.all(ret.map((track) => __awaiter(this, void 0, void 0, function* () {
                        track.id = track._id;
                        if (track.albumId) {
                            track.album =
                                yield this.context.dataSources.albumAPI.getAlbum(track.albumId);
                        }
                        if (track.artistsIds) {
                            track.artists = yield this.artistResolver(track.artistsIds);
                        }
                        if (track.bandsIds) {
                            track.bands = yield this.bandResolver(track.bandsIds);
                        }
                        if (track.genresIds) {
                            track.genres = yield this.genreResolver(track.genresIds);
                        }
                    })));
                }
            }
            catch (error) {
                console.log('Get track problem');
            }
            return ret;
        });
    }
    createTrack(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.post('/', JSON.stringify(obj));
            }
            catch (error) {
                console.log('Post track problem');
                return 'Post track problem';
            }
        });
    }
    updateTrack(id, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.put(`/${id}`, JSON.stringify(obj));
            }
            catch (error) {
                console.log('Update track problem');
                return 'Update track problem';
            }
        });
    }
    deleteTrack(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.delete(`/${id}`);
            }
            catch (error) {
                console.log('Delete track problem');
                return 'Delete track problem';
            }
        });
    }
    artistResolver(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(ids.map((artistId) => __awaiter(this, void 0, void 0, function* () {
                return yield this.context.dataSources.artistAPI.getArtist(artistId);
            })));
        });
    }
    bandResolver(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(ids.map((bandId) => __awaiter(this, void 0, void 0, function* () {
                return yield this.context.dataSources.bandAPI.getBand(bandId);
            })));
        });
    }
    genreResolver(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(ids.map((genreId) => __awaiter(this, void 0, void 0, function* () {
                return yield this.context.dataSources.genreAPI.getGenre(genreId);
            })));
        });
    }
}
