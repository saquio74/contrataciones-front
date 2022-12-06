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
            baseURL: `${process.env.BASE_URL_API}/${slug}`,
            timeout: 15000
        })
        const token = localStorage.getItem('token-laravel')
        if (token) this.api.defaults.headers.Authorization = `bearer ${token}`
        this.api.interceptors.response.use(
            (res) => res?.data ?? res,
            (error) => Promise.reject(error.response?.data ?? error.request ?? error.message ?? error)
        )
    }
}

export { Api }
