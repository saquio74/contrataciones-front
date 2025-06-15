<template>
    <q-page class="column q-mt-lg">
        <div class="text-blue text-center q-pa-md flex flex-center text-h4">{{ 'Inciso' }}</div>
        <div class="row justify-around q-mt-lg q-mx-lg">
            <q-input
                v-model="filtro.inciso"
                dense
                debounce="300"
                placeholder="Inciso"
                @update:model-value="updatePagination()"
            >
                <template #append>
                    <q-icon name="search" />
                </template>
            </q-input>

            <q-btn
                color="purple"
                label="Nuevo inciso"
                @click="openNewModal"
            />
        </div>

        <q-table
            v-if="incisos && incisos.length"
            class="my-sticky-column-table"
            :rows="incisos"
            :columns="columns"
            :dense="$q.screen.lt.md"
            :pagination="{ rowsPerPage: 10, page: currentPage, rowsNumber: total }"
            @request="(data) => updatePagination(data.pagination)"
        >
            <template #header="props">
                <q-tr :props="props">
                    <q-th auto-width />
                    <q-th
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props"
                    >
                        {{ col.label }}
                    </q-th>
                </q-tr>
            </template>
            <template #body="props">
                <q-tr :props="props">
                    <q-td auto-width>
                        <q-btn
                            size="sm"
                            color="red"
                            round
                            class="q-mx-sm"
                            dense
                            :icon="'remove'"
                            @click="deleteInciso(props.row.id)"
                        />
                        <q-btn
                            size="sm"
                            color="warning"
                            round
                            dense
                            icon="create"
                            @click="updateInciso(props.row)"
                        />
                    </q-td>
                    <q-td
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props"
                    >
                        {{ col.value }}
                    </q-td>
                </q-tr>
            </template>
        </q-table>
        <div
            v-if="(!incisos || !incisos.length) && !loading"
            class="row q-mt-lg q-mx-lg text-blue text-center"
        >
            <h2>Sin resultados</h2>
        </div>
        <q-inner-loading
            :showing="loading"
            label="Espere por favor"
        >
            <q-spinner-gears
                size="50px"
                color="primary"
            />
        </q-inner-loading>
        <BaseModal
            :titulo="'Nuevo inciso'"
            :dialog="dialog"
            @close-modal="() => (dialog = false)"
        >
            <NuevoInciso
                :disable="disableButton"
                @submit="guardarInciso"
            />
        </BaseModal>
        <BaseModal
            :titulo="'Actualizar inciso'"
            :dialog="dialogEdit"
            @close-modal="() => (dialogEdit = false)"
        >
            <NuevoInciso
                :inciso="inciso"
                @submit="actualizarInciso"
                @close-form="(val: boolean) => (dialogEdit = val)"
            />
        </BaseModal>
    </q-page>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { Inciso, IncisoFilter } from 'src/interfaces'
import { Notify, QBtn, QIcon, QInnerLoading, QInput, QPage, QSpinnerGears, QTable, QTd, QTh, QTr } from 'quasar'
import BaseModal from 'src/components/BaseModal.vue'
import NuevoInciso from './partials/NuevoInciso.vue'
import incisosService from 'src/boot/services/incisosServices'
const columns = [
    { name: 'Inciso', label: 'Inciso', field: 'inciso' },
    { name: 'Valor', label: 'Valor', field: 'valor' }
]

const dialog = ref(false)
const dialogEdit = ref(false)
const inciso = ref<Inciso>({})
const loading = ref<boolean>(false)
const disableButton = ref<boolean>(false)
const incisos = ref<Inciso[]>([])
const currentPage = ref<number>(1)
const total = ref<number>(0)

const filtro = reactive<IncisoFilter>({ perPage: 10, page: 1 })

const updatePagination = async (filtroTabla: IncisoFilter | undefined = undefined) => {
    loading.value = true
    filtro.perPage = filtroTabla?.rowsPerPage ?? filtro.perPage
    filtro.page = filtroTabla?.page ?? filtro.page
    try {
        incisos.value = []
        const response = await incisosService.baseGetQuery(filtro)
        incisos.value = response.data
        currentPage.value = response.current_page
        total.value = response.total
    } catch {
    } finally {
        loading.value = false
    }
}
const openNewModal = () => {
    dialog.value = true
}

const deleteInciso = async (servicioId: number) => {
    await incisosService.baseDelete(servicioId.toString())
    await updatePagination()
}

onMounted(async () => {
    await updatePagination()
})
const updateInciso = async (incisoEdit: Inciso) => {
    inciso.value = { ...incisoEdit }
    dialogEdit.value = true
}
const guardarInciso = async (inciso: Inciso) => {
    disableButton.value = true
    await incisosService.basePost(inciso)
    filtro.page = 1
    await updatePagination()
    Notify.create('Se guardo el agente correctamente')
    disableButton.value = false
    dialog.value = false
}
const actualizarInciso = async (inciso: Inciso) => {
    disableButton.value = true
    await incisosService.basePut(inciso)
    filtro.page = 1
    await updatePagination()
    Notify.create('Se actualizo el agente correctamente')
    disableButton.value = false
    dialogEdit.value = false
}
</script>
<style lang="scss">
.my-sticky-column-table {
    max-width: 100%;
}
</style>
