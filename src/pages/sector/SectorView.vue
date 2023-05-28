<template>
    <q-page class="column q-mt-lg">
        <div class="text-blue text-center q-pa-md flex flex-center text-h4">{{ 'Sector' }}</div>
        <div class="row justify-around q-mt-lg q-mx-lg">
            <q-input
                v-model="filtro.sector"
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
                label="Nuevo sector"
                @click="openNewModal"
            />
        </div>

        <q-table
            v-if="sectores && sectores.length"
            class="my-sticky-column-table"
            :rows="sectores"
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
            v-if="(!sectores || !sectores.length) && !loading"
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
            :titulo="'Nuevo sector'"
            :dialog="dialog"
            @close-modal="() => (dialog = false)"
        >
            <NuevoSector
                :disable="disableButton"
                @submit="guardarAgente"
            />
        </BaseModal>
        <BaseModal
            :titulo="'Actualizar sector'"
            :dialog="dialogEdit"
            @close-modal="() => (dialogEdit = false)"
        >
            <NuevoSector
                :sector="sector"
                @submit="actualizarSector"
                @close-form="(val: boolean) => (dialogEdit = val)"
            />
        </BaseModal>
    </q-page>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { Sector, SectorFilter } from 'src/interfaces.ts'
import { Notify, QBtn, QIcon, QInnerLoading, QInput, QPage, QSpinnerGears, QTable, QTd, QTh, QTr } from 'quasar'
import BaseModal from 'src/components/BaseModal.vue'
import NuevoSector from './partials/NuevoSector.vue'
import sectorService from 'src/boot/services/sectorService.ts'

const columns = [{ name: 'Sector', label: 'Sector', field: 'sector' }]

const dialog = ref(false)
const dialogEdit = ref(false)
const sector = ref<Sector>({})
const loading = ref<boolean>(false)
const disableButton = ref<boolean>(false)
const sectores = ref<Sector[]>([])
const currentPage = ref<number>(1)
const total = ref<number>(0)

const filtro = reactive<SectorFilter>({ perPage: 10, page: 1 })

const updatePagination = async (filtroTabla: SectorFilter | undefined = undefined) => {
    loading.value = true
    filtro.perPage = filtroTabla?.rowsPerPage ?? filtro.perPage
    filtro.page = filtroTabla?.page ?? filtro.page
    try {
        sectores.value = []
        const response = await sectorService.baseGetQuery(filtro)
        sectores.value = response.data
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

const deleteAgente = async (sectorId: number) => {
    await sectorService.baseDelete(sectorId.toString())
    await updatePagination()
}

onMounted(async () => {
    await updatePagination()
})
const updateAgente = async (sectorEdit: Sector) => {
    dialogEdit.value = true
    sector.value = { ...sectorEdit }
}
const guardarAgente = async (sector: Sector) => {
    disableButton.value = true
    await sectorService.basePost(sector)
    filtro.page = 1
    await updatePagination()
    Notify.create('Se guardo el agente correctamente')
    disableButton.value = false
    dialog.value = false
}
const actualizarSector = async (sector: Sector) => {
    disableButton.value = true
    await sectorService.basePut(sector)
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
