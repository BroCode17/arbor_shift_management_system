'use client'
import React, { useState } from 'react';
import { X, Clock, MapPin, DollarSign, AlertCircle } from 'lucide-react';

interface ShiftClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift: {
    id: string;
    department: string;
    date: string;
    time: string;
    location: string;
    hourlyRate: number;
    requirements?: string[];
  };
}

const ShiftClaimModal: React.FC<ShiftClaimModalProps> = ({ isOpen, onClose, shift }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleClaim = async () => {
    setIsSubmitting(true);
    try {
      // API call to claim shift
      await new Promise(resolve => setTimeout(resolve, 1000));
      onClose();
    } catch (error) {
      console.error('Error claiming shift:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Claim Shift</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-lg font-medium mb-2">{shift.department}</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{shift.time}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{shift.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="w-4 h-4" />
                <span>${shift.hourlyRate}/hr</span>
              </div>
            </div>
          </div>

          {shift.requirements && (
            <div className="space-y-2">
              <h3 className="font-medium">Requirements</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {shift.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-yellow-50 p-4 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-700">
              By claiming this shift, you agree to work the specified hours and location.
              Make sure you meet all requirements before proceeding.
            </p>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleClaim}
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? 'Claiming...' : 'Confirm Claim'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftClaimModal;