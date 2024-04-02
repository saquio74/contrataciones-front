import { BasePagination, Profesional, ProfesionalFilter } from 'src/interfaces.ts'
import baseController from '../baseController'

class profesionalService extends baseController<
    Profesional,
    Profesional,
    ProfesionalFilter,
    BasePagination<Profesional>
> {}
export default new profesionalService('proveedores')
