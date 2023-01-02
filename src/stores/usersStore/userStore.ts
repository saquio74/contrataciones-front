import { defineStore } from 'pinia'
import type { User, Login } from 'src/interfaces/index.ts'
import { ref } from 'vue'
import userService from 'src/boot/services/userService'

export const useUserStore = defineStore('user', () => {
    const user = ref<User>()

    const login = async (loginData: Login) => {
        const response: User = await userService.basePost(loginData, 'login')
        user.value = response
        localStorage.setItem('token-laravel', response.token)
    }
    const authenticate = async () => {
        user.value = await userService.baseGetById('')
    }

    return {
        user,
        login,
        authenticate
    }
})
