'use client'
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import MonthlyShiftCalendar from '@/components/dashboard/MonthlyShiftCalendar';

export default function CalendarPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Monthly Shift Calendar</h1>
        <MonthlyShiftCalendar />
      </div>
    </DashboardLayout>
  );
}