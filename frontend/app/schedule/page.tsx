'use client'
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import TeamScheduleView from "@/components/dashboard/TeamScheduleView";
import AvailabilityCalendar from "@/components/dashboard/AvailabilityCalendar";

export default function SchedulePage() {
  const [activeView, setActiveView] = useState('team');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Schedule</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveView('team')}
              className={`px-4 py-2 rounded-lg ${
                activeView === 'team'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Team Schedule
            </button>
            <button
              onClick={() => setActiveView('availability')}
              className={`px-4 py-2 rounded-lg ${
                activeView === 'availability'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Availability
            </button>
          </div>
        </div>

        {activeView === 'team' ? (
          <TeamScheduleView />
        ) : (
          <AvailabilityCalendar />
        )}
      </div>
    </DashboardLayout>
  );
}