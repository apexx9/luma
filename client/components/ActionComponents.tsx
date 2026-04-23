"use client";

import { cn } from "@/lib/utils";
import { Plus, ArrowUpRight, ChevronRight, type LucideIcon } from "lucide-react";
import { useStore } from "@/store";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    icon?: LucideIcon;
    iconPosition?: "left" | "right";
}

export function ActionButton({
    children,
    className,
    variant = "primary",
    size = "md",
    icon: Icon,
    iconPosition = "left",
    onClick,
    ...props
}: ActionButtonProps) {
    const { showToast } = useStore();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(e);
        }
    };

    const variants = {
        primary: "bg-primary text-black shadow-glow hover:opacity-90 active:scale-95",
        secondary: "bg-black dark:bg-white text-white dark:text-black shadow-soft hover:opacity-90 active:scale-95",
        outline: "bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900",
        ghost: "bg-transparent text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900",
    };

    const sizes = {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3 text-sm font-bold",
        lg: "px-8 py-4 text-base font-bold",
    };

    return (
        <button
            className={cn(
                "rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer",
                variants[variant],
                sizes[size],
                className
            )}
            onClick={handleClick}
            {...props}
        >
            {Icon && iconPosition === "left" && <Icon className="w-4 h-4" />}
            {children}
            {Icon && iconPosition === "right" && <Icon className="w-4 h-4" />}
        </button>
    );
}

interface AddButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

export function AddButton({ label, className, onClick, ...props }: AddButtonProps) {
    const { showToast } = useStore();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <button
            className={cn(
                "flex items-center gap-2 group transition-all cursor-pointer",
                className
            )}
            onClick={handleClick}
            {...props}
        >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black shadow-glow group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5" />
            </div>
            {label && <span className="font-bold text-sm group-hover:text-primary transition-colors">{label}</span>}
        </button>
    );
}

export function QuickActionButton({ icon: Icon, className, ...props }: { icon: LucideIcon } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={cn(
                "w-12 h-12 rounded-2xl bg-white dark:bg-surface-dark border border-transparent hover:border-primary flex items-center justify-center shadow-soft group transition-all",
                className
            )}
            {...props}
        >
            <Icon className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
        </button>
    );
}
