<template>
    <q-card-section class="column q-mt-lg q-mx-lg q-px-lg text-green">
        <q-field
            outlined
            label="Legajo"
            stack-label
        >
            <template #control>
                <div
                    class="self-center full-width no-outline"
                    tabindex="0"
                >
                    {{ agenfacEdit.legajo }}
                </div>
            </template>
        </q-field>
        <q-field
            outlined
            label="Nombre"
            stack-label
        >
            <template #control>
                <div
                    class="self-center full-width no-outline"
                    tabindex="0"
                >
                    {{ agenfacEdit.nombre }}
                </div>
            </template>
        </q-field>
        <q-select
            v-if="agenfacEdit.inciso?.inciso !== '13'"
            :model-value="agenfacEdit.bonificacion"
            :options="options"
            class="q-mx-sm"
            label="bonificacion"
            style="min-width: 120px"
            @update:model-value="updateAgenfac"
        />

        <q-input
            v-model="agenfacEdit.horas"
            label="Horas"
            class="q-mx-sm"
            type="number"
            @update:model-value="updateAgenfac"
        />
        <q-field
            outlined
            label="Sub-total"
            stack-label
        >
            <template #control>
                <div
                    class="self-center full-width no-outline"
                    tabindex="0"
                >
                    {{ agenfacEdit.subtot }}
                </div>
            </template>
        </q-field>
        <q-field
            outlined
            label="Bonificacion"
            stack-label
        >
            <template #control>
                <div
                    class="self-center full-width no-outline"
                    tabindex="0"
                >
                    {{ agenfacEdit.bonvalor }}
                </div>
            </template>
        </q-field>
        <q-field
            outlined
            label="Total"
            stack-label
        >
            <template #control>
                <div
                    class="self-center full-width no-outline"
                    tabindex="0"
                >
                    {{ agenfacEdit.total }}
                </div>
            </template>
        </q-field>

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
import { Agenfac } from 'src/interfaces'
import { ref } from 'vue'
import { QCardSection, QInput, QBtn } from 'quasar'
import agenfacService from 'src/boot/services/agenfacService'
interface Props {
    agenfac: Agenfac
    disable?: boolean
}

const props = defineProps<Props>()
const agenfacEdit = ref<Agenfac>({ ...props.agenfac })
const emit = defineEmits(['submit'])
const disable = ref(false)
// const seleccionarSector = (sector: SelecOption<number>) => {
//     if (sector) agente.sector_id = sector.value
// }
const options = [0, 20, 30]

const updateAgenfac = () => {
    if (!agenfacEdit.value.inciso) return
    agenfacEdit.value.subtot = Math.round(agenfacEdit.value.horas * agenfacEdit.value.inciso?.valor * 100) / 100
    agenfacEdit.value.bonvalor = Math.round(agenfacEdit.value.subtot * agenfacEdit.value.bonificacion) / 100
    agenfacEdit.value.total = agenfacEdit.value.subtot + agenfacEdit.value.bonvalor
}

const enviarFormulario = async () => {
    await agenfacService.basePut(agenfacEdit.value)
    emit('submit', false)
}
</script>
