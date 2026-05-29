import { useState, useEffect } from "react";
import { Check, PartyPopper, Building2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export const SuccessState = ({ onReset, message = "Property Created!" }: { onReset: () => void; message?: string }) => {
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center justify-center py-6 text-center relative w-full max-h-full"
        >
            {/* Confetti Effect */}
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-50">
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                y: -20,
                                x: Math.random() * 200 - 100,
                                rotate: Math.random() * 360
                            }}
                            animate={{
                                y: 200,
                                rotate: Math.random() * 720,
                                opacity: [1, 1, 0]
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                delay: Math.random() * 0.5,
                                ease: "easeOut"
                            }}
                            className="absolute w-2 h-2"
                            style={{
                                left: `${Math.random() * 100}%`,
                                backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][Math.floor(Math.random() * 5)]
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="relative mb-4">
                {/* Success Circle */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 200,
                        delay: 0.1
                    }}
                    className="w-28 h-28 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-black shadow-2xl shadow-primary/30 relative"
                >
                    <motion.div
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
                    >
                        <Check size={56} strokeWidth={5} className="relative z-10" />
                    </motion.div>

                    {/* Pulse Effect */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-primary rounded-full opacity-20"
                    />
                </motion.div>

                {/* Floating Icons */}
                <motion.div
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", damping: 15, delay: 0.3 }}
                    className="absolute top-4 right-4 p-3 bg-white dark:bg-gray-900 rounded-full border-2 border-gray-100 dark:border-gray-800 shadow-lg z-50"
                >
                    <PartyPopper size={24} className="text-primary" />
                </motion.div>
                <motion.div
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", damping: 15, delay: 0.4 }}
                    className="absolute bottom-4 left-4 p-3 bg-white dark:bg-gray-900 rounded-full border-2 border-gray-100 dark:border-gray-800 shadow-lg z-50"
                >
                    <Building2 size={24} className="text-primary" />
                </motion.div>
            </div>

            {/* Success Message */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
            >
                <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    {message}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-base max-w-md leading-relaxed font-medium">
                    Your property has been successfully registered and is now live in the system.
                </p>

                {/* Success Stats */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center justify-center gap-8 mt-6"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.9, type: "spring", damping: 15 }}
                        className="text-center"
                    >
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 0.6, delay: 1, ease: "easeInOut" }}
                        >
                            <Check size={32} className="text-primary font-black" strokeWidth={4} />
                        </motion.div>
                        <div className="text-xs text-gray-500 mt-2 uppercase tracking-wider">Validated</div>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, type: "spring", damping: 15 }}
                        className="text-center"
                    >
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 0.6, delay: 1.1, ease: "easeInOut" }}
                        >
                            <Check size={32} className="text-primary font-black" strokeWidth={4} />
                        </motion.div>
                        <div className="text-xs text-gray-500 mt-2 uppercase tracking-wider">Stored</div>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.1, type: "spring", damping: 15 }}
                        className="text-center"
                    >
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 0.6, delay: 1.2, ease: "easeInOut" }}
                        >
                            <Check size={32} className="text-primary font-black" strokeWidth={4} />
                        </motion.div>
                        <div className="text-xs text-gray-500 mt-2 uppercase tracking-wider">Active</div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Action Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-6"
            >
                <button
                    onClick={onReset}
                    className="px-12 py-4 bg-gradient-to-r from-primary to-primary/80 text-black rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all active:scale-95 flex items-center gap-3 group"
                >
                    <ChevronRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                    Add Another Property
                </button>
                <p className="text-xs text-gray-400 mt-3">
                    or press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Esc</kbd> to exit
                </p>
            </motion.div>
        </motion.div>
    );
};

