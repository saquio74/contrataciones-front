import { BasePagination, Permisos, PermisosFilter } from 'src/interfaces'
import baseController from '../baseController'

class permissionsService extends baseController<Permisos, Permisos, PermisosFilter, BasePagination<Permisos>> {}
export default new permissionsService('permissions')
