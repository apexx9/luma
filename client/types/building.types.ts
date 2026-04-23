export interface Building {
  id: string | number;
  name: string;
  address: string;
  city: string;
  state?: string;
  zipCode?: string;
  country?: string;
  type: "residential" | "commercial" | "industrial";
  total_units: number;
  status: "active" | "inactive" | "maintenance";
  image_url?: string;
  // Optional fields that might be added by the backend
  createdAt?: string;
  updatedAt?: string;
  // Legacy fields for backward compatibility
  totalUnits?: number; // Maps to total_units
  buildingType?: string; // Maps to type
  imageUrl?: string; // Maps to image_url
  propertyTax?: number;
  insurance?: number;
  yearBuilt?: number;
  managerId?: string | number;
  managerName?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface BuildingStats {
  occupancyRate: number;
  revenue: number;
  net: number;
  expenses: number;
}

export interface Unit {
  id: string | number;
  name: string;
  status: 'occupied' | 'vacant';
  tenant?: string;
  rent: number;
}
