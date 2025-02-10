'use client'
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Clock, MapPin, DollarSign, Download } from 'lucide-react';

const ShiftHistory = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState('all');

  const shifts = [
    {
      id: '1',
      date: '2024-02-20',
      time: '07:00-15:00',
      department: 'Emergency',
      location: 'West Wing',
      status: 'completed',
      hoursWorked: 8,
      hourlyRate: 45,
    },
    // Add more shifts...
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Shift History</h2>
        <div className="flex items-center gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="missed">Missed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Department</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Time</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Hours</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Earnings</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {shifts.map(shift => (
              <tr key={shift.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  {format(new Date(shift.date), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">{shift.department}</div>
                  <div className="text-sm text-gray-500">{shift.location}</div>
                </td>
                <td className="px-6 py-4 text-gray-500">{shift.time}</td>
                <td className="px-6 py-4 text-gray-500">{shift.hoursWorked}h</td>
                <td className="px-6 py-4 text-gray-500">
                  ${shift.hoursWorked * shift.hourlyRate}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    shift.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : shift.status === 'missed'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {shift.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShiftHistory;