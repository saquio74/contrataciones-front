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
    },
    {
        path: '/change-password-view',
        name: 'change-password-view',
        component: () => import('pages/login/ChangePasswordView.vue')
    }
]

export default agentesRoutes
