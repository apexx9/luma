"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";


import { BuildingsHeader } from "./components/BuildingsHeader";
import { BuildingsFilters } from "./components/BuildingsFilters";
import { BuildingsBulkBar } from "./components/BuildingsBulkBar";
import { BuildingsGrid } from "./components/BuildingsGrid";
import { BuildingsModals } from "./components/BuildingsModals";

import {
  getAllBuildings,
  createBuilding,
  updateBuildingStatus,
  deleteBuilding,
  bulkDeleteBuildings,
  searchBuildings
} from "@/actions/buildings.api";

import { Building } from "@/types/building.types";

export default function BuildingsPage() {
  const { isAuthenticated, showToast, showSuccess, showError, showWarning, showInfo } = useStore();
  const router = useRouter();

  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Building[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const [selected, setSelected] = useState<number[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState<Building | null>(null);
  const [showSuccessState, setShowSuccessState] = useState(false);

  // 🔥 Optimized Search with Debouncing & Caching
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // Reduced from 400ms to 300ms for better UX
    return () => clearTimeout(timer);
  }, [search]);

  // 🔍 Search function with caching
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearch(query);
      return;
    }

    setIsSearching(true);
    setSearch(query);

    try {
      // Check if we have cached results for this query
      if (debouncedSearch === query && searchResults.length > 0) {
        setSearchResults(searchResults);
        return;
      }

      // Perform API search
      const results = await searchBuildings(query) as Building[];
      setSearchResults(results);
      showInfo(`Found ${results.length} buildings matching "${query}"`);
    } catch (error) {
      console.error('Search failed:', error);
      showError('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // 🔥 Load Buildings (with search caching)
  const loadBuildings = async () => {
    if (!isAuthenticated) {
      return;
    }
    
    try {
      setLoading(true);
      let data: Building[];
      
      // If there's a search query, use cached results or search API
      if (debouncedSearch.trim()) {
        // Use cached results if available and query matches
        if (searchResults.length > 0 && debouncedSearch === search) {
          data = searchResults;
        } else {
          // Perform new search and cache results
          const results = await searchBuildings(debouncedSearch) as Building[];
          setSearchResults(results);
          data = results;
        }
      } else {
        // Use filter API
        const filters: any = {};
        if (filterType !== "all") filters.type = filterType;
        if (filterStatus !== "all") filters.status = filterStatus;
        
        data = await getAllBuildings(filters) as Building[];
        // Clear search results when using filters
        setSearchResults([]);
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

  const handleDeleteBuilding = async (id: string | number) => {
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
      setShowSuccessState(true);
      loadBuildings();
    } catch (error) {
      console.error('Create failed:', error);
      showError("Failed to create building");
    }
  };

  
  // Filter buildings
  const handleFilter = (type: string, status: string) => {
    setFilterType(type);
    setFilterStatus(status);
  };

  const handleFilterType = (type: string) => {
    setFilterType(type);
  };

  const handleFilterStatus = (status: string) => {
    setFilterStatus(status);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* HEADER */}
        <BuildingsHeader 
          onRefresh={loadBuildings}
          onAddBuilding={() => setIsAddModalOpen(true)}
        />

        {/* FILTERS */}
        <BuildingsFilters
          search={search}
          onSearchChange={handleSearch}
          filterType={filterType}
          onFilterTypeChange={handleFilterType}
          filterStatus={filterStatus}
          onFilterStatusChange={handleFilterStatus}
          isSearching={isSearching}
          searchResults={searchResults}
        />

        {/* BULK BAR */}
        <BuildingsBulkBar
          selectedCount={selected.length}
          onBulkDelete={handleBulkDelete}
        />

        {/* GRID */}
        <BuildingsGrid
          buildings={searchResults.length > 0 ? searchResults : buildings}
          loading={loading || isSearching}
          onEditBuilding={handleEditBuilding}
          showToast={showToast}
          handleDeleteBuilding={handleDeleteBuilding}
        />

        {/* MODALS */}
        <BuildingsModals
          isAddModalOpen={isAddModalOpen}
          setIsAddModalOpen={setIsAddModalOpen}
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          editingBuilding={editingBuilding}
          onCreateBuilding={handleCreateBuilding}
          showSuccessState={showSuccessState}
          onShowSuccess={() => setShowSuccessState(true)}
          onUpdateBuilding={async (data) => {
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
        />
      </div>
    </DashboardLayout>
  );
}