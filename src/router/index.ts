import { route } from 'quasar/wrappers'
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import routes from './routes'
import { useUserStore } from 'src/stores/usersStore/userStore.ts'

// const userStore = useUserStore()
// console.log('asdfasdf', userStore)
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

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
        if (!userStore.user && to.name !== 'login-view') {
            return { name: 'login-view' }
        }
    })
    return Router
})
