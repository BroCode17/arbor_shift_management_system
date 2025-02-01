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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, AlertCircle } from 'lucide-react';

interface FinancialOverviewProps {
  dateRange: {
    start: Date;
    end: Date;
  };
  department: string;
}

const FinancialOverview: React.FC<FinancialOverviewProps> = ({ dateRange, department }) => {
  const revenueData = [
    { month: 'Jan', revenue: 450000, expenses: 380000, profit: 70000 },
    { month: 'Feb', revenue: 480000, expenses: 395000, profit: 85000 },
    { month: 'Mar', revenue: 520000, expenses: 410000, profit: 110000 },
    { month: 'Apr', revenue: 490000, expenses: 400000, profit: 90000 },
    { month: 'May', revenue: 540000, expenses: 420000, profit: 120000 },
  ];

  const expenseBreakdown = [
    { name: 'Staff Salaries', value: 45, color: '#3B82F6' },
    { name: 'Equipment', value: 25, color: '#10B981' },
    { name: 'Supplies', value: 15, color: '#F59E0B' },
    { name: 'Operations', value: 10, color: '#6366F1' },
    { name: 'Other', value: 5, color: '#8B5CF6' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold">$2.48M</div>
          <div className="mt-1 flex items-center text-sm">
            <span className="text-green-500 font-medium">+12.5%</span>
            <span className="text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
            <TrendingDown className="h-5 w-5 text-red-500" />
          </div>
          <div className="text-2xl font-bold">$2.01M</div>
          <div className="mt-1 flex items-center text-sm">
            <span className="text-red-500 font-medium">+8.3%</span>
            <span className="text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Net Profit</h3>
            <DollarSign className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold">$475K</div>
          <div className="mt-1 flex items-center text-sm">
            <span className="text-green-500 font-medium">+15.2%</span>
            <span className="text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Profit Margin</h3>
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold">19.2%</div>
          <div className="mt-1 flex items-center text-sm">
            <span className="text-green-500 font-medium">+2.1%</span>
            <span className="text-gray-500 ml-1">vs last period</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Revenue vs Expenses</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
                <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Expense Breakdown</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseBreakdown.map((entry, index) => (
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
        <h3 className="text-lg font-medium mb-4">Profit Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#10B981" 
                name="Net Profit"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;