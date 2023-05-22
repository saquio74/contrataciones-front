import { BaseFilter } from '../filters/baseFilter'
import { Roles } from '../rolesPermisos/roles'

export interface User {
    id: number
    name: string
    email: string
    email_verified_at?: Date
    token: string
    role_id: number
    created_at?: Date
    updated_at?: Date
    roles?: Roles
}
export interface UserFilter extends BaseFilter {
    name?: string
    email?: string
}
