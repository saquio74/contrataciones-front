import { BasePagination, Complementaria, ComplementariaFilter } from 'src/interfaces'
import baseController from '../baseController'

class ComplementariaService extends baseController<
    Complementaria,
    Complementaria,
    ComplementariaFilter,
    BasePagination<Complementaria>
> {
    public async liquidacionMasiva(agenfac: Complementaria[]): Promise<void> {
        await this.api.post<Complementaria[], boolean>('guardarLiquidacion', agenfac)
    }
    public async getPDF(agenfacFilter: ComplementariaFilter): Promise<string> {
        return await this.api.get<ComplementariaFilter, string>('getPDF', {
            params: { ...agenfacFilter },
            responseType: 'blob'
        })
    }
}
export default new ComplementariaService('complementaria')
