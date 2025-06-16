import { RouteRecordRaw } from 'vue-router'

const profesionalesRoutes: RouteRecordRaw[] = [
    {
        path: '/listado-de-profesionales',
        name: 'listado-de-profesionales',
        component: () => import('pages/profesionales/ProfesionalesView.vue')
    }
]

export default profesionalesRoutes
