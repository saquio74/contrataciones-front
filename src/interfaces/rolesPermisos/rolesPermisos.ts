import { Permisos } from './permisos'

export interface RolesPermisos {
    id?: number
    permmissions_id: number
    roles_id: number
    permissions?: Permisos
    deleted_at?: Date
    created_at?: Date
    updated_at?: Date
    created_by?: number
    updated_by?: number
    deleted_by?: number
}
