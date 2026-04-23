import { Building2 } from "lucide-react";
import { BuildingCard } from "./BuildingCard";
import { Building } from "@/types/building.types";
import BrandLoader from "@/components/BrandLoader";

interface BuildingGridProps {
    buildings: Building[];
    loading: boolean;
    handleEditBuilding: (b: Building) => void;
    showToast: (msg: string) => void;
    handleDeleteBuilding: (id: string | number) => void;
}

export function BuildingGrid({ buildings, loading, handleEditBuilding, showToast, handleDeleteBuilding }: BuildingGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {loading ? (
                <BrandLoader />
            ) : buildings.length === 0 ? (
                <div className="col-span-full text-center py-20">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No properties found</h3>
                    <p className="text-gray-500 text-sm">Use the "Add Building" button above to get started</p>
                </div>
            ) : (
                buildings.map((b) => (
                    <BuildingCard
                        key={b.id}
                        b={b}
                        handleEditBuilding={handleEditBuilding}
                        showToast={showToast}
                        handleDeleteBuilding={handleDeleteBuilding}
                    />
                ))
            )}
        </div>
    );
}
