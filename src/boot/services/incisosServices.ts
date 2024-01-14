import { BasePagination, Inciso, IncisoFilter } from 'src/interfaces.ts'
import baseController from '../baseController'

class incisoService extends baseController<Inciso, Inciso, IncisoFilter, BasePagination<Inciso>> {}
export default new incisoService('incisos')
