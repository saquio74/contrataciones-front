import { Api } from './axios'
class baseController<Req, Res> extends Api {
    async baseGet(extension: string) {
        return await this.api.get<Req, Res>(extension)
    }
}
export default baseController
