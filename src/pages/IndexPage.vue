<template>
    <q-page class="column items-center q-ma-md">
        <h4 class="text-primary">Bienvenid@ {{ user?.name }}</h4>

        <h5 class="text-primary">Tu rol es: {{ user?.roles.name }}</h5>
        <h5 class="text-primary">Tu permisos son:</h5>
        <div class="row ms-1">
            <div
                v-for="permiso in user?.roles.permissionsrole"
                :key="permiso.id"
                class="col-sm-3"
            >
                <q-btn
                    class="mt-1"
                    color="secondary q-ma-sm"
                >
                    {{ permiso.permissions.name }}
                </q-btn>
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/usersStore/userStore.ts'
import { storeToRefs } from 'pinia'
// import { ref } from 'vue'
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>
