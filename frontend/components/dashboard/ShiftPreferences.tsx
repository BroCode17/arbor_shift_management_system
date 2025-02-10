'use client'
import React, { useState } from 'react';
import { X, Clock, MapPin, DollarSign, Bell } from 'lucide-react';

interface ShiftPreferencesProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShiftPreferences: React.FC<ShiftPreferencesProps> = ({ isOpen, onClose }) => {
  const [preferences, setPreferences] = useState({
    locations: ['west_wing', 'emergency'],
    shiftTypes: ['morning', 'afternoon'],
    minHourlyRate: 35,
    maxDistance: 25,
    notifications: {
      openShifts: true,
      scheduleChanges: true,
      reminders: true,
    },
    autoApply: false,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Shift Preferences</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Preferred Locations</h3>
            <div className="grid grid-cols-2 gap-3">
              {['West Wing', 'East Wing', 'Emergency', 'ICU'].map(location => (
                <label
                  key={location}
                  className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={preferences.locations.includes(location.toLowerCase().replace(' ', '_'))}
                    onChange={() => {}}
                    className="rounded text-blue-500"
                  />
                  <span>{location}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Shift Types</h3>
            <div className="grid grid-cols-3 gap-3">
              {['Morning', 'Afternoon', 'Night'].map(shift => (
                <label
                  key={shift}
                  className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={preferences.shiftTypes.includes(shift.toLowerCase())}
                    onChange={() => {}}
                    className="rounded text-blue-500"
                  />
                  <span>{shift}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Rate & Distance</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Minimum Hourly Rate
                </label>
                <div className="flex items-center">
                  <span className="absolute ml-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={preferences.minHourlyRate}
                    onChange={() => {}}
                    className="w-full pl-8 pr-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Maximum Distance
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={preferences.maxDistance}
                    onChange={() => {}}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <span className="absolute right-8 text-gray-500">mi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-medium mb-3">Additional Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-gray-500" />
                  <span>Auto-apply for matching shifts</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.autoApply}
                  onChange={() => {}}
                  className="rounded text-blue-500"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftPreferences;