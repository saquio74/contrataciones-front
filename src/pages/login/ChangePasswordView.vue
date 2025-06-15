<template>
    <q-page class="column items-center">
        <div class="">
            <div class="text-blue text-center q-mt-lg q-mb-lg flex flex-center flex-stretch text-h4">
                Cambiar contraseña
            </div>
            <form
                class=""
                @submit.prevent="enviarPassword()"
            >
                <q-input
                    ref="oldPasswordRef"
                    v-model="passwordData.oldPassword"
                    filled
                    :type="isPwdOld ? 'password' : 'text'"
                    hint="Contraseña vieja"
                    :rules="oldPasswordRules"
                    v
                >
                    <template #append>
                        <q-icon
                            :name="isPwdOld ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwdOld = !isPwdOld"
                        />
                    </template>
                </q-input>
                <q-input
                    ref="passwordRef"
                    v-model="passwordData.password"
                    filled
                    :type="isPwdNew ? 'password' : 'text'"
                    hint="Contraseña nueva"
                    :rules="passwordRules"
                    v
                >
                    <template #append>
                        <q-icon
                            :name="isPwdNew ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwdNew = !isPwdNew"
                        />
                    </template>
                </q-input>
                <q-input
                    ref="passwordConfirmRef"
                    v-model="passwordData.password_confirmation"
                    filled
                    :type="isPwdConfirm ? 'password' : 'text'"
                    hint="Confirmar contraseña"
                    :rules="passwordConfirmRules"
                    v
                >
                    <template #append>
                        <q-icon
                            :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwdConfirm = !isPwdConfirm"
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
                        color="secondary"
                        label="Volver"
                        @click="() => router.push({ name: 'home' })"
                    />
                </div>
            </form>
        </div>
    </q-page>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Validation, ChangePassword } from '../../interfaces/index'
import { useRouter } from 'vue-router'
import userService from 'src/boot/services/userService'
import { Notify } from 'quasar'

const router = useRouter()
const oldPasswordRef = ref<Validation>()
const passwordRef = ref<Validation>()
const passwordConfirmRef = ref<Validation>()
const isPwdOld = ref<boolean>(true)
const isPwdNew = ref<boolean>(true)
const isPwdConfirm = ref<boolean>(true)
const oldPasswordRules = [(val: string) => (val && val.length > 0) || 'El campo contraseña anterior es requerido']
const passwordRules = [(val: string) => (val && val.length > 0) || 'El campo nueva contraseña es requerido']
const passwordConfirmRules = [
    (val: string) => (val && val.length > 0 && val === passwordData.password) || 'Las contraseñas deben coincidir'
]
const passwordData = reactive<ChangePassword>({
    password: '',
    password_confirmation: '',
    oldPassword: ''
})

const enviarPassword = async () => {
    oldPasswordRef.value?.validate()
    passwordRef.value?.validate()
    passwordConfirmRef.value?.validate()

    if (oldPasswordRef.value?.hasError || passwordRef.value?.hasError || passwordConfirmRef.value?.hasError) return

    await userService.updatePassword(passwordData)
    Notify.create('Se actualizo correctamente la contraseña')
    router.push({ name: 'home' })
}
</script>
