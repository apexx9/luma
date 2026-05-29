export interface Building {
  id: string | number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
  type: string;
  totalUnits: number;
  status: "active" | "inactive" | "maintenance";
  imageUrl?: string;
  // Financial fields
  yearBuilt?: number;
  squareFootage?: number;
  numberOfFloors?: number;
  purchasePrice?: number;
  monthlyRent?: number;
  propertyTax?: number;
  insurance?: number;
  // Management
  managerId?: number;
  // Location
  latitude?: number;
  longitude?: number;
  // Additional info
  description?: string;
  // Timestamps
  createdAt?: string;
  updatedAt?: string;
  // Legacy fields for backward compatibility
  total_units?: number; // Maps to totalUnits
  image_url?: string; // Maps to imageUrl
  buildingType?: string; // Maps to type
}

export interface BuildingStats {
  building: {
    id: number;
    name: string;
    totalUnits: number;
    status: string;
  };
  occupiedUnits: number;
  vacantUnits: number;
  totalUnits: number;
  totalRevenue: number;
  maintenanceRequests: number;
  occupancyRate?: number;
  revenue?: number;
  expenses?: number;
  net?: number;
}

export interface Unit {
  id: string | number;
  buildingId: string | number;
  name: string;
  type: string;
  status: 'vacant' | 'occupied' | 'maintenance';
  squareFootage?: number;
  bedrooms?: number;
  bathrooms?: number;
  floor?: number;
  rent?: number;
  deposit?: number;
  tenant?: string;
  tenantEmail?: string;
  tenantPhone?: string;
  leaseStart?: string;
  leaseEnd?: string;
  createdAt?: string;
  updatedAt?: string;
}
