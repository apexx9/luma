"use client";

import { motion } from "framer-motion";
import { Rocket, Sparkles, Star, Orbit } from "lucide-react";

export default function BrandLoader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-blue-950 z-50 overflow-hidden">
            
            {/* Background stars */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0.2, 1, 0.2],
                            scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 2 + Math.random() * 2,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="flex flex-col items-center gap-8 relative z-10">

                {/* Logo Core - Space Theme */}
                <div className="relative w-32 h-32 flex items-center justify-center">

                    {/* Orbital ring */}
                    <motion.div
                        className="absolute w-full h-full rounded-full border border-primary/20"
                        animate={{ rotate: 360 }}
                        transition={{
                            repeat: Infinity,
                            duration: 8,
                            ease: "linear",
                        }}
                    >
                        {/* Orbiting dots */}
                        {[0, 120, 240].map((angle) => (
                            <motion.div
                                key={angle}
                                className="absolute w-2 h-2 bg-primary rounded-full"
                                style={{
                                    top: "50%",
                                    left: "50%",
                                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-60px)`,
                                }}
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    delay: angle / 360 * 2,
                                }}
                            />
                        ))}
                    </motion.div>

                    {/* Inner rotating ring */}
                    <motion.div
                        className="absolute w-24 h-24 rounded-full border-t-2 border-primary/60 border-transparent"
                        animate={{ rotate: -360 }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: "linear",
                        }}
                    />

                    {/* Core glow */}
                    <motion.div
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-2xl relative"
                        animate={{
                            scale: [1, 1.1, 1],
                            boxShadow: [
                                "0px 0px 0px rgba(59,130,246,0)",
                                "0px 0px 40px rgba(59,130,246,0.4)",
                                "0px 0px 0px rgba(59,130,246,0)",
                            ],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut",
                        }}
                    >
                        {/* Rocket icon */}
                        <motion.div
                            animate={{
                                y: [0, -3, 0],
                                rotate: [0, 5, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 1.5,
                                ease: "easeInOut",
                            }}
                        >
                            <Rocket className="w-8 h-8 text-white" strokeWidth={2} />
                        </motion.div>

                        {/* Sparkle effect */}
                        <motion.div
                            className="absolute -top-1 -right-1"
                            animate={{
                                rotate: [0, 360],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 3,
                                ease: "linear",
                            }}
                        >
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Brand Text */}
                <div className="text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-black tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
                    >
                        Luma
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2 justify-center"
                    >
                        <Star className="w-3 h-3" />
                        Property Management Platform
                        <Star className="w-3 h-3" />
                    </motion.p>
                </div>

                {/* Loading dots with space theme */}
                <div className="flex gap-2 mt-2">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 bg-gradient-to-r from-primary to-blue-600 rounded-full"
                            animate={{
                                y: [0, -8, 0],
                                opacity: [0.4, 1, 0.4],
                                scale: [0.8, 1.2, 0.8],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 1,
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </div>

                {/* Status text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-xs text-gray-400 dark:text-gray-500 font-medium"
                >
                    Initializing property ecosystem...
                </motion.p>
            </div>
        </div>
    );
}
