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
export class albumServices extends RESTDataSource {
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
    getAlbum(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret;
            try {
                if (id) {
                    ret = yield this.get(`/${id}`);
                    ret.id = ret._id;
                    if (ret.artistsIds) {
                        ret.artists = yield this.artistResolver(ret.artistsIds);
                    }
                    if (ret.bandsIds) {
                        ret.bands = yield this.bandResolver(ret.bandsIds);
                    }
                    if (ret.tracksIds) {
                        ret.tracks = yield this.trackResolver(ret.tracksIds);
                    }
                }
                else {
                    ret = yield this.get('/');
                    ret = ret.items;
                    ret = yield Promise.all(ret.map((album) => __awaiter(this, void 0, void 0, function* () {
                        album.id = album._id;
                        if (album.artistsIds) {
                            album.artists = yield this.artistResolver(album.artistsIds);
                        }
                        if (album.bandsIds) {
                            album.bands = yield this.bandResolver(album.bandsIds);
                        }
                        if (album.tracksIds) {
                            album.tracks = yield this.trackResolver(album.tracksIds);
                        }
                        return album;
                    })));
                }
            }
            catch (error) {
                console.log('Get album problem');
            }
            return ret;
        });
    }
    createAlbum(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.post('/', JSON.stringify(obj));
            }
            catch (error) {
                console.log('Post album problem');
                return 'Post album problem';
            }
        });
    }
    updateAlbum(id, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.put(`/${id}`, JSON.stringify(obj));
            }
            catch (error) {
                console.log('Update album problem');
                return 'Update album problem';
            }
        });
    }
    deleteAlbum(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.delete(`/${id}`);
            }
            catch (error) {
                console.log('Delete album problem');
                return 'Delete album problem';
            }
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
    bandResolver(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(ids.map((bandId) => __awaiter(this, void 0, void 0, function* () {
                const retBand = yield this.context.dataSources.bandAPI.getBand(bandId);
                return retBand;
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
}
