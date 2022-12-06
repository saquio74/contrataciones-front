import { BaseFilter } from 'src/interfaces/filters/baseFilter.ts'
import Login from 'src/interfaces/login.ts'
import { BasePagination } from 'src/interfaces/pagination/basePagination.ts'
import { User } from 'src/interfaces/user/user.ts'
import baseController from '../baseController'
class userService extends baseController<Login, User, BaseFilter, BasePagination<User>> {}
export default new userService('user')
