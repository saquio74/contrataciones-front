import { RouteRecordRaw } from 'vue-router'

const hospitalesRoutes: RouteRecordRaw[] = [
    {
        path: '/listado-de-hospitales',
        name: 'listado-de-hospitales',
        component: () => import('pages/hospitales/HospitalView.vue')
    }
]

export default hospitalesRoutes
