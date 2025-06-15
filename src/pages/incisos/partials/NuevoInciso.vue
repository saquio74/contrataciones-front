<template>
    <q-card-section class="column q-mt-lg q-mx-lg q-px-lg text-green">
        <q-input
            v-model="inciso.inciso"
            :type="'text'"
            label="inciso"
            class="q-mb-lg"
        />
        <q-input
            v-model="inciso.valor"
            :type="'number'"
            label="valor"
            class="q-mb-lg"
        />

        <div class="q-pa-md q-gutter-sm">
            <q-btn
                color="purple"
                label="Guardar inciso"
                icon-right="send"
                :loading="disable"
                @click="enviarFormulario"
            />
        </div>
    </q-card-section>
</template>
<script setup lang="ts">
import { Inciso } from 'src/interfaces'
import { reactive, ref } from 'vue'
import { QCardSection, QInput, QBtn } from 'quasar'
const props = defineProps({
    inciso: {
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
const inciso = reactive<Inciso>(props.inciso)
const emit = defineEmits(['submit'])
const disable = ref(false)

const enviarFormulario = async () => {
    emit('submit', inciso)
}
</script>
