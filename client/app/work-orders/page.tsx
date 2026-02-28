"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
    Wrench,
    Clock,
    CheckCircle2,
    AlertTriangle,
    Plus,
    Search,
    Filter,
    Calendar,
    Edit,
    Trash2,
    Eye,
    UserPlus,
    Hammer,
    Building2,
    ChevronRight,
    User,
    MoreHorizontal,
    Layout
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { Dropdown, DropdownItem, DropdownDivider } from "@/components/Dropdown";
import { Modal } from "@/components/Modal";
import { ActionButton } from "@/components/ActionComponents";

const workOrders = [
    {
        id: "WO-4821",
        title: "Leaking Faucet",
        priority: "High",
        status: "In Progress",
        issued: "2h ago",
        building: "The Skyline Loft",
        unit: "Unit 171",
        assignedTo: "Mike Rodriguez",
        type: "Plumbing"
    },
    {
        id: "WO-4819",
        title: "AC Unit Noise",
        priority: "Medium",
        status: "Pending",
        issued: "5h ago",
        building: "Modern Heights",
        unit: "Unit 49",
        assignedTo: "Sarah Jenkins",
        type: "HVAC"
    },
    {
        id: "WO-4815",
        title: "Broken Window Seal",
        priority: "Low",
        status: "Completed",
        issued: "Yesterday",
        building: "Serene Gardens",
        unit: "Unit 65",
        assignedTo: "David Chen",
        type: "Repair"
    },
    {
        id: "WO-4812",
        title: "Light Fixture Replacement",
        priority: "Medium",
        status: "In Progress",
        issued: "Oct 24",
        building: "The Skyline Loft",
        unit: "Unit 87",
        assignedTo: "Mike Rodriguez",
        type: "Electrical"
    }
];

