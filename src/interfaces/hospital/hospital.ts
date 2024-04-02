import { baseModel } from '../baseInterfaces/baseModel'
import { BaseFilter } from '../filters/baseFilter'

export interface Hospital extends baseModel {
    hospital?: string
}
export interface HospitalFilter extends BaseFilter {
    hospital?: string
}
