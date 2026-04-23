import Cookies from 'js-cookie';
import axios from 'axios';

// Token configuration
export const TOKEN_CONFIG = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  ACCESS_EXPIRY: 1 * 60 * 60 * 1000, // 1 hour
  REFRESH_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
} as const;

// API configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  TIMEOUT: 10000,
  ENDPOINTS: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    VALIDATE: '/auth/validate',
  } as const,
} as const;

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
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

// Token management
class TokenManager {
  private getCookieOptions() {
    return {
      secure: process.env.NODE_ENV === 'production',
      sameSite: (process.env.NODE_ENV === 'production' ? 'strict' : 'lax') as 'strict' | 'lax',
      expires: new Date(Date.now() + TOKEN_CONFIG.REFRESH_EXPIRY),
    };
  }

  setTokens(accessToken: string, refreshToken: string) {
    Cookies.set(TOKEN_CONFIG.ACCESS_TOKEN, accessToken, {
      ...this.getCookieOptions(),
      expires: new Date(Date.now() + TOKEN_CONFIG.ACCESS_EXPIRY),
    });
    Cookies.set(TOKEN_CONFIG.REFRESH_TOKEN, refreshToken, this.getCookieOptions());
  }

  getAccessToken(): string | null {
    return Cookies.get(TOKEN_CONFIG.ACCESS_TOKEN) || null;
  }

  getRefreshToken(): string | null {
    return Cookies.get(TOKEN_CONFIG.REFRESH_TOKEN) || null;
  }

  clearTokens() {
    Cookies.remove(TOKEN_CONFIG.ACCESS_TOKEN);
    Cookies.remove(TOKEN_CONFIG.REFRESH_TOKEN);
  }

  isAccessTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now();
      const expiryTime = payload.exp * 1000;
      return currentTime >= expiryTime;
    } catch {
      return true;
    }
  }

  isRefreshTokenExpired(): boolean {
    const token = this.getRefreshToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  }

  hasValidTokens(): boolean {
    // Access token can be expired, but refresh token might still be valid
    // We can use refresh token to get a new access token
    return !this.isRefreshTokenExpired();
  }
}

// Authentication service
class AuthService {
  private tokenManager = new TokenManager();
  private refreshPromise: Promise<string | null> | null = null;

  // Server-side token validation
  async validateToken(): Promise<boolean> {
    const token = this.tokenManager.getAccessToken();
    if (!token) return false;

    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VALIDATE}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 5000,
      });
      return response.status === 200;
    } catch (error: any) {
      if (error?.response?.status === 404) {
        // Validation endpoint doesn't exist, fall back to client-side check
        return this.tokenManager.hasValidTokens();
      }
      console.warn('Token validation failed:', error?.response?.status || error?.message);
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        this.tokenManager.clearTokens();
      }
      return false;
    }
  }

  // Token refresh
  async refreshAccessToken(): Promise<string | null> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.performTokenRefresh();
    
    try {
      const result = await this.refreshPromise;
      return result;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async performTokenRefresh(): Promise<string | null> {
    const refreshToken = this.tokenManager.getRefreshToken();
    if (!refreshToken) return null;

    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REFRESH}`, {
        refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;
      this.tokenManager.setTokens(accessToken, newRefreshToken || refreshToken);
      return accessToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.tokenManager.clearTokens();
      return null;
    }
  }

  // Authentication check
  async checkAuthentication(): Promise<boolean> {
    const hasAccessToken = this.tokenManager.hasValidTokens();
    
    if (!hasAccessToken) {
      return false;
    }
    
    // If access token is expired but refresh token is still valid, try to refresh
    if (this.tokenManager.isAccessTokenExpired() && !this.tokenManager.isRefreshTokenExpired()) {
      try {
        const newAccessToken = await this.refreshAccessToken();
        if (newAccessToken) {
          return true;
        }
      } catch (error) {
        return false;
      }
    }
    
    const isValid = await this.validateToken();
    return isValid;
  }

  // Login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, credentials);
    
    const authData = response.data as AuthResponse;
    this.tokenManager.setTokens(authData.accessToken, authData.refreshToken);
    
    return authData;
  }

  // Register
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`, credentials);
    
    const authData = response.data as AuthResponse;
    this.tokenManager.setTokens(authData.accessToken, authData.refreshToken);
    
    return authData;
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGOUT}`, {
        refreshToken: this.tokenManager.getRefreshToken(),
      });
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      this.tokenManager.clearTokens();
    }
  }

  // Get current user from token
  getCurrentUser(): User | null {
    const token = this.tokenManager.getAccessToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.sub || payload.id,
        email: payload.email,
        name: payload.name || payload.email?.split('@')[0] || 'User',
        role: payload.role || 'User',
        avatar: payload.avatar,
      };
    } catch {
      return null;
    }
  }

  // Expose token manager methods
  getAccessToken = () => this.tokenManager.getAccessToken();
  clearTokens = () => this.tokenManager.clearTokens();
}

export const authService = new AuthService();
export const tokenManager = authService; // For backward compatibility
