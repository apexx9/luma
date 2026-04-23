import { cn } from "@/lib/utils";
import { Building, BuildingStats } from "@/types/building.types";

export function OverviewTab({ stats, building }: { stats: BuildingStats | null; building: Building }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard label="Occupancy Rate" value={stats?.occupancyRate ? `${stats.occupancyRate}%` : "0%"} trend="+2.4%" positive />
            <StatCard label="Total Revenue" value={stats?.revenue ? `$${stats.revenue.toLocaleString()}` : "$0"} sub="Monthly" />
            <StatCard label="Net Income" value={stats?.net ? `$${stats.net.toLocaleString()}` : "$0"} trend="+8.1%" positive />
            <StatCard label="Active Units" value={building.total_units ?? 0} sub={`of ${building.total_units ?? 0}`} />
        </div>
    );
}

function StatCard({ label, value, trend, positive, sub }: any) {
    return (
        <div className="p-6 bg-white dark:bg-[#121212] border border-gray-200/60 dark:border-white/5 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all hover:shadow-md">
            <p className="text-sm font-medium text-gray-500 mb-2">{label}</p>
            <div className="flex items-baseline gap-3">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{value}</h3>
                {trend && (
                    <span className={cn("text-xs font-semibold px-2 py-1 rounded-full", positive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400")}>
                        {trend}
                    </span>
                )}
            </div>
            {sub && <p className="text-xs text-gray-400 mt-2 font-medium">{sub}</p>}
        </div>
    );
}
