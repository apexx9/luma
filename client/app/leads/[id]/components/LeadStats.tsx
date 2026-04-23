"use client";

import { TrendingUp, DollarSign, Map as MapIcon, Clock, Zap } from "lucide-react";

export function LeadStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-primary p-8 rounded-[2rem] flex flex-col justify-between relative group overflow-hidden shadow-glow">
        <div className="absolute top-6 right-6 bg-black/10 p-1.5 rounded-full">
          <TrendingUp className="w-4 h-4 text-black" />
        </div>
        <div>
          <p className="text-xs font-bold text-black/70 mb-2 uppercase tracking-widest">Lead Score</p>
          <h3 className="text-5xl font-black text-black">92<span className="text-xl font-bold opacity-40 ml-1">/100</span></h3>
        </div>
        <p className="text-[10px] font-bold text-black mt-6 tracking-wide">+5% VS LAST WEEK</p>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
      </div>

      <div className="bg-surface-dark dark:bg-card-dark p-8 rounded-[2rem] flex flex-col justify-between shadow-soft">
        <div className="flex justify-between items-start mb-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Budget</p>
          <DollarSign className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-3xl font-bold text-white tracking-tight">$850k</h3>
        <div className="w-full bg-gray-800 h-2 rounded-full mt-6 overflow-hidden">
          <div className="bg-primary h-full w-3/4 rounded-full shadow-glow"></div>
        </div>
        <p className="text-[10px] font-bold text-gray-500 mt-2 uppercase">PRE-APPROVED</p>
      </div>

      <div className="bg-surface-dark dark:bg-card-dark p-8 rounded-[2rem] flex flex-col justify-between shadow-soft">
        <div className="flex justify-between items-start mb-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Pref. Location</p>
          <MapIcon className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-white tracking-tight">Downtown</h3>
        <p className="text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-wide">WITHIN 2mi RADIUS</p>
        <div className="mt-4 flex -space-x-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-gray-800 border-2 border-surface-dark flex items-center justify-center text-[10px] font-bold text-white">
              {i === 1 ? 'A' : i === 2 ? 'B' : '+2'}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface-dark dark:bg-card-dark p-8 rounded-[2rem] flex flex-col justify-between shadow-soft border-2 border-primary/20">
        <div className="flex justify-between items-start mb-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Timeline</p>
          <Clock className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-3xl font-bold text-white tracking-tight">ASAP</h3>
        <p className="text-[10px] font-bold text-primary mt-4 flex items-center gap-1 uppercase tracking-widest">
          <Zap className="w-3 h-3 animate-pulse" /> High Urgency
        </p>
        <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase">MOVE IN BY NOV 1</p>
      </div>
    </div>
  );
}
