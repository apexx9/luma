"use client";

import { Plus, Filter } from "lucide-react";
import { ActionButton } from "@/components/ActionComponents";

interface WorkOrdersHeaderProps {
  onFilter: () => void;
  onNewRequest: () => void;
}

export function WorkOrdersHeader({ onFilter, onNewRequest }: WorkOrdersHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white tracking-tight">Work Orders</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Track maintenance requests, assign vendors, and monitor completion rates.</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onFilter}
          className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-surface-dark rounded-full text-sm font-bold shadow-sm border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
        >
          <Filter className="w-4 h-4" />
          Filter
        </button>
        <ActionButton onClick={onNewRequest}>
          <Plus className="w-4 h-4" />
          New Request
        </ActionButton>
      </div>
    </div>
  );
}
