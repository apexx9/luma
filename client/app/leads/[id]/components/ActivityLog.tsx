"use client";

import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  title: string;
  desc: string;
  time: string;
  type?: string;
  active?: boolean;
  initial?: boolean;
}

const activityLog: ActivityItem[] = [
  { title: "Property Tour: Unit 87", desc: "Showed the client the master bedroom and terrace.", time: "2h ago", type: "In Person", active: true },
  { title: "Email Sent: Floor Plans", desc: "Sent requested PDF for 2-bedroom layout.", time: "Yesterday" },
  { title: "Phone Call", desc: "Discussed budget flexibility (+10%).", time: "Oct 24" },
  { title: "Lead Created", desc: "Inbound form submission.", time: "Oct 20", initial: true },
];

interface ActivityLogProps {
  onFilter: () => void;
  onViewAllHistory: () => void;
}

export function ActivityLog({ onFilter, onViewAllHistory }: ActivityLogProps) {
  return (
    <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-soft flex flex-col h-full border border-gray-100 dark:border-gray-800">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-xl font-bold dark:text-white">Activity Log</h3>
        <button
          onClick={onFilter}
          className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        >
          <Filter className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      <div className="space-y-10 relative border-l-2 border-gray-100 dark:border-gray-800 ml-4 pl-10 pb-4">
        {activityLog.map((log, i) => (
          <div key={i} className="relative">
            <div className={cn(
              "absolute -left-[51px] top-0 w-5 h-5 rounded-full border-4 border-white dark:border-surface-dark shadow-md z-10",
              log.active ? "bg-black dark:bg-white" : log.initial ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"
            )}></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold dark:text-white leading-tight">{log.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{log.desc}</p>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap ml-4">{log.time}</span>
            </div>
            {log.type && (
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-900 text-[10px] font-bold text-gray-500 dark:text-gray-300 uppercase tracking-widest transition-all hover:bg-primary hover:text-black">
                  {log.type}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={onViewAllHistory}
        className="mt-auto w-full py-4 text-xs font-bold text-gray-400 hover:text-primary transition-all uppercase tracking-widest border-t border-gray-50 dark:border-gray-900"
      >
        View all history
      </button>
    </div>
  );
}
