import { RouteRecordRaw } from 'vue-router'

const agentesRoutes: RouteRecordRaw[] = [
    {
        path: '/liquidar-agentes',
        name: 'liquidar-agentes',
        component: () => import('pages/liquidar/LiquidarView.vue')
    }
]

export default agentesRoutes
