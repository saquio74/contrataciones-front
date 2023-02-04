<template>
    <q-page class="column q-mt-lg">
        <q-card>
            <q-toolbar class="bg-purple text-white shadow-2 rounded-borders">
                <q-btn
                    flat
                    label="Liquidar"
                />
                <q-space />

                <q-tabs
                    v-model="tab"
                    shrink
                    stretch
                >
                    <q-tab
                        name="liquidar"
                        label="Liquidar"
                    />
                    <q-tab
                        name="editar"
                        label="Editar"
                    />
                </q-tabs>
            </q-toolbar>

            <q-separator />

            <q-tab-panels
                v-model="tab"
                animated
            >
                <q-tab-panel name="liquidar">
                    <LiquidarPartials />
                </q-tab-panel>
                <q-tab-panel name="editar">
                    <EditarLiquidacion />
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </q-page>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import LiquidarPartials from './partials/LiquidarPartials.vue'
import EditarLiquidacion from './partials/EditarLiquidacion.vue'
const tab = ref('liquidar')
</script>
