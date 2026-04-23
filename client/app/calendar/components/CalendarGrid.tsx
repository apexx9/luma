"use client";

import { cn } from "@/lib/utils";
import { calendarDays, type CalendarDay } from "../data/mockCalendarData";

interface CalendarGridProps {
  onViewChange: (view: string) => void;
  onDayClick: (day: CalendarDay) => void;
}

export function CalendarGrid({ onViewChange, onDayClick }: CalendarGridProps) {
  return (
    <div className="flex-1 bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold dark:text-white">October 2023</h2>
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          <button
            onClick={() => onViewChange("Month")}
            className="px-4 py-1.5 bg-white dark:bg-surface-dark shadow-sm rounded-lg text-xs font-bold"
          >
            Month
          </button>
          <button
            onClick={() => onViewChange("Week")}
            className="px-4 py-1.5 text-gray-500 dark:text-gray-400 text-xs font-bold hover:text-black dark:hover:text-white transition-colors"
          >
            Week
          </button>
          <button
            onClick={() => onViewChange("Day")}
            className="px-4 py-1.5 text-gray-500 dark:text-gray-400 text-xs font-bold hover:text-black dark:hover:text-white transition-colors"
          >
            Day
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-4 border-b border-gray-100 dark:border-gray-800 pb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-gray-400 text-[10px] font-bold uppercase text-center">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 flex-1 gap-1">
        {calendarDays.map((d, i) => (
          <div
            key={i}
            onClick={() => onDayClick(d)}
            className={cn(
              "min-h-[90px] p-2 rounded-xl relative group transition-all border cursor-pointer",
              d.active ? "border-2 border-primary bg-primary/5" : "border-gray-50 dark:border-gray-900 bg-gray-50/30 dark:bg-[#1f1f22]/50 hover:border-primary/50",
              !d.current && "opacity-30"
            )}
          >
            <span className={cn("text-xs font-bold", d.active ? "text-primary" : "dark:text-gray-400")}>{d.day}</span>
            {d.event && (
              <div className={cn(
                "text-[9px] font-bold px-1.5 py-1 rounded-md mt-1 truncate shadow-sm",
                d.active ? "bg-primary text-black" :
                  d.dark ? "bg-black dark:bg-white text-white dark:text-black" :
                    d.blue ? "bg-blue-100 text-blue-800" :
                      "bg-primary/20 text-primary"
              )}>
                {d.event}
              </div>
            )}
            {d.events && d.events.map((e, ei) => (
              <div key={ei} className="text-[9px] font-bold px-1.5 py-1 rounded-md mt-1 truncate bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                {e}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
