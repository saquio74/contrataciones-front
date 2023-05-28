import { BasePagination, Servicio, ServicioFilter } from 'src/interfaces.ts'
import baseController from '../baseController'

class servicioService extends baseController<Servicio, Servicio, ServicioFilter, BasePagination<Servicio>> {}
export default new servicioService('servicio')
