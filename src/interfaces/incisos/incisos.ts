export interface Ageninc {
    id: number
    agente_id: number
    inciso_id: number
    inciso: Inciso
}
export interface Inciso {
    id: number
    inciso: string
    valor: number
    created_at: Date
}
