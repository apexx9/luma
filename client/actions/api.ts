import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
});

export default instance;

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");

    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

//get

export const get = <T>(url: string): Promise<T> => {
    return instance.get(url).then((response) => response.data);
}


export const post = <TResponse, TRequest = unknown>(url: string, data: TRequest): Promise<TResponse> => {
    return instance.post<TResponse>(url, data).then((response) => response.data);
}

export const put = <TResponse, TRequest = unknown>(url: string, data: TRequest): Promise<TResponse> => {
    return instance.put<TResponse>(url, data).then((response) => response.data);
}

export const del = <T>(url: string): Promise<T> => {
    return instance.delete(url).then((response) => response.data);
}


