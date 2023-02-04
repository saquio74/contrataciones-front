import { Agente } from '../agentes/agentes'
import { BaseFilter } from '../filters/baseFilter'
import { Hospital } from '../hospital/hospital'
import { Inciso } from '../incisos/incisos'

export interface Agenfac {
    id?: number
    legajo?: number
    inciso?: Inciso
    agente_id?: number
    nombre?: string
    hospital?: number
    valor?: number
    servicio?: string
    sector?: string
    inc: number
    periodo: string
    anio: number
    horas: number
    subtot: number
    bonvalor: number
    total: number
    bonificacion: number
    created_by?: Date | null
    created_at?: number | null
    updated_by?: Date | null
    updated_at?: number | null
    deleted_by?: Date | null
    deleted_at?: number | null
    hospital_info?: Hospital
    agente?: Agente
}

export interface AgenfacFilter extends BaseFilter {
    nombre?: string
    hospital_id?: number
    periodo?: string
    anio?: number
}
