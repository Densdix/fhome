import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const baseURL: string = 'https://test-task-api.allfuneral.com/';

const $host: AxiosInstance = axios.create({
    baseURL,
});


const $authHost: AxiosInstance = axios.create({
    baseURL,
});

const authInterceptor = (config: InternalAxiosRequestConfig) => {
    config.headers.authorization = localStorage.getItem('token');
    return config;
}

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };