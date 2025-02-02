'use client'
import React, { useState } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import Image from 'next/image';
import { Check, Clock, X } from 'lucide-react';

interface TimesheetGridProps {
  employees: any[];
  selectedDate: Date;
}

import { useViewModeStore } from '../store/viewModeStore';
import { isSameDay, isSameWeek, parseISO } from 'date-fns';

const TimesheetGrid: React.FC<TimesheetGridProps> = ({ 
  employees, 
  selectedDate,
}) => {
  const viewMode = useViewModeStore((state) => state.viewMode);
  const [shiftStatuses, setShiftStatuses] = useState<Record<string, 'approved' | 'declined' | null>>({});
  
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });

  const getDaysArray = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(weekStart, i);
      return {
        day: format(date, 'EEE').toUpperCase(),
        date: format(date, 'd'),
        fullDate: format(date, 'yyyy-MM-dd'),
        month: format(date, 'MMM'),
      };
    });
  };

  const daysToShow = getDaysArray();

  const getShiftStatus = (shift: any) => {
    if (shift.status === 'early') return { color: 'text-blue-500', label: 'Early' };
    if (shift.status === 'on-time') return { color: 'text-green-500', label: 'On time' };
    return { color: 'text-gray-500', label: 'Pending' };
  };

  const handleApproveShift = (employeeId: string, date: string) => {
    const key = `${employeeId}-${date}`;
    setShiftStatuses(prev => ({ ...prev, [key]: 'approved' }));
  };

  const handleDeclineShift = (employeeId: string, date: string) => {
    const key = `${employeeId}-${date}`;
    setShiftStatuses(prev => ({ ...prev, [key]: 'declined' }));
  };

  const handleApproveRow = (employeeId: string) => {
    const newStatuses = { ...shiftStatuses };
    const employee = employees.find(emp => emp.id === employeeId);
    
    if (employee) {
      daysToShow.forEach(day => {
        const hasShift = employee.schedules.some(
          schedule => format(new Date(schedule.date), 'yyyy-MM-dd') === day.fullDate
        );
        if (hasShift) {
          const key = `${employeeId}-${day.fullDate}`;
          newStatuses[key] = 'approved';
        }
      });
    }
    setShiftStatuses(newStatuses);
  };

  const handleApproveAll = () => {
    const newStatuses = { ...shiftStatuses };
    employees.forEach(employee => {
      daysToShow.forEach(day => {
        const hasShift = employee.schedules.some(
          schedule => format(new Date(schedule.date), 'yyyy-MM-dd') === day.fullDate
        );
        if (hasShift) {
          const key = `${employee.id}-${day.fullDate}`;
          newStatuses[key] = 'approved';
        }
      });
    });
    setShiftStatuses(newStatuses);
  };

  const isCurrentTime = (shift: any, date: string) => {
    if (!shift) return false;
    const now = new Date();
    const [startTime, endTime] = shift.time.split('-');
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentDate = format(now, 'yyyy-MM-dd');

    // Check if it's the current date and time is within shift window
    return currentDate === date && 
           ((currentHour === startHour && currentMinute >= (startMinute || 0)) || 
            (currentHour > startHour));
  };

  const getColumnHighlight = (day: any) => {
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    const currentWeekStart = format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd');
    const dayWeekStart = format(startOfWeek(parseISO(day.fullDate), { weekStartsOn: 1 }), 'yyyy-MM-dd');

    if (viewMode === 'live' && day.fullDate === currentDate) {
      return 'bg-blue-50/80 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.1)] relative z-10';
    }
    if (viewMode === 'day' && day.fullDate === currentDate) {
      return 'bg-blue-50/80 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.1)] relative z-10';
    }
    if (viewMode === 'week' && dayWeekStart === currentWeekStart) {
      return 'bg-blue-50/60 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.1)] relative z-10';
    }
    return '';
  };

  // Add this function after other utility functions
  // Update the calculateTotalHours function
  const calculateTotalHours = (schedules: any[], startDate: Date) => {
    let totalMinutes = 0;
    
    schedules.forEach(schedule => {
      const scheduleDate = new Date(schedule.date);
      const isInSelectedWeek = isSameWeek(scheduleDate, startDate, { weekStartsOn: 1 });
      
      if (isInSelectedWeek && schedule.shifts) {
        schedule.shifts.forEach((shift: any) => {
          if (shift.type !== 'out' && shift.time) {
            const [startTime, endTime] = shift.time.split('-');
            if (startTime && endTime) {
              const [startHour, startMinute] = startTime.split(':').map(Number);
              const [endHour, endMinute] = endTime.split(':').map(Number);
              
              let minutes = (endHour * 60 + (endMinute || 0)) - (startHour * 60 + (startMinute || 0));
              if (minutes < 0) {
                minutes += 24 * 60;
              }
              totalMinutes += minutes;
            }
          }
        });
      }
    });

    return (totalMinutes / 60).toFixed(1);
  };

  // Update the return JSX for responsive design
  return (
    <div className="border rounded-lg overflow-hidden mt-4 overflow-x-auto">
      <div className="min-w-[1200px] grid grid-cols-[minmax(200px,250px)_repeat(7,minmax(120px,1fr))_minmax(100px,auto)_minmax(100px,auto)] bg-gray-50">
        <div className="p-4 font-medium border-b flex justify-between items-center">
          <span>Employee</span>
          <button 
            onClick={handleApproveAll}
            className="text-sm px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Approve All
          </button>
        </div>
        
        {daysToShow.map((day) => (
          <div 
            key={day.date} 
            className={`p-4 text-center border-b border-l transition-all duration-300 ${getColumnHighlight(day)}`}
          >
            <div className={`text-2xl font-medium ${
              (viewMode === 'live' || viewMode === 'day' ) && day.fullDate === format(new Date(), 'yyyy-MM-dd') 
                ? 'text-blue-600' 
                : ''
            }`}>
              {day.date}
            </div>
            <div className={`text-xs ${
              (viewMode === 'live' || viewMode === 'day') && day.fullDate === format(new Date(), 'yyyy-MM-dd')
                ? 'text-blue-500' 
                : 'text-gray-500'
            }`}>
              {day.day}
            </div>
            <div className={`text-xs ${
              (viewMode === 'live' || viewMode === 'day') && day.fullDate === format(new Date(), 'yyyy-MM-dd')
                ? 'text-blue-500' 
                : 'text-gray-500'
            }`}>
              {day.month}
            </div>
          </div>
        ))}
        <div className="p-4 font-medium border-b border-l text-center whitespace-nowrap">
          Total Hours
        </div>
        <div className="p-4 font-medium border-b border-l text-center">Actions</div>

        {employees.map((employee) => (
          <React.Fragment key={employee.id}>
            <div className="p-4 flex items-center gap-3 border-b bg-white">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={employee.avatar}
                  alt={employee.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="font-medium">{employee.name}</div>
                <div className="text-xs text-gray-500">{employee.role}</div>
              </div>
            </div>

            {daysToShow.map((day) => {
              const daySchedule = employee.schedules.find(
                (s: any) => format(new Date(s.date), 'yyyy-MM-dd') === day.fullDate
              );
              const status = shiftStatuses[`${employee.id}-${day.fullDate}`];

              return (
                <div 
                  key={day.date} 
                  className={`relative p-4 border-b border-l bg-white transition-all duration-300 ${getColumnHighlight(day)}`}
                >
                  {daySchedule?.shifts.map((shift: any, idx: number) => {
                    const shiftStatus = getShiftStatus(shift);
                    const isLiveShift = viewMode === 'live' && isCurrentTime(shift, day.fullDate);

                    return (
                      <div 
                        key={idx}
                        className={`p-2 rounded mb-1 ${
                          shift.type === 'out' ? 'bg-orange-100' : 
                          status === 'approved' ? 'bg-green-50' :
                          status === 'declined' ? 'bg-red-50' :
                          'bg-blue-50'
                        } ${
                          isLiveShift ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                        }`}
                      >
                        <div className="text-sm font-medium">{shift.time}</div>
                        {shift.type !== 'out' && (
                          <div className={`text-xs flex items-center gap-1 ${shiftStatus.color}`}>
                            <Clock className="w-3 h-3" />
                            {shiftStatus.label}
                          </div>
                        )}
                        {shift.type === 'out' && (
                          <div className="text-xs text-orange-500">All day</div>
                        )}
                      </div>
                    );
                  })}
                  {daySchedule && !status && (
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button
                        onClick={() => handleApproveShift(employee.id, day.fullDate)}
                        className="p-1 text-green-500 hover:bg-green-50 rounded"
                        title="Approve"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeclineShift(employee.id, day.fullDate)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                        title="Decline"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  {status === 'approved' && (
                    <div className="absolute top-2 right-2 text-green-500">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                  {status === 'declined' && (
                    <div className="absolute top-2 right-2 text-red-500">
                      <X className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            <div className="p-4 border-b border-l bg-white flex items-center justify-center">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-700">
                  {calculateTotalHours(employee.schedules, weekStart)}h
                </span>
              </div>
            </div>

            <div className="p-4 border-b border-l bg-white flex justify-center">
              <button
                onClick={() => handleApproveRow(employee.id)}
                className="px-3 py-1 text-sm border rounded hover:bg-gray-50 whitespace-nowrap"
              >
                Approve Row
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TimesheetGrid;