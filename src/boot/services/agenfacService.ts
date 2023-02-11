import { BasePagination, Agenfac, AgenfacFilter } from 'src/interfaces.ts'
import baseController from '../baseController'

class agenteService extends baseController<Agenfac, Agenfac, AgenfacFilter, BasePagination<Agenfac>> {
    public async liquidacionMasiva(agenfac: Agenfac[]): Promise<void> {
        await this.api.post<Agenfac[], boolean>('guardarLiquidacion', agenfac)
    }
    public async getExcel(agenfacFilter: AgenfacFilter): Promise<string> {
        return await this.api.get<AgenfacFilter, string>('getExcel', {
            params: { ...agenfacFilter },
            responseType: 'blob'
        })
    }
    public async getPDF(agenfacFilter: AgenfacFilter): Promise<string> {
        return await this.api.get<AgenfacFilter, string>('getPDF', {
            params: { ...agenfacFilter },
            responseType: 'blob'
        })
    }
}
export default new agenteService('agenfac')
