"use client";

import { Modal } from "@/components/Modal";
import { StepForm } from "@/components/StepForm";
import { Building } from "@/types/building.types";

interface BuildingsModalsProps {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  editingBuilding: Building | null;
  onCreateBuilding: (data: any) => void;
  onUpdateBuilding: (data: any) => void;
  showSuccessState?: boolean;
  onShowSuccess?: () => void;
}

export function BuildingsModals({
  isAddModalOpen,
  setIsAddModalOpen,
  isEditModalOpen,
  setIsEditModalOpen,
  editingBuilding,
  onCreateBuilding,
  onUpdateBuilding,
  showSuccessState = false,
  onShowSuccess
}: BuildingsModalsProps) {
  return (
    <>
      {/* ADD BUILDING MODAL - Only show if not in success state */}
      {isAddModalOpen && !showSuccessState && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Building"
        >
          <StepForm 
            onSubmit={onCreateBuilding}
            onCancel={() => setIsAddModalOpen(false)}
            onShowSuccess={onShowSuccess}
          />
        </Modal>
      )}

      {/* EDIT BUILDING MODAL */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Building"
        >
          <StepForm 
            onSubmit={onUpdateBuilding}
            onCancel={() => setIsEditModalOpen(false)}
          />
        </Modal>
      )}

      {/* SUCCESS STATE - Full screen without modal */}
      {isAddModalOpen && showSuccessState && (
        <div className="fixed inset-0 bg-white dark:bg-[#0A0A0B] flex items-center justify-center z-50">
          <StepForm 
            onSubmit={onCreateBuilding}
            onCancel={() => setIsAddModalOpen(false)}
            onShowSuccess={onShowSuccess}
          />
        </div>
      )}
    </>
  );
}
