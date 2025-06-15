<template>
    <q-card-section class="column q-mt-lg q-mx-lg q-px-lg text-green">
        <q-input
            v-model="servicio.servicio"
            :type="'text'"
            label="Nombre del servicio"
            class="q-mb-lg"
        />

        <div class="q-pa-md q-gutter-sm">
            <q-btn
                color="purple"
                label="Guardar servicio"
                icon-right="send"
                :loading="disable"
                @click="enviarFormulario"
            />
        </div>
    </q-card-section>
</template>
<script setup lang="ts">
import { Servicio } from 'src/interfaces'
import { reactive, ref } from 'vue'
import { QCardSection, QInput, QBtn } from 'quasar'
const props = defineProps({
    servicio: {
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
const servicio = reactive<Servicio>(props.servicio)
const emit = defineEmits(['submit'])
const disable = ref(false)

const enviarFormulario = async () => {
    emit('submit', servicio)
}
</script>
