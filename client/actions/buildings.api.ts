import { get, post, put, del } from "./api";
import { Building, BuildingStats, Unit } from "@/types/building.types";

// Basic CRUD Operations
export const getAllBuildings = (filters?: {
    city?: string;
    type?: string;
    status?: string;
    managerId?: string;
}) => {
    const params = new URLSearchParams();
    if (filters?.city) params.append('city', filters.city);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.managerId) params.append('managerId', filters.managerId);
    
    const query = params.toString();
    return get(`/buildings${query ? `?${query}` : ''}`);
};

export const getBuilding = (buildingId: string | number): Promise<Building> => {
    return get(`/buildings/${buildingId}`);
};

export const createBuilding = (buildingData: any) => {
    return post("/buildings", buildingData);
};

export const updateBuilding = (buildingId: string | number, buildingData: any) => {
    return put(`/buildings/${buildingId}`, buildingData);
};

export const deleteBuilding = (buildingId: string | number) => {
    return del(`/buildings/${buildingId}`);
};

// Search and Filter
export const searchBuildings = (query: string) => {
    return get(`/buildings/search?q=${encodeURIComponent(query)}`);
};

export const getBuildingsByCity = (city: string) => {
    return get(`/buildings/city/${encodeURIComponent(city)}`);
};

export const getBuildingsByType = (type: string) => {
    return get(`/buildings/type/${encodeURIComponent(type)}`);
};

export const getBuildingsByManager = (managerId: string | number) => {
    return get(`/buildings/manager/${managerId}`);
};

// Building Management
export const getBuildingStats = (buildingId: string | number): Promise<BuildingStats> => {
    return get(`/buildings/${buildingId}/stats`);
};

// Units functionality removed - using buildings table only

export const updateBuildingStatus = (buildingId: string | number, status: string) => {
    return put(`/buildings/${buildingId}/status`, { status });
};

// Image Management
export const uploadBuildingImage = (buildingId: string | number, imageUrl: string) => {
    return post(`/buildings/${buildingId}/images`, { imageUrl });
};

// deleteBuildingImage not implemented on server

// Bulk Operations
export const bulkUpdateBuildings = (buildingsData: any[]) => {
    return post("/buildings/bulk-update", { buildings: buildingsData });
};

export const bulkDeleteBuildings = (buildingIds: number[]) => {
    return post("/buildings/bulk-delete", { buildingIds });
};