'use client'
import React from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { Clock, MapPin, CheckCircle } from 'lucide-react';

const ClaimedShiftsCalendar = () => {
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
            <div className="p-2 bg-green-50 rounded text-sm border border-green-100">
              <div className="flex items-center justify-between">
                <div className="font-medium">Emergency</div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Clock className="w-3 h-3" />
                <span>07:00-15:00</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                <MapPin className="w-3 h-3" />
                <span>West Wing</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClaimedShiftsCalendar;