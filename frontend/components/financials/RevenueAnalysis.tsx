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
  ComposedChart,
  Area,
} from 'recharts';
import { TrendingUp, DollarSign, Target, ChevronDown } from 'lucide-react';

interface RevenueAnalysisProps {
  dateRange: {
    start: Date;
    end: Date;
  };
  department: string;
}

const RevenueAnalysis: React.FC<RevenueAnalysisProps> = ({ dateRange, department }) => {
  const [selectedService, setSelectedService] = useState('all');
  const [forecastPeriod, setForecastPeriod] = useState('monthly');

  const revenueByService = [
    { id: 'emergency', name: 'Emergency Care', revenue: 850000, growth: 12.5 },
    { id: 'surgery', name: 'Surgical Services', revenue: 620000, growth: 8.2 },
    { id: 'outpatient', name: 'Outpatient Services', revenue: 480000, growth: 15.3 },
    { id: 'diagnostic', name: 'Diagnostic Services', revenue: 350000, growth: 6.8 },
    { id: 'specialty', name: 'Specialty Care', revenue: 280000, growth: 9.4 },
  ];

  const revenueForecasts = [
    { month: 'Jun', actual: 580000, forecast: 590000, target: 600000 },
    { month: 'Jul', actual: 600000, forecast: 610000, target: 620000 },
    { month: 'Aug', actual: null, forecast: 625000, target: 640000 },
    { month: 'Sep', actual: null, forecast: 640000, target: 660000 },
    { month: 'Oct', actual: null, forecast: 660000, target: 680000 },
  ];

  const performanceMetrics = [
    { period: 'Q1', revenue: 1850000, patients: 12500, avgRevenue: 148 },
    { period: 'Q2', revenue: 1920000, patients: 13200, avgRevenue: 145 },
    { period: 'Q3', revenue: 2050000, patients: 14100, avgRevenue: 145 },
    { period: 'Q4', revenue: 2180000, patients: 14800, avgRevenue: 147 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Revenue by Service</h3>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="all">All Services</option>
              {revenueByService.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-4">
            {revenueByService.map((service) => (
              <div
                key={service.id}
                className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{service.name}</span>
                  <span className={`text-sm ${
                    service.growth > 10 ? 'text-green-500' : 'text-blue-500'
                  }`}>
                    +{service.growth}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    ${service.revenue.toLocaleString()}
                  </span>
                  <div className="w-24 h-1 bg-gray-100 rounded-full">
                    <div
                      className="h-1 bg-blue-500 rounded-full"
                      style={{ width: `${(service.revenue / 850000) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Revenue Forecast</h3>
            <select
              value={forecastPeriod}
              onChange={(e) => setForecastPeriod(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={revenueForecasts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="actual" fill="#3B82F6" name="Actual Revenue" />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Forecast"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#F59E0B"
                  strokeDasharray="5 5"
                  name="Target"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Volume
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Revenue/Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {performanceMetrics.map((metric, index) => (
                <tr key={metric.period}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {metric.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${metric.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {metric.patients.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${metric.avgRevenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {index > 0 ? (
                      <span className={`inline-flex items-center ${
                        metric.revenue > performanceMetrics[index - 1].revenue
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}>
                        {((metric.revenue - performanceMetrics[index - 1].revenue) / 
                          performanceMetrics[index - 1].revenue * 100).toFixed(1)}%
                        <TrendingUp className="h-4 w-4 ml-1" />
                      </span>
                    ) : '-'}
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

export default RevenueAnalysis;