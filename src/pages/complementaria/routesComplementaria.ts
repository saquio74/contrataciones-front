import { RouteRecordRaw } from 'vue-router'

const liquidadosRoutes: RouteRecordRaw[] = [
    {
        path: '/complementarias-view',
        name: 'complementarias-view',
        component: () => import('pages/complementaria/ComplementariasView.vue')
    }
]

export default liquidadosRoutes
