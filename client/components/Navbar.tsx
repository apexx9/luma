"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Bell, Settings, Search, User, LogOut, Shield, CreditCard, Mail, MessageSquare, Clock } from "lucide-react";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Dropdown, DropdownItem, DropdownDivider } from "@/components/Dropdown";

const tabs = [
    { name: "Overview", href: "/" },
    { name: "Work orders", href: "/work-orders" },
    { name: "Calendar", href: "/calendar" },
    { name: "Rent", href: "/rent" },
    { name: "Collection", href: "/collection" },
    { name: "Access", href: "/access" },
];

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { isDarkMode, toggleDarkMode, showToast, user, logout } = useStore();

    if (!user) return null;

    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div className="hidden md:flex items-center bg-white dark:bg-surface-dark rounded-full p-1.5 shadow-sm border border-gray-100 dark:border-gray-800">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href;
                    return (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                                isActive
                                    ? "bg-black dark:bg-white text-white dark:text-black shadow-md"
                                    : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                            )}
                        >
                            {tab.name}
                        </Link>
                    );
                })}
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto">
                <div className="relative group mr-2">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 rounded-full bg-white dark:bg-surface-dark border-none focus:ring-2 focus:ring-primary text-sm w-48 lg:w-64 shadow-sm"
                    />
                </div>

                <button
                    onClick={toggleDarkMode}
                    className="w-10 h-10 rounded-full bg-white dark:bg-surface-dark flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-sm"
                >
                    <div className={cn("w-5 h-5 rounded-full shadow-inner", isDarkMode ? "bg-primary" : "bg-gray-200")}></div>
                </button>

                <Dropdown
                    trigger={
                        <button className="w-10 h-10 rounded-full bg-white dark:bg-surface-dark flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-sm">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-surface-dark"></span>
                        </button>
                    }
                >
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 mb-2">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Notifications</p>
                    </div>
                    <DropdownItem icon={MessageSquare} onClick={() => showToast("New message from Jaden")}>
                        New message: View Details
                    </DropdownItem>
                    <DropdownItem icon={Clock} onClick={() => showToast("Maintenance request updated")}>
                        Work Order #1209 Update
                    </DropdownItem>
                    <div className="p-2">
                        <button className="w-full py-2 text-[10px] font-black uppercase text-primary hover:underline transition-all">
                            View all notifications
                        </button>
                    </div>
                </Dropdown>

                <Dropdown
                    trigger={
                        <button className="w-10 h-10 rounded-full bg-white dark:bg-surface-dark flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-sm">
                            <Settings className="w-5 h-5" />
                        </button>
                    }
                >
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 mb-2">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Settings</p>
                    </div>
                    <DropdownItem icon={User} onClick={() => showToast("Account settings opened")}>Account Settings</DropdownItem>
                    <DropdownItem icon={Shield} onClick={() => showToast("Privacy & Security opened")}>Privacy & Security</DropdownItem>
                    <DropdownItem icon={CreditCard} onClick={() => showToast("Billing management opened")}>Billing Info</DropdownItem>
                </Dropdown>

                <Dropdown
                    trigger={
                        <button className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm hover:scale-110 transition-transform active:scale-95">
                            <Image
                                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('').slice(0, 2)}&background=0D8ABC&color=fff&size=256&bold=true`}
                                alt="Profile"
                                fill
                                sizes="40px"
                                className="object-cover"
                            />
                        </button>
                    }
                >
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 mb-2">
                        <p className="text-sm font-bold">{user.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{user.role}</p>
                    </div>
                    <DropdownItem icon={User} onClick={() => router.push("/profile")}>My Profile</DropdownItem>
                    <DropdownItem icon={Mail} onClick={() => showToast("Opening messages...")}>Inbox</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem
                        icon={LogOut}
                        variant="danger"
                        onClick={async () => {
                            await logout();
                            router.push("/login");
                        }}
                    >
                        Sign Out
                    </DropdownItem>
                </Dropdown>
            </div>
        </header>
    );
}
