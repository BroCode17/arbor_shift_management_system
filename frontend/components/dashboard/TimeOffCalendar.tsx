'use client'
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface TimeOffCalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

const TimeOffCalendar: React.FC<TimeOffCalendarProps> = ({ isOpen, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const timeOffRequests = [
    {
      id: '1',
      startDate: '2024-02-15',
      endDate: '2024-02-17',
      status: 'approved',
      type: 'vacation',
    },
    {
      id: '2',
      startDate: '2024-03-01',
      endDate: '2024-03-02',
      status: 'pending',
      type: 'personal',
    },
  ];

  const getDateStatus = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const request = timeOffRequests.find(req => 
      dateStr >= req.startDate && dateStr <= req.endDate
    );
    return request?.status || null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Time Off Calendar</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm">Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-sm">Pending</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="text-center font-medium text-gray-500">
              {day}
            </div>
          ))}
          {days.map(day => {
            const status = getDateStatus(day);
            return (
              <button
                key={day.toString()}
                onClick={() => {}}
                className={`aspect-square p-2 rounded-lg ${
                  !isSameMonth(day, currentMonth)
                    ? 'text-gray-300'
                    : status === 'approved'
                    ? 'bg-green-50 text-green-600'
                    : status === 'pending'
                    ? 'bg-yellow-50 text-yellow-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-sm">{format(day, 'd')}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 border-t pt-6">
          <h3 className="font-medium mb-4">Upcoming Time Off</h3>
          <div className="space-y-3">
            {timeOffRequests.map(request => (
              <div
                key={request.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <div className="font-medium capitalize">{request.type}</div>
                  <div className="text-sm text-gray-500">
                    {request.startDate} - {request.endDate}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  request.status === 'approved'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {request.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeOffCalendar;