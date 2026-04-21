import axios from "axios";
import { tokenManager } from "@/lib/auth";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
});

// Set up request interceptor for this specific instance
instance.interceptors.request.use(
    (config) => {
        const token = tokenManager.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('Token attached to request:', config.url);
        } else {
            console.warn('No token available for request:', config.url);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Set up response interceptor for this specific instance
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried refreshing yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = tokenManager.getRefreshToken();
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/auth/refresh`,
                    { refreshToken },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        timeout: 10000,
                    }
                );

                const { accessToken, refreshToken: newRefreshToken } = response.data;
                
                // Update tokens with new ones
                tokenManager.setTokens(accessToken, newRefreshToken || refreshToken);
                
                // Retry the original request with new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return instance(originalRequest);
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError);
                // Clear tokens and redirect to login on refresh failure
                tokenManager.clearTokens();
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            }
        }

        return Promise.reject(error);
    }
);

export default instance;

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


