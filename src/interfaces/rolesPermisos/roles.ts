import { BaseFilter } from '../filters/baseFilter'
import { User } from '../user/user'
import { RolesPermisos } from './rolesPermisos'

export interface Roles {
    id?: number
    name: string
    description: string
    special: string
    deleted_at?: Date
    created_at?: Date
    updated_at?: Date
    created_by?: number
    updated_by?: number
    deleted_by?: number
    permissionsrole: RolesPermisos[]
    user: User[]
}
export interface RolesFilter extends BaseFilter {
    rol?: string
}
