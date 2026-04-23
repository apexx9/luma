import { api } from '@/lib/api-client';
import { LoginCredentials, RegisterCredentials, AuthResponse, User } from '@/lib/auth';

// Auth API calls
export const login = (credentials: LoginCredentials) => 
  api.post<AuthResponse>('/auth/login', credentials);

export const register = (credentials: RegisterCredentials) => 
  api.post<AuthResponse>('/auth/register', credentials);

export const logout = (refreshToken: string) => 
  api.post<void>('/auth/logout', { refreshToken });

export const refreshToken = (refreshToken: string) => 
  api.post<{ accessToken: string; refreshToken: string }>('/auth/refresh', { refreshToken });

export const getCurrentUser = () => 
  api.get<User>('/auth/me');

export const updateProfile = (data: Partial<User>) => 
  api.put<User>('/auth/profile', data);

export const changePassword = (data: { currentPassword: string; newPassword: string }) => 
  api.post<void>('/auth/change-password', data);
