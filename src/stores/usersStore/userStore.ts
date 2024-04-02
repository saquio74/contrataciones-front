import { defineStore } from 'pinia'
import type { User, Login, Registro } from 'src/interfaces/index.ts'
import { computed, ref } from 'vue'
import userService from 'src/boot/services/userService.ts'

export const useUserStore = defineStore('user', () => {
    const user = ref<User>()

    const buscarRol = (rol: string) =>
        user.value?.roles?.permissionsrole.some((data) => data.permissions?.slug.toLocaleLowerCase().includes(rol))
    const puedeVerProfesionales = computed(() => buscarRol('profesionales.ver'))
    const puedeEditarProfesionales = computed(() => buscarRol('profesionales.editar'))
    const puedeCrearProfesionales = computed(() => buscarRol('profesionales.crear'))
    const puedeBorrarProfesionales = computed(() => buscarRol('profesionales.borrar'))

    const puedeVerAgentes = computed(() => buscarRol('agentes.ver'))
    const puedeEditarAgentes = computed(() => buscarRol('agentes.editar'))
    const puedeCrearAgentes = computed(() => buscarRol('agentes.crear'))
    const puedeBorrarAgentes = computed(() => buscarRol('agentes.borrar'))

    const liquidar = computed(() =>
        user.value?.roles?.permissionsrole.some((data) =>
            data?.permissions?.name.toLocaleLowerCase().includes('liquidar')
        )
    )
    const vip = computed(() => user.value?.roles?.special === 'all-access')
    const login = async (loginData: Login) => {
        const response: User = await userService.login(loginData)
        setUser(response)
    }
    const register = async (register: Registro) => {
        const respose: User = await userService.register(register)
        setUser(respose)
    }
    const setUser = (userResponse: User) => {
        user.value = userResponse
        localStorage.setItem('token-laravel', userResponse.token)
        userService.instanceToken()
    }
    const authenticate = async () => {
        user.value = await userService.baseGetById('currentUser')
    }

    const logout = async () => {
        userService.logout()
        localStorage.removeItem('laravel-token')
        userService.instanceToken()
        user.value = undefined
    }
    return {
        user,
        vip,
        puedeVerAgentes,
        puedeCrearAgentes,
        puedeEditarAgentes,
        puedeBorrarAgentes,
        liquidar,
        puedeVerProfesionales,
        puedeCrearProfesionales,
        puedeEditarProfesionales,
        puedeBorrarProfesionales,
        login,
        register,
        authenticate,
        logout
    }
})
