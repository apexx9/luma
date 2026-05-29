"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import AuthGuard from "@/components/AuthGuard";
import BrandLoader from "@/components/BrandLoader";
import { useStore } from "@/store";
import { User as UserIcon, Mail, Shield, ShieldCheck, Key, LogOut, Camera } from "lucide-react";
import Image from "next/image";
import { updateProfile } from "@/actions/auth.api";
import { ActionButton } from "@/components/ActionComponents";

export default function ProfilePage() {
    const router = useRouter();
    const { user, updateUser, logout, showToast } = useStore();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
        }
    }, [user]);

    if (!user) {
        return (
            <BrandLoader />
        );
    }

    const handleSave = async () => {
        if (name.trim().length < 2) {
            showToast("Full name must be at least 2 characters", "error");
            return;
        }

        if (!email.includes("@")) {
            showToast("Please enter a valid email address", "error");
            return;
        }

        setIsSaving(true);

        try {
            const updated = await updateProfile({
                name,
                email,
            });

            updateUser(updated);
            showToast("Profile details updated successfully", "success");
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to update profile";
            showToast(message, "error");
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            router.replace("/login");
        } catch (error) {
            router.replace("/login");
        }
    };

    return (
        <AuthGuard>
            <DashboardLayout>
                <div className="flex flex-col gap-8 max-w-5xl mx-auto">
                    <div className="mb-4">
                        <h1 className="text-3xl font-black dark:text-white tracking-tighter uppercase font-mono">My Profile</h1>
                        <p className="text-gray-500 mt-2 font-medium">Manage your personal information and preferences.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Left Col: Profile Intro */}
                        <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] shadow-soft border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center h-fit relative overflow-hidden group">
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D9F856]/40 to-transparent" />
                            
                            <div className="relative group cursor-pointer mb-6 mt-2">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl relative flex items-center justify-center bg-gray-50 dark:bg-zinc-900 transition-colors">
                                    {user.avatar ? (
                                        <Image src={user.avatar} alt={user.name || "Profile"} fill sizes="128px" className="object-cover" />
                                    ) : (
                                        <span className="text-4xl font-mono font-bold text-[#D9F856] select-none uppercase">
                                            {name?.charAt(0) || user.name?.charAt(0) || "U"}
                                        </span>
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Camera className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            
                            <h2 className="text-2xl font-black dark:text-white uppercase font-mono">{user.name || 'User'}</h2>
                            <p className="text-xs font-bold text-[#D9F856] uppercase tracking-widest mt-1.5 font-mono">{user.role || 'User'}</p>

                            <div className="w-full border-t border-gray-100 dark:border-gray-800 my-8"></div>

                            <div className="space-y-4 w-full">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-bold font-mono text-xs uppercase tracking-wider hover:bg-red-100 dark:hover:bg-red-900/20 transition-all active:scale-[0.98]"
                                >
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                            </div>
                        </div>

                        {/* Right Col: Settings Sections */}
                        <div className="md:col-span-2 space-y-8">
                            {/* Section: Basic Info */}
                            <div className="bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] shadow-soft border border-gray-100 dark:border-gray-800 relative overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D9F856]/40 to-transparent" />
                                
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                        <UserIcon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold dark:text-white uppercase font-mono">Account Details</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 font-mono">Full Name</label>
                                        <input 
                                            type="text" 
                                            value={name} 
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-6 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold text-sm focus:outline-none focus:border-primary focus:bg-white/[0.02] transition-all font-mono" 
                                        />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 font-mono">Email Address</label>
                                        <input 
                                            type="email" 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-6 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold text-sm focus:outline-none focus:border-primary focus:bg-white/[0.02] transition-all font-mono" 
                                        />
                                    </div>
                                </div>

                                <div className="mt-10 flex justify-end">
                                    <ActionButton 
                                        onClick={handleSave} 
                                        disabled={isSaving || (name === user.name && email === user.email)}
                                    >
                                        {isSaving ? "Saving..." : "Save Changes"}
                                    </ActionButton>
                                </div>
                            </div>

                            {/* Section: Security */}
                            <div className="bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] shadow-soft border border-gray-100 dark:border-gray-800 relative overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D9F856]/40 to-transparent" />
                                
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                        <Shield className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold dark:text-white uppercase font-mono">Security & Privacy</h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-6 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500/30 transition-all cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                                <Key className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm font-mono uppercase">Two-Factor Authentication</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Protect your account with another layer of security.</p>
                                            </div>
                                        </div>
                                        <div className="w-12 h-6 bg-blue-500 rounded-full flex items-center px-1">
                                            <div className="w-4 h-4 bg-white rounded-full translate-x-6"></div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-6 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500/30 transition-all cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                                <ShieldCheck className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm font-mono uppercase">Luma Guard Shield</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Your profile is cryptographically verified and secure.</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </AuthGuard>
    );
}
