'use client'
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format, addDays } from 'date-fns';
import 'react-calendar/dist/Calendar.css';

interface ScheduleControlsProps {
  onDateChange: (date: Date) => void;
  onAddSchedule: () => void;
}

const ScheduleControls: React.FC<ScheduleControlsProps> = ({ onDateChange, onAddSchedule }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    onDateChange(date);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    onDateChange(today);
  };

  return (
    <div className="flex items-center justify-between p-4 relative">
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <button 
            className="p-2 border rounded hover:bg-gray-50"
            onClick={() => handleDateChange(addDays(selectedDate, -1))}
          >
            {/* Previous arrow SVG */}
          </button>
          <button 
            className="p-2 border rounded hover:bg-gray-50"
            onClick={() => handleDateChange(addDays(selectedDate, 1))}
          >
            {/* Next arrow SVG */}
          </button>
        </div>
        <button 
          className="flex items-center gap-2 border rounded px-4 py-2 hover:bg-gray-50"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          {format(selectedDate, 'MMM dd, yyyy')}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        </button>
        {showCalendar && (
          <div className="absolute top-16 left-0 z-50 shadow-lg bg-white rounded-lg">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="border-0"
            />
          </div>
        )}
        <button 
          className="px-4 py-2 border rounded hover:bg-gray-50"
          onClick={handleTodayClick}
        >
          Today
        </button>
      </div>
      <div className="flex gap-4">
        <button className="px-4 py-2 border rounded flex items-center gap-2">
          All members
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