"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { checkAuthentication } from "@/lib/auth";

interface AuthGuardProps {
    children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { isAuthenticated, checkAuth } = useStore();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Small delay to ensure store is initialized
        const timer = setTimeout(() => {
            const performAuthCheck = async () => {
                // First check the actual token state
                const hasValidToken = checkAuthentication();
                
                                
                if (!hasValidToken) {
                    // No valid token, redirect to login
                    router.push("/login");
                    return;
                }
                
                // Update store state based on actual token
                const storeResult = checkAuth();
                
                if (!storeResult) {
                    // Store says not authenticated, but we have tokens
                    // This shouldn't happen, but let's handle it
                    router.push("/login");
                    return;
                }
                
                setIsChecking(false);
            };

            performAuthCheck();
        }, 100);

        return () => clearTimeout(timer);
    }, [checkAuth, router, isAuthenticated]);

    // Show loading while checking authentication
    if (isChecking) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-xl">Checking authentication...</div>
            </div>
        );
    }

    // If not authenticated after checking, show loading (redirect will happen)
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-xl">Redirecting to login...</div>
            </div>
        );
    }

    return <>{children}</>;
}
