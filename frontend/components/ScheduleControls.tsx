'use client'
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format, addWeeks, startOfWeek } from 'date-fns';
import 'react-calendar/dist/Calendar.css';

interface ScheduleControlsProps {
  onDateChange: (date: Date) => void;
  onAddSchedule: () => void;
}

const ScheduleControls: React.FC<ScheduleControlsProps> = ({ onDateChange, onAddSchedule }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const handleDateChange = (date: Date) => {
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    setSelectedDate(weekStart);
    setShowCalendar(false);
    onDateChange(weekStart);
  };

  const handleWeekNavigation = (direction: 'prev' | 'next') => {
    const newDate = direction === 'prev' 
      ? addWeeks(selectedDate, -1)
      : addWeeks(selectedDate, 1);
    handleDateChange(newDate);
  };

  const handleTodayClick = () => {
    const today = startOfWeek(new Date(), { weekStartsOn: 1 });
    setSelectedDate(today);
    onDateChange(today);
  };

  const formatDateRange = (date: Date) => {
    const endDate = addWeeks(date, 1);
    return `${format(date, 'MMM dd')} - ${format(endDate, 'MMM dd, yyyy')}`;
  };

  return (
    <div className="flex items-center justify-between p-4 relative">
      <div className="flex items-center gap-4">
        <div className="flex gap-2 h-full">
          <button 
            className="p-2 border rounded hover:bg-gray-50"
            onClick={() => handleWeekNavigation('prev')}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
          </button>
          <button 
            className="p-2 border rounded hover:bg-gray-50"
            onClick={() => handleWeekNavigation('next')}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
          </button>
        </div>
        <button 
          className="flex items-center gap-2 border rounded px-4 py-2 hover:bg-gray-50 min-w-[200px] justify-center"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          {formatDateRange(selectedDate)}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        </button>
        {showCalendar && (
          <div className="absolute top-16 left-0 z-50 shadow-lg bg-white rounded-lg">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className="border-0"
            />
          </div>
        )}
        <button 
          className="px-4 py-2 border rounded hover:bg-gray-50"
          onClick={handleTodayClick}
        >
          This Week
        </button>
      </div>
      <div className="flex gap-4">
        <button className="px-4 py-2 border rounded flex items-center gap-2">
          All Employees
          {/* Dropdown arrow SVG */}
        </button>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onAddSchedule}
        >
          Add a schedule
        </button>
      </div>
    </div>
  );
};

export default ScheduleControls;