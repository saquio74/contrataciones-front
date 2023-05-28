import { BasePagination, Hospital, HospitalFilter } from 'src/interfaces.ts'
import baseController from '../baseController'

class hospitalService extends baseController<Hospital, Hospital, HospitalFilter, BasePagination<Hospital>> {}
export default new hospitalService('hospitales')
