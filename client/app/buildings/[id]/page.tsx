"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  MoreHorizontal,
  Home,
  BarChart3,
  Search,
  MessageCircle,
  User,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  DollarSign
} from "lucide-react";

import { getBuilding, getBuildingStats, getBuildingUnits } from "@/actions/buildings.api";
import { Building, BuildingStats, Unit } from "@/types/building.types";
import { Dropdown, DropdownItem, DropdownDivider } from "@/components/Dropdown";
import { ActionButton } from "@/components/ActionComponents";
import { useStore } from "@/store/useStore";
import BrandLoader from "@/components/BrandLoader";

export default function BuildingDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { showToast, showError } = useStore();

  const [building, setBuilding] = useState<Building | null>(null);
  const [stats, setStats] = useState<BuildingStats | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [b, s, u] = await Promise.all([
          getBuilding(id as string),
          getBuildingStats(id as string),
          getBuildingUnits(id as string)
        ]);
        
        console.log('Building data:', b);
        console.log('Stats data:', s);
        console.log('Units data:', u);
        
        setBuilding(b);
        setStats(s);
        setUnits(u);
      } catch (error) {
        console.error('Data retrieval error:', error);
        showError("Data retrieval failed");
      } finally {
        setLoading(false);
      }
    };
    if (id) loadData();
  }, [id, showError]);

  if (loading) return <BrandLoader />;
  if (!building) return null;

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-12">
        
        {/* ARCHITECTURAL HEADER */}
        <header className="flex flex-col lg:flex-row gap-12 items-end justify-between">
          <div className="flex-1 space-y-6">
            <button 
              onClick={() => router.back()}
              className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Portfolio
            </button>
            
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 rounded-full border border-black dark:border-white text-[10px] font-black uppercase tracking-tighter">
                  {building.status}
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  ID: {building.id}
                </span>
              </div>
              <h1 className="text-6xl font-black tracking-tighter dark:text-white leading-none">
                {building.name}
              </h1>
              <div className="flex items-center gap-2 mt-4 text-gray-500 font-medium">
                <MapPin className="w-4 h-4" />
                <p className="text-sm">{building.address}, {building.city}</p>
              </div>
            </div>
          </div>

          <div className="relative w-full lg:w-[400px] h-[240px] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
            <Image 
              src={building.imageUrl || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000"} 
              alt={building.name} 
              fill 
              className="object-cover" 
              unoptimized
            />
          </div>
        </header>

        {/* GHOST TABS */}
        <nav className="flex gap-10 border-b border-gray-100 dark:border-gray-800">
          {["overview", "units", "financials", "settings"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "pb-4 text-xs font-black uppercase tracking-widest transition-all relative",
                tab === t ? "text-black dark:text-white" : "text-gray-400 hover:text-gray-600"
              )}
            >
              {t}
              {tab === t && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black dark:bg-white" />}
            </button>
          ))}
        </nav>

        {/* CONTENT SECTIONS */}
        <main className="space-y-16">
          {tab === "overview" && <OverviewGrid stats={stats} building={building} />}
          {tab === "units" && <UnitsList units={units} showToast={showToast} />}
          {tab === "financials" && <BalanceSheet stats={stats} building={building} />}
          {tab === "settings" && <SettingsTab building={building} showToast={showToast} />}
        </main>
      </div>
    </DashboardLayout>
  );
}

/* --- SUB-COMPONENTS --- */

function OverviewGrid({ stats, building }: { stats: BuildingStats | null; building: Building }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100 dark:divide-gray-800 border-y border-gray-100 dark:border-gray-800 py-10">
      <GhostStat label="Occupancy" value={stats?.occupancyRate ? `${stats.occupancyRate}%` : "0%"} trend="+2.4%" positive />
      <GhostStat label="Total Revenue" value={stats?.revenue ? `$${stats.revenue.toLocaleString()}` : "$0"} sub="Monthly" />
      <GhostStat label="Net Income" value={stats?.net ? `$${stats.net.toLocaleString()}` : "$0"} trend="+8.1%" positive />
      <GhostStat label="Active Units" value={building.totalUnits || 0} sub={`of ${building.totalUnits || 0}`} />
    </div>
  );
}

function GhostStat({ label, value, trend, positive, sub }: any) {
  return (
    <div className="px-8 first:pl-0 last:pr-0 space-y-2">
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-4xl font-bold dark:text-white tracking-tighter">{value}</h3>
        {trend && (
          <span className={cn("text-[10px] font-bold", positive ? "text-primary" : "text-red-500")}>
            {trend}
          </span>
        )}
      </div>
      {sub && <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{sub}</p>}
    </div>
  );
}

function UnitsList({ units, showToast }: { units: Unit[]; showToast: (message: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black tracking-tighter">Inventory Details</h2>
        <ActionButton className="rounded-none px-10">Add Unit</ActionButton>
      </div>
      <div className="overflow-hidden border border-gray-100 dark:border-gray-800 rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-gray-800 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <th className="px-8 py-4">Unit Designation</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4">Current Tenant</th>
              <th className="px-8 py-4">Rental Yield</th>
              <th className="px-8 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {units.map((unit: Unit) => (
              <tr key={unit.id} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-8 py-6 font-bold text-sm tracking-tight">{unit.name || "Unknown Unit"}</td>
                <td className="px-8 py-6">
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border",
                    unit.status === "occupied" ? "border-primary text-primary" : "border-gray-300 text-gray-400"
                  )}>
                    {unit.status || "vacant"}
                  </span>
                </td>
                <td className="px-8 py-6 text-sm font-medium text-gray-500">{unit.tenant || "—"}</td>
                <td className="px-8 py-6 font-bold text-sm">${unit.rent ? unit.rent.toLocaleString() : "0"}</td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BalanceSheet({ stats, building }: { stats: BuildingStats | null; building: Building }) {
  if (!stats) {
    return <div className="text-center text-gray-500">Loading financial data...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
      <div className="space-y-8">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] border-b border-black dark:border-white pb-2">Revenue Streams</h3>
        <LineItem label="Residential Units" value={(stats.revenue || 0) * 0.7} />
        <LineItem label="Commercial Space" value={(stats.revenue || 0) * 0.3} />
        <LineItem label="Total Gross Income" value={stats.revenue || 0} bold />
      </div>
      <div className="space-y-8">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] border-b border-black dark:border-white pb-2">Operational Outflow</h3>
        <LineItem label="Property Tax" value={building.propertyTax || 0} />
        <LineItem label="Insurance Policy" value={building.insurance || 0} />
        <LineItem label="Maintenance Fund" value={(stats.expenses || 0) * 0.3} />
        <LineItem label="Total Operational Expense" value={stats.expenses || 0} bold />
      </div>
    </div>
  );
}

function LineItem({ label, value, bold }: { label: string; value: number; bold?: boolean }) {
  return (
    <div className={cn("flex justify-between items-end", bold ? "pt-4" : "")}>
      <span className={cn("text-xs uppercase tracking-widest", bold ? "font-black" : "text-gray-400")}>{label}</span>
      <div className="flex-1 border-b border-dotted border-gray-200 dark:border-gray-800 mx-4 mb-1" />
      <span className={cn("text-sm", bold ? "font-black text-primary" : "font-bold")}>
        ${(value || 0).toLocaleString()}
      </span>
    </div>
  );
}

function SettingsTab({ building, showToast }: { building: Building; showToast: (message: string) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Building>(building);

  const handleSave = async () => {
    try {
      // TODO: Implement actual API call to update building
      // await updateBuilding(building.id, formData);
      showToast("Building updated successfully");
      setIsEditing(false);
    } catch (error) {
      showToast("Failed to update building");
    }
  };

  const handleCancel = () => {
    setFormData(building);
    setIsEditing(false);
  };

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black tracking-tighter">Building Settings</h2>
        <div className="flex gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-medium text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-medium text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Edit Building
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Basic Information */}
        <div className="space-y-8">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] border-b border-black dark:border-white pb-2">Basic Information</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Building Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              ) : (
                <p className="text-base font-medium">{building.name}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Status</label>
              {isEditing ? (
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                >
                  <option value="active">Active</option>
                  <option value="maintenance">Under Maintenance</option>
                  <option value="inactive">Inactive</option>
                </select>
              ) : (
                <span className="inline-block px-3 py-1 rounded-full border border-black dark:border-white text-[10px] font-black uppercase tracking-tighter">
                  {building.status}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Building Type</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.buildingType || ''}
                  onChange={(e) => setFormData({ ...formData, buildingType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              ) : (
                <p className="text-base font-medium">{building.buildingType || "Not specified"}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Year Built</label>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.yearBuilt || ''}
                  onChange={(e) => setFormData({ ...formData, yearBuilt: parseInt(e.target.value) || undefined })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              ) : (
                <p className="text-base font-medium">{building.yearBuilt || "Not specified"}</p>
              )}
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="space-y-8">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] border-b border-black dark:border-white pb-2">Location Information</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Street Address</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              ) : (
                <p className="text-base font-medium">{building.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">City</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                ) : (
                  <p className="text-base font-medium">{building.city}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">State</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.state || ''}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                ) : (
                  <p className="text-base font-medium">{building.state || "Not specified"}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">ZIP Code</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.zipCode || ''}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                ) : (
                  <p className="text-base font-medium">{building.zipCode || "Not specified"}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Country</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.country || ''}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                ) : (
                  <p className="text-base font-medium">{building.country || "Not specified"}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Information */}
      <div className="space-y-8">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] border-b border-black dark:border-white pb-2">Financial Information</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Annual Property Tax</label>
            {isEditing ? (
              <input
                type="number"
                value={formData.propertyTax || ''}
                onChange={(e) => setFormData({ ...formData, propertyTax: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            ) : (
              <p className="text-base font-medium">${building.propertyTax?.toLocaleString() || "0"}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Annual Insurance</label>
            {isEditing ? (
              <input
                type="number"
                value={formData.insurance || ''}
                onChange={(e) => setFormData({ ...formData, insurance: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            ) : (
              <p className="text-base font-medium">${building.insurance?.toLocaleString() || "0"}</p>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-8">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] border-b border-black dark:border-white pb-2">Contact Information</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Manager Name</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.managerName || ''}
                onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            ) : (
              <p className="text-base font-medium">{building.managerName || "Not specified"}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Contact Email</label>
            {isEditing ? (
              <input
                type="email"
                value={formData.contactEmail || ''}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            ) : (
              <p className="text-base font-medium">{building.contactEmail || "Not specified"}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Contact Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={formData.contactPhone || ''}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            ) : (
              <p className="text-base font-medium">{building.contactPhone || "Not specified"}</p>
            )}
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border border-red-200 dark:border-red-800 rounded-lg p-6 bg-red-50 dark:bg-red-950/20">
        <h3 className="text-xs font-black uppercase tracking-widest text-red-600 dark:text-red-400 mb-4">Danger Zone</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Irreversible and destructive actions. Please be careful.
        </p>
        <div className="flex gap-4">
          <button className="px-4 py-2 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 font-medium text-sm hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
            Delete Building
          </button>
        </div>
      </div>
    </div>
  );
}