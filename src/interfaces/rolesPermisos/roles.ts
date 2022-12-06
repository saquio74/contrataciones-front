import { RolesPermisos } from './rolesPermisos'

export interface Roles {
    id: 1
    name: string
    description: string
    special: string
    deleted_at: Date
    created_at: Date
    updated_at: Date
    created_by: number
    updated_by: number
    deleted_by: number
    permissionsrole: RolesPermisos[]
}
