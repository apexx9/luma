export interface Building {
  id: string | number;
  name: string;
  status: string;
  address: string;
  city: string;
  state?: string;
  zipCode?: string;
  country?: string;
  totalUnits: number;
  propertyTax: number;
  insurance: number;
  yearBuilt?: number;
  buildingType?: string;
  managerId?: string | number;
  managerName?: string;
  contactEmail?: string;
  contactPhone?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
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
