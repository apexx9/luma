import { cn } from "@/lib/utils";
import { Plus, ArrowUpRight } from "lucide-react";
import { ActionButton } from "@/components/ActionComponents";
import { Unit } from "@/types/building.types";

export function UnitsTab({ units, showToast }: { units: Unit[]; showToast: (message: string) => void }) {
    return (
        <div className="bg-white dark:bg-[#121212] border border-gray-200/60 dark:border-white/5 rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-xl font-bold tracking-tight">Inventory Details</h2>
                <ActionButton className="px-6" onClick={() => showToast("Adding new unit feature coming soon.")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Unit
                </ActionButton>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-gray-800 text-xs font-semibold text-gray-500">
                            <th className="px-6 py-4 font-medium">Unit Designation</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Current Tenant</th>
                            <th className="px-6 py-4 font-medium">Rental Yield</th>
                            <th className="px-6 py-4 text-right font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {units.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-12 text-center text-sm text-gray-400">
                                    No units active.
                                </td>
                            </tr>
                        ) : null}
                        {units.map((unit: Unit) => (
                            <tr key={unit.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <span className="font-semibold text-gray-900 dark:text-white">{unit.name || "Unknown Unit"}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full",
                                        unit.status === "occupied" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                    )}>
                                        {unit.status || "vacant"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 font-medium">{unit.tenant || "—"}</td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">${unit.rent ? unit.rent.toLocaleString() : "0"}</td>
                                <td className="px-6 py-4 flex justify-end">
                                    <button className="p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/10">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
