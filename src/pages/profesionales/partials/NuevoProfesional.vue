<template>
    <q-card-section class="column q-mt-lg q-mx-lg q-px-lg text-green">
        <q-input
            v-model="profesional.proveedor"
            :type="'number'"
            label="proveedor"
            class="q-mb-lg"
        />
        <q-input
            v-model="profesional.dni"
            :type="'number'"
            label="Dni"
            class="q-mb-lg"
        />
        <q-input
            v-model="profesional.nombre"
            :type="'text'"
            label="Nombre"
            class="q-mb-lg"
        />
        <q-input
            v-model="profesional.apellido"
            :type="'text'"
            label="Apellido"
            class="q-mb-lg"
        />
        <q-input
            v-model="profesional.cuil"
            :type="'number'"
            label="Cuil"
            class="q-mb-lg"
        />
        <q-select
            v-model="profesional.genero"
            :options="['M', 'F', 'X']"
            label="Genero"
        />
        <q-input
            v-model="profesional.matricula"
            :type="'text'"
            label="Matricula"
            class="q-mb-lg"
        />
        <BaseSelectReq
            endpoint="hospitales"
            opcion="hospital"
            :multiple="true"
            :use-chips="true"
            :hide-selected="false"
            :pre-load="
                profesional.provhosp?.map((ph) => {
                    return { value: ph.hospital_id, label: ph.hospital?.hospital ?? '' }
                })
            "
            @selected="seleccionarHospital"
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
import { type Profesional, SelecOption } from 'src/interfaces'
import { ref, onMounted } from 'vue'
import BaseSelectReq from 'src/components/BaseSelectReq.vue'
import { QCardSection, QInput, QBtn } from 'quasar'
import profesionalesService from 'src/boot/services/profesionalesService'
interface Props {
    profesionalProp: number | undefined
}
const props = withDefaults(defineProps<Props>(), { profesionalProp: 0 })
const profesional = ref<Profesional>({
    proveedor: 0,
    nombre: '',
    apellido: '',
    dni: 0,
    cuil: 0,
    genero: 'M',
    matricula: '',
    provhosp: []
})
const emit = defineEmits(['submit'])
const disable = ref(false)
const seleccionarHospital = (hospital: SelecOption<number>[]) => {
    console.log('msg', hospital)
    profesional.value.provhosp = hospital.map((hosp) => {
        return { hospital_id: hosp.value, hospital: { hospital: hosp.label }, proveedor_id: profesional.value.id ?? 0 }
    })
}

const enviarFormulario = async () => {
    emit('submit', profesional.value)
}
onMounted(async () => {
    if (props.profesionalProp) {
        profesional.value = await profesionalesService.baseGetById(props.profesionalProp.toString())
    }
})
</script>
