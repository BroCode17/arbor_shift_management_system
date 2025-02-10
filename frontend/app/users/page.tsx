'use client'
import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import { format, isSameDay, isToday, isTomorrow, addDays } from 'date-fns';
import { Calendar, Clock, Bell, AlertCircle, CheckCircle } from 'lucide-react';
import { useViewModeStore } from '@/store/viewModeStore';
import QuickActionCard from '@/components/dashboard/QuickActionCard';
import UpcomingShiftsSection from '@/components/dashboard/UpcomingShiftsSection';

export default function EmployeeDashboard() {
  const [upcomingShifts, setUpcomingShifts] = useState([]);
  const [openShifts, setOpenShifts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedTab, setSelectedTab] = useState('upcoming');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <QuickActionCard
                  icon={<Clock className="h-6 w-6" />}
                  title="Clock In"
                  onClick={() => {}}
                />
                <QuickActionCard
                  icon={<Calendar className="h-6 w-6" />}
                  title="View Schedule"
                  onClick={() => {}}
                />
                <QuickActionCard
                  icon={<Bell className="h-6 w-6" />}
                  title="Notifications"
                  badge={3}
                  onClick={() => {}}
                />
                <QuickActionCard
                  icon={<AlertCircle className="h-6 w-6" />}
                  title="Request Time Off"
                  onClick={() => {}}
                />
              </div>
            </div>

            {/* Upcoming Shifts */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Today & Tomorrow</h2>
                <button className="text-blue-500 hover:text-blue-600">
                  View All
                </button>
              </div>
              {/* <UpcomingShiftsSection /> */}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Open Shifts</h2>
              {/* <OpenShiftsSection /> */}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              {/* <ActivityFeed /> */}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4 border-b pb-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                selectedTab === 'upcoming'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedTab('upcoming')}
            >
              Upcoming Week
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                selectedTab === 'open'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedTab('open')}
            >
              Open Shifts
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                selectedTab === 'claimed'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedTab('claimed')}
            >
              Claimed Shifts
            </button>
          </div>
          
          {/* <div className="mt-4">
            {selectedTab === 'upcoming' && <UpcomingWeekCalendar />}
            {selectedTab === 'open' && <OpenShiftsCalendar />}
            {selectedTab === 'claimed' && <ClaimedShiftsCalendar />}
          </div> */}
        </div>
      </div>
    </div>
  );
}