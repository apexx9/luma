"use client";

import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import { Info, X } from "lucide-react";

export default function Toast() {
    const { toastMessage, showToast } = useStore();

    if (!toastMessage) return null;

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-black dark:bg-white text-white dark:text-black px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[300px] border border-white/10 dark:border-black/10">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-black">
                    <Info className="w-4 h-4" />
                </div>
                <p className="text-sm font-bold flex-1">{toastMessage}</p>
                <button
                    onClick={() => useStore.setState({ toastMessage: null })}
                    className="p-1 hover:bg-white/10 dark:hover:bg-black/10 rounded-lg transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
