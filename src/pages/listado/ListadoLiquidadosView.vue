<template>
    <q-page class="column q-mt-lg">
        <div class="text-blue text-center q-pa-md flex flex-center text-h4">{{ 'Liquidar' }}</div>
        <div class="row justify-around q-mt-lg q-mx-lg">
            <BaseSelectReq
                endpoint="hospitales"
                opcion="hospital"
                @selected="selectedHospital"
            />
        </div>
        <div class="q-mt-lg">
            <div
                v-for="(agente, index) in agentesLiquidar"
                :key="agente.id"
            >
                <q-tabs
                    v-if="verificarServicio(agente, index)"
                    align="center"
                    inline-label
                    outside-arrows
                    mobile-arrows
                    class="bg-primary q-mt-lg text-white shadow-2"
                >
                    <h6>
                        {{ agente.servicio?.servicio }}
                    </h6>
                </q-tabs>
                <q-tabs
                    v-if="verificarSector(agente, index)"
                    align="center"
                    inline-label
                    outside-arrows
                    mobile-arrows
                    class="bg-primary q-my-lg text-white shadow-2"
                >
                    <h6>
                        {{ agente.sector?.sector }}
                    </h6>
                </q-tabs>
                <q-toolbar class="bg-blue-grey text-white shadow-2 rounded-borders">
                    {{ agente.legajo }}
                    <q-space />
                    <p>
                        {{ agente.nombre }}
                    </p>
                    <q-space />

                    <q-tabs
                        v-for="ageninc in agente.ageninc"
                        :key="ageninc.id"
                        align="left"
                        inline-label
                        outside-arrows
                        mobile-arrows
                        class="text-white shadow-2"
                        :class="verificarColor(agente.liquidacion_actual as Agenfac[], ageninc.inciso_id)"
                    >
                        <q-chip
                            :ageninc="ageninc"
                            shrink
                            stretch
                            class="q-mr-auto"
                            :class="verificarColor(agente.liquidacion_actual as Agenfac[], ageninc.inciso_id)"
                            :name="ageninc.inciso_id"
                            :label="ageninc.inciso.inciso"
                        />

                        <q-space />
                    </q-tabs>
                </q-toolbar>
            </div>
            <q-separator dark />
        </div>
        <q-tabs
            align="right"
            inline-label
            outside-arrows
            mobile-arrows
            class="text-white shadow-2"
        >
            <q-tab
                shrink
                stretch
                class="bg-primary q-mr-auto"
                :label="`total de agentes: ${agentesLiquidar.length}`"
            />
            <q-space />
        </q-tabs>
    </q-page>
</template>
<script lang="ts" setup>
import agenteService from 'src/boot/services/agenteService'
import BaseSelectReq from 'src/components/BaseSelectReq.vue'
import { SelecOption, Agente, Agenfac } from 'src/interfaces'
import { ref } from 'vue'
import { QPage, QTabs, QTab, QSpace, QSeparator } from 'quasar'
const hospitalId = ref<number | undefined>(undefined)
const agentesLiquidar = ref<Agente[]>([])
const selectedHospital = async (hosp: SelecOption<number>) => {
    if (!hosp) return
    hospitalId.value = undefined
    agentesLiquidar.value = []
    await new Promise((resolve) => setTimeout(resolve, 0))
    hospitalId.value = hosp.value
    getAgentes()
}

const getAgentes = async () => {
    const response = await agenteService.baseGetQueryWithoutPagination(
        {
            hospitalId: hospitalId.value
        },
        'getLiquidados'
    )
    agentesLiquidar.value = response
}
const verificarServicio = (agente: Agente, index: number) => {
    return (
        agente?.servicio?.servicio !==
        agentesLiquidar.value[index - 1 >= 0 ? index - 1 : agentesLiquidar.value.length]?.servicio?.servicio
    )
}
const verificarSector = (agente: Agente, index: number) => {
    return (
        agente?.sector?.sector !==
        agentesLiquidar.value[index - 1 >= 0 ? index - 1 : agentesLiquidar.value.length]?.sector?.sector
    )
}
const verificarColor = (liquidacionActual: Agenfac[], incisoId: number) => {
    const actual = liquidacionActual.filter((liq: Agenfac) => liq.inc == incisoId).length
    if (actual === 0) return 'bg-negative'
    if (actual === 1) return 'bg-positive'
    return 'bg-warning'
}
</script>
