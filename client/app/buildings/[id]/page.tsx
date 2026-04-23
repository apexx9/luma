"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  MapPin,
  Edit
} from "lucide-react";

import { getBuilding, getBuildingStats, getBuildingUnits } from "@/actions/buildings.api";
import { Building, BuildingStats, Unit } from "@/types/building.types";
import { ActionButton } from "@/components/ActionComponents";
import { useStore } from "@/store";
import BrandLoader from "@/components/BrandLoader";

import { OverviewTab } from "./components/OverviewTab";
import { UnitsTab } from "./components/UnitsTab";
import { FinancialsTab } from "./components/FinancialsTab";
import { SettingsTab } from "./components/SettingsTab";

export default function BuildingDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { showToast, showError, isAuthenticated, checkAuth } = useStore();

  const [building, setBuilding] = useState<Building | null>(null);
  const [stats, setStats] = useState<BuildingStats | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Try to load building data first
      let buildingData = null;
      let statsData = null;
      let unitsData: Unit[] = [];
      
      try {
        buildingData = await getBuilding(id as string);
        setBuilding(buildingData);
      } catch (error) {
        console.error('Failed to load building data:', (error as any)?.message || error);
        throw error; // Re-throw if building data fails, as it's essential
      }
      
      // Load optional data separately
      try {
        statsData = await getBuildingStats(id as string);
        setStats(statsData);
      } catch (error) {
        console.warn('Failed to load stats data:', (error as any)?.message || error);
        setStats(null);
      }
      
      try {
        unitsData = await getBuildingUnits(id as string);
        setUnits(unitsData);
      } catch (error) {
        console.warn('Failed to load units data:', (error as any)?.message || error);
        setUnits([]);
      }
      
    } catch (error) {
      console.error('Data retrieval error:', error);
      
      // If authentication error, clear auth and redirect
      if (error && typeof error === 'object' && 'response' in error && 
          ((error as any).response?.status === 401 || (error as any).response?.status === 403)) {
        showError("Session expired. Please log in again.");
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else if (error && typeof error === 'object' && 'response' in error && 
                 ((error as any).response?.status === 404)) {
        showError("Building not found");
      } else if (error && typeof error === 'object' && 'code' in error && 
                 error?.code === 'ECONNREFUSED') {
        showError("Unable to connect to server. Please check if the backend is running.");
      } else {
        showError("Data retrieval failed");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      if (id) {
        // Check authentication before loading data
        const isAuth = await checkAuth();
        if (isAuth) {
          await loadData();
        } else {
          setLoading(false);
        }
      }
    };

    initializeData();
  }, [id]);

  if (loading) return <BrandLoader />;
  if (!building) return null;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">

        {/* HEADER */}
        <header className="bg-white dark:bg-[#121212] border border-gray-200/60 dark:border-white/5 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-6 md:p-8">
          <div className="flex flex-col gap-6">
            {/* Back Navigation */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Buildings
            </button>

            {/* Building Info */}
            <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
                  <Image
                    src={building.image_url || building.imageUrl || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                    alt={building.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div>
                  <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white mb-3">
                    {building.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className={cn(
                      "px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-wider",
                      building.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                        building.status === "maintenance" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    )}>
                      {building.status}
                    </span>
                    <span className="text-xs font-black text-gray-500 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full uppercase tracking-wider">
                      {building.type || "Property"}
                    </span>
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                      <MapPin className="w-4 h-4" />
                      <p className="font-medium">{building.address}, {building.city}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <ActionButton onClick={() => setTab("settings")}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Building
                </ActionButton>
              </div>
            </div>
          </div>
        </header>

        {/* TABS */}
        <div className="flex gap-6 md:gap-8 border-b border-gray-200/60 dark:border-white/5 px-6 overflow-x-hidden">
          {["overview", "units", "financials", "settings"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-2 py-3 text-sm font-medium transition-all relative capitalize whitespace-nowrap tracking-wider border-b-2 -mb-px shrink-0",
                tab === t 
                  ? "text-primary border-primary" 
                  : "text-gray-500 border-transparent hover:text-gray-900 dark:hover:text-gray-300"
                )}
              >
                {t}
                {tab === t && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-in slide-in-from-left duration-300" />
                )}
              </button>
            ))}
        </div>

        {/* CONTENT SECTIONS */}
        <main className="pb-12 space-y-6">
          {tab === "overview" && <OverviewTab stats={stats} building={building} />}
          {tab === "units" && <UnitsTab units={units} showToast={showToast} />}
          {tab === "financials" && <FinancialsTab stats={stats} building={building} />}
          {tab === "settings" && <SettingsTab building={building} showToast={showToast} onRefresh={loadData} />}
        </main>
      </div>
    </DashboardLayout>
  );
}