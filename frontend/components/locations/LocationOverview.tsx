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
import { MapPin, Users, Building2, Activity } from 'lucide-react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Map'), { ssr: false });

interface LocationOverviewProps {
  searchQuery: string;
  selectedRegion: string;
  selectedStatus: string;
}

const LocationOverview: React.FC<LocationOverviewProps> = ({
  searchQuery,
  selectedRegion,
  selectedStatus,
}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [
    {
      id: 1,
      name: 'Central Hospital',
      region: 'north',
      status: 'active',
      capacity: 500,
      occupancy: 82,
      staff: 250,
      departments: 12,
      coordinates: { lat: 40.7128, lng: -74.0060 },
    },
    // ... more locations
  ];

  const performanceMetrics = [
    { metric: 'Patient Satisfaction', value: 4.5 },
    { metric: 'Staff Utilization', value: 88 },
    { metric: 'Resource Efficiency', value: 92 },
    { metric: 'Facility Condition', value: 85 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Locations</h3>
            <MapPin className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold">12</div>
          <div className="mt-1 text-sm text-green-500">+2 new this year</div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Capacity</h3>
            <Building2 className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold">2,850</div>
          <div className="mt-1 text-sm text-blue-500">85% utilization</div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Staff</h3>
            <Users className="h-5 w-5 text-purple-500" />
          </div>
          <div className="text-2xl font-bold">1,245</div>
          <div className="mt-1 text-sm text-green-500">92% retention</div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Efficiency Score</h3>
            <Activity className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold">88%</div>
          <div className="mt-1 text-sm text-green-500">+5% vs last month</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Location Map</h3>
          <div className="h-[400px] rounded-lg overflow-hidden">
            <Map
              locations={locations}
              selectedLocation={selectedLocation}
              onLocationSelect={setSelectedLocation}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Performance Overview</h3>
          <div className="space-y-4">
            {performanceMetrics.map((metric) => (
              <div key={metric.metric} className="p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{metric.metric}</span>
                  <span className="text-sm text-gray-500">{metric.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 rounded-full h-2"
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-medium mb-4">Location Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Occupancy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {locations.map((location) => (
                <tr
                  key={location.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedLocation(location)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{location.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {location.region}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {location.capacity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {location.occupancy}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      location.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {location.status}
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

export default LocationOverview;