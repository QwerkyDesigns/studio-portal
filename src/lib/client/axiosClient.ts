import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface IAxiosClient {
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T>(url: string, payload: T, config?: AxiosRequestConfig): Promise<T>;
    put<T>(url: string, payload: T, config?: AxiosRequestConfig): Promise<T>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

export class AxiosClient implements IAxiosClient {
    private client: AxiosInstance;

    constructor(config?: AxiosRequestConfig) {
        this.client = axios.create(config);
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = (await this.client.get(url, config)) as AxiosResponse<T>;
            return response.data as T;
        } catch (error) {
            console.log(error);
            return Promise.resolve(null as unknown as T);
        }
    }

    async post<TIn, TOut>(url: string, payload?: TIn, config?: AxiosRequestConfig): Promise<TOut> {
        try {
            const response = (await this.client.post(url, payload, config)) as AxiosResponse<TOut>;
            return response.data as TOut;
        } catch (error) {
            console.log(error);
            return Promise.resolve(null as unknown as TOut);
        }
    }

    async put<TIn, TOut>(url: string, payload?: TIn, config?: AxiosRequestConfig): Promise<TOut> {
        try {
            const response = (await this.client.put(url, payload, config)) as AxiosResponse<TOut>;
            return response.data as TOut;
        } catch (error) {
            console.log(error);
            return Promise.resolve(null as unknown as TOut);
        }
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.client.delete(url, config);
            return response.data as T;
        } catch (error) {
            console.log(error);
            return Promise.resolve(null as unknown as T);
        }
    }
}
export default AxiosClient;
