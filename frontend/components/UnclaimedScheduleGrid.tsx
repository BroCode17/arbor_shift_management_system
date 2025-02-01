'use client'
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import EditShiftModal from './EditShiftModal';
import { ScheduleData } from './ScheduleModal';

interface ShiftDetails {
  location: string;
  department: string;
  certifications: string[];
  hourlyRate: number;
  supervisorOnDuty: string;
  breakTime: string;
  claimedBy: string | null;
}

interface Shift {
  time: string;
  status: 'unclaimed';
  type: 'shift' | 'out' | 'meeting';
  details: ShiftDetails;
}

interface UnclaimedShiftData {
  id: string;
  date: string;
  shifts: Shift[];
}

interface UnclaimedScheduleGridProps {
  shifts: ScheduleData
}

const UnclaimedScheduleGrid: React.FC<any> = ({ shifts }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState<UnclaimedShiftData | null>(null);

  const handleEditShift = (shift: UnclaimedShiftData) => {
    setSelectedShift(shift);
    setIsEditModalOpen(true);
  };

  const handleDeleteShift = async (shiftId: string) => {
    if (confirm('Are you sure you want to delete this shift?')) {
      try {
        // API call to delete shift would go here
        console.log('Deleting shift:', shiftId);
      } catch (error) {
        console.error('Error deleting shift:', error);
        alert('Failed to delete shift');
      }
    }
  };

  const ShiftCard = ({ shift }: { shift: UnclaimedShiftData }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow hover:bg-red-100">
      {shift.shifts.map((shiftItem, index) => (
        <div key={index} className="mb-4 last:mb-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium">{shiftItem.details.department}</h3>
              <p className="text-sm text-gray-600">{shiftItem.time}</p>
              <p className="text-sm text-gray-600">{format(new Date(shift.date), 'MMM dd, yyyy')}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleEditShift(shift)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Pencil className="w-4 h-4 text-gray-600" />
              </button>
              <button 
                onClick={() => handleDeleteShift(shift.id)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600">Location: {shiftItem.details.location}</p>
            <p className="text-gray-600">Rate: ${shiftItem.details.hourlyRate}/hr</p>
            <p className="text-gray-600">Break: {shiftItem.details.breakTime}</p>
            <p className="text-gray-600">Supervisor: {shiftItem.details.supervisorOnDuty}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {shiftItem.details.certifications.map((cert, certIndex) => (
                <span 
                  key={certIndex}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-full overflow-x-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {shifts.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No unclaimed shifts available
          </div>
        ) : (
          shifts.map(shift => (
            <ShiftCard key={shift.id} shift={shift} />
          ))
        )}
      </div>

      {isEditModalOpen && selectedShift && (
        <EditShiftModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          shift={selectedShift}
          onSave={(updatedShift) => {
            console.log('Updated shift:', updatedShift);
            setIsEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default UnclaimedScheduleGrid;