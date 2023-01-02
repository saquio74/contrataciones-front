<template>
    <q-page class="column q-mt-lg">
        <div class="text-blue text-center q-pa-md flex flex-center text-h4">{{ 'Agentes' }}</div>
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
            <q-input
                v-model="filtro.legajo"
                dense
                debounce="300"
                placeholder="Legajo"
                @update:model-value="updatePagination()"
            >
                <template #append>
                    <q-icon name="search" />
                </template>
            </q-input>
            <q-input
                v-model="filtro.dni"
                dense
                debounce="300"
                placeholder="Documento"
                @update:model-value="updatePagination()"
            >
                <template #append>
                    <q-icon name="search" />
                </template>
            </q-input>
            <q-input
                v-model="filtro.hospital"
                dense
                debounce="300"
                placeholder="Hospital"
                @update:model-value="updatePagination()"
            >
                <template #append>
                    <q-icon name="search" />
                </template>
            </q-input>
            <q-input
                v-model="filtro.sector"
                dense
                debounce="300"
                placeholder="Sector"
                @update:model-value="updatePagination()"
            >
                <template #append>
                    <q-icon name="search" />
                </template>
            </q-input>
            <q-input
                v-model="filtro.servicio"
                dense
                placeholder="Servicio"
                debounce="300"
                @update:model-value="updatePagination()"
            >
                <template #append>
                    <q-icon name="search" />
                </template>
            </q-input>
            <q-btn
                color="purple"
                label="Nuevo agente"
                @click="openNewModal"
            />
        </div>

        <q-table
            v-if="agentes && agentes.length"
            class="my-sticky-column-table"
            :rows="agentes"
            :columns="columns"
            :dense="$q.screen.lt.md"
            :pagination="{ rowsPerPage: 10, page: currentPage, rowsNumber: total }"
            @request="(data) => updatePagination(data.pagination)"
        />
        <div
            v-if="(!agentes || !agentes.length) && !loading"
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
            :titulo="'Nuevo agente'"
            :dialog="dialog"
            @close-modal="() => (dialog = false)"
        >
            <NuevoAgente />
        </BaseModal>
    </q-page>
</template>
<script setup lang="ts">
import { useAgenteStore } from 'src/stores/agentesStore/agenteStore.ts'
import { storeToRefs } from 'pinia'
import { onMounted, reactive, ref } from 'vue'
import { Agente, AgentesFilter } from 'src/interfaces.ts'
import { date } from 'quasar'
import BaseModal from 'src/components/BaseModal.vue'
import NuevoAgente from './partials/NuevoAgente.vue'
const columns = [
    { name: 'Legajo', label: 'Legajo', field: 'legajo' },
    { name: 'dni', field: 'dni', label: 'DNI' },
    { name: 'nombre', field: 'nombre', label: 'Nombre' },
    { name: 'horario', field: 'horario', label: 'Horario' },
    {
        name: 'created_at',
        field: (agente: Agente) => date.formatDate(agente.created_at, 'DD-MM-YYYY'),
        label: 'Ingreso'
    },
    {
        name: 'updated_at',
        field: (agente: Agente) => date.formatDate(agente.updated_at, 'DD-MM-YYYY'),
        label: 'Modificación'
    },
    {
        name: 'Hospital',
        field: (agente: Agente) => agente.hospital?.hospital,
        label: 'Hospital'
    },
    {
        name: 'Sector',
        field: (agente: Agente) => agente.sector?.sector,
        label: 'Sector'
    },
    {
        name: 'Servicio',
        field: (agente: Agente) => agente.servicio?.servicio,
        label: 'Servicio'
    },
    {
        name: 'incisos',
        field: (agente: Agente) => agente.ageninc?.map((inc) => inc.inciso.inciso).join(', '),
        label: 'Incisos'
    }
]

const dialog = ref(false)
const loading = ref<boolean>(false)
const agenteStore = useAgenteStore()
const { agentes, currentPage, total } = storeToRefs(agenteStore)
const filtro = reactive<AgentesFilter>({ perPage: 10, page: 1 })

const updatePagination = async (filtroTabla: AgentesFilter | undefined = undefined) => {
    loading.value = true
    filtro.perPage = filtroTabla?.rowsPerPage ?? filtro.perPage
    filtro.page = filtroTabla?.page ?? filtro.page
    try {
        await agenteStore.getAgentes(filtro)
    } catch {
    } finally {
        loading.value = false
    }
}
const openNewModal = () => {
    dialog.value = true
}

onMounted(async () => {
    await agenteStore.getAgentes(filtro)
})
</script>
<style lang="scss">
.my-sticky-column-table {
    /* specifying max-width so the example can
    highlight the sticky column on any browser window */
    max-width: 100%;
}
</style>
