import { BasePagination, Sector, SectorFilter } from 'src/interfaces'
import baseController from '../baseController'

class sectorService extends baseController<Sector, Sector, SectorFilter, BasePagination<Sector>> {}
export default new sectorService('sector')
