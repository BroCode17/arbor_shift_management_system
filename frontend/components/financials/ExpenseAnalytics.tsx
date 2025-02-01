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
import { Filter, ArrowDown, ArrowUp } from 'lucide-react';

interface ExpenseAnalyticsProps {
  dateRange: {
    start: Date;
    end: Date;
  };
  department: string;
}

const ExpenseAnalytics: React.FC<ExpenseAnalyticsProps> = ({ dateRange, department }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const expenseCategories = [
    { id: 'salaries', name: 'Staff Salaries', amount: 450000, trend: +5.2 },
    { id: 'equipment', name: 'Equipment', amount: 250000, trend: -2.1 },
    { id: 'supplies', name: 'Medical Supplies', amount: 150000, trend: +8.3 },
    { id: 'operations', name: 'Operations', amount: 100000, trend: +1.5 },
    { id: 'maintenance', name: 'Maintenance', amount: 50000, trend: -0.8 },
  ];

  const monthlyExpenses = [
    { month: 'Jan', salaries: 450000, equipment: 220000, supplies: 140000 },
    { month: 'Feb', salaries: 460000, equipment: 240000, supplies: 145000 },
    { month: 'Mar', salaries: 455000, equipment: 235000, supplies: 150000 },
    { month: 'Apr', salaries: 470000, equipment: 250000, supplies: 155000 },
    { month: 'May', salaries: 480000, equipment: 260000, supplies: 160000 },
  ];

  const expenseTrends = [
    { date: '2024-01', planned: 800000, actual: 820000 },
    { date: '2024-02', planned: 810000, actual: 805000 },
    { date: '2024-03', planned: 820000, actual: 835000 },
    { date: '2024-04', planned: 830000, actual: 825000 },
    { date: '2024-05', planned: 840000, actual: 850000 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Expense Categories</h3>
          <div className="space-y-4">
            {expenseCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => setSelectedCategory(category.id)}
              >
                <div>
                  <div className="font-medium">{category.name}</div>
                  <div className="text-sm text-gray-500">
                    ${category.amount.toLocaleString()}
                  </div>
                </div>
                <div className={`flex items-center ${
                  category.trend > 0 ? 'text-red-500' : 'text-green-500'
                }`}>
                  {category.trend > 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  <span className="ml-1">{Math.abs(category.trend)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Monthly Expense Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyExpenses}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                <Legend />
                <Area type="monotone" dataKey="salaries" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
                <Area type="monotone" dataKey="equipment" stackId="1" stroke="#10B981" fill="#10B981" />
                <Area type="monotone" dataKey="supplies" stackId="1" stroke="#F59E0B" fill="#F59E0B" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Planned vs Actual Expenses</h3>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={expenseTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="planned"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#EF4444"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseAnalytics;