import { RouteRecordRaw } from 'vue-router'

const incisosRoutes: RouteRecordRaw[] = [
    {
        path: '/listado-de-incisos',
        name: 'listado-de-incisos',
        component: () => import('pages/incisos/IncisosView.vue')
    }
]

export default incisosRoutes
