import { BasePagination, Permisos, PermisosFilter } from 'src/interfaces.ts'
import baseController from '../baseController'

class permissionsService extends baseController<Permisos, Permisos, PermisosFilter, BasePagination<Permisos>> {}
export default new permissionsService('permissions')