export default function WorkOrdersPage() {
    const { showToast } = useStore();
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold dark:text-white tracking-tight">Work Orders</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Track maintenance requests, assign vendors, and monitor completion rates.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => showToast("Filtering work orders...")}
                            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-surface-dark rounded-full text-sm font-bold shadow-sm border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
                        >
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                        <button
                            onClick={() => setIsRequestModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-full text-sm font-bold shadow-glow hover:opacity-90 transition-all active:scale-95"
                        >
                            <Plus className="w-4 h-4" />
                            New Request
                        </button>
                    </div>
                </div>

                {/* Status Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft border border-transparent dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                                <Clock className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold">Pending</h3>
                        </div>
                        <p className="text-2xl font-black">12</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Awaiting Assignment</p>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft border border-transparent dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <Wrench className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold">In Progress</h3>
                        </div>
                        <p className="text-2xl font-black">24</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Currently being fixed</p>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft border border-transparent dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold">Urgent</h3>
                        </div>
                        <p className="text-2xl font-black">5</p>
                        <p className="text-[10px] text-red-500 font-bold uppercase mt-1">Needs Immediate Action</p>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft border border-transparent dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold">Completed</h3>
                        </div>
                        <p className="text-2xl font-black">156</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">This month</p>
                    </div>
                </div>

                {/* Work Orders List */}
                <div className="bg-white dark:bg-surface-dark rounded-3xl shadow-soft border border-transparent dark:border-gray-800 overflow-hidden">
                    <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <h2 className="text-xl font-bold">Active Orders</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => showToast("Showing all work orders")}
                                    className="px-3 py-1 bg-primary text-black text-[10px] font-bold rounded-full"
                                >
                                    ALL
                                </button>
                                <button
                                    onClick={() => showToast("Filtering by Plumbing")}
                                    className="px-3 py-1 bg-gray-50 dark:bg-gray-900 text-gray-400 text-[10px] font-bold rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    PLUMBING
                                </button>
                                <button
                                    onClick={() => showToast("Filtering by Electrical")}
                                    className="px-3 py-1 bg-gray-50 dark:bg-gray-900 text-gray-400 text-[10px] font-bold rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    ELECTRICAL
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="w-4 h-4 text-gray-400" />
                            </span>
                            <input
                                type="text"
                                placeholder="Find orders by ID, user..."
                                className="pl-10 pr-4 py-2 rounded-full bg-gray-50 dark:bg-black/50 border-none focus:ring-2 focus:ring-primary text-sm w-full md:w-64"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-black/20 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                                    <th className="px-8 py-4">Status & Priority</th>
                                    <th className="px-8 py-4">Title & ID</th>
                                    <th className="px-8 py-4">Location</th>
                                    <th className="px-8 py-4">Assigned To</th>
                                    <th className="px-8 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {workOrders.map((order) => (
                                    <tr key={order.id} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "w-2 h-2 rounded-full animate-pulse",
                                                    order.status === "In Progress" ? "bg-blue-500" :
                                                        order.status === "Pending" ? "bg-yellow-500" : "bg-green-500"
                                                )}></div>
                                                <div>
                                                    <p className="text-xs font-bold dark:text-gray-100">{order.status}</p>
                                                    <span className={cn(
                                                        "text-[10px] font-black uppercase",
                                                        order.priority === "High" ? "text-red-500" :
                                                            order.priority === "Medium" ? "text-yellow-500" : "text-gray-400"
                                                    )}>
                                                        {order.priority} PRIORITY
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="font-bold text-sm dark:text-gray-100 group-hover:text-primary transition-colors">{order.title}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{order.id} • {order.type}</p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <Building2 className="w-3.5 h-3.5 text-gray-400" />
                                                <div>
                                                    <p className="text-xs font-bold dark:text-gray-200">{order.building}</p>
                                                    <p className="text-[10px] text-gray-400">{order.unit}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                                    <User className="w-4 h-4 text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold dark:text-gray-200">{order.assignedTo}</p>
                                                    <p className="text-[10px] text-gray-400">{order.issued}</p>
                                                </div>
                                            </div>
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
                                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Order Actions</p>
                                                    </div>
                                                    <DropdownItem icon={Eye} onClick={() => showToast(`Viewing details for ${order.id}...`)}>View Details</DropdownItem>
                                                    <DropdownItem icon={Edit} onClick={() => showToast(`Editing order ${order.id}...`)}>Edit Order</DropdownItem>
                                                    <DropdownItem icon={UserPlus} onClick={() => showToast(`Assigning technician to ${order.id}...`)}>Assign Technician</DropdownItem>
                                                    <DropdownDivider />
                                                    <DropdownItem icon={Trash2} variant="danger" onClick={() => showToast(`Cancelling order ${order.id}...`)}>Cancel Request</DropdownItem>
                                                </Dropdown>
                                                <button className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black opacity-0 group-hover:opacity-100 transition-all active:scale-90">
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-8 bg-gray-50/50 dark:bg-black/20 flex items-center justify-between">
                        <button
                            onClick={() => showToast("Opening historical records archive...")}
                            className="text-xs font-bold text-gray-400 hover:text-primary uppercase tracking-widest flex items-center gap-2"
                        >
                            View historical records
                            <Calendar className="w-4 h-4" />
                        </button>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-800 text-xs font-bold disabled:opacity-30" disabled>Previous</button>
                            <button
                                onClick={() => showToast("Loading next page of work orders...")}
                                className="px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-800 text-xs font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={isRequestModalOpen}
                    onClose={() => setIsRequestModalOpen(false)}
                    title="New Maintenance Request"
                >
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Issue Title</label>
                            <input type="text" placeholder="e.g. Kitchen sink leakage" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Category</label>
                                <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm appearance-none">
                                    <option>Plumbing</option>
                                    <option>Electrical</option>
                                    <option>HVAC</option>
                                    <option>General Repair</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Priority</label>
                                <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm appearance-none">
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                    <option>Urgent</option>
                                </select>
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
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Unit</label>
                                <input type="text" placeholder="e.g. 171" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</label>
                            <textarea rows={3} placeholder="Describe the issue in detail..." className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm resize-none"></textarea>
                        </div>
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4">
                            <button
                                onClick={() => setIsRequestModalOpen(false)}
                                className="px-8 py-4 rounded-full text-sm font-bold text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <ActionButton
                                onClick={() => {
                                    setIsRequestModalOpen(false);
                                    showToast("Maintenance request submitted successfully!");
                                }}
                            >
                                Submit Request
                            </ActionButton>
                        </div>
                    </div>
                </Modal>
            </div>
        </DashboardLayout>
    );
}
