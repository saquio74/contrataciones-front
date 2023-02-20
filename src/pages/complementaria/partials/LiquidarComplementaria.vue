<template>
    <div>
        <BuscarInfoLiquidacion
            :ver-hospital="false"
            @submit="setData"
        >
            <BaseSelectReq
                endpoint="agentes"
                opcion="legajo"
                :multiple-option="['legajo', 'nombre']"
                data-return=""
                @selected="selectAgente"
            />
        </BuscarInfoLiquidacion>
        <q-date
            v-model="fechaComple"
            mask="YYYY-MM-DD"
            :locale="{
                days: days,
                daysShort: [...days.map((dia) => dia.slice(0, 3))],
                months: months,
                monthsShort: [...months.map((mes) => mes.slice(0, 3))]
            }"
        />
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
            <LiquidarHoras
                v-for="ageninc in agente.ageninc"
                :key="ageninc.id"
                :ageninc="ageninc"
                :hospital-id="(agente.hospital_id as number)"
                :color="'bg-positive'"
                @liquidar="(data) => liquidarComplementaria(data)"
            />
            <q-space />
        </q-tabs>
        <q-btn
            class="mt-1"
            color="secondary q-ma-md"
            :disable="validate()"
            @click="guardarLiquidacion()"
        >
            Agregar
        </q-btn>
    </div>
</template>
<script lang="ts" setup>
import BaseSelectReq from 'src/components/BaseSelectReq.vue'
import LiquidarHoras from 'src/pages/liquidar/partials/LiquidarHoras.vue'
import BuscarInfoLiquidacion from 'src/pages/liquidar/partials/BuscarInfoLiquidacion.vue'
import type { Agenfac, AgenfacFilter, Agente, SelecOption, Complementaria } from 'src/interfaces.ts'
import ComplementariaService from 'src/boot/services/complementariaService'
import { ref } from 'vue'
import { days, months } from 'src/models/baseArrays.ts'
const agente = ref<Agente>({})
const fechaComple = ref<string>(new Date().toISOString().split('T')[0])

const currentFiltro = ref<AgenfacFilter>({})
const complementariaLiquidar = ref<Complementaria[]>([])
const setData = (filtro: AgenfacFilter) => {
    currentFiltro.value = filtro
}
const selectAgente = async (opcion: SelecOption<Agente>) => {
    await new Promise((resolve) => setTimeout(resolve, 0))
    agente.value = opcion.value
}

const liquidarComplementaria = (liquidacion: Agenfac) => {
    const liquidado: Complementaria = {
        agente_id: liquidacion.agente_id,
        anio: liquidacion.anio,
        bonificacion: liquidacion.bonificacion,
        bonvalor: liquidacion.bonvalor,
        created_at: null,
        created_by: null,
        fecha: fechaComple.value,
        horas: liquidacion.horas,
        hospital_id: liquidacion.hospital,
        inciso_id: liquidacion.inc,
        periodo: liquidacion.periodo,
        subtotal: liquidacion.subtot,
        total: liquidacion.total,
        valor: liquidacion.valor
    }
    const index: number = complementariaLiquidar.value.findIndex(
        (agen: Complementaria) => agen.agente_id == liquidado.agente_id && agen.inciso_id == liquidado.inciso_id
    )
    complementariaLiquidar.value.splice(index, index >= 0 ? 1 : 0, liquidado)
}
const validate = () =>
    !currentFiltro.value.periodo ||
    !currentFiltro.value.anio ||
    !agente.value.legajo ||
    !fechaComple.value ||
    complementariaLiquidar.value.length <= 0

const guardarLiquidacion = async () => {
    console.log(complementariaLiquidar.value)
    await ComplementariaService.liquidacionMasiva(complementariaLiquidar.value)
    complementariaLiquidar.value = []
}
</script>
