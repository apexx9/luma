"use client";

import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import { Info, X, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";

export default function Toast() {
    const { toastMessage, toastType } = useStore();

    if (!toastMessage) return null;

    const getToastStyles = () => {
        switch (toastType) {
            case 'success':
                return {
                    bg: 'bg-green-500',
                    text: 'text-white',
                    icon: CheckCircle,
                    iconBg: 'bg-white/20'
                };
            case 'error':
                return {
                    bg: 'bg-red-500',
                    text: 'text-white',
                    icon: AlertCircle,
                    iconBg: 'bg-white/20'
                };
            case 'warning':
                return {
                    bg: 'bg-yellow-500',
                    text: 'text-white',
                    icon: AlertTriangle,
                    iconBg: 'bg-white/20'
                };
            default:
                return {
                    bg: 'bg-black dark:bg-white',
                    text: 'text-white dark:text-black',
                    icon: Info,
                    iconBg: 'bg-primary'
                };
        }
    };

    const styles = getToastStyles();
    const Icon = styles.icon;

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className={cn(
                styles.bg,
                styles.text,
                "px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[300px] border border-white/10 dark:border-black/10"
            )}>
                <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    styles.iconBg,
                    toastType === 'info' && "text-black"
                )}>
                    <Icon className="w-4 h-4" />
                </div>
                <p className="text-sm font-bold flex-1">{toastMessage}</p>
                <button
                    onClick={() => useStore.setState({ toastMessage: null, toastType: null })}
                    className="p-1 hover:bg-white/10 dark:hover:bg-black/10 rounded-lg transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
