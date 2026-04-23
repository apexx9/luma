"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
    Users,
    Mail,
    Phone,
    Filter,
    Search,
    Plus,
    ChevronRight,
    MessageSquare,
    FileText,
    UserPlus,
    Edit,
    Trash2,
    Eye,
    MessageCircle,
    MoreHorizontal
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import { Dropdown, DropdownItem, DropdownDivider } from "@/components/Dropdown";
import { Modal } from "@/components/Modal";
import { ActionButton } from "@/components/ActionComponents";
import { mockTenants } from "./data/mockTenants";

export default function TenantsPage() {
    const { showToast } = useStore();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold dark:text-white tracking-tight">Tenants Directory</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Oversee all residents, manage lease agreements, and handle communication.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => showToast("Filtering residents directory...")}
                            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-surface-dark rounded-full text-sm font-bold shadow-sm border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
                        >
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-full text-sm font-bold shadow-glow hover:opacity-90 transition-all active:scale-95"
                        >
                            <UserPlus className="w-4 h-4" />
                            Add Tenant
                        </button>
                    </div>
                </div>

                {/* Tenant List Table */}
                <div className="bg-white dark:bg-surface-dark rounded-3xl shadow-soft border border-transparent dark:border-gray-800 overflow-hidden">
                    <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <h2 className="text-xl font-bold">1,054 Total Residents</h2>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="w-4 h-4 text-gray-400" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search residents by name, unit, or building..."
                                className="pl-10 pr-4 py-2 rounded-full bg-gray-50 dark:bg-black/50 border-none focus:ring-2 focus:ring-primary text-sm w-full md:w-80"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-black/20 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                                    <th className="px-8 py-4">Resident</th>
                                    <th className="px-8 py-4">Building & Unit</th>
                                    <th className="px-8 py-4">Lease Period</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {mockTenants.map((tenant) => (
                                    <tr key={tenant.name} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                        <td className="px-8 py-5">
                                            <Link href="/leads/1" className="flex items-center gap-3">
                                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm">
                                                    <Image src={tenant.avatar} alt={tenant.name} fill sizes="48px" className="object-cover" unoptimized />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm dark:text-gray-100 group-hover:text-primary transition-colors">{tenant.name}</p>
                                                    <div className="flex gap-4 mt-1">
                                                        <button
                                                            onClick={(e) => { e.preventDefault(); showToast(`Emailing ${tenant.name}...`); }}
                                                            className="text-gray-400 hover:text-primary transition-colors"
                                                        >
                                                            <Mail className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.preventDefault(); showToast(`Calling ${tenant.name}...`); }}
                                                            className="text-gray-400 hover:text-primary transition-colors"
                                                        >
                                                            <Phone className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.preventDefault(); showToast(`Opening chat with ${tenant.name}...`); }}
                                                            className="text-gray-400 hover:text-primary transition-colors"
                                                        >
                                                            <MessageSquare className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="font-bold text-xs dark:text-gray-200">{tenant.building}</p>
                                            <p className="text-xs text-gray-400 mt-1">{tenant.unit}</p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-xs font-medium dark:text-gray-300">{tenant.lease}</p>
                                            <button
                                                onClick={() => showToast(`Opening lease agreement for ${tenant.name}...`)}
                                                className="flex items-center gap-1 text-[10px] font-bold text-primary mt-1 uppercase tracking-widest hover:underline"
                                            >
                                                <FileText className="w-3 h-3" />
                                                View Agreement
                                            </button>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={cn(
                                                "px-3 py-1 text-[10px] font-black uppercase rounded-lg border",
                                                tenant.status === "Active" ? "bg-primary/10 text-primary border-primary/20" :
                                                    tenant.status === "Expiring soon" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                                                        "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                            )}>
                                                {tenant.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 px-2">
                                                <Dropdown
                                                    trigger={
                                                        <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                            <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                                        </button>
                                                    }
                                                >
                                                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 mb-2">
                                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Options</p>
                                                    </div>
                                                    <DropdownItem icon={Eye} onClick={() => showToast(`Viewing ${tenant.name}'s profile...`)}>View Profile</DropdownItem>
                                                    <DropdownItem icon={Edit} onClick={() => showToast(`Editing ${tenant.name}...`)}>Edit Resident</DropdownItem>
                                                    <DropdownItem icon={MessageCircle} onClick={() => showToast(`Messaging ${tenant.name}...`)}>Message</DropdownItem>
                                                    <DropdownDivider />
                                                    <DropdownItem icon={Trash2} variant="danger" onClick={() => showToast(`Requesting deletion of ${tenant.name}...`)}>Remove Resident</DropdownItem>
                                                </Dropdown>
                                                <Link href="/leads/1" className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black opacity-0 group-hover:opacity-100 transition-all active:scale-90">
                                                    <ChevronRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-8 bg-gray-50/50 dark:bg-black/20 flex items-center justify-between">
                        <p className="text-xs text-gray-500 font-medium">Showing 4 of 1,054 residents</p>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-800 text-xs font-bold disabled:opacity-30" disabled>Previous</button>
                            <button
                                onClick={() => showToast("Loading next page of residents...")}
                                className="px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-800 text-xs font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    title="Add New Resident"
                >
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                                <input type="text" placeholder="e.g. John Doe" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                                <input type="email" placeholder="e.g. john@example.com" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Building</label>
                                <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm appearance-none">
                                    <option>The Skyline Loft</option>
                                    <option>Modern Heights</option>
                                    <option>Serene Gardens</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Unit Number</label>
                                <input type="text" placeholder="e.g. 402" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm" />
                            </div>
                        </div>
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4">
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="px-8 py-4 rounded-full text-sm font-bold text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <ActionButton
                                onClick={() => {
                                    setIsAddModalOpen(false);
                                    showToast("New resident added successfully!");
                                }}
                            >
                                Add Resident
                            </ActionButton>
                        </div>
                    </div>
                </Modal>
            </div>
        </DashboardLayout>
    );
}
