'use client'
import React from 'react';
import { format, isToday, isTomorrow, addDays } from 'date-fns';
import { Clock, MapPin, User } from 'lucide-react';

const useTodayTomorrowShifts = () => {
  const today = new Date();
  const mockShifts = [
    {
      id: '1',
      date: format(today, 'yyyy-MM-dd'),
      time: '07:00-15:00',
      location: 'West Wing',
      supervisor: 'Dr. Sarah Johnson',
      status: 'confirmed',
    },
    {
      id: '2',
      date: format(today, 'yyyy-MM-dd'),
      time: '15:00-23:00',
      location: 'Emergency',
      supervisor: 'Dr. Michael Chen',
      status: 'pending',
    },
    {
      id: '3',
      date: format(addDays(today, 1), 'yyyy-MM-dd'),
      time: '07:00-15:00',
      location: 'ICU',
      supervisor: 'Dr. Emily Wilson',
      status: 'confirmed',
    },
  ];

  return mockShifts;
};

const UpcomingShiftsSection = () => {
  const shifts = useTodayTomorrowShifts();

  return (
    <div className="space-y-4">
      {shifts.map((shift) => (
        <div
          key={shift.id}
          className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50"
        >
          <div className="flex-shrink-0">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isToday(new Date(shift.date))
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600'
            }`}>
              <Clock className="h-6 w-6" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">
                {isToday(new Date(shift.date))
                  ? 'Today'
                  : isTomorrow(new Date(shift.date))
                  ? 'Tomorrow'
                  : format(new Date(shift.date), 'MMM d')}
              </h3>
              <span className="text-sm text-gray-500">
                {shift.time}
              </span>
            </div>
            
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{shift.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>Supervisor: {shift.supervisor}</span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <span className={`px-3 py-1 rounded-full text-sm ${
              shift.status === 'confirmed'
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {shift.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingShiftsSection;