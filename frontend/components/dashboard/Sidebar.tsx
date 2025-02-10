'use client'
import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Clock, 
  Users, 
  Settings,
  TrendingUp,
  UserCircle,
  LogOut,
  Menu
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', isCollapsed ? '4rem' : '16rem');
  }, [isCollapsed]);

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
    },
    {
      name: 'Calendar',
      href: '/calendar',
      icon: Calendar,
    },
    {
      name: 'Schedule',
      href: '/schedule',
      icon: Clock,
    },
    {
      name: 'Time Clock',
      href: '/time-clock',
      icon: Clock,
    },
    {
      name: 'Team',
      href: '/team',
      icon: Users,
    },
    {
      name: 'Performance',
      href: '/performance',
      icon: TrendingUp,
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: UserCircle,
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <span className="text-xl font-semibold">Arbor Health</span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.href)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {!isCollapsed && <span>{item.name}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-2 border-t">
        <button className="flex items-center gap-3 w-full px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50">
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;