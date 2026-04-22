"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Building2,
  MapPin,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  Search,
  Plus,
  Trash2,
  RefreshCw,
  Eye,
  Edit,
  Settings,
  ArrowUpRight
} from "lucide-react";

import { ActionButton } from "@/components/ActionComponents";
import { Dropdown, DropdownItem, DropdownDivider } from "@/components/Dropdown";
import { Modal } from "@/components/Modal";
import { StepForm } from "@/components/StepForm";
import BrandLoader from "@/components/BrandLoader";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";

import {
  getAllBuildings,
  createBuilding,
  updateBuildingStatus,
  deleteBuilding,
  bulkDeleteBuildings,
  searchBuildings
} from "@/actions/buildings.api";

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

export default function BuildingsPage() {
  const { isAuthenticated, showToast, showSuccess, showError, showWarning, showInfo } = useStore();
  const router = useRouter();

  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const [selected, setSelected] = useState<number[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState<Building | null>(null);

  // 🔥 Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // 🔥 Load Buildings
  const loadBuildings = async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      setLoading(true);
      let data: Building[];

      // If there's a search query, use search API
      if (debouncedSearch.trim()) {
        data = await searchBuildings(debouncedSearch) as Building[];
      } else {
        // Use filter API
        const filters: any = {};
        if (filterType !== "all") filters.type = filterType;
        if (filterStatus !== "all") filters.status = filterStatus;
        
        data = await getAllBuildings(filters) as Building[];
      }

      setBuildings(data);
    } catch (error) {
      console.error('Failed to load buildings:', error);
      showError("Failed to load buildings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBuildings();
  }, [debouncedSearch, filterType, filterStatus, isAuthenticated]);

  // 🔥 Status Update
  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updateBuildingStatus(id, status);
      showSuccess("Status updated successfully");
      loadBuildings();
    } catch {
      showError("Failed to update status");
    }
  };

  // 🔥 Selection
  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // 🔥 Bulk Delete
  const handleBulkDelete = async () => {
    if (!selected.length) return;

    try {
      await bulkDeleteBuildings(selected);
      showToast("Deleted selected buildings");
      setSelected([]);
      loadBuildings();
    } catch {
      showError("Bulk delete failed");
    }
  };

  const handleEditBuilding = (building: Building) => {
    setEditingBuilding(building);
    setIsEditModalOpen(true);
  };

  const handleDeleteBuilding = async (id: number) => {
    if (!isAuthenticated) {
      showToast('Please login to delete buildings');
      return;
    }
    if (confirm('Are you sure you want to delete this building?')) {
      try {
        await deleteBuilding(id);
        showSuccess('Building deleted successfully');
        loadBuildings();
      } catch (error) {
        console.error('Delete failed:', error);
        showError('Failed to delete building');
      }
    }
  };

  const handleCreateBuilding = async (buildingData: any) => {
    try {
      await createBuilding(buildingData);
      showSuccess("Building created successfully");
      setIsAddModalOpen(false);
      loadBuildings();
    } catch (error) {
      console.error('Create failed:', error);
      showError("Failed to create building");
    }
  };

  // Search buildings
  const handleSearch = async (query: string) => {
    setSearch(query);
  };

  // Filter buildings
  const handleFilter = async (type: string, status: string) => {
    setFilterType(type);
    setFilterStatus(status);
  };

  return (
    <DashboardLayout>
        <div className="flex flex-col gap-8">

          {/* HEADER */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Buildings</h1>
              <p className="text-gray-500 text-sm mt-2">
                Manage all property assets
              </p>
            </div>

            <div className="flex items-center gap-3">
              <ActionButton onClick={loadBuildings} variant="outline">
                <RefreshCw className="w-4 h-4" />
              </ActionButton>
              <ActionButton className="px-4" onClick={() => setIsAddModalOpen(true)}>
                <Plus className="w-4 h-4" />
                Add Building
              </ActionButton>
            </div>
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-3 items-center mt-2">

            {/* SEARCH */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search buildings..."
                className="pl-11 pr-4 py-2.5 rounded-full bg-gray-50 dark:bg-black/50 
                       border border-transparent focus:border-primary/40 
                       focus:ring-2 focus:ring-primary/20 
                       text-sm w-[260px] transition-all"
              />
            </div>

            {/* TYPE FILTER */}
            {["all", "Residential", "Commercial", "Industrial"].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold transition-all",
                  filterType === t
                    ? "bg-primary text-black shadow-sm"
                    : "bg-gray-100 dark:bg-black/40 hover:bg-gray-200 dark:hover:bg-black/60"
                )}
              >
                {t}
              </button>
            ))}

            {/* STATUS FILTER */}
            {["all", "active", "maintenance", "inactive"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold transition-all",
                  filterStatus === s
                    ? "bg-primary text-black shadow-sm"
                    : "bg-gray-100 dark:bg-black/40 hover:bg-gray-200 dark:hover:bg-black/60"
                )}
              >
                {s}
              </button>
            ))}
          </div>

          {/* BULK BAR */}
          {selected.length > 0 && (
            <div className="flex justify-between items-center bg-black text-white px-4 py-2 rounded-lg">
              <span>{selected.length} selected</span>
              <button onClick={handleBulkDelete} className="flex items-center gap-1">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {loading ? (
              <div className="col-span-full flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    <div className="absolute w-full h-full rounded-full border border-primary/20 animate-spin"></div>
                    <div className="absolute w-12 h-12 rounded-full border-t-2 border-primary border-transparent animate-spin" style={{ animationDirection: 'reverse' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 bg-primary rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm font-medium">Loading properties...</p>
                </div>
              </div>
            ) : buildings.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No properties found</h3>
                <p className="text-gray-500 text-sm">Use the "Add Building" button above to get started</p>
              </div>
            ) : (
              buildings.map((b) => (
                <div
                  key={b.id}
                  className="group border dark:border-gray-800 rounded-3xl overflow-hidden hover:shadow-xl transition-all hover:scale-[1.02] bg-gray-50/30 dark:bg-[#1f1f22]/50 cursor-pointer"
                  onClick={() => router.push(`/buildings/${b.id}`)}
                >
                  {/* IMAGE */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={
                        b.imageUrl ||
                        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      }
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      alt={b.name}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />

                    {/* STATUS BADGES */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase">
                        {b.type}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={cn(
                        "px-3 py-1 backdrop-blur-md text-black text-[10px] font-bold rounded-full uppercase flex items-center gap-1",
                        b.status === "active" ? "bg-green-400" : 
                        b.status === "maintenance" ? "bg-yellow-400" : "bg-red-400"
                      )}>
                        {b.status === "active" && <CheckCircle2 className="w-3 h-3" />}
                        {b.status === "maintenance" && <AlertCircle className="w-3 h-3" />}
                        {b.status === "inactive" && <AlertCircle className="w-3 h-3" />}
                        {b.status}
                      </span>
                    </div>

                    {/* ACTIONS DROPDOWN */}
                    <Dropdown
                      trigger={
                        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white dark:bg-surface-dark flex items-center justify-center text-gray-400 hover:text-black dark:hover:text-white transition-colors shadow-sm">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      }
                    >
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 mb-2">
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Building Actions</p>
                      </div>
                      <DropdownItem icon={Eye} onClick={() => router.push(`/buildings/${b.id}`)}>
                        View Details
                      </DropdownItem>
                      <DropdownItem icon={Edit} onClick={() => handleEditBuilding(b)}>
                        Edit Property
                      </DropdownItem>
                      <DropdownItem icon={Settings} onClick={() => showToast(`Opening settings for ${b.name}...`)}>
                        Unit Settings
                      </DropdownItem>
                      <DropdownDivider />
                      <DropdownItem 
                        icon={Trash2} 
                        variant="danger" 
                        onClick={() => handleDeleteBuilding(b.id)}
                      >
                        Delete Building
                      </DropdownItem>
                    </Dropdown>
                  </div>

                  {/* CARD BODY */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{b.name}</h3>
                    
                    <p className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                      <MapPin className="w-3 h-3 text-primary" />
                      {b.address}, {b.city}, {b.state}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Units</p>
                        <p className="text-lg font-bold">{b.totalUnits}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Type</p>
                        <p className="text-lg font-bold text-primary">{b.type}</p>
                      </div>
                    </div>

                    {b.squareFootage && (
                      <div className="mt-4">
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Square Footage</p>
                        <p className="text-sm font-medium">{b.squareFootage.toLocaleString()} sq ft</p>
                      </div>
                    )}

                    <ActionButton 
                      variant="outline" 
                      className="w-full mt-6" 
                      icon={ArrowUpRight} 
                      iconPosition="right"
                      onClick={() => router.push(`/buildings/${b.id}`)}
                    >
                      View Assets
                    </ActionButton>
                  </div>
                </div>
              ))
            )}

          </div>

          {/* ADD BUILDING MODAL */}
          <Modal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            title="Add New Building"
          >
            <StepForm 
              onSubmit={handleCreateBuilding}
              onCancel={() => setIsAddModalOpen(false)}
            />
          </Modal>

          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title="Edit Building"
          >
            <StepForm 
              onSubmit={async (data) => {
                try {
                  // Update building with all the data
                  const updateData = {
                    ...editingBuilding,
                    ...data
                  };
                  await updateBuildingStatus(editingBuilding!.id, updateData.status || 'active');
                  showToast("Building updated successfully");
                  setIsEditModalOpen(false);
                  setEditingBuilding(null);
                  loadBuildings();
                } catch (error) {
                  console.error('Update failed:', error);
                  showToast("Failed to update building");
                }
              }}
              onCancel={() => {
                setIsEditModalOpen(false);
                setEditingBuilding(null);
              }}
            />
          </Modal>
        </div>
      </DashboardLayout>
  );
}