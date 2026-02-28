"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
    Key,
    Plus,
    Shield,
    Smartphone,
    History,
    AlertOctagon,
    MoreHorizontal,
    Edit,
    ShieldOff,
    Eye,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { Dropdown, DropdownItem } from "@/components/Dropdown";
import { Modal } from "@/components/Modal";
import { ActionButton } from "@/components/ActionComponents";

const logs = [
    { event: "Main Entrance Exit", user: "Jaden Fischer", time: "10:24 AM", status: "Authorized" },
    { event: "Gym Entry", user: "Chelsea Knight", time: "09:45 AM", status: "Authorized" },
    { event: "Back Gate Entry", user: "Unknown", time: "08:12 AM", status: "Denied" },
    { event: "Garage Entrance", user: "Aliya Garrison", time: "07:55 AM", status: "Authorized" },
];

export default function AccessPage() {
    const { showToast } = useStore();
    const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold dark:text-white tracking-tight">Access Control</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Manage digital keys, monitor entrance logs, and handle security alerts.</p>
                    </div>
                    <button
                        onClick={() => setIsIssueModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-full text-sm font-bold shadow-glow hover:opacity-90 transition-all active:scale-95"
                    >
                        <Key className="w-4 h-4" />
                        Issue Digital Key
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 bg-white dark:bg-surface-dark rounded-3xl shadow-soft border border-transparent dark:border-gray-800 overflow-hidden">
                        <div className="p-8 border-b border-gray-100 dark:border-gray-800">
                            <h2 className="text-xl font-bold">Recent Entry Logs</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 dark:bg-black/20 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                                    <tr className="px-8 py-4">
                                        <th className="px-8 py-4">Event</th>
                                        <th className="px-8 py-4">User</th>
                                        <th className="px-8 py-4">Time</th>
                                        <th className="px-8 py-4 text-center">Status</th>
                                        <th className="px-8 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {logs.map((log, i) => (
                                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-8 py-5 font-bold text-sm">{log.event}</td>
                                            <td className="px-8 py-5 text-sm">{log.user}</td>
                                            <td className="px-8 py-5 text-sm text-gray-400">{log.time}</td>
                                            <td className="px-8 py-5 text-center">
                                                <span className={cn(
                                                    "px-3 py-1 text-[10px] font-black uppercase rounded-lg",
                                                    log.status === "Authorized" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                                                )}>
                                                    {log.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <Dropdown
                                                    trigger={
                                                        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                            <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                                        </button>
                                                    }
                                                >
                                                    <DropdownItem icon={Eye} onClick={() => showToast(`Viewing full log entry for ${log.event}...`)}>View Entry</DropdownItem>
                                                    <DropdownItem icon={ShieldOff} variant="danger" onClick={() => showToast(`Revoking access for ${log.user}...`)}>Revoke Access</DropdownItem>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-soft border border-transparent dark:border-gray-800">
                            <h3 className="font-bold mb-6">Security Stats</h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Smartphone className="w-5 h-5 text-primary" />
                                        <span className="text-sm">Mobile Keys Issued</span>
                                    </div>
                                    <span className="font-black">1,204</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-5 h-5 text-blue-500" />
                                        <span className="text-sm">Active Guards</span>
                                    </div>
                                    <span className="font-black">8</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <AlertOctagon className="w-5 h-5 text-red-500" />
                                        <span className="text-sm">Blocked Users</span>
                                    </div>
                                    <span className="font-black">3</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={isIssueModalOpen}
                    onClose={() => setIsIssueModalOpen(false)}
                    title="Issue Digital Key"
                >
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recipient</label>
                            <input type="text" placeholder="Search resident or guest name..." className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Access Level</label>
                            <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm appearance-none">
                                <option>Full Resident Access</option>
                                <option>Common Areas Only</option>
                                <option>Service/Vendor (Temp)</option>
                                <option>Guest Pass (24h)</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Start Date</label>
                                <input type="date" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Expiry Date</label>
                                <input type="date" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm" />
                            </div>
                        </div>
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4">
                            <button onClick={() => setIsIssueModalOpen(false)} className="px-8 py-4 rounded-full text-sm font-bold text-gray-500 transition-colors">Cancel</button>
                            <ActionButton onClick={() => { setIsIssueModalOpen(false); showToast("Digital key issued and sent via mobile app!"); }}>Issue Key</ActionButton>
                        </div>
                    </div>
                </Modal>
            </div>
        </DashboardLayout>
    );
}
