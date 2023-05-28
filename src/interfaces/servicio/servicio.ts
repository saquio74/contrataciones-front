import { BaseFilter } from '../filters/baseFilter'

export interface Servicio {
    id?: number
    servicio?: string
}
export interface ServicioFilter extends BaseFilter {
    servicio?: string
}
