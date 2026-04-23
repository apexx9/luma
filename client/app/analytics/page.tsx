"use client";

import DashboardLayout from "@/components/DashboardLayout";
import AuthGuard from "@/components/AuthGuard";
import {
    TrendingUp,
    TrendingDown,
    BarChart3,
    PieChart,
    DollarSign,
    Users,
    Building2,
    ChevronDown,
    Download,
    Calendar,
    ArrowUpRight,
    Target,
    LayoutGrid,
    FileText,
    FileSpreadsheet,
    FileCode
} from "lucide-react";
import PriceTrendChart from "@/components/PriceTrendChart";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import { Dropdown, DropdownItem } from "@/components/Dropdown";

const metrics = [
    { name: "Net Operating Income", value: "$2.4M", trend: "+12.5%", color: "text-primary", icon: DollarSign },
    { name: "Portfolio ROI", value: "8.4%", trend: "+1.2%", color: "text-blue-500", icon: TrendingUp },
    { name: "Annual Growth", value: "15.2%", trend: "+2.4%", color: "text-green-500", icon: Target },
    { name: "Avg. Occupancy", value: "96.4%", trend: "-0.5%", color: "text-yellow-500", icon: Users },
];

export default function AnalyticsPage() {
    const { showToast, user } = useStore();
    return (
        <AuthGuard>
            <DashboardLayout>
            <div className="flex flex-col gap-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold dark:text-white tracking-tight">Performance Analytics</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">In-depth insights into your portfolio's financial health and operational efficiency.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => showToast("Filtering analytics by date...")}
                            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-surface-dark rounded-full text-sm font-bold shadow-sm border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
                        >
                            <Calendar className="w-4 h-4" />
                            Last Year
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        <Dropdown
                            trigger={
                                <button className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white dark:text-black text-white rounded-full text-sm font-bold shadow-glow hover:opacity-90 transition-all active:scale-95">
                                    <Download className="w-4 h-4" />
                                    Export Report
                                </button>
                            }
                        >
                            <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 mb-2">
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Format</p>
                            </div>
                            <DropdownItem icon={FileText} onClick={() => showToast("Exporting report as PDF...")}>PDF Document</DropdownItem>
                            <DropdownItem icon={FileSpreadsheet} onClick={() => showToast("Exporting report as Excel...")}>Excel Spreadsheet</DropdownItem>
                            <DropdownItem icon={FileCode} onClick={() => showToast("Exporting report as CSV...")}>CSV Data File</DropdownItem>
                        </Dropdown>
                    </div>
                </div>

                {/* Top Level Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((metric) => (
                        <div key={metric.name} className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft border border-transparent dark:border-gray-800 relative group overflow-hidden">
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-colors bg-gray-50 dark:bg-gray-900 group-hover:bg-primary group-hover:text-black")}>
                                    <metric.icon className="w-6 h-6" />
                                </div>
                                <span className={cn(
                                    "px-3 py-1 rounded-lg text-[10px] font-black uppercase border",
                                    metric.trend.startsWith("+") ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                                )}>
                                    {metric.trend}
                                </span>
                            </div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest relative z-10">{metric.name}</p>
                            <h3 className="text-3xl font-bold mt-1 relative z-10">{metric.value}</h3>
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl transition-all group-hover:scale-150"></div>
                        </div>
                    ))}
                </div>

                {/* Main Charts Area */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* Revenue Chart */}
                    <div className="xl:col-span-8 bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-soft border border-transparent dark:border-gray-800">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-xl font-bold">Revenue Growth</h2>
                                <p className="text-xs text-gray-500 mt-1">Monthly recurring revenue vs Projection</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Actual</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Target</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-80 w-full relative">
                            <PriceTrendChart />
                        </div>
                    </div>

                    {/* Occupancy Distribution */}
                    <div className="xl:col-span-4 bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-soft border border-transparent dark:border-gray-800 flex flex-col">
                        <h2 className="text-xl font-bold mb-8">Asset Distribution</h2>
                        <div className="flex-1 flex flex-col justify-between">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <Building2 className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Residential</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">642 Units</p>
                                        </div>
                                    </div>
                                    <p className="font-bold">65%</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                            <LayoutGrid className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Commercial</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">128 Units</p>
                                        </div>
                                    </div>
                                    <p className="font-bold">25%</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                                            <Target className="w-5 h-5 text-yellow-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Industrial</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">72 Units</p>
                                        </div>
                                    </div>
                                    <p className="font-bold">10%</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Total Assets</p>
                                        <h4 className="text-2xl font-bold">12 Buildings</h4>
                                    </div>
                                    <button
                                        onClick={() => showToast("Viewing asset distribution details...")}
                                        className="text-primary hover:underline text-xs font-bold uppercase tracking-widest flex items-center gap-1"
                                    >
                                        Details <ArrowUpRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secondary Insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-soft border border-transparent dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-black">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold">Yield Analysis</h3>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">Your portfolio yield has increased by 0.5% this quarter, primarily driven by the Skyline Loft expansion.</p>
                        <div className="mt-6 flex items-center justify-between">
                            <span className="text-2xl font-bold text-primary">5.8%</span>
                            <span className="text-xs font-bold text-gray-400">vs 5.3% Prev</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-soft border border-transparent dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-white">
                                <TrendingDown className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold">Churn Rate</h3>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">Tenant turnover is slightly higher than target. Focused retention programs are recommended for Q1.</p>
                        <div className="mt-6 flex items-center justify-between">
                            <span className="text-2xl font-bold text-red-500">4.2%</span>
                            <span className="text-xs font-bold text-gray-400">vs 3.8% Target</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-soft border border-transparent dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                                <BarChart3 className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold">Market Comp</h3>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">Your gross effective rent is 8% above market averages for the Downtown area assets.</p>
                        <div className="mt-6 flex items-center justify-between">
                            <span className="text-2xl font-bold text-blue-500">+8%</span>
                            <span className="text-xs font-bold text-gray-400">Over Alpha Index</span>
                        </div>
                    </div>
                </div>
            </div>
            </DashboardLayout>
        </AuthGuard>
    );
}
