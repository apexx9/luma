import { Wallet, Upload, X } from "lucide-react";
import { motion } from "framer-motion";
import { InputField, Header } from "./SharedUI";
import { StepFormData } from "./types";
import { RefObject } from "react";

interface StepFourProps {
    formData: StepFormData;
    handleInputChange: (field: keyof StepFormData, value: string) => void;
    fileInputRef: RefObject<HTMLInputElement | null>;
    isUploading: boolean;
    imagePreview: string | null;
    handleImageUpload: (e: any) => void;
    removeImage: () => void;
}

export const StepFourValuation = ({
    formData,
    handleInputChange,
    fileInputRef,
    isUploading,
    imagePreview,
    handleImageUpload,
    removeImage
}: StepFourProps) => (
    <section className="space-y-6">
        <Header icon={<Wallet />} title="Valuation" subtitle="Financial data and assets" />
        <div className="grid grid-cols-2 gap-4">
            <InputField
                label="Purchase Price"
                field="total_units"
                placeholder="$0.00"
                value={formData.total_units}
                onChange={(e: any) => handleInputChange("total_units", e.target.value)}
            />
            <InputField
                label="Monthly Rent"
                field="monthlyRent"
                placeholder="$0.00"
                value={formData.monthlyRent}
                onChange={(e: any) => handleInputChange("monthlyRent", e.target.value)}
            />
        </div>
        <div className="space-y-4">
            <InputField
                label="Image URL"
                field="image_url"
                placeholder="https://..."
                value={formData.image_url}
                onChange={(e: any) => handleInputChange("image_url", e.target.value)}
            />

            <div className="flex items-center gap-4 py-2">
                <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1" />
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Or</span>
                <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1" />
            </div>

            <div className="space-y-2">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                />
                <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center gap-3 w-full px-4 py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-primary/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all group"
                >
                    <Upload className="text-gray-400 group-hover:text-primary transition-colors" size={20} />
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors">
                            {isUploading ? 'Uploading...' : 'Upload image from computer'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                </label>
            </div>

            {(imagePreview || formData.imageUrl) && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative group"
                >
                    <div className="h-48 w-full rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                        <img
                            src={imagePreview || formData.imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                    >
                        <X size={16} />
                    </button>
                </motion.div>
            )}
        </div>
    </section>
);
