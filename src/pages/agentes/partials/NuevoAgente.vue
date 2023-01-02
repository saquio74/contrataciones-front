<template>
    <q-card-section class="column q-mt-lg q-mx-lg">
        <q-input :model-value="agente.legajo" />
    </q-card-section>
</template>
<script setup lang="ts">
import { Agente } from 'src/interfaces.ts'
import { reactive } from 'vue'

const agente = reactive<Agente>({})
console.log(agente)
</script>
