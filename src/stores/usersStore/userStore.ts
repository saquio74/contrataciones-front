import { defineStore } from 'pinia'
import type { User, Login } from 'src/interfaces/index.ts'
import { computed, ref } from 'vue'
import loginService from 'src/boot/services/loginService.ts'

export const useUserStore = defineStore('user', () => {
    const user = ref<User>()

    const puedeVerAgentes = computed(() =>
        user.value?.roles?.permissionsrole.some((data) =>
            data.permissions?.slug.toLocaleLowerCase().includes('agentes.ver')
        )
    )
    const puedeEditarAgentes = computed(() =>
        user.value?.roles?.permissionsrole.some((data) =>
            data.permissions?.slug.toLocaleLowerCase().includes('agentes.editar')
        )
    )
    const puedeCrearAgentes = computed(() =>
        user.value?.roles?.permissionsrole.some((data) =>
            data.permissions?.slug.toLocaleLowerCase().includes('agentes.crear')
        )
    )
    const puedeBorrarAgentes = computed(() =>
        user.value?.roles?.permissionsrole.some((data) =>
            data.permissions?.slug.toLocaleLowerCase().includes('agentes.borrar')
        )
    )
    const liquidar = computed(() =>
        user.value?.roles?.permissionsrole.some((data) =>
            data?.permissions?.name.toLocaleLowerCase().includes('liquidar')
        )
    )
    const vip = computed(() => user.value?.roles?.special === 'all-access')
    const login = async (loginData: Login) => {
        const response: User = await loginService.basePost(loginData, 'login')
        user.value = response
        localStorage.setItem('token-laravel', response.token)
    }
    const authenticate = async () => {
        user.value = await loginService.baseGetById('currentUser')
    }

    return {
        user,
        vip,
        puedeVerAgentes,
        puedeCrearAgentes,
        puedeEditarAgentes,
        puedeBorrarAgentes,
        liquidar,
        login,
        authenticate
    }
})
