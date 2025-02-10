'use client'
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Bell, AlertCircle, CheckCircle } from 'lucide-react';
import { useViewModeStore } from '@/store/viewModeStore';
import QuickActionCard from '@/components/dashboard/QuickActionCard';
import UpcomingShiftsSection from '@/components/dashboard/UpcomingShiftsSection';
import UpcomingWeekCalendar from '@/components/dashboard/UpcomingWeekCalendar';
import OpenShiftsSection from '@/components/dashboard/OpenShiftsSection';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import ClaimedShiftsCalendar from '@/components/dashboard/ClaimedShiftsCalendar';
import ShiftClaimModal from '@/components/dashboard/ShiftClaimModal';
import NotificationsModal from '@/components/dashboard/NotificationsModal';
import TimeOffRequestModal from '@/components/dashboard/TimeOffRequestModal';
import ClockInOutModal from '@/components/dashboard/ClockInOutModal';
import ProfileSettings from '@/components/dashboard/ProfileSettings';
import ScheduleViewModal from '@/components/dashboard/ScheduleViewModal';
import ShiftDetailsModal from '@/components/dashboard/ShiftDetailsModal';
import { useRouter } from 'next/navigation';
import { useLoginContext } from '@/contexts/LoginContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Briefcase, DollarSign, ChartBar, Users, Settings } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import WeeklyEarnings from '@/components/dashboard/WeeklyEarnings';

export default function EmployeeDashboard() {
  const router = useRouter();
  const { isLoggedIn } = useLoginContext();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = false; // Replace with actual auth check
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router]);

  const [upcomingShifts, setUpcomingShifts] = useState([]);
  const [openShifts, setOpenShifts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isTimeOffModalOpen, setIsTimeOffModalOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [isClockInModalOpen, setIsClockInModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScheduleViewOpen, setIsScheduleViewOpen] = useState(false);
  const [isShiftDetailsOpen, setIsShiftDetailsOpen] = useState(false);
  const [selectedShiftDetails, setSelectedShiftDetails] = useState(null);

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const handleShiftClaim = (shift: any) => {
    setSelectedShift(shift);
    setIsClaimModalOpen(true);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'clock':
        setIsClockInModalOpen(true);
        break;
      case 'schedule':
        setIsScheduleModalOpen(true);
        break;
      case 'notifications':
        setIsNotificationsOpen(true);
        break;
      case 'timeoff':
        setIsTimeOffModalOpen(true);
        break;
      default:
        break;
    }
  };

  const [viewMode, setViewMode] = useState('grid');

  return (
    <DashboardLayout>
      <div className="bg-gray-50">
        <div className=" mx-auto p-4 md:p-6 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatsCard
              title="Hours This Week"
              value="32.5"
              change="+2.5"
              icon={<Clock className="h-6 w-6" />}
              trend="up"
            />
            <StatsCard
              title="Weekly Earnings"
              value="$1,250"
              change="+$150"
              icon={<DollarSign className="h-6 w-6" />}
              trend="up"
            />
            <StatsCard
              title="Open Shifts"
              value="12"
              change="+3"
              icon={<Briefcase className="h-6 w-6" />}
              trend="neutral"
            />
            <StatsCard
              title="Performance"
              value="95%"
              change="+2%"
              icon={<ChartBar className="h-6 w-6" />}
              trend="up"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              {/* Quick Actions - Enhanced */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Quick Actions</h2>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Customize
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <QuickActionCard
                    icon={<Clock className="h-6 w-6" />}
                    title="Clock In"
                    subtitle="Current shift: 7AM-3PM"
                    onClick={() => handleQuickAction('clock')}
                  />
                  <QuickActionCard
                    icon={<Calendar className="h-6 w-6" />}
                    title="View Schedule"
                    subtitle="Next shift in 2 days"
                    onClick={() => handleQuickAction('schedule')}
                  />
                  <QuickActionCard
                    icon={<Bell className="h-6 w-6" />}
                    title="Notifications"
                    subtitle="3 new updates"
                    badge={3}
                    onClick={() => handleQuickAction('notifications')}
                  />
                  <QuickActionCard
                    icon={<AlertCircle className="h-6 w-6" />}
                    title="Request Time Off"
                    subtitle="5 days remaining"
                    onClick={() => handleQuickAction('timeoff')}
                  />
                </div>
              </div>

                    <UpcomingShiftsSection />
              {/* Weekly Overview */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Weekly Overview</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                    >
                      Grid
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                    >
                      List
                    </button>
                  </div>
                </div>
                <UpcomingWeekCalendar viewMode={viewMode} />
              </div>

              {/* Weekly Earnings Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Earnings Overview</h2>
                <WeeklyEarnings />
              </div>
            </div>

            <div className="space-y-6">
              {/* Enhanced Open Shifts Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Available Shifts</h2>
                  <select className="text-sm border rounded-md px-2 py-1">
                    <option>All Departments</option>
                    <option>Emergency</option>
                    <option>ICU</option>
                  </select>
                </div>
                <OpenShiftsSection />
              </div>

              {/* Enhanced Activity Feed */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Recent Activity</h2>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    View All
                  </button>
                </div>
                <ActivityFeed />
              </div>

              {/* Team Schedule */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Team Schedule</h2>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    View Team
                  </button>
                </div>
                <div className="space-y-4">
                  {/* Add TeamSchedulePreview component here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
      <TimeOffRequestModal
        isOpen={isTimeOffModalOpen}
        onClose={() => setIsTimeOffModalOpen(false)}
      />

      <ClockInOutModal
        isOpen={isClockInModalOpen}
        onClose={() => setIsClockInModalOpen(false)}
      />
      <ScheduleViewModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />
      {selectedShift && (
        <ShiftClaimModal
          isOpen={isClaimModalOpen}
          onClose={() => setIsClaimModalOpen(false)}
          shift={selectedShift}
        />
      )}
      {selectedShiftDetails && (
        <ShiftDetailsModal
          isOpen={isShiftDetailsOpen}
          onClose={() => setIsShiftDetailsOpen(false)}
          shift={selectedShiftDetails}
        />
      )}
    </DashboardLayout>
  );
}