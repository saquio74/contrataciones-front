import { BaseFilter } from 'src/interfaces/filters/baseFilter'
import type { BasePagination } from 'src/interfaces/pagination/basePagination'
import { ChangePassword, Login, Registro, User } from '../../interfaces/index'
import baseController from '../baseController'
class userService extends baseController<User, User, BaseFilter, BasePagination<User>> {
    public logout() {
        this.api.post('logout')
    }
    public async login(login: Login): Promise<User> {
        return await this.api.post<Login, User>('login', login)
    }
    public async register(registro: Registro): Promise<User> {
        return await this.api.post<Registro, User>('register', registro)
    }
    public async updatePassword(passwordRequest: ChangePassword) {
        return await this.api.patch<ChangePassword, void>('updatePassword', passwordRequest)
    }
}
export default new userService('users')
