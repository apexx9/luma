"use client";

import { useState } from "react";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { Building2, Mail, User, Phone, Globe, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function RequestAccessPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { showToast } = useStore();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        showToast("Request sent successfully! Our team will contact you soon.");
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans selection:bg-primary selection:text-black">
                <div className="w-full max-w-md bg-[#0A0A0B] rounded-[2.5rem] border border-white/5 p-12 text-center relative z-10 overflow-hidden">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-glow-sm">
                        <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-4">Request Received!</h2>
                    <p className="text-gray-400 leading-relaxed mb-10">
                        Thank you for your interest in Space_. Our team is reviewing your request and will reach out to schedule a discovery call shortly.
                    </p>
                    <button
                        onClick={() => router.push("/login")}
                        className="w-full bg-white text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98]"
                    >
                        Back to Login
                    </button>

                    {/* Decorative */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans selection:bg-primary selection:text-black overflow-x-hidden">
            {/* Background Aesthetics */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="w-full max-w-4xl bg-[#0A0A0B] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden relative z-10">
                <div className="flex flex-col md:flex-row">
                    {/* Left Side: Branding */}
                    <div className="hidden md:flex md:w-1/3 bg-[#121214] p-12 flex-col justify-between relative overflow-hidden border-r border-white/5">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-black font-black text-xl shadow-glow">S</div>
                                <span className="text-2xl font-black text-white tracking-tighter">Space_</span>
                            </div>
                            <h1 className="text-3xl font-black text-white leading-tight mb-6">
                                Join the <span className="text-primary italic">future</span> of property management.
                            </h1>
                            <div className="space-y-6 mt-12">
                                <div className="flex items-center gap-4 text-gray-400">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider">Advanced Analytics</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-400">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider">Smart Access</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-400">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider">Tenant Portal</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <Link href="/login" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group">
                                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                <span className="text-xs font-black uppercase tracking-widest">Back to login</span>
                            </Link>
                        </div>

                        {/* Decorative */}
                        <div className="absolute top-1/2 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2"></div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="w-full md:w-2/3 p-8 md:p-14">
                        <div className="mb-10">
                            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Request Access</h2>
                            <p className="text-gray-500">Fill out the form below and we'll be in touch.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                        <input
                                            type="text"
                                            placeholder="Jane Doe"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                        <input
                                            type="email"
                                            placeholder="jane@company.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Company Name</label>
                                    <div className="relative">
                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                        <input
                                            type="text"
                                            placeholder="Luma Real Estate"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                        <input
                                            type="tel"
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Property Website (Optional)</label>
                                <div className="relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                    <input
                                        type="url"
                                        placeholder="https://luma.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] shadow-glow"
                                >
                                    Submit Request <Send className="w-5 h-5 ml-1" />
                                </button>
                            </div>
                        </form>

                        <p className="mt-8 text-center text-gray-600 text-[10px] font-medium uppercase tracking-widest">
                            By submitting this form, you agree to our <a href="#" className="text-gray-400 hover:text-white underline">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
