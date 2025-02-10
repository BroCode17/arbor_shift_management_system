'use client'
import React from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { Clock, MapPin, DollarSign } from 'lucide-react';

const OpenShiftsCalendar = () => {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="grid grid-cols-7 gap-4">
      {days.map((day) => (
        <div key={day.toISOString()} className="space-y-2">
          <div className="text-center">
            <div className="text-sm font-medium">
              {format(day, 'EEE')}
            </div>
            <div className="text-2xl font-bold">
              {format(day, 'd')}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="p-2 bg-yellow-50 rounded text-sm border border-yellow-100">
              <div className="font-medium">ICU Shift</div>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Clock className="w-3 h-3" />
                <span>15:00-23:00</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                <DollarSign className="w-3 h-3" />
                <span>$45/hr</span>
              </div>
              <button className="w-full mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
                Claim
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OpenShiftsCalendar;