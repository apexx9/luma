"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useStore } from "@/store/useStore";
import { User, Mail, Shield, Bell, Key, LogOut, Camera, Check } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ActionButton } from "@/components/ActionComponents";

export default function ProfilePage() {
    const { user, logout, showToast } = useStore();

    if (!user) return null;

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8 max-w-5xl mx-auto">
                <div className="mb-4">
                    <h1 className="text-3xl font-black dark:text-white tracking-tighter">My Profile</h1>
                    <p className="text-gray-500 mt-2 font-medium">Manage your personal information and preferences.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Col: Profile Intro */}
                    <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] shadow-soft border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center h-fit">
                        <div className="relative group cursor-pointer mb-6">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl relative">
                                <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                            </div>
                            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-black dark:text-white">{user.name}</h2>
                        <p className="text-sm font-bold text-primary uppercase tracking-widest mt-1">{user.role}</p>

                        <div className="w-full border-t border-gray-100 dark:border-gray-800 my-8"></div>

                        <div className="space-y-4 w-full">
                            <button
                                onClick={logout}
                                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-black text-sm hover:bg-red-100 dark:hover:bg-red-900/20 transition-all active:scale-[0.98]"
                            >
                                <LogOut className="w-5 h-5" /> Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Right Col: Settings Sections */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Section: Basic Info */}
                        <div className="bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] shadow-soft border border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <User className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold dark:text-white">Account Details</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <input type="text" defaultValue={user.name} className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none font-bold text-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <input type="email" defaultValue={user.email} className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none font-bold text-sm" />
                                </div>
                            </div>

                            <div className="mt-10 flex justify-end">
                                <ActionButton onClick={() => showToast("Changes saved!")}>Save Changes</ActionButton>
                            </div>
                        </div>

                        {/* Section: Security */}
                        <div className="bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] shadow-soft border border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold dark:text-white">Security & Privacy</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-6 rounded-2xl bg-gray-50 dark:bg-black/40 border border-transparent hover:border-blue-500/30 transition-all cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                            <Key className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">Two-Factor Authentication</p>
                                            <p className="text-xs text-gray-500 mt-0.5">Protect your account with another layer of security.</p>
                                        </div>
                                    </div>
                                    <div className="w-12 h-6 bg-blue-500 rounded-full flex items-center px-1">
                                        <div className="w-4 h-4 bg-white rounded-full translate-x-6"></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-6 rounded-2xl bg-gray-50 dark:bg-black/40 border border-transparent hover:border-blue-500/30 transition-all cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">Login History</p>
                                            <p className="text-xs text-gray-500 mt-0.5">Check when and where you've logged in.</p>
                                        </div>
                                    </div>
                                    <ActionButton variant="secondary" size="sm" onClick={() => showToast("Showing login history...")}>View History</ActionButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
