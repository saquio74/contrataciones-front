import { Agenfac } from '../agenfac/agenfac'
import { BaseFilter } from '../filters/baseFilter'
import { Hospital } from '../hospital/hospital'
import { Ageninc } from '../incisos/incisos'
import { Sector } from '../sector/sector'
import { Servicio } from '../servicio/servicio'

export interface Agente {
    id?: number
    legajo?: number
    dni?: number
    nombre?: string
    codigo?: string
    incisos?: number[]
    horarios?: string
    telefono?: string
    hospital?: Hospital
    servicio?: Servicio
    sector?: Sector
    sector_id?: number
    hospital_id?: number
    servicio_id?: number
    created_at?: Date
    updated_at?: Date
    deleted_at?: Date
    created_by?: number
    updated_by?: number
    deleted_by?: number
    ageninc?: Ageninc[]
    liquidacion_actual?: Agenfac[]
}

export interface AgentesFilter extends BaseFilter {
    nombre?: string
    inciso?: string
    hospital?: string
    servicio?: string
    sector?: string
    legajo?: string
    dni?: string
    hospitalId?: number
    servicioId?: number
    sectorId?: number
}
