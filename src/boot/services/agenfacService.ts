import { BasePagination, Agenfac, AgenfacFilter } from 'src/interfaces.ts'
import baseController from '../baseController'

class agenteService extends baseController<Agenfac, Agenfac, AgenfacFilter, BasePagination<Agenfac>> {
    public async liquidacionMasiva(agenfac: Agenfac[]): Promise<void> {
        await this.api.post<Agenfac[], boolean>('guardarLiquidacion', agenfac)
    }
}
export default new agenteService('agenfac')
