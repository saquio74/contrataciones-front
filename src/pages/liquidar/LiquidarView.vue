<template>
    <q-page class="column q-mt-lg">
        <div class="text-blue text-center q-pa-md flex flex-center text-h4">{{ 'Liquidar' }}</div>
        <div class="row justify-around q-mt-lg q-mx-lg">
            <BaseSelectReq
                endpoint="hospitales"
                opcion="hospital"
                @selected="selectedHospital"
            />
            <BaseSelectReq
                v-if="hospitalId"
                :endpoint="`agentes/getServicios`"
                opcion="servicio"
                :paginado="false"
                :current-filtro="{
                    hospitalId: hospitalId
                }"
                @selected="selectedServicio"
            />
            <BaseSelectReq
                v-if="hospitalId && servicioId"
                :endpoint="`agentes/getSectores`"
                opcion="sector"
                :current-filtro="{
                    hospitalId: hospitalId,
                    servicioId: servicioId
                }"
                :paginado="false"
                @selected="selectedSector"
            />
        </div>
        <div class="q-mt-lg">
            <div
                v-for="agente in agentesLiquidar"
                :key="agente.id"
            >
                <q-tabs
                    align="justify"
                    inline-label
                    outside-arrows
                    mobile-arrows
                    class="bg-purple text-white shadow-2"
                >
                    <q-tab
                        name="legajo"
                        class=""
                        :label="agente.legajo"
                    />
                    <q-tab
                        name="nombre"
                        icon="person"
                        :label="agente.nombre"
                        class
                    />
                    <q-space />
                </q-tabs>
                <LiquidarHorasVue
                    v-for="ageninc in agente.ageninc"
                    :key="ageninc.id"
                    :ageninc="ageninc"
                    @liquidar="agregarLiquidacion"
                />
                <q-separator dark />
                <q-separator dark />
                <q-separator dark />
            </div>
        </div>
    </q-page>
</template>
<script lang="ts" setup>
import agenteService from 'src/boot/services/agenteService.ts'
import BaseSelectReq from 'src/components/BaseSelectReq.vue'
import { SelecOption, Agente, Agenfac } from 'src/interfaces.ts'
import LiquidarHorasVue from './partials/LiquidarHoras.vue'
import { ref, reactive } from 'vue'
const hospitalId = ref<number | undefined>(undefined)
const servicioId = ref<number | undefined>(undefined)
const sectorId = ref<number | undefined>(undefined)
const agentesLiquidar = ref<Agente[]>([])
const liquidacion = reactive<Agenfac[]>([])
const selectedHospital = async (hosp: SelecOption<number>) => {
    if (!hosp) return
    hospitalId.value = undefined
    await new Promise((resolve) => setTimeout(resolve, 0))
    hospitalId.value = hosp.value
}
const selectedServicio = async (serv: SelecOption<number>) => {
    if (!serv) return
    servicioId.value = undefined
    await new Promise((resolve) => setTimeout(resolve, 0))
    servicioId.value = serv.value
}
const selectedSector = async (sect: SelecOption<number>) => {
    if (!sect) return
    sectorId.value = undefined
    await new Promise((resolve) => setTimeout(resolve, 0))
    sectorId.value = sect.value
    agentesLiquidar.value = await agenteService.baseGetQueryWithoutPagination(
        {
            hospitalId: hospitalId.value,
            servicioId: servicioId.value,
            sectorId: sectorId.value
        },
        'getAgentesLiquidar'
    )
}
const agregarLiquidacion = async (liquidado: Agenfac) => {
    const index: number = liquidacion.findIndex(
        (agen: Agenfac) => agen.agente_id == liquidado.agente_id && agen.inc == liquidado.inc
    )
    liquidacion.splice(index, index >= 0 ? 1 : 0, liquidado)
}
</script>
