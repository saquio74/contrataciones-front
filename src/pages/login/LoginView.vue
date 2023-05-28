<template>
    <q-page class="column items-center">
        <div class="row">
            <div class="text-blue text-center q-mt-lg q-mb-lg flex flex-center flex-stretch text-h4">Login</div>
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
            <q-btn
                color="primary"
                label="Enviar"
                type="submit"
            />
            <q-btn
                color="secondary"
                label="Registrarse"
                @click="irRegistro"
            />
        </form>
    </q-page>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Validation, Login } from '../../interfaces/index'
import { useUserStore } from 'src/stores/usersStore/userStore.ts'
import { useRouter } from 'vue-router'

const router = useRouter()

const loginData = reactive<Login>({
    email: '',
    password: ''
})

const emailRef = ref<Validation>()
const passwordRef = ref<Validation>()

const isPwd = ref<boolean>(true)

const emailRules = [(val: string) => (val && val.length > 0) || 'El campo email es requerido']
const passwordRules = [(val: string) => (val && val.length > 0) || 'El campo contraseña es requerido']
const userStore = useUserStore()
const { login } = userStore

const enviarLogin = async () => {
    emailRef.value?.validate()
    passwordRef.value?.validate()
    if (emailRef.value?.hasError || passwordRef.value?.hasError) return

    await login(loginData)

    router.push({ name: 'home' })
}
const irRegistro = async () => {
    await router.push({ name: 'register-view' })
}
</script>
<style scoped>
.form-control {
    min-width: 60%;
}
</style>
