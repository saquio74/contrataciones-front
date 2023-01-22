<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
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
import { ref } from 'vue'
import EssentialLink, { EssentialLinkProps } from '../components/EssentialLink.vue'
import { useQuasar } from 'quasar'

const essentialLinks: EssentialLinkProps[] = [
    {
        title: 'Agentes',
        caption: 'Listado de agentes',
        icon: 'person',
        link: 'listado-de-agentes'
    },
    {
        title: 'Liquidar',
        caption: 'Liquidar agentes',
        icon: 'create',
        link: 'liquidar-agentes'
    },
    {
        title: 'Discord Chat Channel',
        caption: 'chat.quasar.dev',
        icon: 'chat',
        link: 'https://chat.quasar.dev'
    },
    {
        title: 'Forum',
        caption: 'forum.quasar.dev',
        icon: 'record_voice_over',
        link: 'https://forum.quasar.dev'
    },
    {
        title: 'Twitter',
        caption: '@quasarframework',
        icon: 'rss_feed',
        link: 'https://twitter.quasar.dev'
    },
    {
        title: 'Facebook',
        caption: '@QuasarFramework',
        icon: 'public',
        link: 'https://facebook.quasar.dev'
    },
    {
        title: 'Quasar Awesome',
        caption: 'Community Quasar projects',
        icon: 'favorite',
        link: 'https://awesome.quasar.dev'
    }
]
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
