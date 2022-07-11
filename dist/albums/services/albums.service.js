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
    constructor() {
        super();
        this.baseURL = process.env.ALBUMS_URL;
    }
    getAlbum(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret;
            try {
                if (id) {
                    ret = yield this.get(id);
                }
                else {
                    ret = yield this.get('');
                }
            }
            catch (error) {
                console.log('Get album problem');
            }
            console.log(ret);
            return ret;
        });
    }
    createAlbum(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(obj);
        });
    }
    updateAlbum(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(obj);
        });
    }
}
