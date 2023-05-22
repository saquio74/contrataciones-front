import { Agente, BasePagination, Roles, RolesFilter } from 'src/interfaces.ts'
import baseController from '../baseController'

class rolesService extends baseController<Roles, Roles, RolesFilter, BasePagination<Roles>> {
    public async updateRolUser(agenfac: Agente): Promise<void> {
        await this.api.put<Agente, void>('/user', agenfac)
    }
}
export default new rolesService('roles')
