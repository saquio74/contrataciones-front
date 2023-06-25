<template>
    <q-page class="column items-center">
        <div class="row">
            <div class="text-blue text-center q-mt-lg q-mb-lg flex flex-center flex-stretch text-h4">Registro</div>
        </div>
        <form
            class="col-12 q-pa-md form-control"
            @submit.prevent="enviarLogin()"
        >
            <q-input
                ref="emailRef"
                v-model="loginData.email"
                filled
                class="q-gutter-md col-12 q-mb-lg"
                label="Email"
                :rules="emailRules"
            />
            <q-input
                ref="nameRef"
                v-model="loginData.name"
                filled
                class="q-gutter-md col-12 q-mb-lg"
                label="nombre"
                :rules="nameRules"
            />
            <q-input
                ref="passwordRef"
                v-model="loginData.password"
                filled
                :type="isPwd ? 'password' : 'text'"
                hint="contraseña"
                :rules="passwordRules"
                v
            >
                <template #append>
                    <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                    />
                </template>
            </q-input>
            <q-input
                ref="passwordConfirmRef"
                v-model="loginData.password_confirmation"
                filled
                :type="isPwd ? 'password' : 'text'"
                hint="Confirmar contraseña"
                :rules="passwordConfirmRules"
                v
            >
                <template #append>
                    <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                    />
                </template>
            </q-input>
            <div class="q-mt-xl">
                <q-btn
                    color="primary"
                    label="Enviar"
                    type="submit"
                />
            </div>
            <div class="q-mt-xl">
                <q-btn
                    color="Secondary"
                    label="Ya tengo cuenta"
                    @click="() => router.push({ name: 'home' })"
                />
            </div>
        </form>
    </q-page>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Validation, Registro } from '../../interfaces/index'
import { useUserStore } from 'src/stores/usersStore/userStore.ts'
import { useRouter } from 'vue-router'

const router = useRouter()

const loginData = reactive<Registro>({
    email: '',
    name: '',
    password: '',
    password_confirmation: '',
    role_id: 0
})

const emailRef = ref<Validation>()
const nameRef = ref<Validation>()
const passwordRef = ref<Validation>()
const passwordConfirmRef = ref<Validation>()

const isPwd = ref<boolean>(true)

const emailRules = [(val: string) => (val && val.length > 0) || 'El campo email es requerido']
const nameRules = [(val: string) => (val && val.length > 0) || 'El campo nombre es requerido']
const passwordRules = [(val: string) => (val && val.length > 0) || 'El campo contraseña es requerido']
const passwordConfirmRules = [
    (val: string) => (val && val.length > 0 && val === loginData.password) || 'Las contraseñas deben coincidir'
]
const userStore = useUserStore()
const { register } = userStore

const enviarLogin = async () => {
    emailRef.value?.validate()
    nameRef.value?.validate()
    passwordRef.value?.validate()
    passwordConfirmRef.value?.validate()
    if (
        emailRef.value?.hasError ||
        passwordRef.value?.hasError ||
        nameRef.value?.hasError ||
        passwordConfirmRef.value?.hasError
    )
        return

    await register(loginData)

    router.push({ name: 'home' })
}
</script>
<style scoped>
.form-control {
    min-width: 60%;
}
</style>
