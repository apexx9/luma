import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const InputField = ({ label, field, placeholder, type = "text", value, onChange, error }: any) => (
    <div className="space-y-1.5 flex-1">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">{label}</label>
        <input
            type={type}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            className={cn(
                "w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border text-sm transition-all focus:outline-none focus:ring-2",
                error
                    ? "border-red-500/50 focus:ring-red-500/10"
                    : "border-gray-200 dark:border-gray-800 focus:ring-primary/10 focus:border-primary"
            )}
        />
    </div>
);

export const SelectField = ({ label, field, options, value, onChange, loading, disabled }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="space-y-1.5 flex-1 relative" ref={dropdownRef}>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">{label}</label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    className={cn(
                        "w-full px-4 py-3 rounded-xl border text-sm text-left focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all flex items-center justify-between",
                        disabled
                            ? "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed"
                            : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-black dark:text-white hover:border-primary/50 group"
                    )}
                >
                    <span className={cn(
                        "flex-1 text-left",
                        value && !disabled ? "text-black dark:text-white" : "text-gray-400"
                    )}>
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 border border-gray-400 border-t-transparent animate-spin rounded-full"></div>
                                Loading...
                            </div>
                        ) : (
                            value || `Select ${label.toLowerCase()}`
                        )}
                    </span>
                    <ChevronDown
                        size={16}
                        className={cn(
                            "text-gray-400 transition-transform duration-200",
                            isOpen && 'rotate-180',
                            !disabled && 'group-hover:text-primary'
                        )}
                    />
                </button>

                <AnimatePresence>
                    {isOpen && !disabled && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg z-50 overflow-hidden"
                        >
                            <div className="py-1 max-h-60 overflow-y-auto">
                                {options.map((opt: string) => (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => {
                                            onChange(opt);
                                            setIsOpen(false);
                                        }}
                                        className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-3 group"
                                    >
                                        <span className="text-black dark:text-white group-hover:text-primary">{opt}</span>
                                        {value === opt && (
                                            <Check size={14} className="text-primary ml-auto" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export const Header = ({ icon, title, subtitle }: any) => (
    <div className="flex items-center gap-4 mb-4">
        <div className="p-2.5 bg-primary/10 rounded-xl text-primary">{icon}</div>
        <div>
            <h3 className="text-xl font-black tracking-tight leading-none">{title}</h3>
            <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wider mt-1">{subtitle}</p>
        </div>
    </div>
);
