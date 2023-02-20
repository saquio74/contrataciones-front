import { Agente } from '../agentes/agentes'
import { Hospital } from '../hospital/hospital'
import { Inciso } from '../incisos/incisos'
import { AgenfacFilter } from './agenfac'

export interface Complementaria {
    fecha: string
    hospital_id?: number
    inciso_id?: number
    id?: number
    legajo?: number
    inciso?: Inciso
    agente_id?: number
    nombre?: string
    hospital?: number
    valor?: number
    servicio?: string
    sector?: string
    periodo: string
    anio: number
    horas: number
    subtotal: number
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
export interface ComplementariaFilter extends AgenfacFilter {
    fecha?: string
}
