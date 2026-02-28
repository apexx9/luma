import { create } from 'zustand';

interface User {
    name: string;
    email: string;
    avatar: string;
    role: string;
}

interface AppState {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    isSidebarOpen: boolean;
    setSidebarOpen: (isOpen: boolean) => void;
    toggleSidebar: () => void;
    toastMessage: string | null;
    showToast: (message: string) => void;
    // Auth State
    user: User | null;
    isAuthenticated: boolean;
    login: (credentials: { email: string }) => void;
    logout: () => void;
}

export const useStore = create<AppState>((set) => ({
    isDarkMode: true,
    toggleDarkMode: () => set((state) => {
        const newMode = !state.isDarkMode;
        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        return { isDarkMode: newMode };
    }),
    isSidebarOpen: true,
    setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    toastMessage: null,
    showToast: (message) => {
        set({ toastMessage: message });
        setTimeout(() => set({ toastMessage: null }), 3000);
    },
    // Auth Implementation
    user: {
        name: "Aaron Admin",
        email: "aaron@luma.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        role: "Property Manager"
    },
    isAuthenticated: true,
    login: (credentials) => {
        set({
            isAuthenticated: true,
            user: {
                name: "Aaron Admin",
                email: credentials.email,
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                role: "Property Manager"
            }
        });
    },
    logout: () => set({ isAuthenticated: false, user: null }),
}));
