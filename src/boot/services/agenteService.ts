import { BasePagination, Agente, AgentesFilter } from 'src/interfaces.ts'
import baseController from '../baseController'

class agenteService extends baseController<Agente, Agente, AgentesFilter, BasePagination<Agente>> {}
export default new agenteService('agentes')
