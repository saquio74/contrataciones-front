<template>
    <div>
        <BuscarInfoLiquidacion @submit="(filtroEmit) => (filtro = filtroEmit)" />
        <q-btn
            color="deep-orange"
            glossy
            :disable="!filtro.hospital_id || !filtro.periodo || !filtro.anio"
            label="Generar Excel"
            :loading="loading"
            @click="buscarLiquidacion"
        />
        <q-btn
            class="q-mx-lg"
            color="info"
            glossy
            :disable="!filtro.hospital_id || !filtro.periodo || !filtro.anio"
            label="Generar PDF"
            :loading="loading"
            @click="buscarPDF"
        />
        <q-btn
            v-if="url"
            class="q-mx-lg"
            color="info"
            glossy
            :disable="!filtro.hospital_id || !filtro.periodo || !filtro.anio"
            label="Descargar PDF"
            :loading="loading"
            :href="url"
            @click="buscarPDF"
        />
    </div>
</template>
<script lang="ts" setup>
import agenfacService from 'src/boot/services/agenfacService.ts'
import { AgenfacFilter } from 'src/interfaces.ts'
import { ref } from 'vue'
import BuscarInfoLiquidacion from './BuscarInfoLiquidacion.vue'

const filtro = ref<AgenfacFilter>({})
const loading = ref<boolean>(false)
const url = ref<string>('')
const buscarLiquidacion = async () => {
    loading.value = true
    try {
        const data = await agenfacService.getExcel(filtro.value)
        const blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        const url = window.URL.createObjectURL(blob)
        window.location.assign(url)
    } catch (error) {
    } finally {
        loading.value = false
    }
}
const buscarPDF = async () => {
    try {
        loading.value = true
        const data = await agenfacService.getPDF(filtro.value)
        const blob = new Blob([data], {
            type: 'application/pdf'
        })
        const direccion = window.URL.createObjectURL(blob)
        url.value = direccion
        console.log(url)
        window.open(direccion, '_blank')
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}
</script>
