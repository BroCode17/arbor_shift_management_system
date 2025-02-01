'use client'
import React, { useState } from 'react';
import Header from "../../components/Header";
import FinancialOverview from "../../components/financials/FinancialOverview";
import ExpenseAnalytics from "../../components/financials/ExpenseAnalytics";
import BudgetPlanning from "../../components/financials/BudgetPlanning";
import RevenueAnalysis from "../../components/financials/RevenueAnalysis";
import { Download, Filter, Calendar, TrendingUp } from 'lucide-react';
import DateRangePicker from "../../components/DateRangePicker";

export default function Financials() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState({ start: new Date(), end: new Date() });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Financial Management</h1>
            <p className="text-gray-500">Track and analyze financial performance</p>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-white"
            >
              <option value="all">All Departments</option>
              <option value="emergency">Emergency</option>
              <option value="icu">ICU</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="surgery">Surgery</option>
            </select>
            <button
              onClick={() => setIsDatePickerOpen(true)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Custom Range
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="flex gap-4 border-b">
            {[
              { id: 'overview', label: 'Financial Overview' },
              { id: 'revenue', label: 'Revenue Analysis' },
              { id: 'expenses', label: 'Expense Analytics' },
              { id: 'budget', label: 'Budget Planning' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <FinancialOverview 
            dateRange={dateRange}
            department={selectedDepartment}
          />
        )}

        {activeTab === 'revenue' && (
          <RevenueAnalysis
            dateRange={dateRange}
            department={selectedDepartment}
          />
        )}

        {activeTab === 'expenses' && (
          <ExpenseAnalytics
            dateRange={dateRange}
            department={selectedDepartment}
          />
        )}

        {activeTab === 'budget' && (
          <BudgetPlanning
            dateRange={dateRange}
            department={selectedDepartment}
          />
        )}

        <DateRangePicker
          isOpen={isDatePickerOpen}
          onClose={() => setIsDatePickerOpen(false)}
          onSelect={setDateRange}
          initialDateRange={dateRange}
        />
      </div>
    </div>
  );
}