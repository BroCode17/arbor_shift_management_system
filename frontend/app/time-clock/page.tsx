'use client'
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Clock, Calendar, History, MapPin, DollarSign, Timer, AlertCircle, CheckCircle, User } from 'lucide-react';
import { format, differenceInMinutes } from 'date-fns';

export default function TimeClockPage() {
  const [clockedIn, setClockedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [shiftStartTime, setShiftStartTime] = useState(null);
  const [breakStatus, setBreakStatus] = useState('none'); // 'none', 'lunch', 'break'

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockAction = () => {
    if (!clockedIn) {
      setShiftStartTime(new Date());
    }
    setClockedIn(!clockedIn);
  };

  const getElapsedTime = () => {
    if (!shiftStartTime) return '0:00';
    const minutes = differenceInMinutes(currentTime, shiftStartTime);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 p-4">
        {/* Status Banner */}
        {clockedIn && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500 w-5 h-5" />
              <span className="font-medium text-green-700">Currently Clocked In</span>
            </div>
            <span className="text-green-600">Elapsed Time: {getElapsedTime()}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Time Clock Card */}
          <div className="col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="text-center space-y-8">
                <h2 className="text-2xl font-semibold">Time Clock</h2>
                <div className="text-6xl font-bold text-gray-800">
                  {format(currentTime, 'hh:mm:ss a')}
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleClockAction}
                    className={`px-8 py-4 rounded-lg text-white font-medium transition-all ${
                      clockedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    {clockedIn ? 'Clock Out' : 'Clock In'}
                  </button>
                  {clockedIn && (
                    <select
                      value={breakStatus}
                      onChange={(e) => setBreakStatus(e.target.value)}
                      className="px-4 py-2 border rounded-lg"
                    >
                      <option value="none">No Break</option>
                      <option value="lunch">Lunch Break</option>
                      <option value="break">Short Break</option>
                    </select>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Shift Info Cards */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Current Shift</h3>
              {clockedIn ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <div>
                      <div className="font-medium">Shift Time</div>
                      <div className="text-sm">Started at {format(shiftStartTime, 'hh:mm a')}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-sm">Main Hospital - West Wing</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <User className="w-5 h-5" />
                    <div>
                      <div className="font-medium">Supervisor</div>
                      <div className="text-sm">Dr. Sarah Johnson</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>Not currently clocked in</span>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Today's Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-blue-500" />
                    <span>Hours Worked</span>
                  </div>
                  <span className="font-medium">6.5 hrs</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span>Earnings</span>
                  </div>
                  <span className="font-medium">$195.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Time Clock History */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <div className="flex gap-4">
              <select className="px-3 py-1.5 border rounded-lg text-sm">
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
              </select>
              <button className="text-blue-500 hover:text-blue-600">
                View Full History
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <History className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium">Regular Shift</div>
                    <div className="text-sm text-gray-500">9:00 AM - 5:00 PM</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">8 hours</div>
                  <div className="text-sm text-gray-500">Feb 20, 2024</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}