"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import AuthGuard from "@/components/AuthGuard";
import { cn } from "@/lib/utils";

import {
  ArrowLeft,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Settings,
  Home,
  BarChart3
} from "lucide-react";

import {
  getBuilding,
  getBuildingStats,
  getBuildingUnits,
  updateBuildingStatus
} from "@/actions/buildings.api";

import { Dropdown, DropdownItem } from "@/components/Dropdown";
import { ActionButton } from "@/components/ActionComponents";
import { useStore } from "@/store/useStore";

type Tab = "overview" | "units" | "financials" | "settings";

interface Building {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
  type: string;
  totalUnits: number;
  yearBuilt?: number;
  squareFootage?: number;
  numberOfFloors?: number;
  purchasePrice?: number;
  monthlyRent?: number;
  propertyTax?: number;
  insurance?: number;
  status: string;
  managerId?: number;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface BuildingStats {
  occupiedUnits: number;
  vacantUnits: number;
  revenue: number;
  expenses: number;
  net: number;
  occupancyRate: number;
}

interface Unit {
  id: number;
  name: string;
  status: string;
  tenant?: string;
  rent: number;
  squareFootage?: number;
}

export default function BuildingDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { showToast } = useStore();

  const [building, setBuilding] = useState<Building | null>(null);
  const [stats, setStats] = useState<BuildingStats | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [tab, setTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);

      const [b, s, u] = await Promise.all([
        getBuilding(id as string),
        getBuildingStats(id as string),
        getBuildingUnits(id as string)
      ]);

      setBuilding(b as Building);
      setStats(s as BuildingStats);
      setUnits(u as Unit[]);
    } catch (error) {
      console.error('Failed to load building data:', error);
      showToast("Failed to load building");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  const handleStatusChange = async (status: string) => {
    try {
      await updateBuildingStatus(id as string, status);
      showToast("Status updated");
      loadData();
    } catch (error) {
      console.error('Failed to update status:', error);
      showToast("Failed to update status");
    }
  };

  if (loading) return (
    <DashboardLayout>
      <div className="p-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-gray-500 mt-4 text-center">Loading building data...</p>
      </div>
    </DashboardLayout>
  );
  
  if (!building) return (
    <DashboardLayout>
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-4">Building not found</h2>
        <ActionButton onClick={() => router.back()}>Go Back</ActionButton>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">

          {/* HEADER */}
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 dark:hover:bg-black/40 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div>
                <h1 className="text-2xl font-bold">{building.name}</h1>
                <p className="text-sm text-gray-500">
                  {building.city}, {building.state}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">

              {/* STATUS */}
              <Dropdown
                trigger={
                  <button className={cn(
                    "px-3 py-1.5 rounded-lg border text-sm font-medium flex items-center gap-2",
                    building.status === "active" ? "border-green-200 text-green-700 bg-green-50" :
                    building.status === "maintenance" ? "border-yellow-200 text-yellow-700 bg-yellow-50" :
                    "border-red-200 text-red-700 bg-red-50"
                  )}>
                    {building.status === "active" && <CheckCircle2 className="w-4 h-4" />}
                    {building.status === "maintenance" && <AlertCircle className="w-4 h-4" />}
                    {building.status === "inactive" && <AlertCircle className="w-4 h-4" />}
                    {building.status}
                  </button>
                }
              >
                {["active", "maintenance", "inactive"].map((s) => (
                  <DropdownItem key={s} onClick={() => handleStatusChange(s)}>
                    {s}
                  </DropdownItem>
                ))}
              </Dropdown>

              <ActionButton variant="outline">
                Edit
              </ActionButton>

              <ActionButton>
                Add Unit
              </ActionButton>
            </div>
          </div>

          {/* TABS */}
          <div className="flex gap-8 border-b border-gray-200 dark:border-gray-800">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "units", label: "Units", icon: Home },
              { id: "financials", label: "Financials", icon: DollarSign },
              { id: "settings", label: "Settings", icon: Settings }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as Tab)}
                className={cn(
                  "flex items-center gap-2 pb-3 px-1 border-b-2 text-sm font-medium transition-colors",
                  tab === t.id
                    ? "border-black dark:border-white text-black dark:text-white"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                )}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
          </div>

          {/* CONTENT */}
          {tab === "overview" && (
            <Overview stats={stats} building={building} />
          )}

          {tab === "units" && <UnitsTable units={units} buildingId={building.id} />}

          {tab === "financials" && (
            <Financials stats={stats} building={building} />
          )}

          {tab === "settings" && (
            <div className="text-sm text-gray-500 p-8 text-center">
              Settings coming soon
            </div>
          )}
        </div>
      </DashboardLayout>
  );
}

// ===== COMPONENTS =====

