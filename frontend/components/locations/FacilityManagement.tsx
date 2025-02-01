'use client'
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Hammer, Thermometer, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface FacilityManagementProps {
  searchQuery: string;
  selectedRegion: string;
  selectedStatus: string;
}

const FacilityManagement: React.FC<FacilityManagementProps> = ({
  searchQuery,
  selectedRegion,
  selectedStatus,
}) => {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [maintenanceView, setMaintenanceView] = useState('scheduled');

  const facilities = [
    {
      id: 1,
      name: 'Main Building A',
      type: 'Hospital',
      condition: 'Good',
      lastInspection: '2024-01-15',
      nextMaintenance: '2024-03-15',
      issues: 2,
      utilization: 88,
      maintenanceCost: 25000,
    },
    // ... more facilities
  ];

  const maintenanceStats = [
    { name: 'Completed', value: 45, color: '#10B981' },
    { name: 'Scheduled', value: 30, color: '#3B82F6' },
    { name: 'Pending', value: 15, color: '#F59E0B' },
    { name: 'Overdue', value: 10, color: '#EF4444' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Facility Status</h3>
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold">85%</div>
          <div className="mt-1 text-sm text-green-500">Good Condition</div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Active Issues</h3>
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold">8</div>
          <div className="mt-1 text-sm text-yellow-500">2 High Priority</div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Maintenance</h3>
            <Hammer className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold">12</div>
          <div className="mt-1 text-sm text-blue-500">Scheduled This Month</div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Energy Usage</h3>
            <Thermometer className="h-5 w-5 text-purple-500" />
          </div>
          <div className="text-2xl font-bold">92%</div>
          <div className="mt-1 text-sm text-green-500">Efficiency Rating</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Maintenance Schedule</h3>
            <div className="flex gap-2">
              {['scheduled', 'completed', 'pending'].map((view) => (
                <button
                  key={view}
                  onClick={() => setMaintenanceView(view)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    maintenanceView === view
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={facilities}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="maintenanceCost" fill="#3B82F6" name="Maintenance Cost" />
                <Bar dataKey="utilization" fill="#10B981" name="Utilization %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Maintenance Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={maintenanceStats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {maintenanceStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-medium mb-4">Facility Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Facility Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Inspection
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issues
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {facilities.map((facility) => (
                <tr
                  key={facility.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedFacility(facility)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{facility.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {facility.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      facility.condition === 'Good'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {facility.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {facility.lastInspection}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {facility.issues}
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

export default FacilityManagement;