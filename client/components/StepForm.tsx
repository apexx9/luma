"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { 
    Check, 
    ChevronRight, 
    ChevronLeft, 
    Building2, 
    MapPin, 
    BarChart3, 
    Wallet, 
    PartyPopper,
    ChevronDown,
    Upload,
    Image as ImageIcon,
    X,
    AlertCircle,
    RefreshCw,
    Lock
} from "lucide-react";

interface StepFormData {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    type: string;
    totalUnits: string;
    yearBuilt: string;
    squareFootage: string;
    numberOfFloors: string;
    purchasePrice: string;
    monthlyRent: string;
    propertyTax: string;
    insurance: string;
    status: string;
    description: string;
    imageUrl: string;
    imageFile?: File;
}

const initialFormData: StepFormData = {
    name: '', address: '', city: '', state: '', zipCode: '', country: '',
    type: '', totalUnits: '', yearBuilt: '', squareFootage: '', numberOfFloors: '',
    purchasePrice: '', monthlyRent: '', propertyTax: '', insurance: '',
    status: 'active', description: '', imageUrl: ''
};

// --- REFINED UI COMPONENTS ---

const InputField = ({ label, field, placeholder, type = "text", value, onChange, error }: any) => (
    <div className="space-y-1.5 flex-1">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={cn(
                "w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border text-sm transition-all focus:outline-none focus:ring-2",
                error 
                    ? "border-red-500/50 focus:ring-red-500/10" 
                    : "border-gray-200 dark:border-gray-800 focus:ring-primary/10 focus:border-primary"
            )}
        />
    </div>
);

