import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Toast from "./Toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useStore();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    return (
        <div className="flex h-screen bg-zinc-50 dark:bg-black text-black dark:text-white transition-colors duration-300 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col h-full relative">
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8">
                    <Navbar />
                    <main>
                        {children}
                    </main>
                </div>
                <Toast />
            </div>
        </div>
    );
}
