import { BaseFilter } from 'src/interfaces/filters/baseFilter.ts'
import type { BasePagination } from 'src/interfaces/pagination/basePagination.ts'
import { Login, User } from '../../interfaces/index'
import baseController from '../baseController'
class userService extends baseController<User, User, BaseFilter, BasePagination<User>> {
    public logout() {
        this.api.post('logout')
    }
    public async login(login: Login): Promise<User> {
        return await this.api.post<Login, User>('login', login)
    }
}
export default new userService('users')
