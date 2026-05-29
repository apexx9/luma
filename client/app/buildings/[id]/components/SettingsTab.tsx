import React, { useState } from "react";
import { Building } from "@/types/building.types";
import { updateBuilding } from "@/actions/buildings.api";
import { deleteBuilding } from "@/actions/buildings.api";
import { useRouter } from "next/navigation";
import { Edit, Trash2, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepFormData } from "@/components/StepForm/types";

export function SettingsTab({ building, showToast, onRefresh }: { building: Building; showToast: (message: string) => void; onRefresh: () => void; }) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    
    // Convert Building to StepFormData format (backend schema)
    const [formData, setFormData] = useState<StepFormData>({
        name: building.name || '',
        address: building.address || '',
        city: building.city || '',
        state: building.state || '',
        zipCode: building.zipCode || '',
        country: building.country || '',
        type: normalizeBuildingType(building.type || building.buildingType || 'residential'),
        total_units: (building.total_units || building.totalUnits || 0).toString(),
        status: (building.status === 'active' ? 'healthy' : building.status === 'inactive' ? 'alert' : building.status) || 'healthy',
        image_url: building.image_url || building.imageUrl || '',
        // Additional fields (might not be supported by backend yet)
        year_built: building.yearBuilt?.toString() || '',
        propertyTax: building.propertyTax?.toString() || '',
        insurance: building.insurance?.toString() || '',
        description: '' // Not in Building type
    });

    const handleSave = async () => {
        try {
            // Convert StepFormData to backend schema format
            const backendData = {
                name: formData.name,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
                country: formData.country,
                type: formData.type,
                total_units: parseInt(formData.total_units) || 0,
                status: formData.status,
                image_url: formData.image_url,
            };
            
            await updateBuilding(building.id, backendData);
            showToast("Building updated successfully");
            setIsEditing(false);
            onRefresh();
        } catch (error) {
            showToast("Failed to update building");
        }
    };

    const handleCancel = () => {
        // Reset form data to original building data (backend schema)
        setFormData({
            name: building.name || '',
            address: building.address || '',
            city: building.city || '',
            state: building.state || '',
            zipCode: building.zipCode || '',
            country: building.country || '',
            type: normalizeBuildingType(building.type || building.buildingType || 'residential'),
            total_units: (building.total_units || building.totalUnits || 0).toString(),
            status: (building.status === 'active' ? 'healthy' : building.status === 'inactive' ? 'alert' : building.status) || 'healthy',
            image_url: building.image_url || building.imageUrl || '',
            // Additional fields (might not be supported by backend yet)
            year_built: building.yearBuilt?.toString() || '',
            propertyTax: building.propertyTax?.toString() || '',
            insurance: building.insurance?.toString() || '',
            description: '' // Not in Building type
        });
        setIsEditing(false);
    };

    function normalizeBuildingType(value: string) {
        const normalized = value.toLowerCase();

        if (normalized.includes('commercial')) {
            return 'commercial';
        }

        if (normalized.includes('industrial')) {
            return 'industrial';
        }

        return 'residential';
    }

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteBuilding(building.id);
            showToast("Building deleted successfully");
            router.push('/buildings');
        } catch (error) {
            showToast("Failed to delete building");
            setIsDeleting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-[#121212] border border-gray-200/60 dark:border-white/5 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="p-6 md:p-8 space-y-10">

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">Building Settings</h2>
                        <p className="text-sm text-gray-500 mt-1">Manage all configuration and details for {building.name}.</p>
                    </div>
                    <div className="flex gap-3">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleCancel}
                                    className="px-5 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-5 py-2 bg-primary text-black font-medium text-sm hover:bg-primary/90 rounded-full transition-colors shadow-sm"
                                >
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-5 py-2 bg-primary text-black font-medium text-sm hover:bg-primary/90 rounded-full transition-colors shadow-sm flex items-center gap-2"
                            >
                                <Edit className="w-4 h-4" />
                                Edit Details
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">

                    {/* Basic Information */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Basic Information</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Building Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.name || ''}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-black/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                ) : (
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{building.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                                {isEditing ? (
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-black/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    >
                                        <option value="active">Active</option>
                                        <option value="maintenance">Maintenance</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                ) : (
                                    <span className={cn(
                                        "inline-block px-2.5 py-1 text-[10px] font-bold uppercase rounded-full",
                                        building.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                            building.status === "maintenance" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                    )}>
                                        {building.status === "active" ? "Healthy" : building.status === "inactive" ? "Alert" : building.status}
                                    </span>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Building Type</label>
                                {isEditing ? (
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-black/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    >
                                        <option value="residential">Residential</option>
                                        <option value="commercial">Commercial</option>
                                        <option value="industrial">Industrial</option>
                                    </select>
                                ) : (
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                                        {building.type || building.buildingType || "Not specified"}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Total Units</label>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={formData.total_units}
                                        onChange={(e) => setFormData({ ...formData, total_units: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-black/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                ) : (
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {building.total_units || building.totalUnits || 0} units
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Location Information */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Location Information</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Street Address</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.address || ''}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-black/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                ) : (
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{building.address}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">City</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.city || ''}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-black/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                    ) : (
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{building.city}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">State</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.state || ''}
                                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-black/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                    ) : (
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{building.state || "Not specified"}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">ZIP Code</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.zipCode || ''}
                                            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-black/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                    ) : (
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{building.zipCode || "Not specified"}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Country</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.country || ''}
                                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-black/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                    ) : (
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{building.country || "Not specified"}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="border border-red-200 dark:border-red-900/30 rounded-2xl p-6 bg-red-50/50 dark:bg-red-950/10 mt-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-sm font-bold text-red-600 dark:text-red-400 mb-1">Delete Property</h3>
                            <p className="text-xs text-red-500/80 dark:text-red-400/80 font-medium">
                                Once you delete a property, there is no going back. Please be certain.
                            </p>
                        </div>
                        <button 
                            onClick={() => setShowDeleteModal(true)}
                            className="px-5 py-2 whitespace-nowrap bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-medium text-sm hover:bg-red-200 dark:hover:bg-red-900/50 rounded-full transition-colors flex items-center gap-2 w-fit"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete building
                        </button>
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-[#121212] rounded-3xl border border-gray-200 dark:border-white/5 shadow-2xl max-w-md w-full p-6 space-y-6">
                            <div className="text-center space-y-4">
                                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
                                    <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delete {building.name}?</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        This action cannot be undone. This will permanently delete the building and all associated data.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    disabled={isDeleting}
                                    className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white font-medium text-sm hover:bg-red-700 rounded-full transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isDeleting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 className="w-4 h-4" />
                                            Delete Building
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
