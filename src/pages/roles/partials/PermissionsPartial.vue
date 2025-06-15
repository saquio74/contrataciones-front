<template>
    <div>
        <q-table
            v-if="permisos && permisos.length"
            class="my-sticky-column-table"
            :rows="permisos"
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
                            @click="deleteRol(props.row.id)"
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
            v-if="(!permisos || !permisos.length) && !loading"
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
    </div>
</template>
<script lang="ts" setup>
import permisosService from 'src/boot/services/permissionsService'
import { Permisos, PermisosFilter } from 'src/interfaces'
import { onMounted, reactive, ref } from 'vue'

const filtro = reactive<PermisosFilter>({ perPage: 10, page: 1 })
const deleteRol = (rol: number) => {
    console.log(rol)
}
const permisos = ref<Permisos[]>([])
const loading = ref<boolean>(false)
const total = ref<number>(0)
const currentPage = ref<number>(0)
const columns = [
    { name: 'nombre', field: 'name', label: 'Nombre' },
    { name: 'descripcion', field: 'description', label: 'Descripcion' }
]
onMounted(async () => {
    await getpermisos()
})

const updatePagination = async (filtroTabla: PermisosFilter | undefined = undefined) => {
    loading.value = true
    permisos.value = []
    filtro.perPage = filtroTabla?.rowsPerPage ?? filtro.perPage
    filtro.page = filtroTabla?.page ?? filtro.page
    try {
        await getpermisos()
    } catch {
    } finally {
        loading.value = false
    }
}
const getpermisos = async () => {
    const resp = await permisosService.baseGetQuery(filtro)
    permisos.value = resp.data
    total.value = resp.total
    currentPage.value = resp.current_page
}
</script>
