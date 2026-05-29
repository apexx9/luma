import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authService, type AuthResponse, type User } from '@/lib/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (name: string, email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  updateUser: (user: User | null) => void;
  isAdmin: () => boolean;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  showToast: (
    message: string,
    type?: 'success' | 'error' | 'info' | 'warning',
  ) => void;
  showSuccess: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
  showError: (message: string) => void;
  toastMessage: string | null;
  toastType: 'success' | 'error' | 'info' | 'warning' | null;
}

export const useStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isSidebarOpen: true,
      isDarkMode: false,
      toastMessage: null,
      toastType: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true });

        try {
          const response = await authService.login({ email, password });
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });
          return response;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true });

        try {
          const response = await authService.register({ name, email, password });
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });
          return response;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });

        try {
          await authService.logout();
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
          get().showToast('Logged out successfully', 'info');
        }
      },

      checkAuth: async () => {
        set({ isLoading: true });

        try {
          const isValid = await authService.checkAuthentication();

          if (!isValid) {
            authService.clearTokens();
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });
            return false;
          }

          const user = authService.getCurrentUser();
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch (error) {
          console.error('Auth check failed:', error);
          authService.clearTokens();
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
          return false;
        }
      },

      updateUser: (user: User | null) => {
        authService.updateCurrentUser(user);
        set({ user, isAuthenticated: Boolean(user) });
      },

      isAdmin: () => {
        const { user } = get();
        return user?.role === 'Admin' || user?.role === 'admin';
      },

      toggleSidebar: () => {
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
      },

      toggleDarkMode: () => {
        set((state) => ({ isDarkMode: !state.isDarkMode }));
      },

      showToast: (
        message: string,
        type: 'success' | 'error' | 'info' | 'warning' = 'info',
      ) => {
        set({
          toastMessage: message,
          toastType: type,
        });

        setTimeout(() => {
          set({
            toastMessage: null,
            toastType: null,
          });
        }, 4000);
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

      showError: (message: string) => {
        get().showToast(message, 'error');
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isSidebarOpen: state.isSidebarOpen,
        isDarkMode: state.isDarkMode,
      }),
    },
  ),
);

export type { User };
export { authService };
