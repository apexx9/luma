"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface BuildingsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  filterType: string;
  onFilterTypeChange: (value: string) => void;
  filterStatus: string;
  onFilterStatusChange: (value: string) => void;
  isSearching?: boolean;
  searchResults?: any[];
}

export function BuildingsFilters({
  search,
  onSearchChange,
  filterType,
  onFilterTypeChange,
  filterStatus,
  onFilterStatusChange,
  isSearching = false,
  searchResults = []
}: BuildingsFiltersProps) {
  const handleTypeChange = (value: string) => {
    onFilterTypeChange?.(value);
  };

  const handleStatusChange = (value: string) => {
    onFilterStatusChange?.(value);
  };

  return (
    <div className="flex flex-wrap gap-3 items-center mt-2">
      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search buildings..."
          className={cn(
            "pl-11 pr-4 py-2.5 rounded-full bg-gray-50 dark:bg-black/50",
            "border border-transparent focus:border-primary/40",
            "focus:ring-2 focus:ring-primary/20",
            "text-sm w-[260px] transition-all",
            isSearching && "animate-pulse"
          )}
          disabled={isSearching}
        />
        {isSearching && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-transparent border-r-transparent"></div>
          </div>
        )}
      </div>
      
      {/* Show search results count */}
      {searchResults && searchResults.length > 0 && (
        <div className="w-full text-sm text-gray-500 dark:text-gray-400 mt-2">
          Found {searchResults.length} buildings matching "{search}"
        </div>
      )}
      
      {/* TYPE FILTER */}
      {["all", "Residential", "Commercial", "Industrial"].map((t) => (
        <button
          key={t}
          onClick={() => handleTypeChange(t)}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-semibold transition-all",
            filterType === t
              ? "bg-primary text-black shadow-sm"
              : "bg-gray-100 dark:bg-black/40 hover:bg-gray-200 dark:hover:bg-black/60"
          )}
        >
          {t}
        </button>
      ))}

      {/* STATUS FILTER */}
      {["all", "active", "maintenance", "inactive"].map((s) => (
        <button
          key={s}
          onClick={() => handleStatusChange(s)}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-semibold transition-all",
            filterStatus === s
              ? "bg-primary text-black shadow-sm"
              : "bg-gray-100 dark:bg-black/40 hover:bg-gray-200 dark:hover:bg-black/60"
          )}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
