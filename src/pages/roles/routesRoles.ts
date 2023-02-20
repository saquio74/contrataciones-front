import { RouteRecordRaw } from 'vue-router'

const agentesRoutes: RouteRecordRaw[] = [
    {
        path: '/roles-view',
        name: 'roles-view',
        component: () => import('pages/roles/RolesView.vue')
    }
]

export default agentesRoutes
