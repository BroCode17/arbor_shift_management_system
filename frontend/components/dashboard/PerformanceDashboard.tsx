'use client'
import React from 'react';
import { Clock, TrendingUp, Calendar, DollarSign } from 'lucide-react';

const PerformanceDashboard = () => {
  const stats = {
    hoursWorked: 156,
    shiftsCompleted: 24,
    onTimeRate: 98,
    averageRating: 4.8,
  };

  const recentShifts = [
    {
      id: '1',
      date: '2024-02-20',
      department: 'Emergency',
      hours: 8,
      rating: 5,
    },
    // Add more shifts...
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Clock className="w-5 h-5" />
            <span>Hours Worked</span>
          </div>
          <div className="text-2xl font-bold">{stats.hoursWorked}h</div>
          <div className="text-sm text-green-600 mt-1">+12h from last month</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Calendar className="w-5 h-5" />
            <span>Shifts Completed</span>
          </div>
          <div className="text-2xl font-bold">{stats.shiftsCompleted}</div>
          <div className="text-sm text-green-600 mt-1">+3 from last month</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span>On-Time Rate</span>
          </div>
          <div className="text-2xl font-bold">{stats.onTimeRate}%</div>
          <div className="text-sm text-green-600 mt-1">+2% from last month</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <DollarSign className="w-5 h-5" />
            <span>Average Rating</span>
          </div>
          <div className="text-2xl font-bold">{stats.averageRating}</div>
          <div className="text-sm text-green-600 mt-1">+0.2 from last month</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Performance Trends</h2>
        {/* Add chart component here */}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Recent Shift Performance</h2>
        <div className="space-y-4">
          {recentShifts.map(shift => (
            <div key={shift.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-medium">{shift.department}</div>
                <div className="text-sm text-gray-500">{shift.date}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">{shift.hours} hours</div>
                <div className="text-sm text-gray-500">Rating: {shift.rating}/5</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;