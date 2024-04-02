import { RouteRecordRaw } from 'vue-router'
import agentesRoutes from '../pages/agentes/routesAgentes'
import routesLogin from '../pages/login/routesLogin'
import routesLiquidar from '../pages/liquidar/routesLiquidar'
import routesLiquidados from '../pages/listado/routesLiquidados'
import routesComplementaria from 'src/pages/complementaria/routesComplementaria'
import routesRoles from 'src/pages/roles/routesRoles'
import hospitalesRoutes from 'src/pages/hospitales/routesHospitales.ts'
import serviciosRoutes from 'src/pages/servicios/routesServicios.ts'
import sectorRoutes from 'src/pages/sector/routesSector.ts'
import incisosRoutes from 'src/pages/incisos/routesIncisos.ts'
import profesionalesRoutes from 'src/pages/profesionales/routesProfesionales.ts'
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
            ...agentesRoutes,
            ...routesLogin,
            ...routesLiquidar,
            ...routesLiquidados,
            ...routesComplementaria,
            ...routesRoles,
            ...hospitalesRoutes,
            ...serviciosRoutes,
            ...sectorRoutes,
            ...incisosRoutes,
            ...profesionalesRoutes
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
    }
]

export default routes
