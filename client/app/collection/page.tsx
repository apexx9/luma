"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
    History,
    Search,
    Filter,
    TrendingUp,
    TrendingDown,
    DollarSign,
    AlertTriangle,
    ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";

const collectionStats = [
    { name: "Total Invoiced", value: "$1.2M", trend: "+5%" },
    { name: "Total Collected", value: "$1.15M", status: "95.8%" },
    { name: "Outstanding", value: "$45,200", alert: true },
];

export default function CollectionPage() {
    const { showToast } = useStore();
    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold dark:text-white tracking-tight">Collections</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Oversee historical payment trends, aging invoices, and debt recovery.</p>
                    </div>
                    <button
                        onClick={() => showToast("Opening full historical collections report...")}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-full text-sm font-bold shadow-glow hover:opacity-90 transition-all active:scale-95"
                    >
                        <History className="w-4 h-4" />
                        Full History
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {collectionStats.map((stat) => (
                        <div key={stat.name} className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-soft border border-transparent dark:border-gray-800">
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">{stat.name}</p>
                            <h3 className={cn("text-4xl font-black", stat.alert && "text-red-500")}>{stat.value}</h3>
                            {stat.trend && (
                                <div className="mt-4 flex items-center gap-1 text-green-500 text-[10px] font-bold">
                                    <TrendingUp className="w-3 h-3" />
                                    {stat.trend} VS PREV MONTH
                                </div>
                            )}
                            {stat.status && (
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex-1 bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden mr-4">
                                        <div className="bg-primary h-full" style={{ width: stat.status }}></div>
                                    </div>
                                    <span className="text-[10px] font-black">{stat.status}</span>
                                </div>
                            )}
                            <button
                                onClick={() => showToast(`Viewing detailed breakdown for ${stat.name}`)}
                                className="w-full mt-6 py-3 rounded-xl border border-gray-100 dark:border-gray-800 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                            >
                                View Breakdown
                            </button>
                        </div>
                    ))}
                </div>

                <div className="bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] shadow-soft border border-transparent dark:border-gray-800">
                    <div className="flex items-start justify-between mb-10">
                        <div>
                            <h2 className="text-2xl font-bold underline decoration-primary decoration-4 underline-offset-8">Collection Heatmap</h2>
                            <p className="text-sm text-gray-400 mt-4 leading-relaxed max-w-lg">Track collection rates across different properties to identify potential issues early in the billing cycle.</p>
                        </div>
                        <button
                            onClick={() => showToast("Exploring collection heatmap details...")}
                            className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-transparent hover:border-primary transition-all"
                        >
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div
                                key={i}
                                onClick={() => showToast(`Detailed collection info for Unit ${100 + i}`)}
                                className="aspect-square bg-gray-50 dark:bg-gray-900 rounded-2xl flex flex-col items-center justify-center border border-transparent hover:border-primary transition-all group overflow-hidden relative cursor-pointer"
                            >
                                <span className="text-[10px] font-black text-gray-400">UNIT {100 + i}</span>
                                <span className="text-lg font-black text-primary">98%</span>
                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
