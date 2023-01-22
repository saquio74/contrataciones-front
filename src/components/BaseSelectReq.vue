<template>
    <div>
        <q-select
            v-model="selected"
            filled
            use-input
            :hide-selected="hideSelected"
            :label="props.opcion"
            fill-input
            :multiple="multiple"
            input-debounce="500"
            :options="data"
            :use-chips="useChips"
            :hint="`Seleccione ${props.opcion}`"
            style="width: 250px; padding-bottom: 32px"
            @filter="filterFn"
            @update:model-value="selectOption()"
            @input-value="() => selectOption()"
        >
            <template #no-option>
                <q-item>
                    <q-item-section class="text-grey"> Sin resultados </q-item-section>
                </q-item>
            </template>
        </q-select>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import baseController from 'src/boot/baseController.ts'
import type { BasePagination } from 'src/interfaces.ts'
const props = defineProps({
    opcion: {
        type: String,
        default: ''
    },
    endpoint: {
        type: String,
        default: ''
    },
    multiple: {
        type: Boolean,
        default: false
    },
    useChips: {
        type: Boolean,
        default: false
    },
    hideSelected: {
        type: Boolean,
        default: true
    },
    preLoad: {
        type: Object,
        default: () => {
            return null
        }
    }
})
const emit = defineEmits(['selected'])
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data = ref<any>([])
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selected = ref<any>(null)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const controller = new baseController<any, any, any, BasePagination<any>>(props.endpoint)
const getData = async (search = '') => {
    const filtro = { [props.opcion]: search }
    const info = await controller.baseGetQuery(filtro, '')
    data.value = info.data.map((info) => {
        return { label: info[props.opcion], value: info.id }
    })
}
onMounted(() => {
    getData()
    if (props.preLoad && props.preLoad.label) selected.value = props.preLoad
    if (props.preLoad?.length > 0) selected.value = props.preLoad
})
const filterFn = (val: string, update: (func: () => void) => void) => {
    update(() => {
        getData(val)
    })
}
const selectOption = async () => {
    await new Promise((resolve) => setTimeout(resolve, 0))
    emit('selected', selected.value)
}
</script>
