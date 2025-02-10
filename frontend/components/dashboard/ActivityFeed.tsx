'use client'
import React from 'react';
import { format } from 'date-fns';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Calendar
} from 'lucide-react';

const ActivityFeed = () => {
  const activities = [
    {
      id: '1',
      type: 'shift_claimed',
      message: 'You claimed a shift for Emergency Department',
      timestamp: new Date(),
      status: 'success',
    },
    {
      id: '2',
      type: 'schedule_change',
      message: 'Your schedule for next week has been updated',
      timestamp: new Date(Date.now() - 3600000),
      status: 'info',
    },
    {
      id: '3',
      type: 'time_off',
      message: 'Your time off request has been approved',
      timestamp: new Date(Date.now() - 7200000),
      status: 'success',
    },
  ];

  const getIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Calendar className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
        >
          {getIcon(activity.status)}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900">{activity.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              {format(activity.timestamp, 'MMM d, h:mm a')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;