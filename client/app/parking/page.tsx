"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
    Car,
    Plus,
    Search,
    Filter,
    ShieldCheck,
    Clock,
    AlertCircle,
    MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { Dropdown, DropdownItem } from "@/components/Dropdown";
import { Edit, Trash2, Eye } from "lucide-react";
import { Modal } from "@/components/Modal";
import { ActionButton } from "@/components/ActionComponents";

const parkingSlots = [
    { id: "P-101", level: "Level 1", status: "Occupied", resident: "Jaden Fischer", type: "Resident" },
    { id: "P-102", level: "Level 1", status: "Vacant", resident: "-", type: "Visitor" },
    { id: "P-201", level: "Level 2", status: "Reserved", resident: "Aron Levine", type: "EV Charging" },
    { id: "P-202", level: "Level 2", status: "Occupied", resident: "Tessa Tucker", type: "Resident" },
];

export default function ParkingPage() {
    const { showToast } = useStore();
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold dark:text-white tracking-tight">Parking Management</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Monitor parking slot availability, EV charging stations, and visitor permits.</p>
                    </div>
                    <button
                        onClick={() => setIsAssignModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-full text-sm font-bold shadow-glow hover:opacity-90 transition-all active:scale-95"
                    >
                        <Plus className="w-4 h-4" />
                        Assign Slot
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft border border-transparent dark:border-gray-800">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Total Slots</p>
                        <h3 className="text-3xl font-bold mt-1">256</h3>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft border border-transparent dark:border-gray-800">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Available</p>
                        <h3 className="text-3xl font-bold mt-1 text-primary">42</h3>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft border border-transparent dark:border-gray-800">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">EV Stations</p>
                        <h3 className="text-3xl font-bold mt-1">12</h3>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft border border-transparent dark:border-gray-800">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Alerts</p>
                        <h3 className="text-3xl font-bold mt-1 text-red-500">2</h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-surface-dark rounded-3xl shadow-soft border border-transparent dark:border-gray-800 overflow-hidden">
                    <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                        <h2 className="text-xl font-bold">Slot Directory</h2>
                        <div className="flex gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="text" placeholder="Search slots..." className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-black/50 border-none rounded-full text-sm" />
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-black/20 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                                    <th className="px-8 py-4">Slot ID</th>
                                    <th className="px-8 py-4">Level</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4">Resident</th>
                                    <th className="px-8 py-4">Type</th>
                                    <th className="px-8 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {parkingSlots.map((slot) => (
                                    <tr key={slot.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-8 py-5 font-bold">{slot.id}</td>
                                        <td className="px-8 py-5 text-sm">{slot.level}</td>
                                        <td className="px-8 py-5">
                                            <span className={cn(
                                                "px-3 py-1 text-[10px] font-black uppercase rounded-lg",
                                                slot.status === "Vacant" ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"
                                            )}>
                                                {slot.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-sm">{slot.resident}</td>
                                        <td className="px-8 py-5 text-sm">{slot.type}</td>
                                        <td className="px-8 py-5 text-right">
                                            <Dropdown
                                                trigger={
                                                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                                    </button>
                                                }
                                            >
                                                <DropdownItem icon={Eye} onClick={() => showToast(`Viewing details for Slot ${slot.id}...`)}>View Slot</DropdownItem>
                                                <DropdownItem icon={Edit} onClick={() => showToast(`Editing assignment for Slot ${slot.id}...`)}>Edit Assignment</DropdownItem>
                                                <DropdownItem icon={Trash2} variant="danger" onClick={() => showToast(`Clearing Slot ${slot.id}...`)}>Clear Slot</DropdownItem>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Modal
                    isOpen={isAssignModalOpen}
                    onClose={() => setIsAssignModalOpen(false)}
                    title="Assign Parking Slot"
                >
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Slot</label>
                            <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm appearance-none">
                                <option>P-102 (Level 1, Vacant)</option>
                                <option>P-304 (Level 3, Vacant)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Assign to Resident</label>
                            <input type="text" placeholder="Search resident name..." className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Permit Type</label>
                            <div className="flex gap-4">
                                {["Resident", "Visitor", "Service"].map((type) => (
                                    <button key={type} className="flex-1 py-3 rounded-xl border border-gray-100 dark:border-gray-800 text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4">
                            <button onClick={() => setIsAssignModalOpen(false)} className="px-8 py-4 rounded-full text-sm font-bold text-gray-500 transition-colors">Cancel</button>
                            <ActionButton onClick={() => { setIsAssignModalOpen(false); showToast("Parking slot assigned successfully!"); }}>Confirm Assignment</ActionButton>
                        </div>
                    </div>
                </Modal>
            </div>
        </DashboardLayout>
    );
}
