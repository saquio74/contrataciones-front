import { defineStore } from 'pinia'
import { Agente, AgentesFilter } from 'src/interfaces.ts'
// import type { User, Login } from 'src/interfaces/index.ts'
import { ref, computed, type ComputedRef } from 'vue'
import AgenteService from 'src/boot/services/agenteService'

export const useAgenteStore = defineStore('agente', () => {
    const agentes = ref<Agente[]>([])
    const currentAgente = ref<Agente>()
    const currentPage = ref<number>(1)
    const total = ref<number>(0)
    const perPage = ref<number>(10)

    const agenteGetter: ComputedRef<Agente | undefined> = computed(() => currentAgente.value)

    const getAgentes = async (filtro: AgentesFilter) => {
        agentes.value = []
        const agenteResponse = await AgenteService.baseGetQuery(filtro, '')
        agentes.value = agenteResponse.data
        currentPage.value = agenteResponse.current_page
        total.value = agenteResponse.total
        perPage.value = agenteResponse.per_page
    }

    return {
        agentes,
        currentAgente,
        currentPage,
        agenteGetter,
        perPage,
        total,
        getAgentes
    }
})
