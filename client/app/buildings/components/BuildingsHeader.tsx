"use client";

import { RefreshCw, Plus } from "lucide-react";
import { ActionButton } from "@/components/ActionComponents";

interface BuildingsHeaderProps {
  onRefresh: () => void;
  onAddBuilding: () => void;
}

export function BuildingsHeader({ onRefresh, onAddBuilding }: BuildingsHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Buildings</h1>
        <p className="text-gray-500 text-sm mt-2">
          Manage all property assets
        </p>
      </div>

      <div className="flex items-center gap-3">
        <ActionButton onClick={onRefresh} variant="outline">
          <RefreshCw className="w-4 h-4" />
        </ActionButton>
        <ActionButton className="px-4" onClick={onAddBuilding}>
          <Plus className="w-4 h-4" />
          Add Building
        </ActionButton>
      </div>
    </div>
  );
}
