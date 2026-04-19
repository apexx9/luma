"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, Mail, Lock, ArrowRight, Github, Chrome } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { login } from "@/actions/auth.api";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login: loginUser, showToast } = useStore();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !password) {
            showToast("Please enter both email and password.");
            return;
        }

        setIsLoading(true);
        
        try {
            const response = await login({ email, password });
            
            // Store tokens in localStorage
            localStorage.setItem("access_token", response.accessToken);
            localStorage.setItem("refresh_token", response.refreshToken);
            
            // Extract user name from email for avatar generation
            const userName = email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase());
            
            // Update store with user data
            loginUser({ email, name: userName });
            showToast("Welcome back!");
            router.push("/");
        } catch (error: any) {
            console.error("Login error:", error);
            
            if (error.response?.status === 500) {
                showToast("Server error. Please try again or contact support.");
            } else if (error.response?.status === 401) {
                showToast("Invalid email or password. Please try again.");
            } else if (error.response?.status === 404) {
                showToast("User not found. Please register first.");
            } else {
                showToast(error?.message || "Login failed. Please try again.");
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
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="aaron@luma.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Password</label>
                                <button type="button" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">Forgot Password?</button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    required
                                />
                            </div>
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

                    <div className="mt-10">
                        <div className="relative flex items-center py-4">
                            <div className="flex-grow border-t border-white/10"></div>
                            <span className="flex-shrink mx-4 text-gray-600 text-[10px] font-black uppercase tracking-widest">Or continue with</span>
                            <div className="flex-grow border-t border-white/10"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 transition-colors">
                                <Chrome className="w-5 h-5" />
                                <span className="text-sm font-bold text-white font-inter">Google</span>
                            </button>
                            <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 transition-colors">
                                <Github className="w-5 h-5" />
                                <span className="text-sm font-bold text-white font-inter">Github</span>
                            </button>
                        </div>
                    </div>

                    <p className="mt-10 text-center text-gray-500 text-sm">
                        Don't have an account? <Link href="/request-access" className="text-primary font-bold hover:underline">Request Access</Link>
                    </p>
                    <p className="mt-2 text-center text-gray-600 text-xs">
                        Tip: Use email <span className="text-primary font-mono">aaron@luma.com</span> with password <span className="text-primary font-mono">password123</span> to test
                    </p>
                </div>
            </div>
        </div>
    );
}
