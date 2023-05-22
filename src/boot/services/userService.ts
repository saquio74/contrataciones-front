import { BaseFilter } from 'src/interfaces/filters/baseFilter.ts'
import type { BasePagination } from 'src/interfaces/pagination/basePagination.ts'
import { User } from '../../interfaces/index'
import baseController from '../baseController'
class userService extends baseController<User, User, BaseFilter, BasePagination<User>> {}
export default new userService('users')
