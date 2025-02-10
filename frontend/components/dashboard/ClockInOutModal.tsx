'use client'
import React, { useState, useEffect } from 'react';
import { X, Clock, MapPin, AlertTriangle } from 'lucide-react';

interface ClockInOutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClockInOutModal: React.FC<ClockInOutModalProps> = ({ isOpen, onClose }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockingIn, setIsClockingIn] = useState(true);
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {isClockingIn ? 'Clock In' : 'Clock Out'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-gray-500">
              {currentTime.toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border rounded-lg p-2"
              >
                <option value="">Select location...</option>
                <option value="west_wing">West Wing</option>
                <option value="east_wing">East Wing</option>
                <option value="emergency">Emergency Department</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border rounded-lg p-2 h-20 resize-none"
                placeholder="Add any notes about your shift..."
              />
            </div>
          </div>

          {isClockingIn && (
            <div className="bg-yellow-50 p-4 rounded-lg flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-700">
                Make sure you're at your assigned location before clocking in.
                Early clock-ins may require supervisor approval.
              </p>
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Confirm {isClockingIn ? 'Clock In' : 'Clock Out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockInOutModal;