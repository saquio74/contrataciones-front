<template>
    <q-layout view="lHh Lpr lFf">
        <q-header class="print-hide">
            <q-toolbar>
                <q-btn
                    flat
                    dense
                    round
                    icon="menu"
                    aria-label="Menu"
                    @click="toggleLeftDrawer"
                />
                <q-toolbar-title> Sistema de liquidadcion </q-toolbar-title>

                <q-toggle
                    v-model="darkMode"
                    label="ModoOscuro"
                    color="green"
                    @click="changeMode"
                />
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
            class="print-hide"
        >
            <q-list>
                <q-item-label header> Opciones </q-item-label>

                <EssentialLink
                    v-for="link in essentialLinks"
                    :key="link.title"
                    v-bind="link"
                />
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import EssentialLink, { EssentialLinkProps } from '../components/EssentialLink.vue'
import { useQuasar } from 'quasar'
import { useUserStore } from 'src/stores/usersStore/userStore'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const { vip, puedeVerAgentes, liquidar, puedeVerProfesionales } = storeToRefs(userStore)
const essentialLinks = computed<EssentialLinkProps[]>(() => [
    {
        title: 'Inicio',
        caption: 'Pagina principal',
        icon: 'home',
        link: 'home',
        show: liquidar.value
    },
    {
        title: 'Agentes',
        caption: 'Listado de agentes',
        icon: 'person',
        link: 'listado-de-agentes',
        show: puedeVerAgentes.value
    },
    {
        title: 'Liquidar',
        caption: 'Liquidar agentes',
        icon: 'create',
        link: 'liquidar-agentes',
        show: liquidar.value
    },
    {
        title: 'Listado de liquidados',
        caption: 'Liquidar agentes',
        icon: 'person',
        link: 'listado-liquidados',
        show: liquidar.value
    },
    {
        title: 'Complementarias',
        caption: 'Liquidar complementarias',
        icon: 'create',
        link: 'complementarias-view',
        show: liquidar.value
    },
    {
        title: 'Roles y permisos',
        caption: 'Editar roles y permisos',
        icon: 'record_voice_over',
        link: 'roles-view',
        show: vip.value
    },
    {
        title: 'Hospitales',
        caption: 'Administrar hopitales',
        icon: 'local_hospital',
        link: 'listado-de-hospitales',
        show: vip.value
    },
    {
        title: 'Servicios',
        caption: 'Administrar servicios',
        icon: 'home_repair_service',
        link: 'listado-de-servicios',
        show: vip.value
    },
    {
        title: 'Sector',
        caption: 'Administrar sector',
        icon: 'design_services',
        link: 'listado-de-sector',
        show: vip.value
    },
    {
        title: 'Incisos',
        caption: 'Administrar incisos',
        icon: 'money',
        link: 'listado-de-incisos',
        show: vip.value
    },
    {
        title: 'Profesionales',
        caption: 'Administrar profesionales',
        icon: 'person',
        link: 'listado-de-profesionales',
        show: puedeVerProfesionales.value
    }
])
const quasar = useQuasar()
const darkMode = ref<boolean>(localStorage.getItem('dark-mode') === 'true')

quasar.dark.set(darkMode.value)

const leftDrawerOpen = ref(false)

const changeMode = () => {
    localStorage.setItem('dark-mode', darkMode.value.toString())
    quasar.dark.set(darkMode.value)
}

function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
<style lang="scss" scoped>
@media print {
    .print-hide {
        display: none !important;
    }
}
</style>
