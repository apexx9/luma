import AuthGuard from "./AuthGuard";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Toast from "./Toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
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
        </AuthGuard>
    );
}
