"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useStore } from "@/store";

import { LeadProfile } from "./components/LeadProfile";
import { LeadQuickActions } from "./components/LeadQuickActions";
import { LeadStats } from "./components/LeadStats";
import { ActivityLog } from "./components/ActivityLog";
import { PropertyMatches } from "./components/PropertyMatches";
import { PriceTrendChart } from "./components/PriceTrendChart";
import { LeadModals } from "./components/LeadModals";

export default function LeadDetailsPage() {
    const { toggleDarkMode, showToast } = useStore();
    const [isViewingModalOpen, setIsViewingModalOpen] = useState(false);
    const [isContractModalOpen, setIsContractModalOpen] = useState(false);

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                {/* Custom Page Header */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-6">
                        <h1 className="text-3xl font-bold dark:text-white tracking-tight">Lead Details</h1>
                        <span className="px-4 py-1.5 text-[10px] font-bold bg-primary text-black rounded-full shadow-glow font-inter">ACTIVE DEAL</span>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    {/* Lead Profile Sidebar */}
                    <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
                        <LeadProfile
                            onEdit={() => showToast("Editing lead details...")}
                            onArchive={() => showToast("Archiving lead...")}
                            onMessage={() => showToast("Opening chat with Devon Lindsay...")}
                        />
                        <LeadQuickActions
                            onScheduleViewing={() => setIsViewingModalOpen(true)}
                            onCreateContract={() => setIsContractModalOpen(true)}
                        />
                    </div>

                    {/* Middle Content */}
                    <div className="col-span-12 lg:col-span-9 flex flex-col gap-8">
                        {/* Top Stats Grid */}
                        <LeadStats />

                        {/* Activity and Matches Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <ActivityLog
                                onFilter={() => showToast("Filtering activity log")}
                                onViewAllHistory={() => showToast("Viewing full activity history...")}
                            />
                            <PropertyMatches
                                onFetchMore={() => showToast("Fetching more property matches...")}
                            />
                        </div>

                        {/* Price Interest Trend Chart */}
                        <PriceTrendChart />
                    </div>
                </div>
            </div>

            <LeadModals
              isViewingModalOpen={isViewingModalOpen}
              setIsViewingModalOpen={setIsViewingModalOpen}
              isContractModalOpen={isContractModalOpen}
              setIsContractModalOpen={setIsContractModalOpen}
              onScheduleViewing={() => { setIsViewingModalOpen(false); showToast("Viewing scheduled for Devon Lindsay"); }}
              onGenerateContract={() => { setIsContractModalOpen(false); showToast("Contract PDF generated and sent to lead"); }}
            />
        </DashboardLayout>
    );
}
