"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
    FolderOpen,
    Search,
    Filter,
    Plus,
    Settings,
    Wifi,
    Trash2,
    ShieldCheck,
    Zap,
    MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { Dropdown, DropdownItem } from "@/components/Dropdown";
import { Edit, ShieldOff, Eye } from "lucide-react";

const services = [
    { name: "High-Speed Internet", provider: "Luma Fiber", category: "Utility", status: "Active", icon: Wifi, color: "text-blue-500" },
    { name: "Waste Management", provider: "City Services", category: "Maintenance", status: "Active", icon: Trash2, color: "text-green-500" },
    { name: "Advanced Security", provider: "SecureGuard", category: "Safety", status: "Active", icon: ShieldCheck, color: "text-red-500" },
    { name: "Smart Energy", provider: "EcoGrid", category: "Energy", status: "Maintenance", icon: Zap, color: "text-yellow-500" },
];

export default function ServicesPage() {
    const { showToast } = useStore();
    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold dark:text-white tracking-tight">Services & Utilities</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Manage building-wide services, vendors, and utility subscriptions.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                try {
                                    showToast("Opening 'Add Service' wizard...");
                                } catch (error) {
                                    console.error('Failed to open add service wizard:', error);
                                    showToast("Failed to open service wizard");
                                }
                            }}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-full text-sm font-bold shadow-glow hover:opacity-90 transition-all active:scale-95"
                        >
                            <Plus className="w-4 h-4" />
                            Add Service
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service) => (
                        <div key={service.name} className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft border border-transparent dark:border-gray-800 group hover:shadow-xl transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <div className={cn("w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-black")}>
                                    <service.icon className={cn("w-6 h-6", service.color, "group-hover:text-black")} />
                                </div>
                                <Dropdown
                                    trigger={
                                        <button className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    }
                                >
                                    <DropdownItem icon={Eye} onClick={() => {
    try {
        showToast(`Viewing details for ${service.name}...`);
    } catch (error) {
        console.error('Failed to view service details:', error);
        showToast("Failed to load service details");
    }
}}>Service Details</DropdownItem>
                                    <DropdownItem icon={Edit} onClick={() => {
    try {
        showToast(`Editing configuration for ${service.name}...`);
    } catch (error) {
        console.error('Failed to edit service:', error);
        showToast("Failed to edit service");
    }
}}>Configure</DropdownItem>
                                    <DropdownItem icon={ShieldOff} variant="danger" onClick={() => {
    try {
        showToast(`Suspending ${service.name}...`);
    } catch (error) {
        console.error('Failed to suspend service:', error);
        showToast("Failed to suspend service");
    }
}}>Suspend Service</DropdownItem>
                                </Dropdown>
                            </div>
                            <h3 className="font-bold text-lg">{service.name}</h3>
                            <p className="text-sm text-gray-400 mt-1">{service.provider}</p>

                            <div className="mt-6 pt-6 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-gray-400">{service.category}</span>
                                <span className={cn(
                                    "px-3 py-1 text-[10px] font-black uppercase rounded-lg",
                                    service.status === "Active" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                                )}>
                                    {service.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
