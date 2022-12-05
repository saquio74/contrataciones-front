import { RouteRecordRaw } from 'vue-router'
import agentesRoutes from '../pages/agentes/routesAgentes'
import routesLogin from '../pages/login/routesLogin'
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [{ path: '', component: () => import('pages/IndexPage.vue') }, ...agentesRoutes, ...routesLogin]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
    }
]

export default routes
