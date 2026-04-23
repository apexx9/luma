import { MapPin } from "lucide-react";
import { InputField, SelectField, Header } from "./SharedUI";
import { StepFormData } from "./types";

interface StepTwoProps {
    formData: StepFormData;
    handleInputChange: (field: keyof StepFormData, value: string) => void;
    errors: Record<string, string>;
    countries: any[];
    states: string[];
    cities: string[];
    loadingCountries: boolean;
    loadingStates: boolean;
    loadingCities: boolean;
}

export const StepTwoLocation = ({
    formData,
    handleInputChange,
    errors,
    countries,
    states,
    cities,
    loadingCountries,
    loadingStates,
    loadingCities
}: StepTwoProps) => (
    <section className="space-y-6">
        <Header icon={<MapPin />} title="Location" subtitle="Geographic positioning" />
        <InputField
            label="Street Address"
            field="address"
            placeholder="Sheikh Zayed Rd"
            value={formData.address}
            onChange={(e: any) => handleInputChange("address", e.target.value)}
            error={errors.address}
        />
        <div className="grid grid-cols-2 gap-4">
            <SelectField
                label="Country"
                field="country"
                options={countries.map(c => c.name)}
                value={formData.country}
                onChange={(value: string) => handleInputChange("country", value)}
                loading={loadingCountries}
            />
            <SelectField
                label="State"
                field="state"
                options={states}
                value={formData.state}
                onChange={(value: string) => handleInputChange("state", value)}
                loading={loadingStates}
                disabled={!formData.country || loadingStates}
            />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <SelectField
                label="City"
                field="city"
                options={cities}
                value={formData.city}
                onChange={(value: string) => handleInputChange("city", value)}
                loading={loadingCities}
                disabled={!formData.state || loadingCities}
            />
            <InputField
                label="Postal Code"
                field="zipCode"
                placeholder="00000"
                value={formData.zipCode}
                onChange={(e: any) => handleInputChange("zipCode", e.target.value)}
            />
        </div>
    </section>
);
