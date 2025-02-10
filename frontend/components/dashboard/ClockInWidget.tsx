'use client'
import React, { useState, useEffect } from 'react';
import { Clock, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { useClockInOut } from '@/hooks/useClockInOut';
import { format } from 'date-fns';

interface ClockInWidgetProps {
  userId: string;
  currentShift?: {
    id: string;
    startTime: string;
    endTime: string;
    location: string;
  };
}

const ClockInWidget: React.FC<ClockInWidgetProps> = ({ userId, currentShift }) => {
  const { clockIn, clockOut, error, isLoading, activeClockIn } = useClockInOut();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  // Log::


  const handleClockIn = async () => {
    if (!currentShift) return;
    try {
      await clockIn(currentShift.id, userId);
    } catch (err) {
      console.error('Clock-in failed:', err);
    }
  };

  const handleClockOut = async () => {
    if (!currentShift || !activeClockIn) return;
    try {
      await clockOut(currentShift.id, userId);
    } catch (err) {
      console.error('Clock-out failed:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Time Clock</h2>
        <Clock className="w-5 h-5 text-gray-500" />
      </div>

      <div className="text-3xl font-bold text-center">
        {format(currentTime, 'HH:mm:ss')}
      </div>

      {currentShift ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{currentShift.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>
              {format(new Date(currentShift.startTime), 'HH:mm')} -{' '}
              {format(new Date(currentShift.endTime), 'HH:mm')}
            </span>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <XCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {activeClockIn ? (
            <button
              onClick={handleClockOut}
              disabled={isLoading}
              className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
            >
              Clock Out
            </button>
          ) : (
            <button
              onClick={handleClockIn}
              disabled={isLoading}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              Clock In
            </button>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No active shift scheduled
        </div>
      )}
    </div>
  );
};

export default ClockInWidget;