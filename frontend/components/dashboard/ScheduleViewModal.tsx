'use client'
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react';
import { format, addWeeks, subWeeks, startOfWeek, addDays } from 'date-fns';

interface ScheduleViewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleViewModal: React.FC<ScheduleViewModalProps> = ({ isOpen, onClose }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedShift, setSelectedShift] = useState<any>(null);

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const shifts = [
    {
      id: '1',
      date: '2024-02-20',
      time: '07:00-15:00',
      department: 'Emergency',
      location: 'West Wing',
      status: 'confirmed',
    },
    // Add more shifts...
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl h-[80vh] flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Schedule</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-medium">
                {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
              </span>
              <button
                onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 grid grid-cols-7 divide-x overflow-hidden">
          {days.map((day) => (
            <div key={day.toISOString()} className="flex flex-col">
              <div className="p-4 text-center border-b bg-gray-50">
                <div className="text-sm font-medium text-gray-500">
                  {format(day, 'EEE')}
                </div>
                <div className="text-lg font-semibold">
                  {format(day, 'd')}
                </div>
              </div>
              <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                {shifts.map((shift) => (
                  <button
                    key={shift.id}
                    onClick={() => setSelectedShift(shift)}
                    className="w-full p-2 text-left bg-blue-50 rounded hover:bg-blue-100"
                  >
                    <div className="font-medium text-sm">{shift.department}</div>
                    <div className="text-xs text-gray-500">{shift.time}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleViewModal;