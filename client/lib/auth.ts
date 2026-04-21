import Cookies from 'js-cookie';
import axios from 'axios';

// Token storage keys
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Token configuration
const TOKEN_CONFIG = {
  accessToken: {
    key: ACCESS_TOKEN_KEY,
    expires: 1 / 24, // 1 hour in days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
  },
  refreshToken: {
    key: REFRESH_TOKEN_KEY,
    expires: 7, // 7 days in days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
  },
};

// Token management utilities
export const tokenManager = {
  // Get tokens from cookies
  getAccessToken: (): string | null => {
    return Cookies.get(ACCESS_TOKEN_KEY) || null;
  },

  getRefreshToken: (): string | null => {
    return Cookies.get(REFRESH_TOKEN_KEY) || null;
  },

  // Set tokens in cookies
  setTokens: (accessToken: string, refreshToken: string): void => {
    Cookies.set(ACCESS_TOKEN_KEY, accessToken, TOKEN_CONFIG.accessToken);
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, TOKEN_CONFIG.refreshToken);
  },

  // Clear tokens from cookies
  clearTokens: (): void => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
  },

  // Check if access token exists and is not expired
  hasValidAccessToken: (): boolean => {
    const token = tokenManager.getAccessToken();
    if (!token) return false;

    try {
      // Decode JWT to check expiration (basic check)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch {
      // If token is malformed, consider it invalid
      return false;
    }
  },

  // Check if refresh token exists
  hasValidRefreshToken: (): boolean => {
    return !!tokenManager.getRefreshToken();
  },
};

// Refresh token function
export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = tokenManager.getRefreshToken();
  
  if (!refreshToken) {
    console.warn('No refresh token available');
    return null;
  }

  try {
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
    
    return accessToken;
  } catch (error) {
    console.error('Token refresh failed:', error);
    
    // If refresh fails, clear tokens
    tokenManager.clearTokens();
    
    return null;
  }
};

let isInterceptorSetup = false;

// Axios interceptor for automatic token refresh
export const setupAxiosInterceptors = () => {
  if (isInterceptorSetup) return;
  
  // Request interceptor - add access token to all requests
  axios.interceptors.request.use(
    (config) => {
      const token = tokenManager.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor - handle token refresh
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If error is 401 and we haven't tried refreshing yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newAccessToken = await refreshAccessToken();
          
          if (newAccessToken) {
            // Retry the original request with new token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          }
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          // Redirect to login on refresh failure
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      }

      return Promise.reject(error);
    }
  );
  
  isInterceptorSetup = true;
};

// Authentication check function
export const checkAuthentication = (): boolean => {
  return tokenManager.hasValidAccessToken();
};

// Initialize auth on app start
export const initializeAuth = () => {
  setupAxiosInterceptors();
  
  // Check if we have tokens but the user state is not updated
  const hasToken = tokenManager.hasValidAccessToken();
  
  if (hasToken) {
    console.log('Valid access token found, user should be authenticated');
  } else {
    console.log('No valid access token found');
  }
  
  return hasToken;
};
