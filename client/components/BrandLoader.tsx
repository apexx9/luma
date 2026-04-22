"use client";

export default function BrandLoader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-blue-950 z-50 overflow-hidden">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 relative">
                    <div className="absolute w-full h-full rounded-full border border-primary/20 animate-spin"></div>
                    <div className="absolute w-12 h-12 rounded-full border-t-2 border-primary border-transparent animate-spin" style={{ animationDirection: 'reverse' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-primary rounded-full animate-pulse"></div>
                    </div>
                </div>
                <p className="text-gray-500 text-sm font-medium">Loading properties...</p>
            </div>
        </div>
    );
}
