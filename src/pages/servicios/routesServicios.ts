import { RouteRecordRaw } from 'vue-router'

const serviciosRoutes: RouteRecordRaw[] = [
    {
        path: '/listado-de-servicios',
        name: 'listado-de-servicios',
        component: () => import('pages/servicios/ServiciosView.vue')
    }
]

export default serviciosRoutes
