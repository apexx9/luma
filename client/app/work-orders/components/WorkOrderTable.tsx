"use client";

import { cn } from "@/lib/utils";
import { Search, Building2, User, MoreHorizontal, Eye, Edit, UserPlus, Trash2, ChevronRight, Calendar } from "lucide-react";
import { Dropdown, DropdownItem, DropdownDivider } from "@/components/Dropdown";

interface WorkOrder {
  id: string;
  title: string;
  priority: string;
  status: string;
  issued: string;
  building: string;
  unit: string;
  assignedTo: string;
  type: string;
}

interface WorkOrderTableProps {
  workOrders: WorkOrder[];
  onViewDetails: (id: string) => void;
  onEditOrder: (id: string) => void;
  onAssignTechnician: (id: string) => void;
  onCancelRequest: (id: string) => void;
  onFilterByType: (type: string) => void;
  onSearch: (query: string) => void;
  onViewHistorical: () => void;
  onNextPage: () => void;
}

export function WorkOrderTable({
  workOrders,
  onViewDetails,
  onEditOrder,
  onAssignTechnician,
  onCancelRequest,
  onFilterByType,
  onSearch,
  onViewHistorical,
  onNextPage
}: WorkOrderTableProps) {
  return (
    <div className="bg-white dark:bg-surface-dark rounded-3xl shadow-soft border border-transparent dark:border-gray-800 overflow-hidden">
      <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-bold">Active Orders</h2>
          <div className="flex gap-2">
            <button
              onClick={() => onFilterByType("all")}
              className="px-3 py-1 bg-primary text-black text-[10px] font-bold rounded-full"
            >
              ALL
            </button>
            <button
              onClick={() => onFilterByType("plumbing")}
              className="px-3 py-1 bg-gray-50 dark:bg-gray-900 text-gray-400 text-[10px] font-bold rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              PLUMBING
            </button>
            <button
              onClick={() => onFilterByType("electrical")}
              className="px-3 py-1 bg-gray-50 dark:bg-gray-900 text-gray-400 text-[10px] font-bold rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              ELECTRICAL
            </button>
          </div>
        </div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Find orders by ID, user..."
            className="pl-10 pr-4 py-2 rounded-full bg-gray-50 dark:bg-black/50 border-none focus:ring-2 focus:ring-primary text-sm w-full md:w-64"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-black/20 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              <th className="px-8 py-4">Status & Priority</th>
              <th className="px-8 py-4">Title & ID</th>
              <th className="px-8 py-4">Location</th>
              <th className="px-8 py-4">Assigned To</th>
              <th className="px-8 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {workOrders.map((order) => (
              <tr key={order.id} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-2 h-2 rounded-full animate-pulse",
                      order.status === "In Progress" ? "bg-blue-500" :
                        order.status === "Pending" ? "bg-yellow-500" : "bg-green-500"
                    )}></div>
                    <div>
                      <p className="text-xs font-bold dark:text-gray-100">{order.status}</p>
                      <span className={cn(
                        "text-[10px] font-black uppercase",
                        order.priority === "High" ? "text-red-500" :
                          order.priority === "Medium" ? "text-yellow-500" : "text-gray-400"
                      )}>
                        {order.priority} PRIORITY
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <p className="font-bold text-sm dark:text-gray-100 group-hover:text-primary transition-colors">{order.title}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{order.id} \u2022 {order.type}</p>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                    <div>
                      <p className="text-xs font-bold dark:text-gray-200">{order.building}</p>
                      <p className="text-[10px] text-gray-400">{order.unit}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold dark:text-gray-200">{order.assignedTo}</p>
                      <p className="text-[10px] text-gray-400">{order.issued}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 px-2">
                    <Dropdown
                      trigger={
                        <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                      }
                    >
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 mb-2">
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Order Actions</p>
                      </div>
                      <DropdownItem icon={Eye} onClick={() => onViewDetails(order.id)}>View Details</DropdownItem>
                      <DropdownItem icon={Edit} onClick={() => onEditOrder(order.id)}>Edit Order</DropdownItem>
                      <DropdownItem icon={UserPlus} onClick={() => onAssignTechnician(order.id)}>Assign Technician</DropdownItem>
                      <DropdownDivider />
                      <DropdownItem icon={Trash2} variant="danger" onClick={() => onCancelRequest(order.id)}>Cancel Request</DropdownItem>
                    </Dropdown>
                    <button className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black opacity-0 group-hover:opacity-100 transition-all active:scale-90">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-8 bg-gray-50/50 dark:bg-black/20 flex items-center justify-between">
        <button
          onClick={onViewHistorical}
          className="text-xs font-bold text-gray-400 hover:text-primary uppercase tracking-widest flex items-center gap-2"
        >
          View historical records
          <Calendar className="w-4 h-4" />
        </button>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-800 text-xs font-bold disabled:opacity-30" disabled>Previous</button>
          <button
            onClick={onNextPage}
            className="px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-800 text-xs font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
