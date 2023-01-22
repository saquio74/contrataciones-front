import { RouteRecordRaw } from 'vue-router'
import agentesRoutes from '../pages/agentes/routesAgentes'
import routesLogin from '../pages/login/routesLogin'
import routesLiquidar from '../pages/liquidar/routesLiquidar'
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
            ...agentesRoutes,
            ...routesLogin,
            ...routesLiquidar
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
    }
]

export default routes
