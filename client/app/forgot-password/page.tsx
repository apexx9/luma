"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, Mail, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const { showToast, isAuthenticated } = useStore();
    const router = useRouter();

    // Redirect authenticated users to dashboard
    useEffect(() => {
        if (isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, router]);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Clear previous errors
        setEmailError("");
        
        // Validate email
        if (!validateEmail(email)) {
            showToast("Please fix the errors below", "error");
            return;
        }

        setIsLoading(true);
        
        try {
            // TODO: Implement actual forgot password API call
            // For now, simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setIsSubmitted(true);
            showToast("Password reset instructions have been sent to your email.", "success");
        } catch (error: any) {
            showToast("Failed to send reset instructions. Please try again.");
            console.error("Forgot password error:", error);
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
                        <h1 className="text-5xl font-black text-white leading-[1.1] mb-8">
                            Reset your <span className="text-primary italic">password</span> securely.
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-md mb-12">
                            We'll send you a secure link to reset your password. Check your email for instructions.
                        </p>
                    </div>

                    <div className="relative z-10 pb-4">
                        <div className="flex -space-x-4 mb-6">
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
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {isSubmitted ? "Check Your Email" : "Forgot Password"}
                        </h2>
                        <p className="text-gray-500">
                            {isSubmitted 
                                ? "We've sent password reset instructions to your email."
                                : "Enter your email address and we'll send you a link to reset your password."
                            }
                        </p>
                    </div>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1 block mb-4">Email Address</label>
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

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] shadow-glow mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        Send Reset Link <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-8 shadow-lg">
                                <CheckCircle className="w-10 h-10 text-green-400" />
                            </div>
                            
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl">
                                <h3 className="text-white font-bold mb-4 text-lg">Check Your Email</h3>
                                <p className="text-gray-400 mb-6">We've sent password reset instructions to your email.</p>
                                
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">Check your inbox</p>
                                            <p className="text-gray-400 text-sm">Look for the reset email</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">Click the link</p>
                                            <p className="text-gray-400 text-sm">Secure password reset page</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">Create new password</p>
                                            <p className="text-gray-400 text-sm">Set your new password</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <p className="text-gray-500 text-sm mb-4">
                                        Didn't receive the email?
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-primary font-bold hover:underline text-sm"
                                    >
                                        Try again
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-10 text-center">
                        <p className="text-gray-500 text-sm">
                            Remember your password? <Link href="/login" className="text-primary font-bold hover:underline">{" "} Back to Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
