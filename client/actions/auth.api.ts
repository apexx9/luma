import { api } from '@/lib/api-client';
import {
  authService,
  type AuthResponse,
  type LoginCredentials,
  type RegisterCredentials,
  type User,
} from '@/lib/auth';

export const login = (credentials: LoginCredentials): Promise<AuthResponse> =>
  authService.login(credentials);

export const register = (credentials: RegisterCredentials): Promise<AuthResponse> =>
  authService.register(credentials);

export const logout = (): Promise<void> => authService.logout();

export const refreshToken = (): Promise<string | null> =>
  authService.refreshAccessToken();

export const getCurrentUser = (): Promise<User | null> =>
  Promise.resolve(authService.getCurrentUser());

export const updateProfile = (data: Partial<User>): Promise<User> =>
  authService.updateProfile(data);

export const changePassword = (data: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> => authService.changePassword(data);

export const validateSession = (): Promise<{ valid: boolean }> =>
  api.get<{ valid: boolean }>('/auth/validate');
