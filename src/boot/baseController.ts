import { Api } from './axios'
class baseController<req, res, filter, resPaginated> extends Api {
    async baseGetById(extension = ''): Promise<res> {
        return await this.api.get<req, res>(extension)
    }
    async baseGet(extension = ''): Promise<res[]> {
        return await this.api.get<req, res[]>(extension)
    }
    async baseGetQuery(query: filter, extension = ''): Promise<resPaginated> {
        return await this.api.get<filter, resPaginated>(extension, { params: { ...query } })
    }
    async baseGetQueryWithoutPagination(query: filter, extension = ''): Promise<res[]> {
        return await this.api.get<filter, res[]>(extension, { params: { ...query } })
    }
    async basePost(body: req, extension = ''): Promise<res> {
        return await this.api.post<req, res>(extension, { ...body })
    }
    async basePut(body: req, extension = ''): Promise<res> {
        return await this.api.put<req, res>(extension, body)
    }
    async baseDelete(extension = ''): Promise<boolean> {
        return await this.api.delete<string, boolean>(extension)
    }
}
export default baseController
