"use client";

export default function BrandLoader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black dark:bg-black z-50 overflow-hidden">
            <div className="text-center">
                {/* Brand Logo */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-black font-black text-2xl shadow-glow">S</div>
                    <span className="text-3xl font-black text-white tracking-tighter">Space_</span>
                </div>
                
                {/* Loading Animation */}
                <div className="w-16 h-16 mx-auto mb-4 relative">
                    <div className="absolute w-full h-full rounded-full border border-primary/20 animate-spin"></div>
                    <div className="absolute w-12 h-12 rounded-full border-t-2 border-primary border-transparent animate-spin" style={{ animationDirection: 'reverse' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-primary rounded-full animate-pulse"></div>
                    </div>
                </div>
                <p className="text-gray-400 text-sm font-medium">Loading...</p>
            </div>
        </div>
    );
}
