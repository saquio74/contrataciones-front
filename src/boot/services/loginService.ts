import { BaseFilter } from 'src/interfaces/filters/baseFilter.ts'
import Login from 'src/interfaces/login.ts'
import type { BasePagination } from 'src/interfaces/pagination/basePagination.ts'
import { User } from '../../interfaces/index'
import baseController from '../baseController'
class userService extends baseController<Login, User, BaseFilter, BasePagination<User>> {}
export default new userService('users')
