"use client";

import DashboardLayout from "@/components/DashboardLayout";
import AuthGuard from "@/components/AuthGuard";
import {
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    Search,
    MoreHorizontal,
    Clock,
    MapPin,
    MessageSquare,
    BellRing,
    X
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";

const upcomingEvents = [
    { day: "12", month: "Oct", type: "Viewing", time: "10:00 AM", title: "Unit 4B Viewing", person: "Sarah Jenkins" },
    { day: "14", month: "Oct", type: "Open House", time: "02:00 PM", title: "The Lofts Open House", person: "General Public" },
    { day: "15", month: "Oct", type: "Meeting", time: "09:30 AM", title: "Lease Signing", person: "Michael Ross" },
];

const calendarDays = [
    { day: 29, current: false }, { day: 30, current: false },
    { day: 1, current: true }, { day: 2, current: true, event: "Viewing: Unit 8" },
    { day: 3, current: true }, { day: 4, current: true, event: "Open House: 2pm", dark: true },
    { day: 5, current: true }, { day: 6, current: true }, { day: 7, current: true },
    { day: 8, current: true, events: ["Viewing: Unit 12", "Check-out"] },
    { day: 9, current: true, active: true, event: "Viewing: Unit 4B" },
    { day: 10, current: true }, { day: 11, current: true },
    { day: 12, current: true, event: "Inspection", blue: true },
    { day: 13, current: true },
    { day: 14, current: true, event: "Open House", dark: true },
    { day: 15, current: true }, { day: 16, current: true }, { day: 17, current: true }, { day: 18, current: true }, { day: 19, current: true }, { day: 20, current: true }, { day: 21, current: true }
];

export default function CalendarPage() {
    const { showToast, user } = useStore();

    return (
        <AuthGuard>
            <DashboardLayout>
            <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)] min-h-[600px]">
                {/* Left Sidebar - Meta */}
                <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar">
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">October 2023</h3>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => {
                                        try {
                                            showToast("Showing previous month");
                                        } catch (error) {
                                            console.error('Failed to navigate to previous month:', error);
                                            showToast("Failed to change month");
                                        }
                                    }}
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => {
                                        try {
                                            showToast("Showing next month");
                                        } catch (error) {
                                            console.error('Failed to navigate to next month:', error);
                                            showToast("Failed to change month");
                                        }
                                    }}
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
                                <div key={i} className="flex items-start gap-4 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
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

                {/* Main Calendar Grid */}
                <section className="col-span-12 lg:col-span-6 flex flex-col gap-6 h-full">
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

                    <div className="flex-1 bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold dark:text-white">October 2023</h2>
                            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                                <button
                                    onClick={() => showToast("Switched to Month view")}
                                    className="px-4 py-1.5 bg-white dark:bg-surface-dark shadow-sm rounded-lg text-xs font-bold"
                                >
                                    Month
                                </button>
                                <button
                                    onClick={() => showToast("Switched to Week view")}
                                    className="px-4 py-1.5 text-gray-500 dark:text-gray-400 text-xs font-bold hover:text-black dark:hover:text-white transition-colors"
                                >
                                    Week
                                </button>
                                <button
                                    onClick={() => showToast("Switched to Day view")}
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
                                    className={cn(
                                        "min-h-[90px] p-2 rounded-xl relative group transition-all border",
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
                </section>

                {/* Right Sidebar - Event Details */}
                <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6 h-full">
                    <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 flex flex-col h-full relative overflow-hidden">
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="font-bold text-lg dark:text-white">Event Details</h3>
                            <button
                                onClick={() => showToast("Event panel closed")}
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
                                    onClick={() => showToast("Opening chat with Sarah Jenkins...")}
                                    className="ml-auto p-2 bg-white dark:bg-black rounded-full shadow-sm hover:text-primary transition-colors dark:text-white border border-gray-100 dark:border-gray-800"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-auto space-y-3">
                            <button
                                onClick={() => showToast("Reminder sent successfully")}
                                className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg active:scale-95"
                            >
                                <BellRing className="w-4 h-4" /> Send Reminder
                            </button>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => showToast("Opening reschedule calendar...")}
                                    className="flex-1 border border-gray-200 dark:border-gray-700 font-bold py-3.5 rounded-2xl text-xs hover:bg-gray-50 dark:hover:bg-gray-900 transition-all active:scale-95"
                                >
                                    Reschedule
                                </button>
                                <button
                                    onClick={() => showToast("Are you sure you want to cancel?")}
                                    className="flex-1 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 font-bold py-3.5 rounded-2xl text-xs hover:bg-red-50 dark:hover:bg-red-900/10 transition-all active:scale-95"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
            </DashboardLayout>
        </AuthGuard>
    );
}
