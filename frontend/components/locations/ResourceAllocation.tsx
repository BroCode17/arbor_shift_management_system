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
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import { Stethoscope, Users, Package, Truck, RotateCcw } from 'lucide-react';

interface ResourceAllocationProps {
  searchQuery: string;
  selectedRegion: string;
  selectedStatus: string;
}

const ResourceAllocation: React.FC<ResourceAllocationProps> = ({
  searchQuery,
  selectedRegion,
  selectedStatus,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [timeframe, setTimeframe] = useState('monthly');

  const resourceCategories = [
    { id: 'medical', name: 'Medical Equipment', total: 850, allocated: 780, available: 70 },
    { id: 'staff', name: 'Staff', total: 1200, allocated: 1150, available: 50 },
    { id: 'supplies', name: 'Medical Supplies', total: 25000, allocated: 22000, available: 3000 },
    { id: 'vehicles', name: 'Emergency Vehicles', total: 45, allocated: 40, available: 5 },
  ];

  const allocationHistory = [
    { month: 'Jan', equipment: 92, staff: 95, supplies: 88, vehicles: 85 },
    { month: 'Feb', equipment: 94, staff: 96, supplies: 90, vehicles: 88 },
    { month: 'Mar', equipment: 91, staff: 94, supplies: 87, vehicles: 86 },
    { month: 'Apr', equipment: 95, staff: 97, supplies: 91, vehicles: 89 },
    { month: 'May', equipment: 93, staff: 95, supplies: 89, vehicles: 87 },
  ];

  const transferRequests = [
    {
      id: 1,
      resource: 'MRI Machine',
      from: 'Main Hospital',
      to: 'North Wing',
      status: 'pending',
      priority: 'high',
      requestDate: '2024-02-15',
    },
    // ... more transfer requests
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Equipment</h3>
            <Stethoscope className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold">92%</div>
          <div className="mt-1 text-sm text-blue-500">Utilization Rate</div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Staff</h3>
            <Users className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold">95%</div>
          <div className="mt-1 text-sm text-green-500">Allocation Rate</div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Supplies</h3>
            <Package className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold">88%</div>
          <div className="mt-1 text-sm text-yellow-500">Stock Level</div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Transfers</h3>
            <RotateCcw className="h-5 w-5 text-purple-500" />
          </div>
          <div className="text-2xl font-bold">12</div>
          <div className="mt-1 text-sm text-purple-500">Pending Requests</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Resource Allocation Trends</h3>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={allocationHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="equipment" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
                <Area type="monotone" dataKey="staff" stackId="1" stroke="#10B981" fill="#10B981" />
                <Area type="monotone" dataKey="supplies" stackId="1" stroke="#F59E0B" fill="#F59E0B" />
                <Area type="monotone" dataKey="vehicles" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Resource Categories</h3>
          <div className="space-y-4">
            {resourceCategories.map((category) => (
              <div
                key={category.id}
                className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm text-gray-500">
                    {((category.allocated / category.total) * 100).toFixed(1)}% Used
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between text-xs">
                    <span>Available: {category.available}</span>
                    <span>Total: {category.total}</span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                    <div
                      className="bg-blue-500"
                      style={{ width: `${(category.allocated / category.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-medium mb-4">Transfer Requests</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  From
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transferRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{request.resource}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.from}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.to}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      request.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      request.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {request.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {request.requestDate}
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

export default ResourceAllocation;