import { RouteRecordRaw } from 'vue-router'

const agentesRoutes: RouteRecordRaw[] = [
    {
        path: '/listado-de-agentes',
        name: 'listado-de-agentes',
        component: () => import('pages/agentes/AgentesView.vue')
    }
]

export default agentesRoutes
