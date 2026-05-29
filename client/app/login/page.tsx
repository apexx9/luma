"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import axios from "axios";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const { login: loginUser, checkAuth, showToast } = useStore();
    const router = useRouter();

    useEffect(() => {
        let mounted = true;

        const runAuthCheck = async () => {
            const isValid = await checkAuth();
            if (mounted && isValid) {
                router.push("/");
            }
        };

        void runAuthCheck();

        return () => {
            mounted = false;
        };
    }, [checkAuth, router]);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError("Email is required");
            return false;
        }
        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address");
            return false;
        }
        setEmailError("");
        return true;
    };

    const validatePassword = (password: string) => {
        if (!password) {
            setPasswordError("Password is required");
            return false;
        }
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Clear previous errors
        setEmailError("");
        setPasswordError("");
        
        // Validate inputs
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        
        if (!isEmailValid || !isPasswordValid) {
            showToast("Please fix the errors below", "error");
            return;
        }

        setIsLoading(true);
        
        try {
            const session = await loginUser(email, password);
            showToast("Login successful! Welcome back.", "success");
            if (session.user.mustChangePassword || !session.user.profileVerified) {
                router.push("/onboarding");
                return;
            }
            router.push("/");
        } catch (error: unknown) {
            const errorMessage = axios.isAxiosError(error)
                ? (error.response?.data?.message as string | undefined) ?? error.message
                : error instanceof Error
                    ? error.message
                    : "Login failed. Please try again.";
            showToast(errorMessage, "error");
            
            // Set specific field errors based on response
            if (errorMessage.toLowerCase().includes("email") || errorMessage.toLowerCase().includes("user")) {
                setEmailError("Invalid email address");
            }
            if (errorMessage.toLowerCase().includes("password")) {
                setPasswordError("Invalid password");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans selection:bg-primary selection:text-black">
            {/* Background Aesthetics */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-[1100px] bg-[#0A0A0B] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10">
                {/* Left Side: Brand/Inspo */}
                <div className="hidden md:flex md:w-1/2 bg-[#121214] p-12 flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-12">
                            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-black font-black text-2xl shadow-glow">S</div>
                            <span className="text-3xl font-black text-white tracking-tighter">Space_</span>
                        </div>
                        <h1 className="text-5xl font-black text-white leading-[1.1] mb-6">
                            Manage your <span className="text-primary italic">portfolio</span> with precision.
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                            The next generation of real estate management. Built for speed, designed for clarity.
                        </p>
                    </div>

                    <div className="relative z-10 pb-4">
                        <div className="flex -space-x-4 mb-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#121214] overflow-hidden bg-gray-800">
                                    <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" width={40} height={40} />
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-[#121214] bg-primary flex items-center justify-center text-[10px] font-bold text-black">+2k</div>
                        </div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Trusted by 2,000+ managers</p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
                        <p className="text-gray-500">Welcome back! Please enter your details.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className={cn(
                                    "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors",
                                    emailError ? "text-red-400" : "text-gray-600"
                                )} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (emailError) validateEmail(e.target.value);
                                    }}
                                    onBlur={(e) => validateEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className={cn(
                                        "w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 transition-all",
                                        emailError 
                                            ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50" 
                                            : "border-white/10 focus:ring-primary/50 focus:border-primary/50"
                                    )}
                                    required
                                />
                            </div>
                            {emailError && (
                                <div className="flex items-center gap-2 mt-2 ml-1">
                                    <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                                    <p className="text-xs text-red-400 font-medium">{emailError}</p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Password</label>
                                <Link href="/forgot-password" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">Forgot Password?</Link>
                            </div>
                            <div className="relative">
                                <Lock className={cn(
                                    "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors",
                                    passwordError ? "text-red-400" : "text-gray-600"
                                )} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (passwordError) validatePassword(e.target.value);
                                    }}
                                    onBlur={(e) => validatePassword(e.target.value)}
                                    placeholder="••••••••"
                                    className={cn(
                                        "w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 transition-all",
                                        passwordError 
                                            ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50" 
                                            : "border-white/10 focus:ring-primary/50 focus:border-primary/50"
                                    )}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={cn(
                                        "absolute right-4 top-1/2 -translate-y-1/2 transition-colors",
                                        passwordError ? "text-red-400 hover:text-red-300" : "text-gray-600 hover:text-primary"
                                    )}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {passwordError && (
                                <div className="flex items-center gap-2 mt-2 ml-1">
                                    <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                                    <p className="text-xs text-red-400 font-medium">{passwordError}</p>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] shadow-glow mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Sign In <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-10 text-center text-gray-500 text-sm">
                        Don&apos;t have an account? <Link href="/request-access" className="text-primary font-bold hover:underline">Request Access</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
