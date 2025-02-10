'use client'
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Bell, Shield, Clock, MapPin } from 'lucide-react';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        {/* Rest of your settings content */}
      </div>
    </DashboardLayout>
  );
}