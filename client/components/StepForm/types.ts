export interface StepFormData {
    // Core backend fields
    name: string;
    address: string;
    city: string;
    state?: string;
    zipCode?: string;
    country?: string;
    type: "residential" | "commercial" | "industrial";
    total_units: string;
    status: "healthy" | "maintenance" | "alert";
    image_url: string;
    imageFile?: File;
    
    // Additional fields (might not be supported by backend yet)
    createdAt?: string;
    updatedAt?: string;
    year_built?: string;
    propertyTax?: string;
    insurance?: string;
    description?: string;
    
    // Legacy fields for backward compatibility
    totalUnits?: number; // Maps to total_units
    buildingType?: string; // Maps to type
    imageUrl?: string; // Maps to image_url
    purchasePrice?: string; // Purchase price field
    monthlyRent?: string; // Monthly rent field
    squareFootage?: string; // Square footage field
    numberOfFloors?: string; // Number of floors field
}

export const initialFormData: StepFormData = {
    name: '', 
    address: '', 
    city: '', 
    state: '', 
    zipCode: '', 
    country: '',
    type: 'residential', 
    total_units: '', 
    status: 'healthy', 
    image_url: '',
    year_built: '',
    propertyTax: '',
    insurance: '',
    description: ''
};