const SelectField = ({ label, field, options, value, onChange, loading, disabled }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    
    return (
        <div className="space-y-1.5 flex-1 relative" ref={dropdownRef}>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">{label}</label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    className={cn(
                        "w-full px-4 py-3 rounded-xl border text-sm text-left focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all flex items-center justify-between",
                        disabled 
                            ? "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed"
                            : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-black dark:text-white hover:border-primary/50 group"
                    )}
                >
                    <span className={cn(
                        "flex-1 text-left",
                        value && !disabled ? "text-black dark:text-white" : "text-gray-400"
                    )}>
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 border border-gray-400 border-t-transparent animate-spin rounded-full"></div>
                                Loading...
                            </div>
                        ) : (
                            value || `Select ${label.toLowerCase()}`
                        )}
                    </span>
                    <ChevronDown 
                        size={16} 
                        className={cn(
                            "text-gray-400 transition-transform duration-200",
                            isOpen && 'rotate-180',
                            !disabled && 'group-hover:text-primary'
                        )}
                    />
                </button>
                
                <AnimatePresence>
                    {isOpen && !disabled && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg z-50 overflow-hidden"
                        >
                            <div className="py-1 max-h-60 overflow-y-auto">
                                {options.map((opt: string) => (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => {
                                            onChange(opt);
                                            setIsOpen(false);
                                        }}
                                        className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-3 group"
                                    >
                                        <span className="text-black dark:text-white group-hover:text-primary">{opt}</span>
                                        {value === opt && (
                                            <Check size={14} className="text-primary ml-auto" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export const StepForm = ({ onSubmit, onCancel }: { 
    onSubmit: (data: StepFormData) => void; 
    onCancel: () => void; 
}) => {
    const { isAuthenticated } = useStore();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const toastTimeoutRef = useRef<NodeJS.Timeout>(null);

    // Location data states
    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [loadingCountries, setLoadingCountries] = useState(false);
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);

    // Fetch countries on load
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                setLoadingCountries(true);
                const res = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2");
                
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                
                const data = await res.json();

                // Check if data is an array before mapping
                if (!Array.isArray(data)) {
                    throw new Error('Invalid data format: expected array');
                }

                const formatted = data
                    .map((c: any) => ({
                        name: c.name?.common || c.name || 'Unknown',
                        code: c.cca2 || 'Unknown'
                    }))
                    .filter((c: any) => c.name !== 'Unknown' && c.code !== 'Unknown')
                    .sort((a: any, b: any) => a.name.localeCompare(b.name));

                setCountries(formatted);
            } catch (err) {
                console.error("Failed to load countries", err);
                // Fallback to common countries if API fails
                const fallbackCountries = [
                    { name: "United States", code: "US" },
                    { name: "Canada", code: "CA" },
                    { name: "United Kingdom", code: "GB" },
                    { name: "Germany", code: "DE" },
                    { name: "France", code: "FR" },
                    { name: "Spain", code: "ES" },
                    { name: "Italy", code: "IT" },
                    { name: "Australia", code: "AU" },
                    { name: "Japan", code: "JP" },
                    { name: "China", code: "CN" }
                ];
                setCountries(fallbackCountries);
            } finally {
                setLoadingCountries(false);
            }
        };

        fetchCountries();
    }, []);

    // Fetch states when country changes
    useEffect(() => {
        const fetchStates = async () => {
            if (!formData.country) {
                setStates([]);
                setCities([]);
                return;
            }

            try {
                setLoadingStates(true);

                const res = await fetch(
                    "https://countriesnow.space/api/v0.1/countries/states",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ country: formData.country }),
                    }
                );

                const data = await res.json();
                setStates(data.data.states.map((s: any) => s.name));

                setFormData(prev => ({
                    ...prev,
                    state: "",
                    city: ""
                }));
            } catch (err) {
                console.error("Failed to load states", err);
            } finally {
                setLoadingStates(false);
            }
        };

        fetchStates();
    }, [formData.country]);

    // Fetch cities when state changes
    useEffect(() => {
        const fetchCities = async () => {
            if (!formData.country || !formData.state) {
                setCities([]);
                return;
            }

            try {
                setLoadingCities(true);

                const res = await fetch(
                    "https://countriesnow.space/api/v0.1/countries/state/cities",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            country: formData.country,
                            state: formData.state,
                        }),
                    }
                );

                const data = await res.json();
                setCities(data.data || []);

                setFormData(prev => ({
                    ...prev,
                    city: ""
                }));
            } catch (err) {
                console.error("Failed to load cities", err);
            } finally {
                setLoadingCities(false);
            }
        };

        fetchCities();
    }, [formData.state, formData.country]);

    // Check authentication
    useEffect(() => {
        if (!isAuthenticated) {
            setToast({ type: 'error', message: 'Please login to create a property' });
            onCancel();
        }
    }, [isAuthenticated, onCancel]);

    const handleInputChange = (field: keyof StepFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }
            
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file');
                return;
            }

            setIsUploading(true);
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setImagePreview(result);
                setFormData(prev => ({ ...prev, imageFile: file, imageUrl: result }));
                setIsUploading(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setFormData(prev => ({ ...prev, imageFile: undefined, imageUrl: '' }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const showToast = (type: 'success' | 'error', message: string) => {
        if (toastTimeoutRef.current) {
            clearTimeout(toastTimeoutRef.current);
        }
        
        setToast({ type, message });
        toastTimeoutRef.current = setTimeout(() => {
            setToast(null);
        }, 4000);
    };

    const handleSubmit = async () => {
        if (!validateStep()) return;
        
        setIsSubmitting(true);
        setSubmitError(null);
        
        try {
            await onSubmit(formData);
            setIsSubmitted(true);
            showToast('success', 'Property created successfully!');
        } catch (error: any) {
            console.error('Submit error:', error);
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to create property';
            setSubmitError(errorMessage);
            showToast('error', errorMessage);
            
            // Don't close the form, keep it open for user to retry
        } finally {
            setIsSubmitting(false);
        }
    };

    const validateStep = () => {
        let newErrors: Record<string, string> = {};
        if (currentStep === 1) {
            if (!formData.name) newErrors.name = "Required";
            if (!formData.type) newErrors.type = "Required";
        }
        if (currentStep === 2 && !formData.address) newErrors.address = "Address required";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => validateStep() && setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);


    
    {/* Toast Notification */}
    <AnimatePresence>
        {toast && (
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 ${
                    toast.type === 'success' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                }`}
            >
                {toast.type === 'success' ? (
                    <Check size={20} strokeWidth={3} />
                ) : (
                    <AlertCircle size={20} strokeWidth={3} />
                )}
                <span className="font-medium">{toast.message}</span>
            </motion.div>
        )}
    </AnimatePresence>

    {/* Error Message */}
    <AnimatePresence>
        {submitError && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3"
            >
                <AlertCircle size={20} className="text-red-500 shrink-0" />
                <div className="flex-1">
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">
                        {submitError}
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                        Please check your inputs and try again.
                    </p>
                </div>
                <button
                    onClick={() => setSubmitError(null)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                >
                    <X size={16} />
                </button>
            </motion.div>
        )}
    </AnimatePresence>

    {isSubmitted && !submitError && (
        <SuccessState onReset={() => { 
            setIsSubmitted(false); 
            setCurrentStep(1); 
            setFormData(initialFormData);
            setImagePreview(null);
            setSubmitError(null);
        }} />
    )}

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            {/* Minimalistic Step Indicators */}
            <div className="mb-12 px-8">
                <div className="flex items-center justify-between relative">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 dark:bg-gray-800 -z-10" />
                    {[1, 2, 3, 4].map((step) => {
                        const isActive = currentStep === step;
                        const isCompleted = currentStep > step;
                        
                        return (
                            <div key={step} className="flex flex-col items-center bg-white/80 dark:bg-black/80 backdrop-blur-sm p-2 rounded-lg">
                                <motion.div 
                                    animate={{ 
                                        scale: isActive ? 1.1 : 1,
                                    }}
                                    className={cn(
                                        "w-6 h-6 rounded-full flex items-center justify-center transition-all",
                                        isCompleted ? "bg-primary" : "bg-transparent border-2 border-gray-200 dark:border-gray-700",
                                        isActive && "ring-2 ring-primary/20"
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check size={12} className="text-black stroke-[3px]" />
                                    ) : (
                                        <span className={cn(
                                            "text-xs font-bold", 
                                            isActive ? "text-black dark:text-white" : "text-gray-400"
                                        )}>
                                            {step}
                                        </span>
                                    )}
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="relative min-h-[460px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        {currentStep === 1 && (
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
                                            {formData.description.length} chars
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {currentStep === 2 && (
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
                        )}

                        {currentStep === 3 && (
                            <section className="space-y-6">
                                <Header icon={<BarChart3 />} title="Specifications" subtitle="Structural and technical metrics" />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField 
                                        label="Total Units" 
                                        field="totalUnits" 
                                        type="number" 
                                        value={formData.totalUnits}
                                        onChange={(e: any) => handleInputChange("totalUnits", e.target.value)}
                                    />
                                    <InputField 
                                        label="Year Built" 
                                        field="yearBuilt" 
                                        type="number" 
                                        value={formData.yearBuilt}
                                        onChange={(e: any) => handleInputChange("yearBuilt", e.target.value)}
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
                        )}

                        {currentStep === 4 && (
                            <section className="space-y-6">
                                <Header icon={<Wallet />} title="Valuation" subtitle="Financial data and assets" />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField 
                                        label="Purchase Price" 
                                        field="purchasePrice" 
                                        placeholder="$0.00" 
                                        value={formData.purchasePrice}
                                        onChange={(e: any) => handleInputChange("purchasePrice", e.target.value)}
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
                                        field="imageUrl" 
                                        placeholder="https://..." 
                                        value={formData.imageUrl}
                                        onChange={(e: any) => handleInputChange("imageUrl", e.target.value)}
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
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Actions Bar */}
            <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-100 dark:border-gray-900">
                <button 
                    onClick={prevStep} 
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white disabled:opacity-0 transition-all px-2"
                >
                    <ChevronLeft size={14} strokeWidth={3} /> Previous
                </button>

                <div className="flex gap-4 items-center">
                    <button onClick={onCancel} className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-600">
                        Exit
                    </button>
                    <button 
                        onClick={currentStep < 4 ? nextStep : handleSubmit}
                        disabled={isSubmitting}
                        className="bg-primary text-black px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-primary/10 hover:shadow-primary/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <RefreshCw size={14} strokeWidth={3} className="animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                {currentStep < 4 ? "Next Step" : "Finalize Asset"}
                                <ChevronRight size={14} strokeWidth={3} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

const Header = ({ icon, title, subtitle }: any) => (
    <div className="flex items-center gap-4 mb-4">
        <div className="p-2.5 bg-primary/10 rounded-xl text-primary">{icon}</div>
        <div>
            <h3 className="text-xl font-black tracking-tight leading-none">{title}</h3>
            <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wider mt-1">{subtitle}</p>
        </div>
    </div>
);

const SuccessState = ({ onReset }: { onReset: () => void }) => {
    const [showConfetti, setShowConfetti] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center justify-center py-16 text-center relative"
        >
            {/* Confetti Effect */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ 
                                y: -20, 
                                x: Math.random() * 400 - 200,
                                rotate: Math.random() * 360
                            }}
                            animate={{ 
                                y: 500,
                                rotate: Math.random() * 720,
                                opacity: [1, 1, 0]
                            }}
                            transition={{ 
                                duration: 2 + Math.random() * 2,
                                delay: Math.random() * 0.5,
                                ease: "easeOut"
                            }}
                            className="absolute w-2 h-2"
                            style={{
                                left: `${Math.random() * 100}%`,
                                backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][Math.floor(Math.random() * 5)]
                            }}
                        />
                    ))}
                </div>
            )}
            
            <div className="relative mb-8">
                {/* Success Circle */}
                <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                        type: "spring", 
                        damping: 15, 
                        stiffness: 200,
                        delay: 0.1 
                    }}
                    className="w-28 h-28 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-black shadow-2xl shadow-primary/30 relative"
                >
                    <motion.div
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
                    >
                        <Check size={56} strokeWidth={5} className="relative z-10" />
                    </motion.div>
                    
                    {/* Pulse Effect */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-primary rounded-full opacity-20"
                    />
                </motion.div>
                
                {/* Floating Icons */}
                <motion.div 
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", damping: 15, delay: 0.3 }}
                    className="absolute -top-4 -right-4 p-3 bg-white dark:bg-gray-900 rounded-full border-2 border-gray-100 dark:border-gray-800 shadow-lg"
                >
                    <PartyPopper size={24} className="text-primary" />
                </motion.div>
                
                <motion.div 
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", damping: 15, delay: 0.4 }}
                    className="absolute -bottom-2 -left-4 p-3 bg-white dark:bg-gray-900 rounded-full border-2 border-gray-100 dark:border-gray-800 shadow-lg"
                >
                    <Building2 size={24} className="text-primary" />
                </motion.div>
            </div>
            
            {/* Success Message */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
            >
                <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Property Created!
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-base max-w-md leading-relaxed font-medium">
                    Your property has been successfully registered and is now live in the system.
                </p>
                
                {/* Success Stats */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center justify-center gap-8 mt-6"
                >
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.9, type: "spring", damping: 15 }}
                        className="text-center"
                    >
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 0.6, delay: 1, ease: "easeInOut" }}
                        >
                            <Check size={32} className="text-primary font-black" strokeWidth={4} />
                        </motion.div>
                        <div className="text-xs text-gray-500 mt-2 uppercase tracking-wider">Validated</div>
                    </motion.div>
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, type: "spring", damping: 15 }}
                        className="text-center"
                    >
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 0.6, delay: 1.1, ease: "easeInOut" }}
                        >
                            <Check size={32} className="text-primary font-black" strokeWidth={4} />
                        </motion.div>
                        <div className="text-xs text-gray-500 mt-2 uppercase tracking-wider">Stored</div>
                    </motion.div>
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.1, type: "spring", damping: 15 }}
                        className="text-center"
                    >
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 0.6, delay: 1.2, ease: "easeInOut" }}
                        >
                            <Check size={32} className="text-primary font-black" strokeWidth={4} />
                        </motion.div>
                        <div className="text-xs text-gray-500 mt-2 uppercase tracking-wider">Active</div>
                    </motion.div>
                </motion.div>
            </motion.div>
            
            {/* Action Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-10"
            >
                <button 
                    onClick={onReset}
                    className="px-12 py-4 bg-gradient-to-r from-primary to-primary/80 text-black rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all active:scale-95 flex items-center gap-3 group"
                >
                    <ChevronRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                    Add Another Property
                </button>
                <p className="text-xs text-gray-400 mt-3">
                    or press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Esc</kbd> to exit
                </p>
            </motion.div>
        </motion.div>
    );
};
