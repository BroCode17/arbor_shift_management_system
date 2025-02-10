'use client'
import React, { useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import Image from 'next/image';
import NotificationsModal from './NotificationsModal';
import ProfileSettings from './ProfileSettings';

const DashboardHeader = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-40 transition-all duration-300">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center flex-1">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search shifts, team members..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button
            onClick={() => setIsProfileOpen(true)}
            className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src="/avatars/sarah.jpg"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-sm text-left">
              <div className="font-medium">Sarah Johnson</div>
              <div className="text-xs text-gray-500">Emergency Dept.</div>
            </div>
          </button>
        </div>
      </div>

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <ProfileSettings
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </header>
  );
};

export default DashboardHeader;