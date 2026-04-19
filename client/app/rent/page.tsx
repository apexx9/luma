"use client";

import DashboardLayout from "@/components/DashboardLayout";
import AuthGuard from "@/components/AuthGuard";
import {
    DollarSign,
    CreditCard,
    Clock,
    CheckCircle2,
    AlertCircle,
    Download,
    Filter,
    Search,
    ArrowUpRight,
    TrendingUp,
    History,
    Receipt,
    Building2
} from "lucide-react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";

const payments = [
    {
        id: "PAY-9921",
        resident: "Jaden Fischer",
        amount: "$2,450.00",
        date: "Dec 01, 2024",
        status: "Paid",
        method: "Auto-pay (ACH)",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDahpOa39hkq5sS-B5_cRO7jtlpr8J7ZR5JduOTrwxC9jgwUTHTiI5D4uLzsxyDLd6slJd4MWFm-a0xT_95MSd46AQUBtqvHklMZPlgLYTaEuHny6vMYIoDrEcybFYZY4DlRvXdFvrP8DxVWSna-quAXwUxjE80WbGi0TrgwanWqMl0pR4rx4BeGZOE1Bax1Ddy0cODj6A6EYFcU9NqB0njMQ-RLMMzCmoQS49_Lr5chkE63lWXz7Px_yQMhpsN6s3vO6NHRtgv9Ug"
    },
    {
        id: "PAY-9918",
        resident: "Aron Levine",
        amount: "$2,100.00",
        date: "Dec 01, 2024",
        status: "Pending",
        method: "Credit Card",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNJU_RoFDH1_NNO8GzLtVY29QSwgiZdmy28kZjJFO8-Fu-vMblvmFuwpgawHD5fo1qHvh0YaiXPRSXRwu10jezVBTCofV9424SD5As-7kMI6bv_rBteOry2q9eXHVyv2pCcrpGlnO93AOyRPYIQIjMKXhzQE3YM1IsNpV5i5ZasS-dSiir3QMbdsY1-E9kBaqW73awFl5HoEv3l3RQx8wbCsJp0qkfbJdIa_XRtlofMedFsv2Dqi3jxi7Py1oWPkCc1FtVMPb4WvI"
    },
    {
        id: "PAY-9915",
        resident: "Tessa Tucker",
        amount: "$1,850.00",
        date: "Nov 30, 2024",
        status: "Paid",
        method: "ACH Transfer",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq_XKoFjDSyedqiEYVUTbELJfvPty4NAuqB2YyqiXfZrX1KbJwzKU8ZWBeBqmMcXW76tm2-Gr_53gkt3KtwQ-O3VczpPI-HfJzViq_XGO5Le8AcnR4zE648d5jG2tk9FxNDIcnRHscmbxGjLz7mT3G0O6jnINucKj3OKDDu2_RFDcjlkGA-BmEZOZaMK7MLz-TNcYbI5yHWdQF1QY0v2N8nUg9URbAZTtBjQjJcgaMD0HfyKB7tK5Zxbc3C2K_JvG5IeMC9cMXCDE"
    },
    {
        id: "PAY-9912",
        resident: "Devon Lindsay",
        amount: "$3,200.00",
        date: "Nov 28, 2024",
        status: "Overdue",
        method: "-",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAHTfXMFV2Zew57yjLQG2yVXvlbgrL0VqzI_zJSAum9FRT0Xjusy2ax6HAGuMJj5KiB8GRz79KDq1R6GotjRe4WrslLh5J4BUdBSADcM1yMIulWE3dv99k5K6AI7Czx69A7ZBwh6HpXYXe1Gu8GvmnnZCO7XeAwp_8t11LSMdESkIkH1ljdVOPdn51pcN7p0C-8jfpMSFlzyAtlmjtf38Vr-yj1SWziqiZKBT5A91Igkfld1Q2odXKR7zsOoNZMf6gTqGWY-cngkU"
    }
];

