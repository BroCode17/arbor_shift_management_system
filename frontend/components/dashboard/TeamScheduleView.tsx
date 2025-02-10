'use client'
import React, { useState } from 'react';
import { format, addDays, startOfMonth, endOfMonth, isSameDay, eachDayOfInterval, isSameMonth, addMonths, subMonths } from 'date-fns';
import { User, MapPin, Clock, ChevronLeft, ChevronRight, Building, DollarSign } from 'lucide-react';
import { monthlyShifts } from '@/data/mockShifts';
import ShiftClaimModal from './ShiftClaimModal';
import { isPast, startOfDay } from 'date-fns';

const TeamScheduleView = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedShift, setSelectedShift] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getShiftsForDay = (date) => {
    return monthlyShifts.filter(shift => shift.date === format(date, 'yyyy-MM-dd'));
  };

  // const handleShiftClick = (shift) => {
  //     console.log(shift)
  //   if (shift.status === 'available') {
  //     setSelectedShift(shift);
  //     setIsModalOpen(true);
  //   }
  // };

  const handleClaimShift = async () => {
    // Add your claim logic here
    setIsModalOpen(false);
    setSelectedShift(null);
  };

  const getShiftStyles = (status, shiftDate) => {
    // Check if shift date has passed
    if (isPast(startOfDay(new Date(shiftDate)))) {
      return 'border-l-gray-500 bg-gray-50 cursor-default opacity-60';
    }

    switch (status) {
      case 'claimed':
        return 'border-l-green-500 bg-green-50 cursor-default';
      case 'passed':
        return 'border-l-gray-500 bg-gray-50 cursor-default opacity-60';
      case 'available':
        return 'border-l-blue-500 bg-blue-50 cursor-pointer hover:bg-blue-100';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  const handleShiftClick = (shift) => {
    // Don't allow clicking if shift date has passed
    console.log(startOfDay(new Date(shift.date)));
    if (isPast(startOfDay(new Date(shift.date)))) {
      return;
    }
    
    if (shift.status === 'available') {
      setSelectedShift(shift);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-8">
            <h2 className="text-2xl font-semibold">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-1.5 text-sm border rounded-md bg-white"
            >
              <option value="all">All Departments</option>
              <option value="emergency">Emergency</option>
              <option value="icu">ICU</option>
            </select>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentMonth(new Date())}
                className="px-4 py-1 text-sm border rounded-md hover:bg-gray-50"
              >
                Today
              </button>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-sm font-medium text-gray-600 border-b bg-gray-50">
              {day}
            </div>
          ))}

          {eachDayOfInterval({
            start: startOfMonth(currentMonth),
            end: endOfMonth(currentMonth)
          }).map(day => {
            const dayShifts = getShiftsForDay(day);
            const isToday = isSameDay(day, new Date());
            
            return (
              <div 
                key={day.toString()}
                className={`min-h-[120px] p-2 border-b border-r relative ${
                  !isSameMonth(day, currentMonth) ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm ${
                    isToday 
                      ? 'w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center' 
                      : 'text-gray-900'
                  }`}>
                    {format(day, 'd')}
                  </span>
                  {dayShifts.length > 0 && (
                    <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full">
                      {dayShifts.length} shifts
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  {dayShifts.map(shift => (
                    <button
                      key={shift.id}
                      onClick={() => handleShiftClick(shift)}
                      disabled={shift.status !== 'available' || isPast(startOfDay(new Date(shift.date)))}
                      className="w-full text-left text-xs transition-colors"
                    >
                      <div className={`p-2 rounded-md border-l-2 ${getShiftStyles(shift.status, shift.date)}`}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{shift.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {shift.status === 'claimed' && (
                              <span className="px-1.5 py-0.5 bg-green-100 text-green-600 rounded text-[10px]">
                                Claimed
                              </span>
                            )}
                            <span className="font-medium text-blue-600">${shift.rate}/hr</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            <span>{shift.department}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <MapPin className="w-3 h-3" />
                            <span>{shift.location}</span>
                          </div>
                          {shift.code && (
                            <div className="text-[10px] text-gray-500 mt-1">
                              {shift.code}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
       {/* Shift Claim Modal */}
       <ShiftClaimModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedShift(null);
        }}
        shift={selectedShift}
        onClaim={handleClaimShift}
      />
    </div>
  );
};

export default TeamScheduleView;