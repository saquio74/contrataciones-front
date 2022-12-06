import { Api } from './axios'
class baseController<req, res, filter, resPaginated> extends Api {
    async baseGetById(extension: string): Promise<res> {
        return await this.api.get<req, res>(extension)
    }
    async baseGetQuery(query: filter, extension: string): Promise<resPaginated> {
        return await this.api.get<filter, resPaginated>(extension, { params: { ...query } })
    }
    async basePost(body: req, extension: string): Promise<res> {
        return await this.api.post<req, res>(extension, { ...body })
    }
    async basePut(body: req, extension: string): Promise<res> {
        return await this.api.put<req, res>(extension, body)
    }
    async baseDelete(extension: string): Promise<boolean> {
        return await this.api.delete<string, boolean>(extension)
    }
}
export default baseController
