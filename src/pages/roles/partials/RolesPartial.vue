<template>
    <div>
        <q-table
            v-if="roles && roles.length"
            class="my-sticky-column-table"
            :rows="roles"
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
                            @click="deleteRol(props.row.id)"
                        />
                        <q-btn
                            size="sm"
                            color="warning"
                            round
                            dense
                            icon="create"
                            @click="updateRol(props.row)"
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
                    v-model="currentRol.name"
                    dense
                    placeholder="Nombre"
                />
                <q-input
                    v-model="currentRol.description"
                    dense
                    placeholder="Descripcion"
                />
                <BaseSelectReq
                    endpoint="permissions"
                    opcion="name"
                    :disable="currentRol?.special === 'all-access'"
                    :multiple="true"
                    :use-chips="true"
                    :hide-selected="false"
                    :pre-load="
                        currentRol?.permissionsrole?.map((pr) => {
                            return { value: pr.permissions?.id, label: pr.permissions?.name }
                        })
                    "
                    @selected="seleccionarRol"
                />
                <div
                    v-for="user in currentRol?.user"
                    :key="user.id"
                >
                    <q-chip
                        removable
                        color="green"
                        text-color="white"
                        icon="person"
                        :label="user.name"
                        :title="user.email"
                        @remove="quitRol(user)"
                    />
                </div>
            </div>
        </BaseModal>
    </div>
</template>
<script lang="ts" setup>
import BaseModal from 'src/components/BaseModal.vue'
import BaseSelectReq from 'src/components/BaseSelectReq.vue'
import rolesService from 'src/boot/services/rolesService.ts'
import { Roles, RolesFilter, SelecOption, RolesPermisos, User } from 'src/interfaces.ts'
import { onMounted, reactive, ref } from 'vue'

const dialog = ref<boolean>(false)
const filtro = reactive<RolesFilter>({ perPage: 10, page: 1 })
const deleteRol = async (rol: number) => {
    await rolesService.baseDelete(rol.toString())
}
const roles = ref<Roles[]>([])
const permissions = ref<RolesPermisos[]>([])
const loading = ref<boolean>(false)
const total = ref<number>(0)
const currentPage = ref<number>(0)
const columns = [
    { name: 'nombre', field: 'name', label: 'Nombre' },
    { name: 'descripcion', field: 'description', label: 'Descripcion' }
]
onMounted(async () => {
    await getRoles()
})
const currentRol = ref<Roles>({
    name: '',
    special: 'no-access',
    description: '',
    permissionsrole: [],
    user: []
})

const updatePagination = async (filtroTabla: RolesFilter | undefined = undefined) => {
    loading.value = true
    filtro.perPage = filtroTabla?.rowsPerPage ?? filtro.perPage
    filtro.page = filtroTabla?.page ?? filtro.page
    try {
        await getRoles()
    } catch {
    } finally {
        loading.value = false
    }
}
const getRoles = async () => {
    const resp = await rolesService.baseGetQuery(filtro)
    roles.value = resp.data
    total.value = resp.total
    currentPage.value = resp.current_page
}
const updateRol = (rol: Roles) => {
    currentRol.value = {
        name: '',
        special: 'no-access',
        description: '',
        permissionsrole: [],
        user: []
    }
    dialog.value = true
    currentRol.value = rol
}
const seleccionarRol = (data: SelecOption<number>[]) => {
    permissions.value = data.map((data) => {
        return { roles_id: currentRol.value?.id ?? 0, permmissions_id: data.value }
    })
}

const quitRol = (user: User) => {
    user.role_id = 0
    rolesService.updateRolUser(user)
    const index = currentRol.value?.user.findIndex((data) => data.id === user.id)
    console.log(index)
    if (index !== null && index !== undefined) currentRol.value?.user.splice(index, 1)
}
</script>
