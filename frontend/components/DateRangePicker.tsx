'use client'
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

interface DateRangePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (range: { start: Date; end: Date }) => void;
  initialDateRange: { start: Date; end: Date };
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  isOpen,
  onClose,
  onSelect,
  initialDateRange,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(initialDateRange.start);
  const [endDate, setEndDate] = useState<Date | null>(initialDateRange.end);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const handleApply = () => {
    if (startDate && endDate) {
      onSelect({ start: startDate, end: endDate });
      onClose();
    }
  };

  const isInRange = (date: Date) => {
    if (!startDate) return false;
    if (!endDate && hoverDate) {
      return (
        (date >= startDate && date <= hoverDate) ||
        (date >= hoverDate && date <= startDate)
      );
    }
    return date >= startDate && date <= (endDate || startDate);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Select Date Range</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="text-lg font-medium">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {monthDays.map((date) => {
            const isSelected = startDate && endDate && isInRange(date);
            const isStart = startDate && isSameDay(date, startDate);
            const isEnd = endDate && isSameDay(date, endDate);

            return (
              <button
                key={date.toString()}
                onClick={() => handleDateClick(date)}
                onMouseEnter={() => setHoverDate(date)}
                onMouseLeave={() => setHoverDate(null)}
                className={`
                  p-2 text-sm rounded-lg
                  ${!isSameMonth(date, currentMonth) ? 'text-gray-300' : 'hover:bg-gray-100'}
                  ${isSelected ? 'bg-blue-50' : ''}
                  ${isStart ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
                  ${isEnd ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
                `}
              >
                {format(date, 'd')}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm">
            {startDate && (
              <span>
                {format(startDate, 'MMM d, yyyy')}
                {endDate && ` - ${format(endDate, 'MMM d, yyyy')}`}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={!startDate || !endDate}
              className={`
                px-4 py-2 rounded-lg
                ${
                  startDate && endDate
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;