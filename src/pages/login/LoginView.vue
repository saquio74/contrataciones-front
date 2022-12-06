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
        </form>
    </q-page>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type login from '../../interfaces/login'
import type { validation } from '../../interfaces/validations'
import userService from 'src/boot/services/userService.ts'
import { User } from 'src/interfaces/user/user.ts'

const loginData = reactive<login>({
    email: '',
    password: ''
})

const emailRef = ref<validation>()
const passwordRef = ref<validation>()

const isPwd = ref<boolean>(true)

const emailRules = [(val: string) => (val && val.length > 0) || 'El campo email es requerido']
const passwordRules = [(val: string) => (val && val.length > 0) || 'El campo contraseña es requerido']

const enviarLogin = async () => {
    emailRef.value?.validate()
    passwordRef.value?.validate()

    if (emailRef.value?.hasErrors || passwordRef.value?.hasErrors) return
    const user: User = await userService.basePost(loginData, 'login')
    console.log(user)
}
</script>
<style scoped>
.form-control {
    min-width: 60%;
}
</style>
