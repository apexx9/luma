"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
    Building2,
    MapPin,
    Users,
    LayoutGrid,
    ArrowUpRight,
    Filter,
    Search,
    Plus,
    Home,
    CheckCircle2,
    Clock,
    AlertCircle,
    Compass,
    Building,
    Eye,
    Edit,
    Trash2,
    Settings,
    MoreHorizontal
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ActionButton, AddButton } from "@/components/ActionComponents";
import { useStore } from "@/store/useStore";
import { Dropdown, DropdownItem, DropdownDivider } from "@/components/Dropdown";
import { Modal } from "@/components/Modal";

const buildings = [
    {
        name: "The Skyline Loft",
        address: "123 Main St, Downtown",
        units: 124,
        occupied: 118,
        type: "Residential",
        status: "Healthy",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLHulxMh37xuqTxLQr7DKIRvWvgU6QKyn_FqdD-eU1AEfuxBZYsCAeDs0GJ1E9td0PXAkh6UuvSz8Wf6jLXoev3xoNp9jOYWfW6R-EiwNAMhfeMsvcgoa7hHKJ2oXhKlpdkVRw8dldz-ODQRJaqmLmKjlZLklFMjALdtztSy1uWbBSAqKTW6oDyu0kHAs6qcMsreVN67AHsw0XNlnrWJnDDTV5OsPCHmzefop5GZh99qQBUYSt7UQkDUu6M_hGstbvCML7tX5Zt3M"
    },
    {
        name: "Modern Heights",
        address: "456 Park Ave, Uptown",
        units: 86,
        occupied: 82,
        type: "Mixed Use",
        status: "Maintenance",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrHDL89bjbz4V82aPp4hubWdNvmZ4JuUZJyf6p2ay50UKPmhPfVpYhgUBDmcpsvFy7ZuSabWthJtAW2sotGJtJF-AImRE9InJBQmoo9zpIYD6mcw9vUfL_vhNQm-kztWOW3IL0sfw7JKUVFblYUilU_znfpTp6IjjzoymTAN9qwPSq0r447apiMgooJHSj_K7CzPvV-pturD7qUd4x3P15P-OY4hoGR0EqiLYTQ3ENVZwKdY2x0od_CAqrYdv2XWLd6DNEPinEyBs"
    },
    {
        name: "Serene Gardens",
        address: "789 Pine Ln, Westside",
        units: 42,
        occupied: 40,
        type: "Residential",
        status: "Healthy",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrtSgylNnExyqjzTFv3SduK578-QM7Rr_i-wYlrpQyNfHwaRCeKTWJqjJsAlNnw2Mhs2TTTOn9SSCtm0otTVjYm-bk8yvShzLdcq5BcV6QCPhSw_-KtdiqCl_rYQ85Xx-vGXnqRyyl4sfL_SYtbX3CNjNhGS2zXgirw8PSOWx-b5jT5dr65cmKmcfb32r0MvffYTn6DGVbyLLVbwlad07iCkppYvjTGiCYiz1bkTePkmRBujscVjeEYtcyreWz1tquQLmaBPkXxWk"
    }
];

