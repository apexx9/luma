import { get, post, put, del } from './api';

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: string;
  isActive?: boolean;
}

export interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  totalLogins: number;
  serverUptime: string;
  databaseConnections: number;
}

export interface AdminActivity {
  id: number;
  adminId: number;
  adminName: string;
  action: string;
  target: string;
  timestamp: string;
  details?: string;
}

// User Management APIs
export const getAllUsers = () => {
  return get<User[]>('/admin/users');
};

export const getUserById = (id: number) => {
  return get<User>(`/admin/users/${id}`);
};

export const createUser = (data: CreateUserRequest) => {
  return post<User, CreateUserRequest>('/admin/users', data);
};

export const updateUser = (id: number, data: UpdateUserRequest) => {
  return put<User, UpdateUserRequest>(`/admin/users/${id}`, data);
};

export const deleteUser = (id: number) => {
  return del<void>(`/admin/users/${id}`);
};

export const resetUserPassword = (id: number, newPassword: string) => {
  return post<{ success: boolean }, { password: string }>(`/admin/users/${id}/reset-password`, { password: newPassword });
};

export const toggleUserStatus = (id: number) => {
  return post<User, {}>(`/admin/users/${id}/toggle-status`, {});
};

// System Statistics APIs
export const getSystemStats = () => {
  return get<SystemStats>('/admin/stats');
};

export const getAdminActivity = (limit?: number) => {
  return get<AdminActivity[]>(`/admin/activity${limit ? `?limit=${limit}` : ''}`);
};

// Bulk Operations
export const bulkDeleteUsers = (userIds: number[]) => {
  return post<{ success: boolean; deleted: number }, { userIds: number[] }>('/admin/users/bulk-delete', { userIds });
};

export const bulkToggleStatus = (userIds: number[], isActive: boolean) => {
  return post<{ success: boolean; updated: number }, { userIds: number[]; isActive: boolean }>('/admin/users/bulk-toggle', { userIds, isActive });
};

// Admin Authentication
export const validateAdminAccess = () => {
  return get<{ isAdmin: boolean }>('/admin/validate');
};
