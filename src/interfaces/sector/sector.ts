import { BaseFilter } from '../filters/baseFilter'

export interface Sector {
    id?: number
    sector?: string
}
export interface SectorFilter extends BaseFilter {
    sector?: string
}
