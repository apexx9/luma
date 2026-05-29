import { cn } from "@/lib/utils";
import { Plus, ArrowUpRight } from "lucide-react";
import { ActionButton } from "@/components/ActionComponents";
import { Building, BuildingStats } from "@/types/building.types";

export function UnitsTab({ building, stats, showToast }: { 
  building: Building; 
  stats: BuildingStats | null; 
  showToast: (message: string, type?: "success" | "error" | "info" | "warning") => void; 
}) {
    return (
        <div className="bg-white dark:bg-[#121212] border border-gray-200/60 dark:border-white/5 rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-xl font-bold tracking-tight">Inventory Details</h2>
                <ActionButton className="px-6" onClick={() => showToast("Adding new unit feature coming soon.")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Unit
                </ActionButton>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50/50 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Units</h3>
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <span className="text-xs font-bold text-primary">{building.totalUnits}</span>
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{building.totalUnits}</p>
                        <p className="text-xs text-gray-500 mt-1">Total inventory</p>
                    </div>
                    
                    <div className="bg-gray-50/50 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Occupied</h3>
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                <span className="text-xs font-bold text-green-400">{stats?.occupiedUnits || 0}</span>
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.occupiedUnits || 0}</p>
                        <p className="text-xs text-gray-500 mt-1">Currently leased</p>
                    </div>
                    
                    <div className="bg-gray-50/50 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Vacant</h3>
                            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                                <span className="text-xs font-bold text-amber-400">{stats?.vacantUnits || 0}</span>
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.vacantUnits || 0}</p>
                        <p className="text-xs text-gray-500 mt-1">Available for lease</p>
                    </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50/50 dark:bg-blue-500/10 rounded-2xl border border-blue-100 dark:border-blue-500/20">
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                        <strong>Note:</strong> Individual unit management is coming soon. Currently showing aggregated building statistics.
                    </p>
                </div>
            </div>
        </div>
    );
}
