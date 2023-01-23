<template>
    <div class="q-my-auto">
        <q-tabs
            v-if="ageninc"
            align="left"
            inline-label
            outside-arrows
            mobile-arrows
            class="bg-primary text-white shadow-2"
        >
            <q-tab
                name="inciso"
                icon="create"
                class="q-mx-sm"
                :label="ageninc?.inciso?.inciso"
            />

            <q-select
                v-if="ageninc?.inciso.inciso !== '13'"
                v-model="agenfac.bonificacion"
                :options="options"
                class="q-mx-sm"
                label="bonificacion"
                style="min-width: 120px"
                @update:model-value="updateAgenfac"
            />
            <q-input
                v-model="agenfac.horas"
                label="Horas"
                class="q-mx-sm"
                type="number"
                @update:model-value="updateAgenfac"
                @blur="liquidar"
            />
            <q-tab
                name="inciso"
                icon="money"
                class="q-mx-sm"
                :label="`$ ${agenfac.subtot}`"
            />
            <q-tab
                v-if="ageninc?.inciso.inciso !== '13'"
                name="inciso"
                class="q-mx-sm"
                :label="`$ ${agenfac.bonvalor}`"
            />
            <q-tab
                v-if="ageninc?.inciso.inciso !== '13'"
                name="inciso"
                class="q-mx-sm"
                :label="`$ ${agenfac.total}`"
            />
        </q-tabs>
    </div>
</template>
<script lang="ts" setup>
import { Agenfac, Ageninc } from 'src/interfaces.ts'
import { reactive } from 'vue'

export interface Props {
    ageninc?: Ageninc
}
const props = withDefaults(defineProps<Props>(), { ageninc: undefined })
const options = [0, 20, 30]

const emit = defineEmits(['liquidar'])

const agenfac = reactive<Agenfac>({
    inc: props.ageninc?.inciso_id ?? 0,
    agente_id: props.ageninc?.agente_id ?? 0,
    periodo: '',
    anio: 0,
    horas: 0,
    subtot: 0,
    bonvalor: 0,
    total: 0,
    bonificacion: props.ageninc?.inciso?.inciso === '4.1' ? 30 : props.ageninc?.inciso?.inciso !== '13' ? 20 : 0
})
const updateAgenfac = () => {
    if (!props.ageninc) return
    const date = new Date(new Date().getMonth() - 1)
    agenfac.horas = parseInt(agenfac.horas.toString())
    agenfac.anio = date.getMonth() === 11 ? new Date().getFullYear() - 1 : new Date().getFullYear()
    agenfac.periodo = date.toLocaleDateString('es-ar', { month: 'long' })
    agenfac.subtot = agenfac.horas * props.ageninc?.inciso?.valor
    agenfac.bonvalor = (agenfac.subtot * agenfac.bonificacion) / 100
    agenfac.total = agenfac.subtot + agenfac.bonvalor
}
const liquidar = () => {
    emit('liquidar', agenfac)
}
</script>
