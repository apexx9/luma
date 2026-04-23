import { api } from '@/lib/api-client';

// Export API methods for backward compatibility
export const get = <T>(url: string, config?: any) => api.get<T>(url, config);
export const post = <T, D = any>(url: string, data?: D, config?: any) => api.post<T>(url, data, config);
export const put = <T, D = any>(url: string, data?: D, config?: any) => api.put<T>(url, data, config);
export const patch = <T, D = any>(url: string, data?: D, config?: any) => api.patch<T>(url, data, config);
export const del = <T>(url: string, config?: any) => api.delete<T>(url, config);
