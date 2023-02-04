import { RouteRecordRaw } from 'vue-router'

const liquidadosRoutes: RouteRecordRaw[] = [
    {
        path: '/listado-liquidados',
        name: 'listado-liquidados',
        component: () => import('pages/listado/ListadoLiquidadosView.vue')
    }
]

export default liquidadosRoutes
