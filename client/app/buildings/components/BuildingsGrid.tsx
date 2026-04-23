"use client";

import { Building2 } from "lucide-react";
import { Building } from "@/types/building.types";
import { BuildingCard } from "./BuildingCard";
import BrandLoader from "@/components/BrandLoader";

interface BuildingsGridProps {
  buildings: Building[];
  loading: boolean;
  onEditBuilding: (building: Building) => void;
  showToast: (msg: string) => void;
  handleDeleteBuilding: (id: string | number) => void;
}

export function BuildingsGrid({ 
  buildings, 
  loading, 
  onEditBuilding, 
  showToast, 
  handleDeleteBuilding 
}: BuildingsGridProps) {
  if (loading) {
    return <BrandLoader />;
  }

  if (buildings.length === 0) {
    return (
      <div className="col-span-full text-center py-20">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
          <Building2 className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No properties found</h3>
        <p className="text-gray-500 text-sm">Use the "Add Building" button above to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {buildings.map((building) => (
        <BuildingCard
          key={building.id}
          b={building}
          handleEditBuilding={onEditBuilding}
          showToast={showToast}
          handleDeleteBuilding={handleDeleteBuilding}
        />
      ))}
    </div>
  );
}
