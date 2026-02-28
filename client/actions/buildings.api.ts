import {get, post, put, del} from "./api";

export const getUserBuildings = (userId: string) => {
    return get(`/api/users/${userId}/buildings`);
}

export const getAllBuildings = () => {
    return get("/api/buildings");
}

export const getBuilding = (buildingId: string | number) => {
    return get(`/api/buildings/${buildingId}`);
}

export const createBuilding = (userId: string | number, buildingData: any) => {
    return post(`/api/users/${userId}/buildings`, buildingData);
}

export const updateBuilding = (buildingId: string | number, buildingData: any) => {
    return put(`/api/users/${buildingId}/buildings`, buildingData);
}

export const deleteBuilding = (buildingId: string | number) => {
    return del(`/api/users/${buildingId}/buildings`);
}