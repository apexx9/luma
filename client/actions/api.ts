import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers : {
        "Content-Type": "application/json",
    }
});

export default instance;

//get

export const get = <T>(url: string) : Promise<T> => {
    return instance.get(url).then((response) => response.data);
}


export const post = <T>(url: string, data: T) : Promise <T> => {
    return instance.post(url, data).then((response) => response.data);
}

export const put = <T>(url: string, data: T) : Promise <T> => {
    return instance.put(url, data).then((response) => response.data);
}

export const del = <T>(url: string) : Promise <T> => {
    return instance.delete(url).then((response) => response.data);
}


