"use client";

import { Calendar as CalendarIcon, FileText } from "lucide-react";

interface LeadQuickActionsProps {
  onScheduleViewing: () => void;
  onCreateContract: () => void;
}

export function LeadQuickActions({ onScheduleViewing, onCreateContract }: LeadQuickActionsProps) {
  return (
    <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-soft border border-gray-100 dark:border-gray-800">
      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Quick Actions</h3>
      <div className="space-y-4">
        <button
          onClick={onScheduleViewing}
          className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all border border-gray-50 dark:border-gray-800 font-bold text-sm"
        >
          Schedule Viewing
          <CalendarIcon className="w-4 h-4 text-primary" />
        </button>
        <button
          onClick={onCreateContract}
          className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all border border-gray-50 dark:border-gray-800 font-bold text-sm"
        >
          Create Contract
          <FileText className="w-4 h-4 text-primary" />
        </button>
      </div>
    </div>
  );
}
