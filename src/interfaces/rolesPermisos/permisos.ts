import { BaseFilter } from '../filters/baseFilter'

export interface Permisos {
    id: number
    slug?: string
    name: string
    description?: string
    deleted_at?: Date
    created_at?: Date
    updated_at?: Date
    created_by?: number
    updated_by?: number
    deleted_by?: number
}
export interface PermisosFilter extends BaseFilter {
    slug?: string
    name?: string
    description?: string
}
