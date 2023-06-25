<template>
    <q-page class="column q-mt-lg">
        <q-card>
            <q-toolbar class="bg-blue-grey text-white shadow-2 rounded-borders">
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
                        name="ver"
                        label="Ver complementarias"
                    />
                </q-tabs>
            </q-toolbar>

            <q-separator />

            <q-tab-panels
                v-model="tab"
                animated
            >
                <q-tab-panel name="liquidar">
                    <LiquidarComplementaria />
                </q-tab-panel>
                <q-tab-panel name="ver">
                    <GetComplementaria />
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </q-page>
</template>
<script lang="ts" setup>
import LiquidarComplementaria from './partials/LiquidarComplementaria.vue'
import { ref } from 'vue'
import GetComplementaria from './partials/GetComplementaria.vue'

const tab = ref('liquidar')
</script>
