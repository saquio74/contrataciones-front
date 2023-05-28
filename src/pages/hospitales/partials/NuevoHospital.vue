<template>
    <q-card-section class="column q-mt-lg q-mx-lg q-px-lg text-green">
        <q-input
            v-model="hospital.hospital"
            :type="'text'"
            label="Nombre del hospital"
            class="q-mb-lg"
        />

        <div class="q-pa-md q-gutter-sm">
            <q-btn
                color="purple"
                label="Guardar hospital"
                icon-right="send"
                :loading="disable"
                @click="enviarFormulario"
            />
        </div>
    </q-card-section>
</template>
<script setup lang="ts">
import { Hospital } from 'src/interfaces.ts'
import { reactive, ref } from 'vue'
import { QCardSection, QInput, QBtn } from 'quasar'
const props = defineProps({
    hospital: {
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
const hospital = reactive<Hospital>(props.hospital)
const emit = defineEmits(['submit'])
const disable = ref(false)

const enviarFormulario = async () => {
    emit('submit', hospital)
}
</script>
