import { Building2 } from "lucide-react";
import { InputField, SelectField, Header } from "./SharedUI";
import { StepFormData } from "./types";

interface StepOneProps {
    formData: StepFormData;
    handleInputChange: (field: keyof StepFormData, value: string) => void;
    errors: Record<string, string>;
}

export const StepOneCore = ({ formData, handleInputChange, errors }: StepOneProps) => (
    <section className="space-y-6">
        <Header icon={<Building2 />} title="Core Identity" subtitle="Primary asset definitions" />
        <InputField
            label="Property Name"
            field="name"
            placeholder="Grand Central Tower"
            value={formData.name}
            onChange={(e: any) => handleInputChange("name", e.target.value)}
            error={errors.name}
        />
        <div className="flex gap-4">
            <SelectField
                label="Category"
                field="type"
                options={["Residential", "Commercial", "Mixed", "Industrial", "Retail"]}
                value={formData.type}
                onChange={(value: string) => handleInputChange("type", value)}
            />
            <SelectField
                label="Status"
                field="status"
                options={["active", "inactive", "maintenance"]}
                value={formData.status}
                onChange={(value: string) => handleInputChange("status", value)}
            />
        </div>
        <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Asset Description</label>
            <div className="relative">
                <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all resize-y min-h-[100px] max-h-[300px]"
                    placeholder="Detailed overview of the property architecture and utility..."
                />
                <div className="absolute bottom-2 right-2 text-[10px] text-gray-400">
                    {formData.description?.length || 0} chars
                </div>
            </div>
        </div>
    </section>
);
