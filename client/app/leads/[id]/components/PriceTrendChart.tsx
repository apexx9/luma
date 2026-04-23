"use client";

import { ChevronDown } from "lucide-react";
import LeadPriceChart from "@/components/LeadPriceChart";

export function PriceTrendChart() {
  return (
    <div className="bg-white dark:bg-surface-dark p-10 rounded-3xl shadow-soft mb-6 border border-gray-100 dark:border-gray-800">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10 gap-6">
        <div>
          <h3 className="text-2xl font-bold dark:text-white">Price Interest Trend</h3>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">Neighborhood average vs Lead Budget</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
            <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-glow"></span>
            <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Budget</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
            <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Market Avg</span>
          </div>
          <div className="relative">
            <select className="appearance-none bg-black dark:bg-white text-white dark:text-black pl-4 pr-10 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-primary cursor-pointer border-none shadow-lg">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="w-full h-64 relative">
        <LeadPriceChart />
      </div>
    </div>
  );
}