function Overview({ stats, building }: { stats: BuildingStats | null; building: Building }) {
  return (
    <div className="space-y-6">

      {/* KEY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat 
          label="Total Units" 
          value={building.totalUnits.toLocaleString()} 
          icon={<Home className="w-4 h-4" />}
        />
        <Stat 
          label="Occupied" 
          value={stats?.occupiedUnits?.toLocaleString() || "0"} 
          icon={<Users className="w-4 h-4" />}
          trend="+2.3%"
        />
        <Stat 
          label="Vacant" 
          value={stats?.vacantUnits?.toLocaleString() || "0"} 
          icon={<Home className="w-4 h-4" />}
          trend="-1.2%"
        />
        <Stat 
          label="Occupancy Rate" 
          value={`${stats?.occupancyRate || 0}%`}
          icon={<TrendingUp className="w-4 h-4" />}
          trend="+0.8%"
        />
      </div>

      {/* FINANCIAL METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat 
          label="Monthly Revenue" 
          value={`$${stats?.revenue?.toLocaleString() || "0"}`}
          icon={<DollarSign className="w-4 h-4" />}
          trend="+5.2%"
          positive
        />
        <Stat 
          label="Monthly Expenses" 
          value={`$${stats?.expenses?.toLocaleString() || "0"}`}
          icon={<DollarSign className="w-4 h-4" />}
          trend="+2.1%"
        />
        <Stat 
          label="Net Income" 
          value={`$${stats?.net?.toLocaleString() || "0"}`}
          icon={<TrendingUp className="w-4 h-4" />}
          trend="+8.4%"
          positive
        />
      </div>

      {/* BUILDING INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Property Details
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Type</span>
              <span className="font-medium">{building.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span className="font-medium capitalize">{building.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Address</span>
              <span className="font-medium">{building.address}</span>
            </div>
          </div>
        </div>

        <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Financial Summary
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Property Tax</span>
              <span className="font-medium">${building.propertyTax?.toLocaleString() || "0"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Insurance</span>
              <span className="font-medium">${building.insurance?.toLocaleString() || "0"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Net Income</span>
              <span className="font-medium text-green-600">+${stats?.net?.toLocaleString() || "0"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ 
  label, 
  value, 
  icon, 
  trend, 
  positive 
}: { 
  label: string; 
  value: string; 
  icon?: React.ReactNode;
  trend?: string;
  positive?: boolean;
}) {
  return (
    <div className="p-5 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#1f1f22]">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{label}</p>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
      {trend && (
        <p className={cn(
          "text-xs mt-1 font-medium",
          positive ? "text-green-600" : "text-red-600"
        )}>
          {trend}
        </p>
      )}
    </div>
  );
}

function UnitsTable({ units, buildingId }: { units: Unit[]; buildingId: number }) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black/40">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Units ({units.length})</h3>
          <ActionButton size="sm">Add Unit</ActionButton>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-black/40 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300">Unit</th>
              <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300">Status</th>
              <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300">Tenant</th>
              <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300">Rent</th>
              <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300">Size</th>
              <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300">Actions</th>
            </tr>
          </thead>

          <tbody>
            {units.map((unit) => (
              <tr key={unit.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-black/30 transition-colors">
                <td className="p-3 font-medium">{unit.name}</td>
                <td className="p-3">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    unit.status === "occupied" ? "bg-green-100 text-green-700" :
                    unit.status === "vacant" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-700"
                  )}>
                    {unit.status}
                  </span>
                </td>
                <td className="p-3 text-gray-600 dark:text-gray-400">
                  {unit.tenant || "-"}
                </td>
                <td className="p-3 font-medium">${unit.rent.toLocaleString()}</td>
                <td className="p-3 text-gray-600 dark:text-gray-400">
                  {unit.squareFootage ? `${unit.squareFootage} sq ft` : "-"}
                </td>
                <td className="p-3">
                  <Dropdown
                    trigger={
                      <button className="p-1 hover:bg-gray-100 dark:hover:bg-black/40 rounded">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    }
                  >
                    <DropdownItem>Edit Unit</DropdownItem>
                    <DropdownItem>View Tenant</DropdownItem>
                    <DropdownItem>Update Status</DropdownItem>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {units.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <Home className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No units found</p>
          <ActionButton className="mt-4">Add First Unit</ActionButton>
        </div>
      )}
    </div>
  );
}

function Financials({ stats, building }: { stats: BuildingStats | null; building: Building }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* INCOME */}
      <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-600" />
          Income
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <span className="text-sm font-medium">Total Rent</span>
            <span className="font-bold text-green-600">
              ${stats?.revenue?.toLocaleString() || "0"}
            </span>
          </div>
          <div className="text-xs text-gray-500 space-y-2">
            <div className="flex justify-between">
              <span>Residential Units</span>
              <span>${Math.floor((stats?.revenue || 0) * 0.7).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Commercial Units</span>
              <span>${Math.floor((stats?.revenue || 0) * 0.3).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* EXPENSES */}
      <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-red-600" />
          Expenses
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <span className="text-sm font-medium">Total Expenses</span>
            <span className="font-bold text-red-600">
              ${stats?.expenses?.toLocaleString() || "0"}
            </span>
          </div>
          <div className="text-xs text-gray-500 space-y-2">
            <div className="flex justify-between">
              <span>Property Tax</span>
              <span>${building.propertyTax?.toLocaleString() || "0"}</span>
            </div>
            <div className="flex justify-between">
              <span>Insurance</span>
              <span>${building.insurance?.toLocaleString() || "0"}</span>
            </div>
            <div className="flex justify-between">
              <span>Maintenance</span>
              <span>${Math.floor((stats?.expenses || 0) * 0.3).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="lg:col-span-2 p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <h3 className="font-semibold mb-4">Financial Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Gross Revenue</p>
            <p className="text-2xl font-bold">${stats?.revenue?.toLocaleString() || "0"}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600">${stats?.expenses?.toLocaleString() || "0"}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Net Income</p>
            <p className="text-2xl font-bold text-green-600">${stats?.net?.toLocaleString() || "0"}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Profit Margin</span>
            <span className="font-bold text-lg">
              {stats?.revenue ? Math.round((stats.net / stats.revenue) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
