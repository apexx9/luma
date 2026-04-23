import { cn } from "@/lib/utils";
import { Building, BuildingStats } from "@/types/building.types";

import BrandLoader from "@/components/BrandLoader";

export function FinancialsTab({ stats, building }: { stats: BuildingStats | null; building: Building }) {
    if (!stats) {
        return (
            <div className="bg-white dark:bg-[#121212] border border-gray-200/60 dark:border-white/5 rounded-3xl p-8 text-center">
                <p className="text-gray-500">Financial data not available</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#121212] p-8 border border-gray-200/60 dark:border-white/5 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-6">
                <h3 className="text-lg font-bold tracking-tight mb-2">Revenue Streams</h3>
                <LineItem label="Residential Units" value={(stats.revenue || 0) * 0.7} />
                <LineItem label="Commercial Space" value={(stats.revenue || 0) * 0.3} />
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                    <LineItem label="Total Gross Income" value={stats.revenue || 0} bold />
                </div>
            </div>
            <div className="bg-white dark:bg-[#121212] p-8 border border-gray-200/60 dark:border-white/5 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-6">
                <h3 className="text-lg font-bold tracking-tight mb-2">Operational Outflow</h3>
                <LineItem label="Property Tax" value={building.propertyTax || 0} />
                <LineItem label="Insurance Policy" value={building.insurance || 0} />
                <LineItem label="Maintenance Fund" value={(stats.expenses || 0) * 0.3} />
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                    <LineItem label="Total Operational Expense" value={stats.expenses || 0} bold />
                </div>
            </div>
        </div>
    );
}

function LineItem({ label, value, bold }: { label: string; value: number; bold?: boolean }) {
    return (
        <div className="flex justify-between items-center">
            <span className={cn("text-sm", bold ? "font-bold text-gray-900 dark:text-white" : "text-gray-500 font-medium")}>{label}</span>
            <span className={cn("text-sm", bold ? "font-bold text-primary" : "font-semibold text-gray-900 dark:text-white")}>
                ${(value || 0).toLocaleString()}
            </span>
        </div>
    );
}
