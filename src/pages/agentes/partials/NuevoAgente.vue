<template>
    <q-card-section class="column q-mt-lg q-mx-lg text-green">
        <q-input
            v-model="agente.legajo"
            :type="'number'"
            label="Legajo"
        />
    </q-card-section>
</template>
<script setup lang="ts">
import { Agente } from 'src/interfaces.ts'
import { reactive } from 'vue'

const agente = reactive<Agente>({})
console.log(agente)
</script>
