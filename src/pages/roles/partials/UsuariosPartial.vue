<template>
    <div>
        <q-table
            class="my-sticky-column-table"
            :rows="usuarios"
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
                    <q-td
                        auto-width
                        class="text-center"
                    >
                        <q-btn
                            v-if="props.row.id > 1"
                            size="sm"
                            color="red"
                            round
                            class="q-mx-sm"
                            dense
                            :icon="'remove'"
                            @click="deleteUsuario(props.row.id)"
                        />
                        <q-btn
                            size="sm"
                            color="warning"
                            round
                            dense
                            icon="create"
                            @click="updateUsuario(props.row)"
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
        <BaseModal
            :titulo="'Rol'"
            :dialog="dialog"
            @close-modal="() => (dialog = false)"
        >
            <div class="d-flex justify-around q-mt-lg q-mx-lg">
                <q-input
                    v-model="currentUser.name"
                    dense
                    placeholder="Nombre"
                />
                <q-input
                    v-model="currentUser.email"
                    dense
                    placeholder="Descripcion"
                />
                <BaseSelectReq
                    endpoint="roles"
                    opcion="name"
                    :hide-selected="false"
                    :pre-load="{ value: currentUser?.roles?.id, label: currentUser?.roles?.name }"
                    @selected="seleccionarPermiso"
                />
            </div>
            <div class="q-pa-md q-gutter-sm">
                <q-btn
                    color="purple"
                    label="Guardar Agente"
                    icon-right="send"
                    :loading="disable"
                    @click="enviarFormulario"
                />
            </div>
        </BaseModal>
    </div>
</template>
<script lang="ts" setup>
import BaseModal from 'src/components/BaseModal.vue'
import BaseSelectReq from 'src/components/BaseSelectReq.vue'
import userService from 'src/boot/services/userService.ts'
import { User, UserFilter } from 'src/interfaces.ts'
import { onMounted, reactive, ref } from 'vue'
import { SelecOption } from 'src/interfaces/filters/baseFilter.ts'

const filtro = reactive<UserFilter>({
    perPage: 10,
    page: 1
})
const dialog = ref(false)
const disable = ref(false)
const loading = ref<boolean>(false)
const total = ref<number>(0)
const currentPage = ref<number>(0)
const usuarios = ref<User[]>([])
const currentUser = ref<User>({
    id: 0,
    name: 'string',
    email: '',
    token: '',
    role_id: 0
})

const deleteUsuario = async (id: number) => {
    await userService.baseDelete(id.toString())
}
const updateUsuario = (usuario: User) => {
    dialog.value = true
    currentUser.value = usuario
}
onMounted(async () => {
    getUsers()
})

const columns = [
    { name: 'nombre', field: 'name', label: 'Nombre' },
    { name: 'email', field: 'email', label: 'email' }
]
const getUsers = async () => {
    const response = await userService.baseGetQuery(filtro)
    usuarios.value = response.data
    console.log(usuarios.value)
    currentPage.value = response.current_page
    total.value = response.total
}
const updatePagination = async (filtroTabla: UserFilter | undefined = undefined) => {
    loading.value = true
    filtro.perPage = filtroTabla?.rowsPerPage ?? filtro.perPage
    filtro.page = filtroTabla?.page ?? filtro.page
    try {
        await getUsers()
    } catch {
    } finally {
        loading.value = false
    }
}
const enviarFormulario = async () => {
    userService.basePut(currentUser.value)
    await getUsers()
    dialog.value = false
}
const seleccionarPermiso = (rol: SelecOption<number>) => {
    if (!rol) return
    currentUser.value.role_id = rol.value
}
</script>
