"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { upcomingEvents, type CalendarEvent } from "../data/mockCalendarData";

interface CalendarSidebarProps {
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onEventClick: (event: CalendarEvent) => void;
}

export function CalendarSidebar({ onPreviousMonth, onNextMonth, onEventClick }: CalendarSidebarProps) {
  return (
    <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">October 2023</h3>
          <div className="flex gap-1">
            <button
              onClick={onPreviousMonth}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNextMonth}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-[10px] text-gray-400 mb-2 font-bold uppercase">
          <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium">
          {[29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((d, i) => (
            <span
              key={i}
              className={cn(
                "w-7 h-7 flex items-center justify-center mx-auto rounded-full transition-colors",
                d === 9 ? "bg-black text-white dark:bg-primary dark:text-black font-bold" :
                  d < 1 && d > 28 ? "text-gray-300 dark:text-gray-600" : ""
              )}
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-y-auto">
        <h3 className="font-semibold mb-6 flex justify-between items-center">
          Upcoming Events
          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">4</span>
        </h3>
        <div className="space-y-6">
          {upcomingEvents.map((event, i) => (
            <div 
              key={i} 
              className="flex items-start gap-4 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 p-2 -mx-2 rounded-lg transition-colors"
              onClick={() => onEventClick(event)}
            >
              <div className="flex flex-col items-center min-w-[3.5rem] bg-gray-50 dark:bg-gray-900 rounded-xl p-2">
                <span className="text-[10px] text-gray-400 font-bold uppercase">{event.month}</span>
                <span className="text-xl font-bold">{event.day}</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full",
                    event.type === "Viewing" ? "bg-primary text-black" :
                      event.type === "Open House" ? "bg-black dark:bg-white text-white dark:text-black" :
                        "bg-blue-100 text-blue-700"
                  )}>
                    {event.type}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">{event.time}</span>
                </div>
                <h4 className="text-sm font-bold">{event.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{event.person}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
