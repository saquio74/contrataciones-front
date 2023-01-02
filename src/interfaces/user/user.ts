import { Roles } from '../rolesPermisos/roles'

export default interface User {
    id: number
    name: string
    email: string
    email_verified_at: Date
    token: string
    role_id: number
    created_at: Date
    updated_at: Date
    roles: Roles
}
