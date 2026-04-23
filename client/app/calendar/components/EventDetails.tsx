"use client";

import Image from "next/image";
import { X, Clock, MapPin, MessageSquare, BellRing } from "lucide-react";

interface EventDetailsProps {
  onClose: () => void;
  onSendReminder: () => void;
  onReschedule: () => void;
  onCancel: () => void;
  onOpenChat: () => void;
}

export function EventDetails({ onClose, onSendReminder, onReschedule, onCancel, onOpenChat }: EventDetailsProps) {
  return (
    <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6 h-full">
      <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 flex flex-col h-full relative overflow-hidden">
        <div className="flex justify-between items-start mb-8">
          <h3 className="font-bold text-lg dark:text-white">Event Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-8">
          <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded-full mb-3 inline-block">Viewing Confirmed</span>
          <h2 className="text-2xl font-bold leading-tight dark:text-white mt-1">Unit 4B Viewing</h2>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-4 text-xs font-medium">
            <Clock className="w-4 h-4" /> Oct 09, 10:00 - 11:00 AM
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-2 text-xs font-medium">
            <MapPin className="w-4 h-4" /> 123 Main St, Apt 4B
          </div>
        </div>

        <div className="aspect-video w-full rounded-2xl overflow-hidden mb-8 relative border border-gray-100 dark:border-gray-800 shadow-sm">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrHDL89bjbz4V82aPp4hubWdNvmZ4JuUZJyf6p2ay50UKPmhPfVpYhgUBDmcpsvFy7ZuSabWthJtAW2sotGJtJF-AImRE9InJBQmoo9zpIYD6mcw9vUfL_vhNQm-kztWOW3IL0sfw7JKUVFblYUilU_znfpTp6IjjzoymTAN9qwPSq0r447apiMgooJHSj_K7CzPvV-pturD7qUd4x3P15P-OY4hoGR0EqiLYTQ3ENVZwKdY2x0od_CAqrYdv2XWLd6DNEPinEyBs"
            alt="Property"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-md text-[10px] font-bold">
            $2,450 / mo
          </div>
        </div>

        <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Lead Information</h4>
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGXYvjOgOZIkTDQjZu77kmpYPoULnrY8RG_T4sDqmF4rc67YHgvrOdg5O_UZcMvL6bDAQMRM7BLh8ZP5rmkDor0m3Ticap5fB9GSSx1s-evazUfhjej4F6WWysd4r1UtwIsWrP5HU6pcBVgNK3M8_NhYmOYPxo56oq_UQAGy0vnnFS5iSt5pWwgiLJ6gKNVyEapkBXOAoJYm_C_azP1ocLmBjCn1kr0SlZBoYzwtvjL-oN_9b15Ylh2fImr_cdKi2rlHyy78n9XCs"
                alt="Sarah"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <p className="font-bold text-sm dark:text-white">Sarah Jenkins</p>
              <p className="text-[10px] text-gray-500 font-medium">Looking for 2 Bed / 1 Bath</p>
            </div>
            <button
              onClick={onOpenChat}
              className="ml-auto p-2 bg-white dark:bg-black rounded-full shadow-sm hover:text-primary transition-colors dark:text-white border border-gray-100 dark:border-gray-800"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-auto space-y-3">
          <button
            onClick={onSendReminder}
            className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg active:scale-95"
          >
            <BellRing className="w-4 h-4" /> Send Reminder
          </button>
          <div className="flex gap-3">
            <button
              onClick={onReschedule}
              className="flex-1 border border-gray-200 dark:border-gray-700 font-bold py-3.5 rounded-2xl text-xs hover:bg-gray-50 dark:hover:bg-gray-900 transition-all active:scale-95"
            >
              Reschedule
            </button>
            <button
              onClick={onCancel}
              className="flex-1 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 font-bold py-3.5 rounded-2xl text-xs hover:bg-red-50 dark:hover:bg-red-900/10 transition-all active:scale-95"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
