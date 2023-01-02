<template>
    <router-view />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/usersStore/userStore'
import { onBeforeMount } from 'vue'
const storeUser = useUserStore()
const router = useRouter()
const { authenticate } = storeUser
onBeforeMount(async () => {
    try {
        await authenticate()
    } catch (error) {
        console.log(error)
    }

    router.push({ name: 'home' })
})
</script>
