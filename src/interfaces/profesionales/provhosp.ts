import { baseModel } from '../baseInterfaces/baseModel'
import { Hospital } from '../hospital/hospital'

export interface Provhosp extends baseModel {
    hospital_id: number
    proveedor_id: number
    hospital?: Hospital
}
