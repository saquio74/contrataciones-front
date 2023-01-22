<template>
    <q-card-section class="column q-mt-lg q-mx-lg q-px-lg text-green">
        <q-input
            v-model="agente.legajo"
            :type="'number'"
            label="Legajo"
            class="q-mb-lg"
        />
        <q-input
            v-model="agente.dni"
            :type="'text'"
            label="Dni"
            class="q-mb-lg"
        />
        <q-input
            v-model="agente.nombre"
            :type="'text'"
            label="Nombre"
            class="q-mb-lg"
        />
        <q-input
            v-model="agente.horarios"
            :type="'text'"
            label="Horario"
            class="q-mb-lg"
        />
        <q-input
            v-model="agente.telefono"
            :type="'text'"
            label="Telefono"
            class="q-mb-lg"
        />
        <BaseSelectReq
            endpoint="hospitales"
            opcion="hospital"
            :pre-load="{ value: agente?.hospital?.id, label: agente?.hospital?.hospital }"
            @selected="seleccionarHospital"
        />
        <BaseSelectReq
            endpoint="sector"
            opcion="sector"
            :pre-load="{ value: agente?.sector?.id, label: agente?.sector?.sector }"
            @selected="seleccionarSector"
        />
        <BaseSelectReq
            endpoint="servicio"
            opcion="servicio"
            :pre-load="{ value: agente?.servicio?.id, label: agente?.servicio?.servicio }"
            @selected="seleccionarServicio"
        />
        <BaseSelectReq
            endpoint="incisos"
            opcion="inciso"
            :multiple="true"
            :use-chips="true"
            :hide-selected="false"
            :pre-load="
                agente?.ageninc?.map((agente) => {
                    return { value: agente?.inciso_id, label: agente?.inciso?.inciso }
                })
            "
            @selected="seleccionarInciso"
        />
        <div class="q-pa-md q-gutter-sm">
            <q-btn
                color="purple"
                label="Guardar Agente"
                icon-right="send"
                :loading="disable"
                @click="enviarFormulario"
            />
        </div>
    </q-card-section>
</template>
<script setup lang="ts">
import { Agente, SelecOption } from 'src/interfaces.ts'
import { reactive, ref, onMounted } from 'vue'
import BaseSelectReq from 'src/components/BaseSelectReq.vue'
import { QCardSection, QInput, QBtn } from 'quasar'
const props = defineProps({
    agente: {
        type: Object,
        default: () => {
            return {}
        }
    },
    disable: {
        type: Boolean,
        default: false
    }
})
const agente = reactive<Agente>(props.agente)
const emit = defineEmits(['submit'])
const disable = ref(false)
const seleccionarHospital = (hospital: SelecOption<number>) => {
    if (hospital) agente.hospital_id = hospital.value
}
const seleccionarSector = (sector: SelecOption<number>) => {
    if (sector) agente.sector_id = sector.value
}
const seleccionarServicio = (servicio: SelecOption<number>) => {
    if (servicio) agente.servicio_id = servicio.value
}
const seleccionarInciso = (inciso: SelecOption<number>[]) => {
    if (inciso) agente.incisos = inciso.map((value) => value.value)
}
const enviarFormulario = async () => {
    emit('submit', agente)
}
onMounted(() => {
    if (agente.ageninc) agente.incisos = agente.ageninc.map((agen) => agen.inciso_id)
})
</script>
