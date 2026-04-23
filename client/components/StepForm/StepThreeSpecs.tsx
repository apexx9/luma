import { BarChart3 } from "lucide-react";
import { InputField, Header } from "./SharedUI";
import { StepFormData } from "./types";

interface StepThreeProps {
    formData: StepFormData;
    handleInputChange: (field: keyof StepFormData, value: string) => void;
}

export const StepThreeSpecs = ({ formData, handleInputChange }: StepThreeProps) => (
    <section className="space-y-6">
        <Header icon={<BarChart3 />} title="Specifications" subtitle="Structural and technical metrics" />
        <div className="grid grid-cols-2 gap-4">
            <InputField
                label="Total Units"
                field="total_units"
                type="number"
                value={formData.total_units}
                onChange={(e: any) => handleInputChange("total_units", e.target.value)}
            />
            <InputField
                label="Year Built"
                field="year_built"
                type="number"
                value={formData.year_built}
                onChange={(e: any) => handleInputChange("year_built", e.target.value)}
            />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <InputField
                label="Sq. Footage"
                field="squareFootage"
                type="number"
                value={formData.squareFootage}
                onChange={(e: any) => handleInputChange("squareFootage", e.target.value)}
            />
            <InputField
                label="Floors"
                field="numberOfFloors"
                type="number"
                value={formData.numberOfFloors}
                onChange={(e: any) => handleInputChange("numberOfFloors", e.target.value)}
            />
        </div>
    </section>
);
