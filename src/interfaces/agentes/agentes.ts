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
    incisos?: number[]
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
}

export interface AgentesFilter extends BaseFilter {
    nombre?: string
    inciso?: string
    hospital?: string
    servicio?: string
    sector?: string
    hospitalId?: number
    servicioId?: number
    sectorId?: number
}
