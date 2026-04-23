"use client";

import { Trash2 } from "lucide-react";

interface BuildingsBulkBarProps {
  selectedCount: number;
  onBulkDelete: () => void;
}

export function BuildingsBulkBar({ selectedCount, onBulkDelete }: BuildingsBulkBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex justify-between items-center bg-black text-white px-4 py-2 rounded-lg">
      <span>{selectedCount} selected</span>
      <button onClick={onBulkDelete} className="flex items-center gap-1">
        <Trash2 className="w-4 h-4" />
        Delete
      </button>
    </div>
  );
}
