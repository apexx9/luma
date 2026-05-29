"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, BadgeCheck, Mail, User, Shield, ChevronRight, Check } from "lucide-react";
import { useStore } from "@/store";
import { changePassword, updateProfile } from "@/actions/auth.api";
import { authService } from "@/lib/auth";
import { motion, AnimatePresence } from "framer-motion";

export default function OnboardingPage() {
    const router = useRouter();
    const { user, checkAuth, updateUser, showToast } = useStore();
    const [isBootstrapping, setIsBootstrapping] = useState(true);
    const [isSavingPassword, setIsSavingPassword] = useState(false);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [activeStep, setActiveStep] = useState<"password" | "profile">("password");

    useEffect(() => {
        let mounted = true;

        const bootstrap = async () => {
            const isValid = await checkAuth();

            if (!mounted) return;

            if (!isValid) {
                router.replace("/login");
                return;
            }

            const current = authService.getCurrentUser();
            if (!current) {
                router.replace("/login");
                return;
            }

            setName(current.name);
            setEmail(current.email);
            setIsBootstrapping(false);

            if (!current.mustChangePassword && current.profileVerified) {
                router.replace("/");
                return;
            }

            // Set appropriate tab based on status
            if (!current.mustChangePassword) {
                setActiveStep("profile");
            } else {
                setActiveStep("password");
            }
        };

        void bootstrap();

        return () => {
            mounted = false;
        };
    }, [checkAuth, router]);

    const passwordReady = useMemo(() => {
        return currentPassword.length >= 6 && newPassword.length >= 8 && newPassword === confirmPassword;
    }, [confirmPassword, currentPassword.length, newPassword, newPassword.length]);

    const profileReady = useMemo(() => {
        return name.trim().length >= 2 && email.includes("@");
    }, [email, name]);

    const handlePasswordChange = async (event: FormEvent) => {
        event.preventDefault();

        if (!passwordReady) {
            showToast("Please fill all password fields correctly", "error");
            return;
        }

        setIsSavingPassword(true);

        try {
            await changePassword({
                currentPassword,
                newPassword,
            });

            await checkAuth();
            const refreshed = authService.getCurrentUser();
            
            if (refreshed) {
                updateUser(refreshed);
                
                // If account setup is fully complete, route immediately
                if (!refreshed.mustChangePassword && refreshed.profileVerified) {
                    showToast("Password updated & setup complete", "success");
                    router.replace("/");
                    return;
                }
            }

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            showToast("Password updated. Please verify your details next.", "success");
            setActiveStep("profile");
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to update password";
            showToast(message, "error");
        } finally {
            setIsSavingPassword(false);
        }
    };

    const handleProfileVerify = async (event: FormEvent) => {
        event.preventDefault();

        if (!profileReady) {
            showToast("Please enter a valid name and email address", "error");
            return;
        }

        setIsSavingProfile(true);

        try {
            const updated = await updateProfile({
                name,
                email,
            });

            updateUser(updated);
            showToast("Profile details verified", "success");

            const current = authService.getCurrentUser();
            
            // If they still need a password change, redirect to password tab
            if (current?.mustChangePassword) {
                setActiveStep("password");
                return;
            }

            router.replace("/");
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to verify profile";
            showToast(message, "error");
        } finally {
            setIsSavingProfile(false);
        }
    };

    if (isBootstrapping || !user) {
        return (
            <div className="min-h-screen bg-[#070708] text-white flex flex-col items-center justify-center relative overflow-hidden">
                {/* Visual grid backdrop */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
                <div className="flex flex-col items-center gap-4 z-10">
                    <Loader2 className="w-8 h-8 animate-spin text-[#D9F856]" />
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500">Initializing Luma Setup</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#070708] text-white flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
            {/* Visual background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
            
            {/* Minimal glowing gradients */}
            <div className="absolute top-[-20%] right-[-10%] w-[55rem] h-[55rem] bg-[#D9F856]/[0.02] rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[55rem] h-[55rem] bg-zinc-800/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="w-full max-w-5xl grid gap-8 lg:grid-cols-[0.9fr_1.1fr] relative z-10 items-stretch">
                
                {/* Left Column: Swiss Editorial Progress Panel */}
                <motion.section 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-between py-6 lg:pr-8"
                >
                    <div>
                        <div className="flex items-center gap-2 text-[#D9F856]">
                            <Shield className="w-4 h-4" />
                            <span className="font-mono text-[10px] font-bold tracking-[0.35em] uppercase">
                                Luma // Auth System
                            </span>
                        </div>

                        <h1 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95] font-display text-white">
                            Verify<br />
                            Account.
                        </h1>

                        <p className="mt-6 text-sm text-zinc-400 leading-relaxed max-w-md font-sans">
                            Temporary accounts require a secure credential update and identity validation before full system access can be authorized.
                        </p>
                    </div>

                    {/* Minimal Step Checklist */}
                    <div className="mt-12 space-y-6 relative">
                        <div className="absolute left-[15px] top-4 bottom-4 w-[1px] bg-zinc-800/60" />

                        {/* Step 1 Node */}
                        <div className="flex items-start gap-4 relative group">
                            <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 z-10 ${
                                !user.mustChangePassword 
                                    ? "bg-[#D9F856]/10 border-[#D9F856] text-[#D9F856]" 
                                    : activeStep === "password"
                                        ? "bg-zinc-900 border-[#D9F856] text-[#D9F856] shadow-[0_0_12px_rgba(217,248,86,0.25)]"
                                        : "bg-zinc-950 border-zinc-800 text-zinc-600"
                            }`}>
                                {!user.mustChangePassword ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <span className="font-mono text-[10px] font-bold">01</span>
                                )}
                            </div>
                            <div className="py-0.5">
                                <h3 className={`font-mono text-xs font-bold uppercase tracking-wider ${
                                    !user.mustChangePassword ? "text-zinc-400 line-through" : "text-white"
                                }`}>
                                    Secure Credentials
                                </h3>
                                <p className="text-[11px] text-zinc-500 font-sans mt-0.5">
                                    {!user.mustChangePassword ? "Access credentials successfully updated" : "Change the default temporary password"}
                                </p>
                            </div>
                        </div>

                        {/* Step 2 Node */}
                        <div className="flex items-start gap-4 relative group">
                            <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 z-10 ${
                                user.profileVerified 
                                    ? "bg-[#D9F856]/10 border-[#D9F856] text-[#D9F856]" 
                                    : activeStep === "profile"
                                        ? "bg-zinc-900 border-[#D9F856] text-[#D9F856] shadow-[0_0_12px_rgba(217,248,86,0.25)]"
                                        : "bg-zinc-950 border-zinc-800 text-zinc-600"
                            }`}>
                                {user.profileVerified ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <span className="font-mono text-[10px] font-bold">02</span>
                                )}
                            </div>
                            <div className="py-0.5">
                                <h3 className={`font-mono text-xs font-bold uppercase tracking-wider ${
                                    user.profileVerified ? "text-zinc-400 line-through" : "text-white"
                                }`}>
                                    Profile Verification
                                </h3>
                                <p className="text-[11px] text-zinc-500 font-sans mt-0.5">
                                    {user.profileVerified ? "Identity successfully validated" : "Confirm system administration contact details"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-6 border-t border-zinc-900 text-zinc-600 font-mono text-[9px] tracking-widest uppercase">
                        system status: awaiting_input_v1.0
                    </div>
                </motion.section>

                {/* Right Column: Glassmorphic Minimal Action Card */}
                <motion.section
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-[#0A0A0B]/80 border border-white/[0.06] shadow-[0_12px_40px_-5px_rgba(0,0,0,0.6)] rounded-3xl p-6 md:p-10 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between"
                >
                    {/* Glowing thin hairline top indicator */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D9F856]/40 to-transparent" />

                    <div>
                        {/* Custom Tab Switcher */}
                        <div className="flex border-b border-white/[0.04] mb-8 text-xs font-mono">
                            <button
                                onClick={() => user.mustChangePassword && setActiveStep("password")}
                                disabled={!user.mustChangePassword}
                                className={`flex-1 pb-4 text-center tracking-[0.2em] transition-all relative ${
                                    activeStep === "password" 
                                        ? "text-[#D9F856] font-bold" 
                                        : "text-zinc-500 hover:text-zinc-400 disabled:opacity-40 disabled:hover:text-zinc-500"
                                }`}
                            >
                                01 / PASSWORD
                                {activeStep === "password" && (
                                    <motion.div
                                        layoutId="activeTabUnderline"
                                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D9F856]"
                                    />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveStep("profile")}
                                className={`flex-1 pb-4 text-center tracking-[0.2em] transition-all relative ${
                                    activeStep === "profile" 
                                        ? "text-white font-bold" 
                                        : "text-zinc-500 hover:text-zinc-400"
                                }`}
                            >
                                02 / DETAILS
                                {activeStep === "profile" && (
                                    <motion.div
                                        layoutId="activeTabUnderline"
                                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D9F856]"
                                    />
                                )}
                            </button>
                        </div>

                        {/* Forms with AnimatePresence */}
                        <div className="min-h-[280px]">
                            <AnimatePresence mode="wait">
                                {activeStep === "password" ? (
                                    <motion.form
                                        key="password-form"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        onSubmit={handlePasswordChange}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-5">
                                            {/* Current Password Field */}
                                            <div className="relative group">
                                                <span className="block mb-2 text-[10px] font-mono font-bold tracking-[0.25em] text-zinc-500 uppercase">
                                                    [01] Current password
                                                </span>
                                                <div className="relative">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[#D9F856] transition-colors" />
                                                    <input
                                                        type="password"
                                                        value={currentPassword}
                                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                                        className="w-full bg-white/[0.015] border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-zinc-700 outline-none transition-all duration-300 focus:border-[#D9F856]/80 focus:bg-white/[0.03] focus:ring-1 focus:ring-[#D9F856]/10"
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                            </div>

                                            {/* New Password Field */}
                                            <div className="relative group">
                                                <span className="block mb-2 text-[10px] font-mono font-bold tracking-[0.25em] text-zinc-500 uppercase">
                                                    [02] New password
                                                </span>
                                                <div className="relative">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[#D9F856] transition-colors" />
                                                    <input
                                                        type="password"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        className="w-full bg-white/[0.015] border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-zinc-700 outline-none transition-all duration-300 focus:border-[#D9F856]/80 focus:bg-white/[0.03] focus:ring-1 focus:ring-[#D9F856]/10"
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                            </div>

                                            {/* Confirm Password Field */}
                                            <div className="relative group">
                                                <span className="block mb-2 text-[10px] font-mono font-bold tracking-[0.25em] text-zinc-500 uppercase">
                                                    [03] Confirm password
                                                </span>
                                                <div className="relative">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[#D9F856] transition-colors" />
                                                    <input
                                                        type="password"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        className="w-full bg-white/[0.015] border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-zinc-700 outline-none transition-all duration-300 focus:border-[#D9F856]/80 focus:bg-white/[0.03] focus:ring-1 focus:ring-[#D9F856]/10"
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSavingPassword || !passwordReady}
                                            className="mt-4 w-full rounded-2xl bg-[#D9F856] text-black py-4 text-xs font-mono font-bold tracking-[0.25em] uppercase hover:bg-[#C5E645] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                                        >
                                            {isSavingPassword ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                                                    Saving Credentials
                                                </>
                                            ) : (
                                                <>
                                                    Update Password
                                                    <ChevronRight className="w-4 h-4 text-black" />
                                                </>
                                            )}
                                        </button>
                                    </motion.form>
                                ) : (
                                    <motion.form
                                        key="profile-form"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        onSubmit={handleProfileVerify}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-5">
                                            {/* Full Name Field */}
                                            <div className="relative group">
                                                <span className="block mb-2 text-[10px] font-mono font-bold tracking-[0.25em] text-zinc-500 uppercase">
                                                    [01] Full name
                                                </span>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[#D9F856] transition-colors" />
                                                    <input
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="w-full bg-white/[0.015] border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-zinc-700 outline-none transition-all duration-300 focus:border-[#D9F856]/80 focus:bg-white/[0.03] focus:ring-1 focus:ring-[#D9F856]/10"
                                                        placeholder="e.g. John Doe"
                                                    />
                                                </div>
                                            </div>

                                            {/* Email Address Field */}
                                            <div className="relative group">
                                                <span className="block mb-2 text-[10px] font-mono font-bold tracking-[0.25em] text-zinc-500 uppercase">
                                                    [02] Email address
                                                </span>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[#D9F856] transition-colors" />
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="w-full bg-white/[0.015] border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-zinc-700 outline-none transition-all duration-300 focus:border-[#D9F856]/80 focus:bg-white/[0.03] focus:ring-1 focus:ring-[#D9F856]/10"
                                                        placeholder="e.g. john@example.com"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSavingProfile || !profileReady}
                                            className="mt-8 w-full rounded-2xl bg-white text-black py-4 text-xs font-mono font-bold tracking-[0.25em] uppercase hover:bg-zinc-200 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                                        >
                                            {isSavingProfile ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                                                    Verifying Data
                                                </>
                                            ) : (
                                                <>
                                                    Verify Details
                                                    <ChevronRight className="w-4 h-4 text-black" />
                                                </>
                                            )}
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">
                            secure session ssl encryption
                        </span>
                    </div>
                </motion.section>

            </div>
        </div>
    );
}
