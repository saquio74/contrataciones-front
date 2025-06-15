<template>
    <div>
        <q-select
            v-model="selected"
            :disable="props.disable"
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
            @update:model-value="selectOption"
            @input-value="() => selectOption"
        >
            <template #no-option>
                <q-item>
                    <q-item-section class="text-grey">
                        <p v-if="!loading">Sin resultados</p>
                        <q-spinner-gears
                            v-if="loading"
                            size="50px"
                            color="primary"
                        />
                    </q-item-section>
                </q-item>
            </template>
        </q-select>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import baseController from 'src/boot/baseController'
import type { BasePagination, SelecOption } from 'src/interfaces'
const props = defineProps({
    opcion: {
        type: String,
        default: ''
    },
    multipleOption: {
        type: Array<string>,
        default: () => []
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
    },
    paginado: {
        type: Boolean,
        default: true
    },
    currentFiltro: {
        type: Object,
        default: () => {
            return {}
        }
    },
    dataReturn: {
        type: String,
        default: () => 'id'
    },
    disable: {
        type: Boolean,
        default: false
    }
})
const loading = ref(false)
const emit = defineEmits(['selected'])
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data = ref<any>([])
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selected = ref<any>(null)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const controller = new baseController<any, any, any, BasePagination<any>>(props.endpoint)
const getData = async (search = '') => {
    data.value = []
    try {
        loading.value = true
        const filtro = { [props.opcion]: search, ...props.currentFiltro }
        let info = []

        const res = await controller.baseGetQuery(filtro, '')
        info = res.data ?? res

        data.value = info.map((info) => {
            if (info[props.opcion])
                return {
                    label:
                        props.multipleOption.length > 0
                            ? props.multipleOption.map((data: string) => info[data]).join(' ')
                            : info[props.opcion],
                    value: props.dataReturn.length > 0 ? info[props.dataReturn] : info
                }
            return info
        })
    } catch {
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    if (props.preLoad && props.preLoad.label) selected.value = props.preLoad
    if (props.preLoad?.length > 0) selected.value = props.preLoad
})
watch(
    () => props.preLoad,
    () => {
        console.log('change')
        if (props.preLoad && props.preLoad.label) selected.value = props.preLoad
        if (props.preLoad?.length > 0) selected.value = props.preLoad
    }
)
const filterFn = (val: string, update: (func: () => void) => void) => {
    update(() => {
        getData(val)
    })
}
const selectOption = async (val: SelecOption<number | string>) => emit('selected', val)
</script>
