import { BaseFilter } from '../filters/baseFilter'

export interface Hospital {
    id?: number
    hospital?: string
}
export interface HospitalFilter extends BaseFilter {
    hospital?: string
}
