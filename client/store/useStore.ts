import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { tokenManager, checkAuthentication } from '@/lib/auth';


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
    return `https://ui-avatars.com/api/?name=${initials}&background=1F2937&color=E5E7EB&size=256&bold=true`;
};

interface User {
    id?: number;
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
    user: User | null;
    isAuthenticated: boolean;
    login: (credentials: { email: string; name?: string }) => void;
    logout: () => void;
    checkAuth: () => boolean;
    isAdmin: () => boolean;
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
                
                // Set role based on email or default to User
                let userRole = "User";
                const adminEmails = ['aaron@luma.com', 'aaron.nartey@example.com', 'admin@luma.com'];
                if (adminEmails.includes(credentials.email) || credentials.email.includes('admin')) {
                    userRole = "Admin";
                } else if (credentials.email.includes('aaron')) {
                    userRole = "Property Manager";
                }
                
                set({
                    isAuthenticated: true,
                    user: {
                        id: 1, // This would come from the API response
                        name: userName,
                        email: credentials.email,
                        avatar: userAvatar,
                        role: userRole
                    }
                });
            },
            logout: () => {
                // Clear tokens from cookies
                tokenManager.clearTokens();
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
                const isAuthenticated = checkAuthentication();
                if (!isAuthenticated) {
                    set({ isAuthenticated: false, user: null });
                } else {
                    set({ isAuthenticated: true });
                }
                return isAuthenticated;
            },
            isAdmin: () => {
                const { user } = get();
                if (!user) return false;
                
                // Check if user has Admin or Property Manager role or is in admin email list
                const adminEmails = ['aaron@luma.com', 'aaron.nartey@example.com'];
                return adminEmails.includes(user.email) || 
                       user.email.includes('admin') || 
                       user.role === 'Admin' ||
                       user.role === 'Property Manager';
            },
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
    // Initialize auth state first
    const isAuthenticated = checkAuthentication();
    
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
    
    // Force sync store with actual authentication state
    useStore.setState({ 
        isAuthenticated: isAuthenticated,
        user: isAuthenticated ? {
            // Try to get user data from persisted storage or create default
            ...(JSON.parse(persistedData || '{}').state?.user || {}),
            name: JSON.parse(persistedData || '{}').state?.user?.name || "User",
            email: JSON.parse(persistedData || '{}').state?.user?.email || "",
            avatar: JSON.parse(persistedData || '{}').state?.user?.avatar || "",
            role: JSON.parse(persistedData || '{}').state?.user?.role || "User"
        } : {
            name: "",
            email: "",
            avatar: "",
            role: ""
        }
    });
    
    }
