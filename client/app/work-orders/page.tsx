"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useStore } from "@/store";

import { WorkOrdersHeader } from "./components/WorkOrdersHeader";
import { WorkOrdersStats } from "./components/WorkOrdersStats";
import { WorkOrderTable } from "./components/WorkOrderTable";
import { WorkOrderModal } from "./components/WorkOrderModal";
import { mockWorkOrders, type WorkOrder } from "./data/mockWorkOrders";

export default function WorkOrdersPage() {
    const { showToast } = useStore();
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                {/* Header Section */}
                <WorkOrdersHeader
                    onFilter={() => showToast("Filtering work orders...")}
                    onNewRequest={() => setIsRequestModalOpen(true)}
                />

                {/* Status Overview Cards */}
                <WorkOrdersStats />

                {/* Work Orders List */}
                <WorkOrderTable
                    workOrders={mockWorkOrders}
                    onViewDetails={(id) => showToast(`Viewing details for ${id}...`)}
                    onEditOrder={(id) => showToast(`Editing order ${id}...`)}
                    onAssignTechnician={(id) => showToast(`Assigning technician to ${id}...`)}
                    onCancelRequest={(id) => showToast(`Cancelling order ${id}...`)}
                    onFilterByType={(type) => showToast(`Filtering by ${type}...`)}
                    onSearch={(query) => console.log("Searching:", query)}
                    onViewHistorical={() => showToast("Opening historical records archive...")}
                    onNextPage={() => showToast("Loading next page of work orders...")}
                />

                <WorkOrderModal
                    isOpen={isRequestModalOpen}
                    onClose={() => setIsRequestModalOpen(false)}
                    onSubmit={(data) => {
                        console.log("New work order:", data);
                        setIsRequestModalOpen(false);
                        showToast("Maintenance request submitted successfully!");
                    }}
                />
            </div>
        </DashboardLayout>
    );
}
