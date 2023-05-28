import { RouteRecordRaw } from 'vue-router'

const sectorRoutes: RouteRecordRaw[] = [
    {
        path: '/listado-de-sector',
        name: 'listado-de-sector',
        component: () => import('pages/sector/SectorView.vue')
    }
]

export default sectorRoutes
