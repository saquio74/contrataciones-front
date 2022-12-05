<template>
    <q-item
        clickable
        tag="a"
        target="_blank"
        @click="goTo(link)"
    >
        <q-item-section
            v-if="icon"
            avatar
        >
            <q-icon :name="icon" />
        </q-item-section>

        <q-item-section>
            <q-item-label>{{ title }}</q-item-label>
            <q-item-label caption>
                {{ caption }}
            </q-item-label>
        </q-item-section>
    </q-item>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
export interface EssentialLinkProps {
    title: string
    caption?: string
    link?: string
    icon?: string
}

const routerBase = useRouter()

withDefaults(defineProps<EssentialLinkProps>(), {
    caption: '',
    link: '#',
    icon: ''
})
const goTo = (link: string) => {
    routerBase.push({ name: link })
}
</script>
