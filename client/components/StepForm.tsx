"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";
import { useGeography } from "@/hooks/useGeography";
import { ChevronLeft, ChevronRight, RefreshCw, X, AlertCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";

import { StepFormData, initialFormData } from "./StepForm/types";
import { SuccessState } from "./StepForm/SuccessState";
import { StepOneCore } from "./StepForm/StepOneCore";
import { StepTwoLocation } from "./StepForm/StepTwoLocation";
import { StepThreeSpecs } from "./StepForm/StepThreeSpecs";
import { StepFourValuation } from "./StepForm/StepFourValuation";

export const StepForm = ({ onSubmit, onCancel }: {
    onSubmit: (data: StepFormData) => void;
    onCancel: () => void;
}) => {
    const { isAuthenticated } = useStore();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<StepFormData>(initialFormData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const toastTimeoutRef = useRef<NodeJS.Timeout>(null);

    const { countries, states, cities, loadingCountries, loadingStates, loadingCities } = useGeography(formData.country || '', formData.state || '');

    useEffect(() => {
        if (!isAuthenticated) {
            onCancel();
        }
    }, [isAuthenticated, onCancel]);

    const handleInputChange = (field: keyof StepFormData, value: string) => {
        setFormData(prev => {
            const newData = { ...prev, [field]: value };
            if (field === 'country') {
                newData.state = "";
                newData.city = "";
            } else if (field === 'state') {
                newData.city = "";
            }
            return newData;
        });
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
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted && !submitError) {
        return (
            <div className="absolute inset-0 bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] flex items-center justify-center z-10 w-full h-full min-h-[400px]">
                <SuccessState onReset={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                    setFormData(initialFormData);
                    setImagePreview(null);
                    setSubmitError(null);
                }} />
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.3 }}
                        className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 ${toast.type === 'success'
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
                            <p className="text-sm font-medium text-red-800 dark:text-red-200">{submitError}</p>
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">Please check your inputs and try again.</p>
                        </div>
                        <button onClick={() => setSubmitError(null)} className="text-red-400 hover:text-red-600 transition-colors">
                            <X size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mb-12 px-8">
                <div className="flex items-center justify-between relative">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 dark:bg-gray-800 -z-10" />
                    {[1, 2, 3, 4].map((step) => {
                        const isActive = currentStep === step;
                        const isCompleted = currentStep > step;

                        return (
                            <div key={step} className="flex flex-col items-center bg-white/80 dark:bg-black/80 backdrop-blur-sm p-2 rounded-lg">
                                <motion.div
                                    animate={{ scale: isActive ? 1.1 : 1 }}
                                    className={cn(
                                        "w-6 h-6 rounded-full flex items-center justify-center transition-all",
                                        isCompleted ? "bg-primary" : "bg-transparent border-2 border-gray-200 dark:border-gray-700",
                                        isActive && "ring-2 ring-primary/20"
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check size={12} className="text-black stroke-[3px]" />
                                    ) : (
                                        <span className={cn("text-xs font-bold", isActive ? "text-black dark:text-white" : "text-gray-400")}>{step}</span>
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
                            <StepOneCore formData={formData} handleInputChange={handleInputChange} errors={errors} />
                        )}
                        {currentStep === 2 && (
                            <StepTwoLocation
                                formData={formData}
                                handleInputChange={handleInputChange}
                                errors={errors}
                                countries={countries}
                                states={states}
                                cities={cities}
                                loadingCountries={loadingCountries}
                                loadingStates={loadingStates}
                                loadingCities={loadingCities}
                            />
                        )}
                        {currentStep === 3 && (
                            <StepThreeSpecs formData={formData} handleInputChange={handleInputChange} />
                        )}
                        {currentStep === 4 && (
                            <StepFourValuation
                                formData={formData}
                                handleInputChange={handleInputChange}
                                fileInputRef={fileInputRef}
                                isUploading={isUploading}
                                imagePreview={imagePreview}
                                handleImageUpload={handleImageUpload}
                                removeImage={removeImage}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

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
                                <RefreshCw size={14} strokeWidth={3} className="animate-spin" /> Processing...
                            </>
                        ) : (
                            <>
                                {currentStep < 4 ? "Next Step" : "Finalize Asset"} <ChevronRight size={14} strokeWidth={3} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
