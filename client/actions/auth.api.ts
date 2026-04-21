// src/features/auth/api/auth.api.ts

import { post } from "@/actions/api";

// 🔹 TYPES
export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

// 🔹 API CALLS

export const register = (data: RegisterRequest) => {
  return post<any, RegisterRequest>("/auth/register", data);
};

export const login = (data: LoginRequest) => {
  return post<AuthResponse, LoginRequest>("/auth/login", data);
};

export const refreshToken = (refreshToken: string) => {
  return post<{ accessToken: string; refreshToken: string }, { refreshToken: string }>("/auth/refresh", { refreshToken });
};