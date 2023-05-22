<template>
    <q-page class="column q-mt-lg">
        <q-card>
            <q-toolbar class="bg-purple text-white shadow-2 rounded-borders">
                <q-btn
                    flat
                    label="Roles y permisos"
                />
                <q-space />

                <q-tabs
                    v-model="tab"
                    shrink
                    stretch
                >
                    <q-tab
                        name="roles"
                        label="Roles"
                    />
                    <q-tab
                        name="permisos"
                        label="Permisos"
                    />
                    <q-tab
                        name="usuarios"
                        label="usuarios"
                    />
                </q-tabs>
            </q-toolbar>

            <q-separator />

            <q-tab-panels
                v-model="tab"
                animated
            >
                <q-tab-panel name="roles"><RolesPartial /></q-tab-panel>
                <q-tab-panel name="permisos"><PermissionsPartial /></q-tab-panel>
                <q-tab-panel name="usuarios"><UsuariosPartial /></q-tab-panel>
            </q-tab-panels>
        </q-card>
    </q-page>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import RolesPartial from './partials/RolesPartial.vue'
import PermissionsPartial from './partials/PermissionsPartial.vue'
import UsuariosPartial from './partials/UsuariosPartial.vue'
const tab = ref<string>('usuarios')
</script>
