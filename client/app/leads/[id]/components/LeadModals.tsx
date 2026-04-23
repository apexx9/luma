"use client";

import { Modal } from "@/components/Modal";
import { ActionButton } from "@/components/ActionComponents";

interface LeadModalsProps {
  isViewingModalOpen: boolean;
  setIsViewingModalOpen: (open: boolean) => void;
  isContractModalOpen: boolean;
  setIsContractModalOpen: (open: boolean) => void;
  onScheduleViewing: () => void;
  onGenerateContract: () => void;
}

export function LeadModals({
  isViewingModalOpen,
  setIsViewingModalOpen,
  isContractModalOpen,
  setIsContractModalOpen,
  onScheduleViewing,
  onGenerateContract
}: LeadModalsProps) {
  return (
    <>
      <Modal
        isOpen={isViewingModalOpen}
        onClose={() => setIsViewingModalOpen(false)}
        title="Schedule Property Viewing"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Property</label>
            <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm appearance-none">
              <option>The Skyline Loft - Unit 87</option>
              <option>Modern Heights - Unit 12</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Date</label>
              <input type="date" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Time</label>
              <input type="time" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm" />
            </div>
          </div>
          <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4">
            <button onClick={() => setIsViewingModalOpen(false)} className="px-8 py-4 rounded-full text-sm font-bold text-gray-500 transition-colors">Cancel</button>
            <ActionButton onClick={onScheduleViewing}>Schedule Viewing</ActionButton>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
        title="Generate New Contract"
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
              <p className="text-sm font-medium">Drafting contract for <span className="font-bold">Unit 87 at The Skyline Loft</span> for Devon Lindsay.</p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Contract Type</label>
              <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm appearance-none">
                <option>Standard Residential Lease</option>
                <option>Short-term Rental Agreement</option>
                <option>Commercial Lease</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Monthly Rent</label>
                <input type="text" defaultValue="$2,600" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Security Deposit</label>
                <input type="text" defaultValue="$5,200" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm font-bold" />
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4">
            <button onClick={() => setIsContractModalOpen(false)} className="px-8 py-4 rounded-full text-sm font-bold text-gray-500 transition-colors">Cancel</button>
            <ActionButton onClick={onGenerateContract}>Generate & Send</ActionButton>
          </div>
        </div>
      </Modal>
    </>
  );
}
