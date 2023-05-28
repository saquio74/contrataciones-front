<template>
    <q-page class="column q-mt-lg">
        <div class="text-blue text-center q-pa-md flex flex-center text-h4">{{ 'Servicio' }}</div>
        <div class="row justify-around q-mt-lg q-mx-lg">
            <q-input
                v-model="filtro.servicio"
                dense
                debounce="300"
                placeholder="Nombre"
                @update:model-value="updatePagination()"
            >
                <template #append>
                    <q-icon name="search" />
                </template>
            </q-input>

            <q-btn
                color="purple"
                label="Nuevo servicio"
                @click="openNewModal"
            />
        </div>

        <q-table
            v-if="servicios && servicios.length"
            class="my-sticky-column-table"
            :rows="servicios"
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
                            @click="deleteAgente(props.row.id)"
                        />
                        <q-btn
                            size="sm"
                            color="warning"
                            round
                            dense
                            icon="create"
                            @click="updateAgente(props.row)"
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
            v-if="(!servicios || !servicios.length) && !loading"
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
            :titulo="'Nuevo servicio'"
            :dialog="dialog"
            @close-modal="() => (dialog = false)"
        >
            <NuevoServicio
                :disable="disableButton"
                @submit="guardarAgente"
            />
        </BaseModal>
        <BaseModal
            :titulo="'Actualizar servicio'"
            :dialog="dialogEdit"
            @close-modal="() => (dialogEdit = false)"
        >
            <NuevoServicio
                :servicio="servicio"
                @submit="actualizarServicio"
                @close-form="(val: boolean) => (dialogEdit = val)"
            />
        </BaseModal>
    </q-page>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { Servicio, ServicioFilter } from 'src/interfaces.ts'
import { Notify, QBtn, QIcon, QInnerLoading, QInput, QPage, QSpinnerGears, QTable, QTd, QTh, QTr } from 'quasar'
import BaseModal from 'src/components/BaseModal.vue'
import NuevoServicio from './partials/NuevoServicio.vue'
import servicioService from 'src/boot/services/servicioService.ts'
const columns = [{ name: 'Servicio', label: 'Servicio', field: 'servicio' }]

const dialog = ref(false)
const dialogEdit = ref(false)
const servicio = ref<Servicio>({})
const loading = ref<boolean>(false)
const disableButton = ref<boolean>(false)
const servicios = ref<Servicio[]>([])
const currentPage = ref<number>(1)
const total = ref<number>(0)

const filtro = reactive<ServicioFilter>({ perPage: 10, page: 1 })

const updatePagination = async (filtroTabla: ServicioFilter | undefined = undefined) => {
    loading.value = true
    filtro.perPage = filtroTabla?.rowsPerPage ?? filtro.perPage
    filtro.page = filtroTabla?.page ?? filtro.page
    try {
        servicios.value = []
        const response = await servicioService.baseGetQuery(filtro)
        servicios.value = response.data
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

const deleteAgente = async (servicioId: number) => {
    await servicioService.baseDelete(servicioId.toString())
    await updatePagination()
}

onMounted(async () => {
    await updatePagination()
})
const updateAgente = async (servicioEdit: Servicio) => {
    dialogEdit.value = true
    servicio.value = { ...servicioEdit }
}
const guardarAgente = async (servicio: Servicio) => {
    disableButton.value = true
    await servicioService.basePost(servicio)
    filtro.page = 1
    await updatePagination()
    Notify.create('Se guardo el agente correctamente')
    disableButton.value = false
    dialog.value = false
}
const actualizarServicio = async (servicio: Servicio) => {
    disableButton.value = true
    await servicioService.basePut(servicio)
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
