'use client'
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PerformanceDashboard from '@/components/dashboard/PerformanceDashboard';

export default function PerformancePage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-6">Performance Dashboard</h1>
      <PerformanceDashboard />
    </DashboardLayout>
  );
}