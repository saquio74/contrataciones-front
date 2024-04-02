<template>
    <q-page class="column q-mt-lg">
        <div class="text-blue text-center q-pa-md flex flex-center text-h4">{{ 'Profesionales' }}</div>
        <div class="row justify-around q-mt-lg q-mx-lg">
            <q-input
                v-model="filtro.nombre"
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
                v-if="puedeCrearProfesionales"
                color="purple"
                label="Nuevo profesional"
                @click="openNewModal"
            />
        </div>

        <q-table
            v-if="profesionales && profesionales.length"
            class="my-sticky-column-table"
            :rows="profesionales"
            :columns="columns"
            :dense="$q.screen.lt.md"
            :pagination="{ rowsPerPage: 10, page: filtro.page, rowsNumber: total }"
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
                            v-if="puedeBorrarProfesionales"
                            size="sm"
                            color="red"
                            round
                            class="q-mx-sm"
                            dense
                            :icon="'remove'"
                            @click="deleteProfesional(props.row.id)"
                        />
                        <q-btn
                            v-if="puedeEditarProfesionales"
                            size="sm"
                            color="warning"
                            round
                            dense
                            icon="create"
                            @click="updateProfesional(props.row)"
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
            v-if="(!profesionales || !profesionales.length) && !loading"
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
            titulo="Nuevo profesional"
            :dialog="dialog"
            @close-modal="() => (dialog = false)"
        >
            <NuevoProfesional
                :profesional-prop="undefined"
                @submit="guardarProfesional"
            />
        </BaseModal>
        <BaseModal
            titulo="Actualizar profesional"
            :dialog="dialogEdit"
            @close-modal="() => (dialogEdit = false)"
        >
            <NuevoProfesional
                :profesional-prop="profesional.id"
                @submit="actualizarProfesional"
                @close-form="(val: boolean) => (dialogEdit = val)"
            />
        </BaseModal>
    </q-page>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, reactive, ref } from 'vue'
import { Profesional, ProfesionalFilter } from 'src/interfaces.ts'
import { date, Notify, QBtn, QIcon, QInnerLoading, QInput, QPage, QSpinnerGears, QTable, QTd, QTh, QTr } from 'quasar'
import BaseModal from 'src/components/BaseModal.vue'
import NuevoProfesional from './partials/NuevoProfesional.vue'
import profesionalService from 'src/boot/services/profesionalesService.ts'
import { useUserStore } from 'src/stores/usersStore/userStore.ts'
const columns = [
    { name: 'proveedor', field: 'proveedor', label: 'Proveedor' },
    { name: 'dni', field: 'dni', label: 'DNI' },
    { name: 'nombre', field: 'nombre', label: 'Nombre' },
    { name: 'apellido', field: 'apellido', label: 'Apellido' },
    {
        name: 'created_at',
        field: (profesional: Profesional) => date.formatDate(profesional.created_at, 'DD-MM-YYYY'),
        label: 'Ingreso'
    },
    {
        name: 'updated_at',
        field: (profesional: Profesional) => date.formatDate(profesional.updated_at, 'DD-MM-YYYY'),
        label: 'Modificación'
    }
]

const dialog = ref(false)
const dialogEdit = ref(false)
const loading = ref<boolean>(false)
const disableButton = ref<boolean>(false)
const profesionales = ref<Profesional[]>([])
const profesional = ref<Profesional>({
    nombre: '',
    apellido: '',
    cuil: 0,
    dni: 0,
    genero: 'M',
    matricula: '',
    proveedor: 0
})
// const agenteStore = useAgenteStore()
// const { agentes, currentPage, total } = storeToRefs(agenteStore)
const total = ref<number>(0)
const userStore = useUserStore()
const { puedeBorrarProfesionales, puedeCrearProfesionales, puedeEditarProfesionales } = storeToRefs(userStore)
const filtro = reactive<ProfesionalFilter>({ perPage: 10, page: 1, nombre: '' })

const updatePagination = async (filtroTabla: ProfesionalFilter | undefined = undefined) => {
    profesionales.value = []
    loading.value = true
    filtro.perPage = filtroTabla?.rowsPerPage ?? filtro.perPage
    filtro.page = filtroTabla?.page ?? filtro.page
    try {
        const resp = await profesionalService.baseGetQuery(filtro)
        profesionales.value = resp.data
        total.value = resp.total
    } catch {
    } finally {
        loading.value = false
    }
}
const openNewModal = () => {
    dialog.value = true
}

const deleteProfesional = async (id: number) => {
    await profesionalService.baseDelete(id.toString())
    await updatePagination()
}

onMounted(async () => {
    await updatePagination()
})
const updateProfesional = async (profesionalEdit: Profesional) => {
    dialogEdit.value = true
    profesional.value = { ...profesionalEdit }
}
const guardarProfesional = async (profesional: Profesional) => {
    disableButton.value = true
    await profesionalService.basePost(profesional)
    filtro.page = 1
    await updatePagination(filtro)
    Notify.create('Se guardo el profesional correctamente')
    disableButton.value = false
    dialog.value = false
}
const actualizarProfesional = async (profesional: Profesional) => {
    disableButton.value = true
    await profesionalService.basePut(profesional)
    filtro.page = 1
    await updatePagination(filtro)
    Notify.create('Se actualizo el profesional correctamente')
    disableButton.value = false
    dialogEdit.value = false
}
</script>
<style lang="scss">
.my-sticky-column-table {
    max-width: 100%;
}
</style>