export default function RentPage() {
    const { showToast, user } = useStore();
    return (
        <AuthGuard>
            <DashboardLayout>
            <div className="flex flex-col gap-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold dark:text-white tracking-tight">Rent Management</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Track monthly collections, manage billing cycles, and handle late payments.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => showToast("Opening historical billing archive...")}
                            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-surface-dark rounded-full text-sm font-bold shadow-sm border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
                        >
                            <History className="w-4 h-4" />
                            History
                        </button>
                        <button
                            onClick={() => showToast("Starting bulk billing generation...")}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-full text-sm font-bold shadow-glow hover:opacity-90 transition-all active:scale-95"
                        >
                            <Receipt className="w-4 h-4" />
                            Generate Bills
                        </button>
                    </div>
                </div>

                {/* Financial Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-primary p-8 rounded-[2rem] shadow-glow flex flex-col justify-between relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-xs font-bold text-black/70 mb-2 uppercase tracking-widest">Expected Revenue</p>
                            <h3 className="text-4xl font-black text-black">$842,500</h3>
                        </div>
                        <div className="relative z-10 flex items-center gap-2 mt-6">
                            <div className="px-2 py-1 bg-black/10 rounded-lg text-[10px] font-black text-black">
                                92% COLLECTED
                            </div>
                            <TrendingUp className="w-4 h-4 text-black" />
                        </div>
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                    </div>

                    <div className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] shadow-soft border border-transparent dark:border-gray-800 flex flex-col justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Pending Collections</p>
                            <h3 className="text-4xl font-black">$67,412</h3>
                        </div>
                        <div className="flex items-center gap-2 mt-6">
                            <div className="px-2 py-1 bg-yellow-500/10 rounded-lg text-[10px] font-black text-yellow-500 border border-yellow-500/20">
                                14 TENANTS
                            </div>
                            <Clock className="w-4 h-4 text-yellow-500" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] shadow-soft border border-transparent dark:border-gray-800 flex flex-col justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Overdue Amount</p>
                            <h3 className="text-4xl font-black text-red-500">$12,350</h3>
                        </div>
                        <div className="flex items-center gap-2 mt-6">
                            <div className="px-2 py-1 bg-red-500/10 rounded-lg text-[10px] font-black text-red-500 border border-red-500/20">
                                4 CRITICAL
                            </div>
                            <AlertCircle className="w-4 h-4 text-red-500" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] shadow-soft border border-transparent dark:border-gray-800 flex flex-col justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Security Deposits</p>
                            <h3 className="text-4xl font-black">$1.2M</h3>
                        </div>
                        <div className="flex items-center gap-2 mt-6">
                            <div className="px-2 py-1 bg-blue-500/10 rounded-lg text-[10px] font-black text-blue-500 border border-blue-500/20">
                                ESCROW HELD
                            </div>
                            <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        </div>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="bg-white dark:bg-surface-dark rounded-[2.5rem] shadow-soft border border-transparent dark:border-gray-800 overflow-hidden">
                    <div className="p-10 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex items-center gap-8">
                            <h2 className="text-2xl font-bold">Billing Activity</h2>
                            <div className="flex items-center bg-gray-50 dark:bg-black/40 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-800">
                                <button
                                    onClick={() => showToast("Showing all billing activity")}
                                    className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold shadow-lg transition-all"
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => showToast("Filtering by Paid invoices")}
                                    className="px-6 py-2 text-gray-400 hover:text-black dark:hover:text-white rounded-xl text-xs font-bold transition-all"
                                >
                                    Paid
                                </button>
                                <button
                                    onClick={() => showToast("Filtering by Unpaid invoices")}
                                    className="px-6 py-2 text-gray-400 hover:text-black dark:hover:text-white rounded-xl text-xs font-bold transition-all"
                                >
                                    Unpaid
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <Search className="w-4 h-4 text-gray-400" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search transactions..."
                                    className="pl-12 pr-6 py-3 rounded-full bg-gray-50 dark:bg-black/50 border-none focus:ring-2 focus:ring-primary text-sm w-full md:w-80"
                                />
                            </div>
                            <button
                                onClick={() => showToast("Filtering transaction history...")}
                                className="w-12 h-12 flex items-center justify-center bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
                            >
                                <Filter className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-black/20 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                    <th className="px-10 py-6">Transaction ID</th>
                                    <th className="px-10 py-6">Resident</th>
                                    <th className="px-10 py-6">Amount</th>
                                    <th className="px-10 py-6">Date</th>
                                    <th className="px-10 py-6">Status</th>
                                    <th className="px-10 py-6 text-right">Invoice</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                                {payments.map((payment) => (
                                    <tr key={payment.id} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-10 py-8">
                                            <p className="font-black text-xs text-gray-400 uppercase">{payment.id}</p>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-sm border-2 border-white dark:border-gray-800">
                                                    <NextImage src={payment.avatar} alt={payment.resident} fill className="object-cover" unoptimized />
                                                </div>
                                                <div>
                                                    <p className="font-bold dark:text-gray-100 group-hover:text-primary transition-colors">{payment.resident}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{payment.method}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <p className="font-black text-base dark:text-gray-100">{payment.amount}</p>
                                        </td>
                                        <td className="px-10 py-8">
                                            <p className="font-bold text-gray-500 dark:text-gray-400">{payment.date}</p>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className={cn(
                                                "px-4 py-1.5 text-[10px] font-black uppercase rounded-full border shadow-sm inline-flex items-center gap-2",
                                                payment.status === "Paid" ? "bg-primary/10 text-primary border-primary/20" :
                                                    payment.status === "Pending" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                                                        "bg-red-500/10 text-red-500 border-red-500/20"
                                            )}>
                                                <span className={cn(
                                                    "w-1.5 h-1.5 rounded-full",
                                                    payment.status === "Paid" ? "bg-primary" :
                                                        payment.status === "Pending" ? "bg-yellow-500" : "bg-red-500"
                                                )}></span>
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <button
                                                onClick={() => showToast(`Downloading invoice for ${payment.resident}...`)}
                                                className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-400 hover:bg-primary hover:text-black hover:border-primary transition-all active:scale-90"
                                            >
                                                <Download className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-gray-50/50 dark:bg-black/10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-surface-dark flex items-center justify-center shadow-soft">
                                <Building2 className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.1em]">Current Billing Cycle</p>
                                <p className="text-sm font-bold dark:text-white">December 2024 (Active)</p>
                            </div>
                        </div>
                        <button
                            onClick={() => showToast("Opening billing summary details...")}
                            className="flex items-center gap-3 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-[1.5rem] font-bold text-sm shadow-xl hover:opacity-90 transition-all active:scale-95 group"
                        >
                            Summary Details
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
            </DashboardLayout>
        </AuthGuard>
    );
}
