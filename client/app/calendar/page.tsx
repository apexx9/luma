"use client";

import DashboardLayout from "@/components/DashboardLayout";
import AuthGuard from "@/components/AuthGuard";
import { useStore } from "@/store";

import { CalendarSidebar } from "./components/CalendarSidebar";
import { CalendarStats } from "./components/CalendarStats";
import { CalendarGrid } from "./components/CalendarGrid";
import { EventDetails } from "./components/EventDetails";
import { type CalendarDay, type CalendarEvent } from "./data/mockCalendarData";

export default function CalendarPage() {
    const { showToast, user } = useStore();

    return (
        <AuthGuard>
            <DashboardLayout>
                <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)] min-h-[600px]">
                    {/* Left Sidebar - Meta */}
                    <CalendarSidebar
                        onPreviousMonth={() => {
                            try {
                                showToast("Showing previous month");
                            } catch (error) {
                                console.error('Failed to navigate to previous month:', error);
                                showToast("Failed to change month");
                            }
                        }}
                        onNextMonth={() => {
                            try {
                                showToast("Showing next month");
                            } catch (error) {
                                console.error('Failed to navigate to next month:', error);
                                showToast("Failed to change month");
                            }
                        }}
                        onEventClick={(event: CalendarEvent) => showToast(`Opening event: ${event.title}`)}
                    />

                    {/* Main Calendar Grid */}
                    <section className="col-span-12 lg:col-span-6 flex flex-col gap-6 h-full">
                        <CalendarStats />
                        <CalendarGrid
                            onViewChange={(view: string) => showToast(`Switched to ${view} view`)}
                            onDayClick={(day: CalendarDay) => {
                                if (day.event) {
                                    showToast(`Selected day ${day.day} with event: ${day.event}`);
                                } else {
                                    showToast(`Selected day ${day.day}`);
                                }
                            }}
                        />
                    </section>

                    {/* Right Sidebar - Event Details */}
                    <EventDetails
                        onClose={() => showToast("Event panel closed")}
                        onSendReminder={() => showToast("Reminder sent successfully")}
                        onReschedule={() => showToast("Opening reschedule calendar...")}
                        onCancel={() => showToast("Are you sure you want to cancel?")}
                        onOpenChat={() => showToast("Opening chat with Sarah Jenkins...")}
                    />
                </div>
            </DashboardLayout>
        </AuthGuard>
    );
}