export default function BuildingsPage() {
    const { showToast } = useStore();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold dark:text-white tracking-tight">Buildings Portfolio</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Manage and monitor your property assets across all locations.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <ActionButton variant="outline">
                            <Filter className="w-4 h-4" />
                            Filter
                        </ActionButton>
                        <ActionButton>
                            <Plus className="w-4 h-4" />
                            Add Building
                        </ActionButton>
                    </div>
                </div>

                {/* Portfolio Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft border border-transparent dark:border-gray-800">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                            <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">Total Properties</p>
                        <h3 className="text-3xl font-bold mt-1">12</h3>
                        <p className="text-[10px] font-bold text-green-500 mt-2 uppercase">+2 this year</p>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft border border-transparent dark:border-gray-800">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
                            <Home className="w-6 h-6 text-blue-500" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">Total Units</p>
                        <h3 className="text-3xl font-bold mt-1">842</h3>
                        <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase">98.2% capacity</p>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft border border-transparent dark:border-gray-800">
                        <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-4">
                            <Clock className="w-6 h-6 text-yellow-500" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">Ongoing Maintenance</p>
                        <h3 className="text-3xl font-bold mt-1">14</h3>
                        <p className="text-[10px] font-bold text-yellow-500 mt-2 uppercase">3 high priority</p>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft border border-transparent dark:border-gray-800">
                        <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4">
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">Portfolio Value</p>
                        <h3 className="text-3xl font-bold mt-1">$42.8M</h3>
                        <p className="text-[10px] font-bold text-green-500 mt-2 uppercase">+4.2% yield</p>
                    </div>
                </div>

                {/* Buildings Table/Grid */}
                <div className="bg-white dark:bg-surface-dark rounded-3xl shadow-soft border border-transparent dark:border-gray-800 p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <h2 className="text-xl font-bold">Property Portfolio</h2>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="w-4 h-4 text-gray-400" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search buildings..."
                                className="pl-10 pr-4 py-2 rounded-full bg-gray-50 dark:bg-black/50 border-none focus:ring-2 focus:ring-primary text-sm w-full md:w-64"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {buildings.map((building) => (
                            <div key={building.name} className="group border dark:border-gray-800 rounded-3xl overflow-hidden hover:shadow-xl transition-all hover:scale-[1.02] bg-gray-50/30 dark:bg-[#1f1f22]/50">
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={building.image}
                                        alt={building.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        unoptimized
                                    />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase">
                                            {building.type}
                                        </span>
                                        <span className={cn(
                                            "px-3 py-1 backdrop-blur-md text-black text-[10px] font-bold rounded-full uppercase flex items-center gap-1",
                                            building.status === "Healthy" ? "bg-primary" : "bg-yellow-400"
                                        )}>
                                            {building.status === "Healthy" ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                            {building.status}
                                        </span>
                                    </div>
                                    <Dropdown
                                        trigger={
                                            <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white dark:bg-surface-dark flex items-center justify-center text-gray-400 hover:text-black dark:hover:text-white transition-colors shadow-sm">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        }
                                    >
                                        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 mb-2">
                                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Building Actions</p>
                                        </div>
                                        <DropdownItem icon={Eye} onClick={() => showToast(`Opening ${building.name} details...`)}>View Details</DropdownItem>
                                        <DropdownItem icon={Edit} onClick={() => showToast(`Editing ${building.name}...`)}>Edit Property</DropdownItem>
                                        <DropdownItem icon={Settings} onClick={() => showToast(`Opening settings for ${building.name}...`)}>Unit Settings</DropdownItem>
                                        <DropdownDivider />
                                        <DropdownItem icon={Trash2} variant="danger" onClick={() => showToast(`Requesting decommissioning of ${building.name}...`)}>Decommission</DropdownItem>
                                    </Dropdown>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{building.name}</h3>
                                    <p className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                                        <MapPin className="w-3 h-3 text-primary" />
                                        {building.address}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                                        <div>
                                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Units</p>
                                            <p className="text-lg font-bold">{building.units}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Occupancy</p>
                                            <p className="text-lg font-bold text-primary">{Math.round((building.occupied / building.units) * 100)}%</p>
                                        </div>
                                    </div>

                                    <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full mt-4 overflow-hidden">
                                        <div
                                            className="bg-primary h-full rounded-full shadow-glow"
                                            style={{ width: `${(building.occupied / building.units) * 100}%` }}
                                        ></div>
                                    </div>

                                    <ActionButton variant="outline" className="w-full mt-6" icon={ArrowUpRight} iconPosition="right">
                                        View Assets
                                    </ActionButton>
                                </div>
                            </div>
                        ))}

                        {/* Add New Placeholder */}
                        <div className="bg-white dark:bg-surface-dark border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-6 group hover:border-primary transition-all cursor-pointer overflow-hidden relative">
                            <AddButton label="Add New Property" onClick={() => setIsAddModalOpen(true)} />
                            <p className="text-xs text-center text-gray-400 px-10">Expand your portfolio by adding new residential or commercial assets.</p>
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    title="Add New Property"
                >
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Property Name</label>
                            <input type="text" placeholder="e.g. Sunrise Apartments" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Type</label>
                                <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm appearance-none">
                                    <option>Residential</option>
                                    <option>Commercial</option>
                                    <option>Industrial</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Units</label>
                                <input type="number" placeholder="e.g. 24" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="text" placeholder="Full address..." className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm" />
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
                                    showToast("New property successfully added to your portfolio!");
                                }}
                            >
                                Create Property
                            </ActionButton>
                        </div>
                    </div>
                </Modal>
            </div>
        </DashboardLayout>
    );
}
