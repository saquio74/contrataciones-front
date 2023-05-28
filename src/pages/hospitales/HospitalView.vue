<template>
    <q-page class="column q-mt-lg">
        <div class="text-blue text-center q-pa-md flex flex-center text-h4">{{ 'Hospitales' }}</div>
        <div class="row justify-around q-mt-lg q-mx-lg">
            <q-input
                v-model="filtro.hospital"
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
                label="Nuevo hospital"
                @click="openNewModal"
            />
        </div>

        <q-table
            v-if="hospitales && hospitales.length"
            class="my-sticky-column-table"
            :rows="hospitales"
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
            v-if="(!hospitales || !hospitales.length) && !loading"
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
            :titulo="'Nuevo hospital'"
            :dialog="dialog"
            @close-modal="() => (dialog = false)"
        >
            <NuevoHospital
                :disable="disableButton"
                @submit="guardarAgente"
            />
        </BaseModal>
        <BaseModal
            :titulo="'Actualizar hospital'"
            :dialog="dialogEdit"
            @close-modal="() => (dialogEdit = false)"
        >
            <NuevoHospital
                :hospital="hospital"
                @submit="actualizarAgente"
                @close-form="(val: boolean) => (dialogEdit = val)"
            />
        </BaseModal>
    </q-page>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { Hospital, HospitalFilter } from 'src/interfaces.ts'
import { Notify, QBtn, QIcon, QInnerLoading, QInput, QPage, QSpinnerGears, QTable, QTd, QTh, QTr } from 'quasar'
import BaseModal from 'src/components/BaseModal.vue'
import NuevoHospital from './partials/NuevoHospital.vue'
import hospitalService from 'src/boot/services/hospitalService.ts'
const columns = [{ name: 'Hospital', label: 'Hospital', field: 'hospital' }]

const dialog = ref(false)
const dialogEdit = ref(false)
const hospital = ref<Hospital>({})
const loading = ref<boolean>(false)
const disableButton = ref<boolean>(false)
const hospitales = ref<Hospital[]>([])
const currentPage = ref<number>(1)
const total = ref<number>(0)

const filtro = reactive<HospitalFilter>({ perPage: 10, page: 1 })

const updatePagination = async (filtroTabla: HospitalFilter | undefined = undefined) => {
    loading.value = true
    filtro.perPage = filtroTabla?.rowsPerPage ?? filtro.perPage
    filtro.page = filtroTabla?.page ?? filtro.page
    try {
        hospitales.value = []
        const response = await hospitalService.baseGetQuery(filtro)
        hospitales.value = response.data
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

const deleteAgente = async (agenteId: number) => {
    await hospitalService.baseDelete(agenteId.toString())
    await updatePagination()
}

onMounted(async () => {
    await updatePagination()
})
const updateAgente = async (hsopitalEdit: Hospital) => {
    dialogEdit.value = true
    hospital.value = { ...hsopitalEdit }
}
const guardarAgente = async (hospital: Hospital) => {
    disableButton.value = true
    await hospitalService.basePost(hospital)
    filtro.page = 1
    await updatePagination()
    Notify.create('Se guardo el agente correctamente')
    disableButton.value = false
    dialog.value = false
}
const actualizarAgente = async (hospital: Hospital) => {
    disableButton.value = true
    await hospitalService.basePut(hospital)
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
