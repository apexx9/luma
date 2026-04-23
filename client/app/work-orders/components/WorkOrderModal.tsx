"use client";

import { Modal } from "@/components/Modal";
import { ActionButton } from "@/components/ActionComponents";

interface WorkOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: WorkOrderFormData) => void;
}

interface WorkOrderFormData {
  title: string;
  category: string;
  priority: string;
  building: string;
  unit: string;
  description: string;
}

export function WorkOrderModal({ isOpen, onClose, onSubmit }: WorkOrderModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: WorkOrderFormData = {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      priority: formData.get('priority') as string,
      building: formData.get('building') as string,
      unit: formData.get('unit') as string,
      description: formData.get('description') as string,
    };
    onSubmit(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="New Maintenance Request"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Issue Title</label>
          <input 
            name="title"
            type="text" 
            placeholder="e.g. Kitchen sink leakage" 
            className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm" 
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Category</label>
            <select name="category" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm appearance-none" required>
              <option>Plumbing</option>
              <option>Electrical</option>
              <option>HVAC</option>
              <option>General Repair</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Priority</label>
            <select name="priority" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm appearance-none" required>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Building</label>
            <select name="building" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm appearance-none" required>
              <option>The Skyline Loft</option>
              <option>Modern Heights</option>
              <option>Serene Gardens</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Unit</label>
            <input 
              name="unit"
              type="text" 
              placeholder="e.g. 171" 
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm" 
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</label>
          <textarea 
            name="description"
            rows={3} 
            placeholder="Describe the issue in detail..." 
            className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/40 border-none focus:ring-2 focus:ring-primary text-sm resize-none" 
            required
          />
        </div>
        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-4 rounded-full text-sm font-bold text-gray-500 hover:text-black dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          <ActionButton type="submit">
            Submit Request
          </ActionButton>
        </div>
      </form>
    </Modal>
  );
}
