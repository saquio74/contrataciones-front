import { RouteRecordRaw } from 'vue-router'

const agentesRoutes: RouteRecordRaw[] = [
    {
        path: '/login-view',
        name: 'login-view',
        component: () => import('pages/login/LoginView.vue')
    },
    {
        path: '/register-view',
        name: 'register-view',
        component: () => import('pages/login/RegisterView.vue')
    }
]

export default agentesRoutes
