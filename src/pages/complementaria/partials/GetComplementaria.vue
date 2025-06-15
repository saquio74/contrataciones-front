<template>
    <div>
        <BuscarInfoLiquidacion
            :ver-sector="false"
            :ver-servicio="false"
            @submit="setHospital"
        >
            <BaseSelectReq
                endpoint="complementaria/getperiodos"
                opcion="fecha"
                :current-filtro="{ columna: 'fecha', hospital_id: complementariaFilter.hospital_id }"
                @selected="selectPeriodo"
            />
        </BuscarInfoLiquidacion>
        <q-btn
            color="deep-orange"
            glossy
            :disable="!complementariaFilter.hospital_id || !complementariaFilter.fecha"
            label="Buscar comples"
            :loading="loading"
            @click="buscarComples"
        />
        <q-btn
            class="q-mx-lg"
            color="info"
            glossy
            :disable="!complementariaFilter.hospital_id || !complementariaFilter.fecha"
            label="Generar PDF"
            :loading="loading"
            @click="buscarPDF"
        />
        <div
            v-for="complementaria in complementarias"
            :key="complementaria.id"
        >
            <q-toolbar class="bg-blue-grey text-white shadow-2 rounded-borders">
                <q-btn
                    flat
                    :label="complementaria.legajo"
                />
                <q-btn
                    flat
                    :label="complementaria.nombre"
                />
                <q-btn
                    flat
                    :label="complementaria.sector"
                />
                <q-btn
                    flat
                    :label="complementaria.servicio"
                />
                <q-btn
                    flat
                    :label="`$ ${complementaria.subtotal}`"
                />
                <q-btn
                    flat
                    :label="`$ ${complementaria.bonvalor}`"
                />
                <q-btn
                    flat
                    :label="`$ ${complementaria.total}`"
                />
                <q-space />
            </q-toolbar>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { AgenfacFilter, Complementaria, ComplementariaFilter } from 'src/interfaces'
import BaseSelectReq from 'src/components/BaseSelectReq.vue'
import BuscarInfoLiquidacion from 'src/pages/liquidar/partials/BuscarInfoLiquidacion.vue'
import { ref } from 'vue'
import complementariaService from 'src/boot/services/complementariaService'

const complementarias = ref<Complementaria[]>([])
const loading = ref<boolean>(false)
const complementariaFilter = ref<ComplementariaFilter>({})
const selectPeriodo = async (opcion: string) => {
    await new Promise((resolve) => setTimeout(resolve, 0))
    complementariaFilter.value.fecha = opcion
}
const setHospital = (filtro: AgenfacFilter) => {
    complementariaFilter.value.hospital_id = filtro.hospital_id
}
const buscarComples = async () => {
    try {
        loading.value = true
        complementarias.value = await complementariaService.baseGetQueryWithoutPagination(
            complementariaFilter.value,
            'getLiquidadosComplementaria'
        )
    } catch {
    } finally {
        loading.value = false
    }
}
const buscarPDF = async () => {
    try {
        loading.value = true
        const data = await complementariaService.getPDF(complementariaFilter.value)
        const blob = new Blob([data], {
            type: 'application/pdf'
        })
        const url = window.URL.createObjectURL(blob)
        window.open(url, '_blank')
    } catch (error) {
    } finally {
        loading.value = false
    }
}
</script>
