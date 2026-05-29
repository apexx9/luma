import axios, { type AxiosInstance, type AxiosError } from 'axios';

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  TIMEOUT: 10000,
  ENDPOINTS: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    VALIDATE: '/auth/validate',
    ME: '/auth/me',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
  } as const,
} as const;

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar?: string | null;
  mustChangePassword: boolean;
  profileVerified: boolean;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

type JwtPayload = {
  sub?: number;
  email?: string;
  name?: string;
  role?: string;
  avatar?: string | null;
  mustChangePassword?: boolean;
  profileVerified?: boolean;
  exp?: number;
};

function decodeJwtPayload(token: string): JwtPayload | null {
  const [, payload] = token.split('.');

  if (!payload) {
    return null;
  }

  try {
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    const decoded = atob(padded);
    return JSON.parse(decoded) as JwtPayload;
  } catch {
    return null;
  }
}

function isAxiosError(error: unknown): error is AxiosError {
  return axios.isAxiosError(error);
}

class AuthService {
  private accessToken: string | null = null;

  private currentUser: User | null = null;

  private refreshPromise: Promise<AuthResponse | null> | null = null;

  private bootstrapPromise: Promise<boolean> | null = null;

  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private hydrateSession(session: AuthResponse): void {
    this.accessToken = session.accessToken;
    this.currentUser = session.user;
  }

  private clearSession(): void {
    this.accessToken = null;
    this.currentUser = null;
  }

  private buildAuthHeaders(): Record<string, string> {
    if (!this.accessToken) {
      return {};
    }

    return {
      Authorization: `Bearer ${this.accessToken}`,
    };
  }

  private async retryOnceOnUnauthorized<T>(action: () => Promise<T>): Promise<T> {
    try {
      return await action();
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 401) {
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          return action();
        }
      }

      throw error;
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.http.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.LOGIN,
      credentials,
    );
    this.hydrateSession(response.data);
    return response.data;
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await this.http.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.REGISTER,
      credentials,
    );
    this.hydrateSession(response.data);
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await this.retryOnceOnUnauthorized(() =>
        this.http.post(API_CONFIG.ENDPOINTS.LOGOUT, null, {
          headers: this.buildAuthHeaders(),
        }),
      );
    } catch (error: unknown) {
      if (!isAxiosError(error) || error.response?.status !== 401) {
        console.warn('Logout request failed:', error);
      }
    } finally {
      this.clearSession();
    }
  }

  async refreshAccessToken(): Promise<string | null> {
    if (this.refreshPromise) {
      return this.refreshPromise.then((session) => session?.accessToken ?? null);
    }

    this.refreshPromise = this.performRefresh();

    try {
      const session = await this.refreshPromise;
      return session?.accessToken ?? null;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async performRefresh(): Promise<AuthResponse | null> {
    try {
      const response = await this.http.post<AuthResponse>(
        API_CONFIG.ENDPOINTS.REFRESH,
      );

      if (!response.data?.accessToken) {
        this.clearSession();
        return null;
      }

      this.hydrateSession(response.data);
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.warn('Token refresh failed:', error.response?.status);
      }

      this.clearSession();
      return null;
    }
  }

  async fetchCurrentUser(): Promise<User | null> {
    try {
      const response = await this.http.get<{ user: User }>(
        API_CONFIG.ENDPOINTS.ME,
        {
          headers: this.buildAuthHeaders(),
        },
      );

      const user = response.data.user;
      this.currentUser = user;
      return user;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 401) {
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          return this.fetchCurrentUser();
        }

        return null;
      }

      console.warn('Fetching current user failed:', error);
      return null;
    }
  }

  async validateToken(): Promise<boolean> {
    if (!this.accessToken) {
      return false;
    }

    try {
      await this.http.get(API_CONFIG.ENDPOINTS.VALIDATE, {
        headers: this.buildAuthHeaders(),
      });
      return true;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 401) {
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          await this.fetchCurrentUser();
          return true;
        }
      }

      return false;
    }
  }

  async checkAuthentication(): Promise<boolean> {
    if (!this.bootstrapPromise) {
      this.bootstrapPromise = this.bootstrapSession();
    }

    return this.bootstrapPromise;
  }

  private async bootstrapSession(): Promise<boolean> {
    try {
      if (!this.accessToken) {
        const refreshed = await this.refreshAccessToken();
        if (!refreshed) {
          return false;
        }
      }

      const user = await this.fetchCurrentUser();
      if (!user) {
        this.clearSession();
        return false;
      }

      return true;
    } catch {
      this.clearSession();
      return false;
    } finally {
      this.bootstrapPromise = null;
    }
  }

  getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    if (!this.accessToken) {
      return null;
    }

    const payload = decodeJwtPayload(this.accessToken);

    if (!payload || typeof payload.sub !== 'number') {
      return null;
    }

    return {
      id: payload.sub,
      email: payload.email ?? '',
      name: payload.name ?? payload.email?.split('@')[0] ?? 'User',
      role: payload.role ?? 'User',
      avatar: payload.avatar ?? null,
      mustChangePassword: payload.mustChangePassword ?? false,
      profileVerified: payload.profileVerified ?? false,
    };
  }

  updateCurrentUser(user: User | null): void {
    this.currentUser = user;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  clearTokens(): void {
    this.clearSession();
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await this.retryOnceOnUnauthorized(() =>
      this.http.put<{ user: User }>(
        API_CONFIG.ENDPOINTS.PROFILE,
        data,
        {
          headers: this.buildAuthHeaders(),
        },
      ),
    );

    this.currentUser = response.data.user;
    return response.data.user;
  }

  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> {
    await this.retryOnceOnUnauthorized(() =>
      this.http.post(
        API_CONFIG.ENDPOINTS.CHANGE_PASSWORD,
        data,
        {
          headers: this.buildAuthHeaders(),
        },
      ),
    );
  }
}

export const authService = new AuthService();
export const tokenManager = authService;
