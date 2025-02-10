'use client'
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Clock, MapPin, Check, DollarSign } from 'lucide-react';
import ShiftClaimModal from './ShiftClaimModal';

const AvailabilityCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedShift, setSelectedShift] = useState(null);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  // Mock monthly shifts data
  const monthlyShifts = [
    {
      id: '1',
      date: '2025-02-15',
      shifts: [
        {
          id: 'a1',
          time: '07:00-15:00',
          department: 'Emergency',
          location: 'West Wing',
          rate: 30,
          status: 'open'
        },
        {
          id: 'a2',
          time: '15:00-23:00',
          department: 'ICU',
          location: 'North Wing',
          rate: 35,
          status: 'claimed'
        }
      ]
    },
    {
      id: '2',
      date: '2025-02-16',
      shifts: [
        {
          id: 'b1',
          time: '07:00-15:00',
          department: 'Surgery',
          location: 'East Wing',
          rate: 40,
          status: 'open'
        }
      ]
    }
  ];

  const handleClaimShift = (shiftId) => {
    // Update shift status logic here
    setIsClaimModalOpen(false);
  };

  const getShiftsForDay = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const dayShifts = monthlyShifts.find(day => day.date === formattedDate);
    return dayShifts?.shifts || [];
  };

  return (
    <div className="space-y-6">
      {/* Calendar View */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Monthly Schedule</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-lg font-medium">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="text-center font-medium text-gray-500">{day}</div>
          ))}
          {eachDayOfInterval({ start: startOfMonth(currentMonth), end: endOfMonth(currentMonth) }).map(day => {
            const dayShifts = getShiftsForDay(day);
            return (
              <div key={day.toString()}
                className={`min-h-[100px] p-2 border rounded-lg ${
                  !isSameMonth(day, currentMonth) ? 'bg-gray-50' : 'hover:bg-gray-50'
                }`}>
                <div className="font-medium mb-1">{format(day, 'd')}</div>
                <div className="space-y-1">
                  {dayShifts.map(shift => (
                    <button key={shift.id}
                      onClick={() => !shift.status === 'claimed' && handleShiftClick(shift)}
                      className={`w-full p-1 text-xs rounded-md flex items-center justify-between
                        ${shift.status === 'claimed' 
                          ? 'bg-green-50 text-green-600' 
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{shift.time.split('-')[0]}</span>
                      </div>
                      {shift.status === 'claimed' && <Check className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Shifts Grid */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Available Shifts</h2>
          <div className="flex gap-4">
            <span className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              Available
            </span>
            <span className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              Claimed
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {monthlyShifts.flatMap(day => day.shifts.map(shift => (
            <div key={shift.id} 
              className={`border rounded-lg p-4 ${
                shift.status === 'claimed' ? 'bg-green-50 border-green-200' : ''
              }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{shift.time}</span>
                </div>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  shift.status === 'claimed'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {shift.status === 'claimed' ? 'Claimed' : 'Available'}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{shift.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span>${shift.rate}/hr</span>
                </div>
              </div>

              {shift.status !== 'claimed' && (
                <button
                  onClick={() => handleShiftClick(shift)}
                  className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Claim Shift
                </button>
              )}
            </div>
          )))}
        </div>
      </div>

      <ShiftClaimModal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        shift={selectedShift}
        onClaim={handleClaimShift}
      />
    </div>
  );
};

export default AvailabilityCalendar;