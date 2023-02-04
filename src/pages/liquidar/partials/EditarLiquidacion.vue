<template>
    <div>
        <div class="row justify-around q-mt-lg q-mx-lg">
            <BaseSelectReq
                endpoint="hospitales"
                opcion="hospital"
                @selected="selectedHospital"
            />
            <BaseSelectReq
                endpoint="agenfac/getperiodos"
                opcion="periodo"
                :current-filtro="{ hospital_id: filtro.hospital_id, columna: 'periodo' }"
                @selected="selectedPeriodo"
            />
            <BaseSelectReq
                endpoint="agenfac/getperiodos"
                opcion="anio"
                :current-filtro="{ hospital_id: filtro.hospital_id, columna: 'anio', periodo: filtro.periodo }"
                @selected="selectedAnio"
            />
        </div>
        <q-btn
            color="deep-orange"
            glossy
            :disable="!filtro.hospital_id || !filtro.periodo || !filtro.anio"
            label="Buscar liquidación"
            @click="buscarLiquidacion"
        />
        <q-space />
        <div
            v-for="(agenfac, index) in agentesLiquidados"
            :key="agenfac.id"
        >
            <q-tabs
                v-if="verificarServicio(agenfac, index)"
                align="left"
                inline-label
                outside-arrows
                mobile-arrows
                class="bg-primary q-mt-lg text-white shadow-2"
            >
                <q-tab
                    name="legajo"
                    :label="agenfac.servicio"
                />
            </q-tabs>
            <q-tabs
                v-if="verificarSector(agenfac, index)"
                align="center"
                inline-label
                outside-arrows
                mobile-arrows
                class="bg-primary q-my-lg text-white shadow-2"
            >
                <q-tab
                    name="legajo"
                    :label="agenfac.sector"
                />
            </q-tabs>
            <q-toolbar class="bg-purple text-white shadow-2 rounded-borders">
                <q-btn
                    flat
                    :label="agenfac.legajo"
                />
                <q-btn
                    flat
                    :label="agenfac.nombre"
                />
                <q-space />

                <q-tabs
                    align="left"
                    inline-label
                    outside-arrows
                    mobile-arrows
                    class="text-white shadow-2"
                >
                    <q-tab
                        shrink
                        stretch
                        class="q-mr-auto info"
                        :name="agenfac.inciso?.inciso"
                        :label="agenfac.inciso?.inciso"
                    />
                    <q-tab
                        shrink
                        stretch
                        class="q-mr-auto info"
                        :name="agenfac.horas"
                        :label="agenfac.horas"
                    />
                    <q-tab
                        shrink
                        stretch
                        class="q-mr-auto info"
                        :name="agenfac.bonificacion"
                        :label="agenfac.bonificacion"
                    />
                    <q-tab
                        shrink
                        stretch
                        class="q-mr-auto info"
                        :name="agenfac.bonvalor"
                        :label="`$ ${agenfac.bonvalor}`"
                    />
                    <q-tab
                        shrink
                        stretch
                        class="q-mr-auto info"
                        :name="agenfac.subtot"
                        :label="`$ ${agenfac.subtot}`"
                    />
                    <q-tab
                        shrink
                        stretch
                        class="q-mr-auto info"
                        :name="agenfac.total"
                        :label="`$ ${agenfac.total}`"
                    />

                    <q-btn
                        size="sm"
                        color="red"
                        round
                        class="q-mx-sm"
                        dense
                        :icon="'remove'"
                        @click="deleteAgente(agenfac.id as number)"
                    />
                    <q-btn
                        size="sm"
                        color="warning"
                        round
                        dense
                        icon="create"
                        @click="updateAgente(agenfac)"
                    />
                    <q-space />
                </q-tabs>
            </q-toolbar>
        </div>
        <BaseModal
            titulo="Actualizar liquidacion"
            :dialog="dialogEdit"
            @close-modal="() => (dialogEdit = false)"
        >
            <EditarHoras
                :agenfac="currentAgenfac"
                @submit="(val) => cerrarModal(val)"
            />
        </BaseModal>
    </div>
</template>
<script lang="ts" setup>
import agenfacService from 'src/boot/services/agenfacService.ts'
import BaseSelectReq from 'src/components/BaseSelectReq.vue'
import EditarHoras from './EditarHoras.vue'
import { Agenfac, AgenfacFilter, SelecOption } from 'src/interfaces.ts'
import BaseModal from 'src/components/BaseModal.vue'
import { reactive, ref } from 'vue'

const dialogEdit = ref<boolean>(false)
const filtro = reactive<AgenfacFilter>({})
const agentesLiquidados = ref<Agenfac[]>([])
const currentAgenfac = ref<Agenfac>({
    inc: 0,
    agente_id: 0,
    periodo: '',
    anio: 0,
    horas: 0,
    subtot: 0,
    bonvalor: 0,
    total: 0,
    hospital: 0,
    bonificacion: 0,
    created_at: null,
    created_by: null
})

const selectedHospital = async (hosp: SelecOption<number>) => {
    if (!hosp) return
    filtro.hospital_id = undefined
    await new Promise((resolve) => setTimeout(resolve, 0))
    filtro.hospital_id = hosp.value
}
const selectedPeriodo = async (periodo: string) => {
    if (!periodo) return
    filtro.periodo = undefined
    await new Promise((resolve) => setTimeout(resolve, 0))
    filtro.periodo = periodo
}
const selectedAnio = async (anio: number) => {
    if (!anio) return
    filtro.anio = undefined
    await new Promise((resolve) => setTimeout(resolve, 0))
    console.log(anio)
    filtro.anio = anio
}
const verificarServicio = (agente: Agenfac, index: number) => {
    return (
        agente?.servicio !==
        agentesLiquidados.value[index - 1 >= 0 ? index - 1 : agentesLiquidados.value.length]?.servicio
    )
}
const verificarSector = (agente: Agenfac, index: number) => {
    return (
        agente?.sector !== agentesLiquidados.value[index - 1 >= 0 ? index - 1 : agentesLiquidados.value.length]?.sector
    )
}

const buscarLiquidacion = async () => {
    agentesLiquidados.value = await agenfacService.baseGetQueryWithoutPagination(filtro, 'getliquidados')
}

const deleteAgente = async (agenfacId: number) => {
    await agenfacService.baseDelete(agenfacId.toString())
    await buscarLiquidacion()
}

const updateAgente = async (agenfac: Agenfac) => {
    currentAgenfac.value = agenfac
    dialogEdit.value = true
}
const cerrarModal = async (val: boolean) => {
    console.log('cerrar modal', val)
    await buscarLiquidacion()
    dialogEdit.value = false
}
</script>
