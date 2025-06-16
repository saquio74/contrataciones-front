import { Notify } from 'quasar'
import axios, { AxiosInstance } from 'axios'
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $axios: AxiosInstance
    }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually

class Api {
    public api: AxiosInstance
    constructor(slug: string) {
        this.api = axios.create({
            baseURL: `${process.env.BASE_URL_API}api/${slug}`,
            timeout: 60000
        })
        this.instanceToken()
    }
    public instanceToken(): void {
        const token = localStorage.getItem('token-laravel')
        if (token) this.api.defaults.headers.Authorization = `Bearer ${token}`
        if (!token) this.api.defaults.headers.Authorization = ''
        this.api.interceptors.response.use(
            (res) => res?.data ?? res,
            (error) => {
                console.log()
                const errorResponse =
                    (error.response?.data?.message ?? error.response?.data.length)
                        ? error.response?.data[0]
                        : (error.response?.data ?? error.request ?? error.message ?? error)
                Notify.create(
                    typeof errorResponse === 'string' && errorResponse.length > 0 ? errorResponse : 'Ocurrio un error'
                )
                return Promise.reject(errorResponse)
            }
        )
    }
}

export { Api }
