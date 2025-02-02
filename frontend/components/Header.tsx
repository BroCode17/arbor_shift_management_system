'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Settings, Bell, Search, Clock } from 'lucide-react';
import { useSearch } from '../contexts/SearchContext';
import { useViewModeStore } from '../store/viewModeStore';
import { useNotificationStore } from '../store/notificationStore';
import NotificationPanel from './NotificationPanel';
import SettingsPanel from './SettingsPanel';

const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { unreadCount } = useNotificationStore();
  
  const { viewMode, setViewMode } = useViewModeStore();
  
  const pathname: string = usePathname();
  const { globalSearchQuery, setGlobalSearchQuery } = useSearch();
  const [localSearch, setLocalSearch] = useState('');
 

  // Pages that have their own search input UI but should still use global search
  const pagesWithCustomSearch = [
    '/locations',
    '/activity',
    '/people',
    '/projects'
  ];

  const getPageTitle = () => {
    const titles = {
      '/': 'Dashboard',
      '/timesheets': 'Timesheets',
      '/activity': 'Activity',
      '/locations': 'Locations',
      '/people': 'People',
      '/projects': 'Project Management',
      '/unclaimed': 'Schedules',
      '/reports': 'Reports',
      '/financials': 'Financials',
    };
    return titles[pathname] || 'Dashboard';
  };

  const showTimeControls = pathname === '/unclaimed' || pathname === '/timesheets' || pathname === '/';
  const showSearchBar = !pagesWithCustomSearch.includes(pathname);

  // Update global search when local search changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setGlobalSearchQuery(localSearch);
    }, 300); // Debounce search input

    return () => clearTimeout(timeoutId);
  }, [localSearch, setGlobalSearchQuery]);

  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Set initial time
    setCurrentTime(new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    }));

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center gap-4">
        <div className="flex items-baseline gap-3">
          {/* <h1 className="text-2xl font-bold">{getPageTitle()}</h1> */}
          <div className="flex items-center gap-2 min-w-[120px]">
            <Clock className="h-5 w-5 text-gray-500" />
            {currentTime && (
              <span className="text-lg text-gray-500 font-medium tabular-nums">
                {currentTime}
              </span>
            )}
          </div>
        </div>
        {showTimeControls && (
          <div className="flex gap-2 bg-gray-100/50 rounded-full p-1">
            <button 
              className={`px-4 py-1.5 rounded-full transition-all duration-200 ease-in-out transform ${
                viewMode === 'live' 
                  ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-200 scale-105' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:scale-102'
              }`}
              onClick={() => setViewMode('live')}
            >
              <span className="relative inline-block">
                Live
                {viewMode === 'live' && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full animate-expandWidth"></span>
                )}
              </span>
            </button>
            <button 
              className={`px-4 py-1.5 rounded-full transition-all duration-200 ease-in-out transform ${
                viewMode === 'week' 
                  ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-200 scale-105' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:scale-102'
              }`}
              onClick={() => setViewMode('week')}
            >
              <span className="relative inline-block">
                Week
                {viewMode === 'week' && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full animate-expandWidth"></span>
                )}
              </span>
            </button>
            <button 
              className={`px-4 py-1.5 rounded-full transition-all duration-200 ease-in-out transform ${
                viewMode === 'day' 
                  ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-200 scale-105' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:scale-102'
              }`}
              onClick={() => setViewMode('day')}
            >
              <span className="relative inline-block">
                Day
                {viewMode === 'day' && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full animate-expandWidth"></span>
                )}
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {showSearchBar && (
          <div className="relative">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        )}
        
        <div className="relative">
          <button 
            className="p-2 hover:bg-gray-100 rounded-full relative"
            onClick={() => {
              setIsNotificationOpen(!isNotificationOpen);
              setIsSettingsOpen(false);
            }}
          >
            <Bell className="h-5 w-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          <NotificationPanel 
            isOpen={isNotificationOpen} 
            onClose={() => setIsNotificationOpen(false)} 
          />
        </div>

        <div className="relative">
          <button 
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => {
              setIsSettingsOpen(!isSettingsOpen);
              setIsNotificationOpen(false);
            }}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
          <SettingsPanel 
            isOpen={isSettingsOpen} 
            onClose={() => setIsSettingsOpen(false)} 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;