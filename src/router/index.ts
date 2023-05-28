import { route } from 'quasar/wrappers'
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import routes from './routes'
import { useUserStore } from 'src/stores/usersStore/userStore.ts'

export default route(function (/* { store, ssrContext } */) {
    const history = process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory
    const createHistory = process.env.SERVER ? createMemoryHistory : history

    const Router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,
        history: createHistory(process.env.VUE_ROUTER_BASE)
    })

    Router.beforeEach((to) => {
        const userStore = useUserStore()
        const verificarPublic = to.name === 'login-view' || to.name === 'register-view'
        if (!userStore.user && !verificarPublic) {
            return { name: 'login-view' }
        }
    })
    return Router
})
