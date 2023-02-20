<template>
    <div class="row justify-around q-mt-lg q-mx-lg">
        <BaseSelectReq
            v-if="verHospital"
            endpoint="hospitales"
            opcion="hospital"
            @selected="selectedHospital"
        />
        <BaseSelectReq
            v-if="verServicio"
            endpoint="agenfac/getperiodos"
            opcion="periodo"
            :current-filtro="{ hospital_id: filtro.hospital_id, columna: 'periodo' }"
            @selected="selectedPeriodo"
        />
        <BaseSelectReq
            v-if="verSector"
            endpoint="agenfac/getperiodos"
            opcion="anio"
            :current-filtro="{ hospital_id: filtro.hospital_id, columna: 'anio', periodo: filtro.periodo }"
            @selected="selectedAnio"
        />
        <slot />
    </div>
</template>
<script lang="ts" setup>
// import BaseSelectReq from 'src/components/BaseSelectReq.vue.ts'
import BaseSelectReq from 'src/components/BaseSelectReq.vue'
import { AgenfacFilter, SelecOption } from 'src/interfaces.ts'
import { reactive } from 'vue'
interface Props {
    verHospital?: boolean
    verServicio?: boolean
    verSector?: boolean
}

withDefaults(defineProps<Props>(), { verHospital: true, verServicio: true, verSector: true })
const filtro = reactive<AgenfacFilter>({})

const emit = defineEmits(['submit'])

const selectedHospital = async (hosp: SelecOption<number>) => {
    if (!hosp) return
    filtro.hospital_id = undefined
    await new Promise((resolve) => setTimeout(resolve, 0))
    filtro.hospital_id = hosp.value
    emit('submit', filtro)
}
const selectedPeriodo = async (periodo: string) => {
    if (!periodo) return
    filtro.periodo = undefined
    await new Promise((resolve) => setTimeout(resolve, 0))
    filtro.periodo = periodo
    emit('submit', filtro)
}
const selectedAnio = async (anio: number) => {
    if (!anio) return
    filtro.anio = undefined
    await new Promise((resolve) => setTimeout(resolve, 0))
    filtro.anio = anio
    emit('submit', filtro)
}
</script>
