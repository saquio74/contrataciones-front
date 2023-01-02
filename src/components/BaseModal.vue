<template>
    <q-dialog
        v-model="dialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
    >
        <q-card class="bg-primary text-white">
            <q-bar>
                <q-space />

                <q-btn
                    :disable="!maximizedToggle"
                    dense
                    flat
                    icon="minimize"
                    @click="maximizedToggle = false"
                >
                    <q-tooltip
                        v-if="maximizedToggle"
                        class="bg-white text-primary"
                    >
                        Minimize
                    </q-tooltip>
                </q-btn>
                <q-btn
                    :disable="maximizedToggle"
                    dense
                    flat
                    icon="crop_square"
                    @click="maximizedToggle = true"
                >
                    <q-tooltip
                        v-if="!maximizedToggle"
                        class="bg-white text-primary"
                    >
                        Maximize
                    </q-tooltip>
                </q-btn>
                <q-btn
                    dense
                    flat
                    icon="close"
                    @click="$emit('closeModal')"
                >
                    <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
            </q-bar>

            <q-card-section>
                <div class="text-h6 text-center">{{ titulo }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <slot />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps<{
    titulo: string
    dialog: boolean
}>()
const dialog = computed(() => props.dialog)
defineEmits(['closeModal'])

const maximizedToggle = ref(true)
</script>
