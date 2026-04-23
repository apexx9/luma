"use client";

import { ChevronRight, Clock, Calendar as CalendarIcon } from "lucide-react";

export function CalendarStats() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-primary text-black p-6 rounded-2xl shadow-sm relative overflow-hidden group">
        <div className="relative z-10">
          <p className="text-sm font-medium opacity-80 mb-1">Total Viewings (Week)</p>
          <h2 className="text-4xl font-bold">24</h2>
          <div className="mt-3 flex items-center text-sm font-bold">
            <ChevronRight className="w-4 h-4 mr-1 rotate-[-90deg]" /> +12% vs last week
          </div>
        </div>
        <CalendarIcon className="absolute -right-6 -bottom-6 text-9xl opacity-10 group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
        <div className="relative z-10">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Pending Confirmations</p>
          <h2 className="text-4xl font-bold dark:text-white">08</h2>
          <div className="mt-3 flex items-center text-sm text-yellow-500 font-bold">
            <Clock className="w-4 h-4 mr-1" /> Action required
          </div>
        </div>
        <Clock className="absolute -right-6 -bottom-6 text-9xl opacity-5 dark:opacity-10 group-hover:scale-110 transition-transform duration-500 dark:text-white" />
      </div>
    </div>
  );
}
