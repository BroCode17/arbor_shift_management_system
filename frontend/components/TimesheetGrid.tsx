'use client'
import React, { useState } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import Image from 'next/image';
import { Check, Clock, X } from 'lucide-react';

interface TimesheetGridProps {
  employees: any[];
  selectedDate: Date;
}

const TimesheetGrid: React.FC<TimesheetGridProps> = ({ employees, selectedDate }) => {
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

  // Update the grid item rendering
  return (
    <div className="border rounded-lg overflow-hidden mt-4">
      <div className="grid grid-cols-[minmax(200px,250px)_repeat(7,1fr)_100px] bg-gray-50">
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
          <div key={day.date} className="p-4 text-center border-b border-l">
            <div className="text-2xl font-medium">{day.date}</div>
            <div className="text-xs text-gray-500">{day.day}</div>
            <div className="text-xs text-gray-500">{day.month}</div>
          </div>
        ))}
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
                <div key={day.date} className="relative p-4 border-b border-l bg-white">
                  {daySchedule?.shifts.map((shift: any, idx: number) => {
                    const shiftStatus = getShiftStatus(shift);
                    return (
                      <div 
                        key={idx}
                        className={`p-2 rounded mb-1 ${
                          shift.type === 'out' ? 'bg-orange-100' : 
                          status === 'approved' ? 'bg-green-50' :
                          status === 'declined' ? 'bg-red-50' :
                          'bg-blue-50'
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

            <div className="p-4 border-b border-l bg-white flex justify-center gap-2">
              <button
                onClick={() => handleApproveRow(employee.id)}
                className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
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