'use client'
import React from 'react';
import { MapPin, Clock, DollarSign } from 'lucide-react';

const OpenShiftsSection = () => {
  const openShifts = [
    {
      id: '1',
      date: '2024-02-20',
      time: '07:00-15:00',
      department: 'Emergency',
      location: 'West Wing',
      hourlyRate: 45,
      urgency: 'high',
    },
    {
      id: '2',
      date: '2024-02-21',
      time: '15:00-23:00',
      department: 'ICU',
      location: 'East Wing',
      hourlyRate: 50,
      urgency: 'medium',
    },
  ];

  return (
    <div className="space-y-4">
      {openShifts.map((shift) => (
        <div
          key={shift.id}
          className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium">{shift.department}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{shift.time}</span>
              </div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs ${
              shift.urgency === 'high' 
                ? 'bg-red-100 text-red-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {shift.urgency === 'high' ? 'Urgent' : 'Open'}
            </span>
          </div>
          
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{shift.location}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span>${shift.hourlyRate}/hr</span>
            </div>
          </div>
          
          <button 
            className="w-full mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Claim Shift
          </button>
        </div>
      ))}
    </div>
  );
};

export default OpenShiftsSection;