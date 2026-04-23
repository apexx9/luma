import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    MapPin,
    MoreHorizontal,
    CheckCircle2,
    AlertCircle,
    Eye,
    Edit,
    Settings,
    Trash2,
    ArrowUpRight
} from "lucide-react";
import { Dropdown, DropdownItem, DropdownDivider } from "@/components/Dropdown";
import { ActionButton } from "@/components/ActionComponents";
import { Building } from "@/types/building.types";

interface BuildingCardProps {
    b: Building;
    handleEditBuilding: (b: Building) => void;
    showToast: (msg: string) => void;
    handleDeleteBuilding: (id: string | number) => void;
}

export function BuildingCard({ b, handleEditBuilding, showToast, handleDeleteBuilding }: BuildingCardProps) {
    const router = useRouter();

    return (
        <div
            className="group border dark:border-gray-800 rounded-3xl overflow-hidden hover:shadow-xl transition-all hover:scale-[1.02] bg-gray-50/30 dark:bg-[#1f1f22]/50 cursor-pointer"
            onClick={() => router.push(`/buildings/${b.id}`)}
        >
            {/* IMAGE */}
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={b.image_url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt={b.name}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                />

                {/* STATUS BADGES */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase">
                        {b.type || "Property"}
                    </span>
                    <span className={cn(
                        "px-3 py-1 backdrop-blur-md text-black text-[10px] font-bold rounded-full uppercase flex items-center gap-1",
                        b.status === "active" ? "bg-green-400" :
                            b.status === "maintenance" ? "bg-yellow-400" : "bg-red-400"
                    )}>
                        {b.status === "active" && <CheckCircle2 className="w-3 h-3" />}
                        {b.status === "maintenance" && <AlertCircle className="w-3 h-3" />}
                        {b.status === "inactive" && <AlertCircle className="w-3 h-3" />}
                        {b.status}
                    </span>
                </div>

                {/* ACTIONS DROPDOWN */}
                <Dropdown
                    trigger={
                        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white dark:bg-surface-dark flex items-center justify-center text-gray-400 hover:text-black dark:hover:text-white transition-colors shadow-sm" onClick={(e) => e.stopPropagation()}>
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    }
                >
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 mb-2">
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Building Actions</p>
                    </div>
                    <DropdownItem icon={Eye} onClick={() => router.push(`/buildings/${b.id}`)}>
                        View Details
                    </DropdownItem>
                    <DropdownItem icon={Edit} onClick={() => handleEditBuilding(b)}>
                        Edit Property
                    </DropdownItem>
                    <DropdownItem icon={Settings} onClick={() => showToast(`Opening settings for ${b.name}...`)}>
                        Unit Settings
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownItem
                        icon={Trash2}
                        variant="danger"
                        onClick={() => handleDeleteBuilding(b.id)}
                    >
                        Delete Building
                    </DropdownItem>
                </Dropdown>
            </div>

            {/* CARD BODY */}
            <div className="p-6">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{b.name}</h3>

                <p className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                    <MapPin className="w-3 h-3 text-primary" />
                    {b.address}, {b.city}{b.state && `, ${b.state}`}
                </p>

                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Units</p>
                        <p className="text-lg font-bold">{b.total_units}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Type</p>
                        <p className="text-lg font-bold text-primary">{b.type || "Property"}</p>
                    </div>
                </div>

                {b.yearBuilt && (
                    <div className="mt-4">
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Year Built</p>
                        <p className="text-sm font-medium">{b.yearBuilt}</p>
                    </div>
                )}

                <ActionButton
                    variant="outline"
                    className="w-full mt-6"
                    icon={ArrowUpRight}
                    iconPosition="right"
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/buildings/${b.id}`);
                    }}
                >
                    View Assets
                </ActionButton>
            </div>
        </div>
    );
}
