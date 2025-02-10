'use client'
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, addMonths, subMonths, startOfWeek, endOfWeek, isSameWeek, eachWeekOfInterval, addDays, subDays } from 'date-fns';
import { ChevronLeft, ChevronRight, Clock, Building, Calendar } from 'lucide-react';

const MonthlyShiftCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('Month');
  



  // Enhanced mock data for shifts
  const shifts = [
    {
      id: '1',
      date: '2025-02-12',
      time: '8a-4p',
      department: 'MOC/Best Western',
      code: 'PRD H02 #289147',
      status: 'ended',
      hours: 8,
      rate: 30,
      earnings: 240
    },
    {
      id: '2',
      date: '2025-02-13',
      time: '3p-11p',
      department: 'YOU/Oxford',
      code: 'PRD H03 #286574',
      status: 'inProgress',
      hours: 8,
      rate: 35,
      earnings: 280
    },
    {
      id: '3',
      date: '2025-02-14',
      time: '7a-3p',
      department: 'Emergency',
      code: 'PRD H01 #289150',
      status: 'upcoming',
      hours: 8,
      rate: 40,
      earnings: 320
    }
  ];

  const getWeekStats = (weekStart: Date) => {
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 0 });
    let totalHours = 0;
    let totalEarnings = 0;
    let shiftCount = 0;

    shifts.forEach(shift => {
      const shiftDate = new Date(shift.date);
      if (isSameWeek(shiftDate, weekStart, { weekStartsOn: 0 })) {
        totalHours += shift.hours;
        totalEarnings += shift.earnings;
        shiftCount++;
      }
    });

    return { totalHours, totalEarnings, shiftCount };
  };

  const weeks = eachWeekOfInterval(
    {
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate)
    },
    { weekStartsOn: 0 }
  );

  const DayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const currentDayShifts = shifts.filter(
      shift => shift.date === format(currentDate, 'yyyy-MM-dd')
    );

    return (
      <div className="flex flex-col h-[calc(100vh-200px)]">
        <div className="grid grid-cols-8 border-b">
          <div className="p-2 text-sm font-medium text-gray-500 border-r w-20">
            GMT+
          </div>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="p-2 text-sm font-medium text-center">
              {day}
            </div>
          ))}
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-8">
            <div className="border-r">
              <div className="sticky top-0 bg-white text-xs text-gray-500 px-2 py-1">
                All-day
              </div>
              {hours.map(hour => (
                <div key={hour} className="h-20 border-b px-2 text-xs text-gray-500">
                  {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                </div>
              ))}
            </div>

            {Array.from({ length: 7 }).map((_, dayIndex) => (
              <div key={dayIndex} className="relative border-r">
                <div className="sticky top-0 bg-white border-b h-7"></div>
                {hours.map(hour => (
                  <div key={hour} className="h-20 border-b"></div>
                ))}
                {currentDayShifts.map(shift => {
                  const [startHour] = shift.time.split('-')[0].match(/\d+/) || [];
                  const startPosition = parseInt(startHour) * 80; // 80px is the height of each hour slot
                  const duration = 2; // Example: 2 hours duration
                  
                  return (
                    <div
                      key={shift.id}
                      className={`absolute left-1 right-1 ${
                        shift.status === 'ended' ? 'bg-pink-100' :
                        shift.status === 'inProgress' ? 'bg-green-100' :
                        'bg-blue-100'
                      } rounded-md p-2`}
                      style={{
                        top: `${startPosition + 28}px`, // 28px is the header height
                        height: `${duration * 80 - 4}px`
                      }}
                    >
                      <div className="text-xs font-medium">{shift.department}</div>
                      <div className="text-xs text-gray-600">{shift.time}</div>
                      <div className="text-xs text-gray-500">{shift.code}</div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-8">
            <h2 className="text-2xl font-semibold">
              {format(currentDate, view === 'Day' ? 'MMMM d, yyyy' : 'MMMM yyyy')}
            </h2>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {['Day', 'Week', 'Month', 'Year'].map((viewOption) => (
                <button
                  key={viewOption}
                  onClick={() => setView(viewOption)}
                  className={`px-4 py-1 rounded-md text-sm ${
                    view === viewOption
                      ? 'bg-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {viewOption}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => view === 'Day' 
                ? setCurrentDate(subDays(currentDate, 1))
                : setCurrentDate(subMonths(currentDate, 1))
              }
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-1 text-sm border rounded-md hover:bg-gray-50"
            >
              Today
            </button>
            <button
              onClick={() => view === 'Day'
                ? setCurrentDate(addDays(currentDate, 1))
                : setCurrentDate(addMonths(currentDate, 1))
              }
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {view === 'Day' ? (
          <DayView />
        ) : (
          <div className="grid grid-cols-7">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="p-3 text-sm font-medium text-gray-600 border-b">
                {day}
              </div>
            ))}
            {eachDayOfInterval({
              start: startOfMonth(currentDate),
              end: endOfMonth(currentDate)
            }).map(day => {
              const dayShifts = shifts.filter(shift => shift.date === format(day, 'yyyy-MM-dd'));
              const isToday = format(new Date(), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
              
              return (
                <div key={day.toString()}
                  className={`min-h-[120px] p-3 border-b border-r relative ${
                    !isSameMonth(day, currentDate) ? 'bg-gray-50/50' : ''
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
                    {format(day, 'MM-dd') === '01-01' && (
                      <span className="text-xs text-gray-500">January {format(day, 'yyyy')}</span>
                    )}
                  </div>
                  <div className="space-y-1">
                    {dayShifts.map(shift => (
                      <div
                        key={shift.id}
                        className="text-xs cursor-pointer group"
                      >
                        <div className={`p-1 rounded-md border-l-2 ${
                          shift.status === 'ended' 
                            ? 'border-l-orange-500 bg-pink-50'
                            : shift.status === 'inProgress'
                            ? 'border-l-green-500 bg-green-50'
                            : 'border-l-blue-500 bg-blue-50'
                        }`}>
                          <div className="font-medium">
                            {shift.department}
                          </div>
                          <div className="text-gray-600">
                            {shift.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyShiftCalendar;