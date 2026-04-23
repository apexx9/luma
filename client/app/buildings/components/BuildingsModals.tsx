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
}

export function BuildingsModals({
  isAddModalOpen,
  setIsAddModalOpen,
  isEditModalOpen,
  setIsEditModalOpen,
  editingBuilding,
  onCreateBuilding,
  onUpdateBuilding
}: BuildingsModalsProps) {
  return (
    <>
      {/* ADD BUILDING MODAL */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Building"
      >
        <StepForm 
          onSubmit={onCreateBuilding}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* EDIT BUILDING MODAL */}
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
    </>
  );
}
