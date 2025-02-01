'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  { icon: '🏠', label: 'Dashboard', path: '/' },
  { icon: '⏱️', label: 'Timesheets', path: '/timesheets' },  // Updated path
  { icon: '📊', label: 'Activity', path: '/activity' },
  { icon: '📍', label: 'Locations', path: '/locations' },
  { icon: '👥', label: 'People', path: '/people' },
  { icon: '📋', label: 'Project management', path: '/projects' },
  { icon: '📅', label: 'Schedules', path: '/unclaimed' },
  { icon: '📈', label: 'Reports', path: '/reports' },
  { icon: '💰', label: 'Financials', path: '/financials' },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-xl font-semibold">HelloStaff</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  pathname === item.path
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;