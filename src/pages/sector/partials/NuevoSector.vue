<template>
    <q-card-section class="column q-mt-lg q-mx-lg q-px-lg text-green">
        <q-input
            v-model="sector.sector"
            :type="'text'"
            label="Nombre del sector"
            class="q-mb-lg"
        />

        <div class="q-pa-md q-gutter-sm">
            <q-btn
                color="purple"
                label="Guardar sector"
                icon-right="send"
                :loading="disable"
                @click="enviarFormulario"
            />
        </div>
    </q-card-section>
</template>
<script setup lang="ts">
import { Sector } from 'src/interfaces'
import { reactive, ref } from 'vue'
import { QCardSection, QInput, QBtn } from 'quasar'
const props = defineProps({
    sector: {
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
const sector = reactive<Sector>(props.sector)
const emit = defineEmits(['submit'])
const disable = ref(false)

const enviarFormulario = async () => {
    emit('submit', sector)
}
</script>
