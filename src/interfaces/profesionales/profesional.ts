import type { baseModel } from 'src/interfaces/baseInterfaces/baseModel'
import { BaseFilter } from '../filters/baseFilter'
import { Provhosp } from './provhosp'
export interface Profesional extends baseModel {
    proveedor: number
    nombre: string
    apellido: string
    dni: number
    cuil: number
    genero: string
    matricula: string
    provhosp?: Provhosp[]
}

export interface ProfesionalFilter extends BaseFilter {
    nombre?: string
}
