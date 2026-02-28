"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DropdownProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    align?: "left" | "right";
    className?: string;
}

export function Dropdown({ trigger, children, align = "right", className }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className={cn("relative inline-block", className)} ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {trigger}
            </div>

            {isOpen && (
                <div
                    className={cn(
                        "absolute z-50 mt-2 min-w-[200px] bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 py-3 animate-in fade-in zoom-in duration-200",
                        align === "right" ? "right-0" : "left-0"
                    )}
                >
                    {children}
                </div>
            )}
        </div>
    );
}

interface DropdownItemProps {
    children: React.ReactNode;
    onClick?: () => void;
    icon?: React.ElementType;
    className?: string;
    variant?: "default" | "danger";
}

export function DropdownItem({ children, onClick, icon: Icon, className, variant = "default" }: DropdownItemProps) {
    return (
        <button
            onClick={() => {
                if (onClick) onClick();
            }}
            className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-900",
                variant === "danger" ? "text-red-500 hover:text-red-600" : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white",
                className
            )}
        >
            {Icon && <Icon className="w-4 h-4" />}
            {children}
        </button>
    );
}

export function DropdownDivider() {
    return <div className="my-2 border-t border-gray-100 dark:border-gray-800" />;
}
