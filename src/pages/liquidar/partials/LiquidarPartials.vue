<template>
    <q-page class="column q-mt-lg">
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
                    align="left"
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
                    :hospital-id="(agente.hospital_id as number)"
                    :color="
                        agente.liquidacion_actual?.filter((liq: Agenfac) => liq.inc == ageninc.inciso_id).length === 0
                            ? 'bg-negative'
                            : agente.liquidacion_actual?.filter((liq: Agenfac) => liq.inc == ageninc.inciso_id).length === 1
                                ? 'bg-positive'
                                : 'bg-warning'
                    "
                    @liquidar="agregarLiquidacion"
                />
                <q-separator dark />
                <q-separator dark />
                <q-separator dark />
            </div>
            <q-separator dark />
            <div class="row justify-center q-my-lg">
                <q-btn
                    color="deep-orange"
                    glossy
                    :disable="liquidacion.length <= 0"
                    label="Guardar liquidación"
                    @click="liquidar"
                />
            </div>
        </div>
    </q-page>
</template>
<script lang="ts" setup>
import agenteService from 'src/boot/services/agenteService.ts'
import agenfacService from 'src/boot/services/agenfacService.ts'
import BaseSelectReq from 'src/components/BaseSelectReq.vue'
import { SelecOption, Agente, Agenfac } from 'src/interfaces.ts'
import LiquidarHorasVue from './LiquidarHoras.vue'
import { ref } from 'vue'
import { Notify, QPage, QTabs, QTab, QSpace, QSeparator, QBtn } from 'quasar'
const hospitalId = ref<number | undefined>(undefined)
const servicioId = ref<number | undefined>(undefined)
const sectorId = ref<number | undefined>(undefined)
const agentesLiquidar = ref<Agente[]>([])
const liquidacion = ref<Agenfac[]>([])

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
    agentesLiquidar.value = []
    liquidacion.value = []
    await new Promise((resolve) => setTimeout(resolve, 0))
    sectorId.value = sect.value
    getAgentes()
}
const getAgentes = async () => {
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
    const index: number = liquidacion.value.findIndex(
        (agen: Agenfac) => agen.agente_id == liquidado.agente_id && agen.inc == liquidado.inc
    )
    liquidacion.value.splice(index, index >= 0 ? 1 : 0, liquidado)
}

const liquidar = async () => {
    if (liquidacion.value.length <= 0) Notify.create('No se agrego liquidacion')
    await agenfacService.liquidacionMasiva(liquidacion.value)
    liquidacion.value = []
    if (sectorId.value) getAgentes()
}
</script>
