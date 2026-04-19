import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Helper function to generate initials from name
const generateInitials = (name: string): string => {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2);
};

// Helper function to create avatar URL with initials
const createAvatarWithInitials = (name: string): string => {
    const initials = generateInitials(name);
    return `https://ui-avatars.com/api/?name=${initials}&background=0D8ABC&color=fff&size=256&bold=true`;
};

interface User {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
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
    user: User ;
    isAuthenticated: boolean;
    login: (credentials: { email: string; name?: string }) => void;
    logout: () => void;
    checkAuth: () => boolean;
}

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
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
                name: "",
                email: "",
                avatar: "",
                role: ""
            },
            isAuthenticated: false,
            login: (credentials) => {
                // Extract name from email or use provided name
                const userName = credentials.name || credentials.email.split('@')[0];
                const userAvatar = createAvatarWithInitials(userName);
                
                set({
                    isAuthenticated: true,
                    user: {
                        name: userName,
                        email: credentials.email,
                        avatar: userAvatar,
                        role: "Property Manager"
                    }
                });
            },
            logout: () => {
                // Clear tokens from localStorage
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                set({ 
                    isAuthenticated: false, 
                    user: {
                        name: "",
                        email: "",
                        avatar: "",
                        role: ""
                    }
                });
            },
            checkAuth: () => {
                const token = localStorage.getItem("access_token");
                const { isAuthenticated } = get();
                return !!token && isAuthenticated;
            }
        }),
        {
            name: 'app-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                isDarkMode: state.isDarkMode,
                isSidebarOpen: state.isSidebarOpen
            })
        }
    )
);

// Clear persisting storage on app load to remove old test data
if (typeof window !== 'undefined') {
    // Clear old persisting data
    const persistKey = 'app-storage';
    const persistedData = localStorage.getItem(persistKey);
    if (persistedData) {
        try {
            const parsed = JSON.parse(persistedData);
            // Clear if it contains old test data
            if (parsed.state?.user?.name === "Aaron Admin") {
                localStorage.removeItem(persistKey);
                console.log('Cleared old test data from storage');
            }
        } catch (error) {
            console.error('Error parsing persisted data:', error);
            localStorage.removeItem(persistKey);
        }
    }
    
    // Initialize auth state
    const token = localStorage.getItem("access_token");
    if (!token) {
        useStore.setState({ 
            isAuthenticated: false, 
            user: {
                name: "",
                email: "",
                avatar: "",
                role: ""
            }
        });
    }
}
