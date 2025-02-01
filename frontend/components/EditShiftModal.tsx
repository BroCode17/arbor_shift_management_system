'use client'
import React from 'react';
import { format } from 'date-fns';
import ScheduleModal, { ScheduleData } from './ScheduleModal';

interface EditShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift: ScheduleData;
  onSave: (updatedShift: ScheduleData) => void;
}

const EditShiftModal: React.FC<EditShiftModalProps> = ({
  isOpen,
  onClose,
  shift,
  onSave,
}) => {
  const handleSave = (updatedData: ScheduleData) => {
    try {
      onSave({
        ...shift,
        ...updatedData,
      });
      onClose();
    } catch (error) {
      console.error('Error updating shift:', error);
      alert('Failed to update shift. Please try again.');
    }
  };

  return (
    <ScheduleModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      initialData={shift}
      isEditing={true}
    />
  );
};

export default EditShiftModal;