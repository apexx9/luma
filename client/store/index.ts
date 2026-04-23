import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authService, User, AuthResponse } from '@/lib/auth';

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  updateUser: (user: User) => void;
  
  // Computed
  isAdmin: () => boolean;
  
  // UI State
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // Toast notifications
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
  toastMessage: string | null;
  toastType: 'success' | 'error' | 'info' | 'warning' | null;
}

export const useStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isSidebarOpen: true,
      isDarkMode: false,
      toastMessage: null,
      toastType: null,

      // Authentication actions
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const authResponse = await authService.login({ email, password });
          
          // Store user data in localStorage for persistence
          if (authResponse.user) {
            localStorage.setItem('user-data', JSON.stringify(authResponse.user));
          }
          
          set({
            user: authResponse.user,
            isAuthenticated: true,
            isLoading: false,
          });
          get().showToast('Welcome back!', 'success');
        } catch (error: any) {
          set({ isLoading: false });
          const message = error.response?.data?.message || 'Login failed';
          get().showToast(message, 'error');
          throw error;
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true });
        try {
          const authResponse = await authService.register({ name, email, password });
          set({
            user: authResponse.user,
            isAuthenticated: true,
            isLoading: false,
          });
          get().showToast('Registration successful!', 'success');
        } catch (error: any) {
          set({ isLoading: false });
          const message = error.response?.data?.message || 'Registration failed';
          get().showToast(message, 'error');
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
          // Clear stored user data
          localStorage.removeItem('user-data');
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
          get().showToast('Logged out successfully', 'info');
        } catch (error) {
          set({ isLoading: false });
          // Even if logout API fails, clear local state
          localStorage.removeItem('user-data');
          set({
            user: null,
            isAuthenticated: false,
          });
        }
      },

      checkAuth: async () => {
        try {
          const isValid = await authService.checkAuthentication();
          
          if (isValid) {
            // Try to get user data from localStorage first
            let user = null;
            try {
              const storedUserData = localStorage.getItem('user-data');
              if (storedUserData) {
                user = JSON.parse(storedUserData);
              }
            } catch (error) {
              console.warn('Failed to get user from localStorage:', error);
            }
            
            // Fallback to token decoding if no localStorage data
            if (!user) {
              user = authService.getCurrentUser();
            }
            
            set({
              user,
              isAuthenticated: true,
            });
            return true;
          } else {
            set({
              user: null,
              isAuthenticated: false,
            });
            return false;
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          set({
            user: null,
            isAuthenticated: false,
          });
          return false;
        }
      },

      updateUser: (user: User) => {
        set({ user });
      },

      isAdmin: () => {
        const { user } = get();
        return user?.role === 'Admin' || user?.role === 'admin';
      },

      // UI actions
      toggleSidebar: () => {
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
      },

      toggleDarkMode: () => {
        set((state) => ({ isDarkMode: !state.isDarkMode }));
      },

      showToast: (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
        set({
          toastMessage: message,
          toastType: type,
        });
        
        // Auto-hide toast after 4 seconds
        setTimeout(() => {
          set({
            toastMessage: null,
            toastType: null,
          });
        }, 4000);
      },

      showError: (message: string) => {
        get().showToast(message, 'error');
      },

      showErrorNotification: (message: string) => {
        get().showToast(message, 'error');
      },

      showSuccess: (message: string) => {
        get().showToast(message, 'success');
      },

      showWarning: (message: string) => {
        get().showToast(message, 'warning');
      },

      showInfo: (message: string) => {
        get().showToast(message, 'info');
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isSidebarOpen: state.isSidebarOpen,
        isDarkMode: state.isDarkMode,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => async (state) => {
        if (state) {
          // Check authentication on rehydration
          try {
            const isValid = await authService.checkAuthentication();
            if (!isValid) {
              state.user = null;
              state.isAuthenticated = false;
            }
          } catch (error) {
            console.error('Rehydration auth check failed:', error);
            state.user = null;
            state.isAuthenticated = false;
          }
        }
      },
    }
  )
);

// Export types for external use
export type { User, AuthResponse };
export { authService };
