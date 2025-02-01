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
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import { AlertCircle, DollarSign, TrendingUp, Settings, X, Plus } from 'lucide-react';

interface BudgetPlanningProps {
  dateRange: {
    start: Date;
    end: Date;
  };
  department: string;
}

const BudgetPlanning: React.FC<BudgetPlanningProps> = ({ dateRange, department }) => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedQuarter, setSelectedQuarter] = useState('Q1');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [budgetSettings, setBudgetSettings] = useState({
    autoAlerts: true,
    thresholds: {
      warning: 80,
      critical: 90
    },
    approvalRequired: true,
    notifyStakeholders: true
  });

  const budgetAllocation = [
    { category: 'Staff', allocated: 1200000, spent: 1150000, remaining: 50000 },
    { category: 'Equipment', allocated: 800000, spent: 720000, remaining: 80000 },
    { category: 'Supplies', allocated: 500000, spent: 480000, remaining: 20000 },
    { category: 'Operations', allocated: 400000, spent: 385000, remaining: 15000 },
    { category: 'Training', allocated: 200000, spent: 180000, remaining: 20000 },
  ];

  const quarterlyPerformance = [
    { metric: 'Budget Adherence', score: 92 },
    { metric: 'Cost Efficiency', score: 85 },
    { metric: 'Resource Utilization', score: 88 },
    { metric: 'Savings Rate', score: 78 },
    { metric: 'ROI', score: 90 },
  ];

  const varianceAnalysis = [
    { month: 'Jan', planned: 250000, actual: 245000, variance: -5000 },
    { month: 'Feb', planned: 260000, actual: 258000, variance: -2000 },
    { month: 'Mar', planned: 270000, actual: 275000, variance: 5000 },
    { month: 'Apr', planned: 265000, actual: 262000, variance: -3000 },
    { month: 'May', planned: 280000, actual: 285000, variance: 5000 },
  ];

  const handleSettingsSave = (newSettings: any) => {
    setBudgetSettings(newSettings);
    setIsSettingsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <select
            value={selectedQuarter}
            onChange={(e) => setSelectedQuarter(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="Q1">Q1</option>
            <option value="Q2">Q2</option>
            <option value="Q3">Q3</option>
            <option value="Q4">Q4</option>
          </select>
        </div>
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Settings className="h-4 w-4" />
          Budget Settings
        </button>

        {/* Settings Modal */}
        {isSettingsOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Budget Settings</h2>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Alert Thresholds</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Warning Level (%)
                        </label>
                        <input
                          type="number"
                          value={budgetSettings.thresholds.warning}
                          onChange={(e) => setBudgetSettings({
                            ...budgetSettings,
                            thresholds: {
                              ...budgetSettings.thresholds,
                              warning: parseInt(e.target.value)
                            }
                          })}
                          className="w-full p-2 border rounded-lg"
                          min="0"
                          max="100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Critical Level (%)
                        </label>
                        <input
                          type="number"
                          value={budgetSettings.thresholds.critical}
                          onChange={(e) => setBudgetSettings({
                            ...budgetSettings,
                            thresholds: {
                              ...budgetSettings.thresholds,
                              critical: parseInt(e.target.value)
                            }
                          })}
                          className="w-full p-2 border rounded-lg"
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Notifications</h3>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={budgetSettings.autoAlerts}
                          onChange={(e) => setBudgetSettings({
                            ...budgetSettings,
                            autoAlerts: e.target.checked
                          })}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span>Enable Automatic Alerts</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={budgetSettings.notifyStakeholders}
                          onChange={(e) => setBudgetSettings({
                            ...budgetSettings,
                            notifyStakeholders: e.target.checked
                          })}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span>Notify Stakeholders</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={budgetSettings.approvalRequired}
                          onChange={(e) => setBudgetSettings({
                            ...budgetSettings,
                            approvalRequired: e.target.checked
                          })}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span>Require Approval for Overages</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSettingsSave(budgetSettings)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Budget Allocation</h3>
          <div className="space-y-4">
            {budgetAllocation.map((item) => (
              <div key={item.category} className="p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{item.category}</span>
                  <span className="text-sm text-gray-500">
                    ${item.allocated.toLocaleString()}
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        {((item.spent / item.allocated) * 100).toFixed(1)}% Used
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-green-600">
                        ${item.remaining.toLocaleString()} Remaining
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                    <div
                      className="bg-blue-500"
                      style={{ width: `${(item.spent / item.allocated) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={quarterlyPerformance}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Performance"
                  dataKey="score"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border lg:col-span-3">
          <h3 className="text-lg font-medium mb-4">Budget Variance Analysis</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={varianceAnalysis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="planned" fill="#3B82F6" name="Planned Budget" />
                <Bar dataKey="actual" fill="#10B981" name="Actual Spending" />
                <Bar dataKey="variance" fill="#F59E0B" name="Variance" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-medium mb-4">Budget Alerts</h3>
        <div className="space-y-4">
          {[
            { type: 'warning', message: 'Equipment budget utilization above 90%' },
            { type: 'info', message: 'Q2 budget planning deadline approaching' },
            { type: 'success', message: 'Achieved 5% cost reduction in supplies' },
          ].map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg flex items-center ${
                alert.type === 'warning' ? 'bg-yellow-50 text-yellow-800' :
                alert.type === 'info' ? 'bg-blue-50 text-blue-800' :
                'bg-green-50 text-green-800'
              }`}
            >
              <AlertCircle className="h-5 w-5 mr-3" />
              {alert.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanning;