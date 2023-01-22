export interface BaseFilter {
    perPage?: number
    page?: number
    rowsPerPage?: number
}
export interface SelecOption<T> {
    label: string
    value: T
}
