'use client'
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProfileSettings from '@/components/dashboard/ProfileSettings';

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <ProfileSettings isOpen={true} onClose={() => {}} />
      </div>
    </DashboardLayout>
  );
}