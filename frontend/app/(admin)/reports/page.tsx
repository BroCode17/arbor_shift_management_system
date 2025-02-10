'use client'
import React, { useState } from 'react';
import Header from "../../../components/Header";
import StaffingReport from "../../../components/reports/StaffingReport";
import TimeTrackingReport from "../../../components/reports/TimeTrackingReport";
import ProjectReport from "../../../components/reports/ProjectReport";
import { Download, Filter, Calendar } from 'lucide-react';
import DateRangePicker from "../../../components/DateRangePicker";

export default function Reports() {
  const [activeTab, setActiveTab] = useState('staffing');
  const [dateRange, setDateRange] = useState({ start: new Date(), end: new Date() });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Reports & Analytics</h1>
            <p className="text-gray-500">View detailed insights and analytics</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsDatePickerOpen(true)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Custom Range
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="flex gap-4 border-b">
            {[
              { id: 'staffing', label: 'Staffing Analytics' },
              { id: 'timeTracking', label: 'Time Tracking' },
              { id: 'projects', label: 'Project Metrics' },
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

        {activeTab === 'staffing' && (
          <StaffingReport dateRange={dateRange} />
        )}

        {activeTab === 'timeTracking' && (
          <TimeTrackingReport dateRange={dateRange} />
        )}

        {activeTab === 'projects' && (
          <ProjectReport dateRange={dateRange} />
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