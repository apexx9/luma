"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
    LayoutGrid,
    Building2,
    Users,
    BarChart3,
    Car,
    FolderOpen,
    ArrowUpRight,
    MessageSquare
} from "lucide-react";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutGrid },
    { name: "Buildings", href: "/buildings", icon: Building2 },
    { name: "Tenants", href: "/tenants", icon: Users },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Parking", href: "/parking", icon: Car },
    { name: "Services", href: "/services", icon: FolderOpen },
];

const residents = [
    { name: "Devon Lindsay", unit: "Unit 87", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDi2Q7Ivk3ceCjwGHWqjQomOdqZlaucnTdXutct3ncdDbr7axafIntFv-gTmtHZCOc8s5BCIjFmFhrgBwgC13qm08TmsgJaAZzuDBHTak_PRhrfQkwS-VZJNd4-j7l5d_CayxZNpnrLzjlEfcOs-O6Rs36wep4ettonFJoZuquRCXY_6z2x1Vu1lnz_pVXp37w5R0CKTmdd0yNHRn2LTPlRYlSu2oEFpf-5xj3ozOWZkr1jLh6pTmn6wtm3YPujmoo8_3B9oAxHR4" },
    { name: "Chelsea Knight", unit: "Unit 32", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAih_1XM8c1fzZ6kGtP1j4eKZcvyGLgUTqfxk3ajRzaFTgf2X2C8eBkcfPrnsjJPcRF-QzeUPxD6z2wQ6Hl_eHMUMiZV4sai3cWg-wh0kOVQVSRVUY6yf-oRqsIhoR65ZRbYF6jxi3NLI0FVSczoo_Z_OFkNkup-m0884eNx7F1ayOvgAXckvDp7CZoIiRK51ZN7o-lDJH1apsHRH61lWqVCG_c8WXXWqazQrX9diJ2ewVovAHSdTtGZS0Ek-_2nP2rzYdp9O3nJXY" },
    { name: "Aliya Garrison", unit: "Unit 84", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWq4_i6QikSLD00qSyY73J1Ef7thtKJlgJJfVHdYhMbP34oKg46U_jSi99TB8n6M0XNPzJR4lJH4TGL9_0qAq8xX_DO9W8nE5T6XKKsVlH1LoNv5JeRa45uPQcR23lJckayJVLYBcqgUEI25hBgyFRNlF7kpam0OX39kjampQn0MxDI0BJ1od6dd8JrBL1jWQi7wqAcJjcI4UnliYZ2-PpJNFqD7kvHr58OuCArgHsi1Al7GNYO-3LI7exXw1m-YTRs7zDWW-DldM" },
    { name: "Lawrence Patterson", unit: "Unit 41", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3HlMA_ibUqR_82RK3qc9cAiYCZPmPMOBgz9k_WyjWnxS1xuIO9t_3KK6iPg505yYSTafeSu88hCAkzEJp4PzqVRRNWRr9IVZlsqeMVWLInIU0yMHwOEajGLttSrFbTZMVrPP57EK9ayczhoRBBR4EdS74Sq1piWD-wYYr5imum1HiLBR24z0QBqx2oK0oHACiVN8E98ImQq3hYTXdi8IEIr_YIij4WbL6NDMDbBe7xi2a2uc6KaYffMxDfPHiuGQ5Kxr9T6mxi_A" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { isSidebarOpen, showToast, user } = useStore();
    
    if (!user) return null;

    return (
        <aside className={cn(
            "w-72 shrink-0 flex flex-col p-6 border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-black transition-all duration-300 z-10",
            !isSidebarOpen && "w-20 overflow-hidden"
        )}>
            <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black font-bold text-xl shadow-glow">S</div>
                {isSidebarOpen && <span className="text-2xl font-bold tracking-tight">Space_</span>}
            </div>

            <nav className="flex-1 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-5 py-3 transition-all rounded-full group",
                                isActive
                                    ? "bg-black dark:bg-white text-white dark:text-black shadow-lg scale-105"
                                    : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", !isSidebarOpen && "mx-auto")} />
                            {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                        </Link>
                    );
                })}
            </nav>

            {isSidebarOpen && (
                <div className="mt-8">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <h3 className="text-lg font-semibold">Residents</h3>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="space-y-4 px-2">
                        {residents.map((resident, i) => (
                            <Link key={resident.name} href={`/leads/${i + 1}`} className="flex items-center gap-3 p-2 -m-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100 dark:border-gray-800">
                                    <Image src={resident.avatar} alt={resident.name} fill sizes="40px" className="object-cover" unoptimized />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-semibold leading-none truncate">{resident.name}</p>
                                    <p className="text-xs text-gray-400 mt-1">{resident.unit}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <button
                onClick={() => showToast("Opening broadcast composer...")}
                className={cn(
                    "mt-8 w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-95",
                    !isSidebarOpen && "px-0"
                )}
            >
                <MessageSquare className="w-5 h-5" />
                {isSidebarOpen && <span>Broadcast</span>}
            </button>

            {isSidebarOpen && (
                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
                    <Link href="/profile" className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100 dark:border-gray-800">
                            {user.avatar ? (
                                <Image src={user.avatar} alt={user.name} fill sizes="40px" className="object-cover" loading="eager" />
                            ) : (
                                <div className="w-full h-full bg-primary flex items-center justify-center text-black font-bold text-sm">
                                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                            )}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">{user.name || 'Unknown User'}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{user.role}</p>
                        </div>
                    </Link>
                </div>
            )}
        </aside>
    );
}
