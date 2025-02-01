'use client'
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { Clock, Users, AlertCircle } from 'lucide-react';

interface TimeTrackingReportProps {
  dateRange: {
    start: Date;
    end: Date;
  };
}

const TimeTrackingReport: React.FC<TimeTrackingReportProps> = ({ dateRange }) => {
  const timeData = [
    { day: 'Mon', regular: 160, overtime: 12, breaks: 20 },
    { day: 'Tue', regular: 155, overtime: 8, breaks: 22 },
    { day: 'Wed', regular: 158, overtime: 15, breaks: 18 },
    { day: 'Thu', regular: 162, overtime: 10, breaks: 21 },
    { day: 'Fri', regular: 156, overtime: 14, breaks: 19 },
    { day: 'Sat', regular: 120, overtime: 6, breaks: 15 },
    { day: 'Sun', regular: 110, overtime: 4, breaks: 14 },
  ];

  const departmentTime = [
    { name: 'Emergency', hours: 680, efficiency: 92 },
    { name: 'ICU', hours: 520, efficiency: 88 },
    { name: 'Surgery', hours: 420, efficiency: 95 },
    { name: 'Pediatrics', hours: 380, efficiency: 90 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Total Hours</h3>
            <Clock className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold">2,845</div>
          <div className="text-sm text-green-500 mt-1">+5.2% vs last week</div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Staff Efficiency</h3>
            <Users className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold">91.5%</div>
          <div className="text-sm text-green-500 mt-1">+2.1% vs last week</div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Overtime Hours</h3>
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold">69</div>
          <div className="text-sm text-red-500 mt-1">+8.3% vs last week</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Weekly Time Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="regular" stackId="a" fill="#8884d8" />
                <Bar dataKey="overtime" stackId="a" fill="#82ca9d" />
                <Bar dataKey="breaks" stackId="a" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Department Time Allocation</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={departmentTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="hours" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-medium mb-4">Department Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Efficiency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departmentTime.map((dept, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{dept.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{dept.hours}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dept.efficiency}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      dept.efficiency >= 90
                        ? 'bg-green-100 text-green-800'
                        : dept.efficiency >= 85
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {dept.efficiency >= 90 ? 'Excellent' : dept.efficiency >= 85 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimeTrackingReport;