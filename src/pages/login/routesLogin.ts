import { RouteRecordRaw } from 'vue-router'

const agentesRoutes: RouteRecordRaw[] = [
    {
        path: '/login-view',
        name: 'login-view',
        component: () => import('pages/login/LoginView.vue')
    }
]

export default agentesRoutes
