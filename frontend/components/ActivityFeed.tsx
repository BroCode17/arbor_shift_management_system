'use client'
import React from 'react';
import { format } from 'date-fns';
import { 
  Calendar, Clock, MapPin, User, FileText, 
  Settings, CheckCircle, XCircle, AlertCircle 
} from 'lucide-react';

interface Activity {
  id: string;
  type: string;
  action: string;
  user: {
    name: string;
    avatar: string;
  };
  timestamp: Date;
  details: string;
  status?: 'success' | 'error' | 'warning';
}

interface ActivityFeedProps {
  searchQuery: string;
  selectedTypes: string[];
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'Schedule',
    action: 'Created new shift',
    user: {
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah.jpg'
    },
    timestamp: new Date('2024-01-15T09:30:00'),
    details: 'Created a new shift for Emergency Department',
    status: 'success'
  },
  // Add more mock activities...
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'Schedule':
      return <Calendar className="h-5 w-5" />;
    case 'Timesheet':
      return <Clock className="h-5 w-5" />;
    case 'Location':
      return <MapPin className="h-5 w-5" />;
    case 'User':
      return <User className="h-5 w-5" />;
    case 'System':
      return <Settings className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

const getStatusIcon = (status?: string) => {
  switch (status) {
    case 'success':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'error':
      return <XCircle className="h-5 w-5 text-red-500" />;
    case 'warning':
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    default:
      return null;
  }
};

const ActivityFeed: React.FC<ActivityFeedProps> = ({ searchQuery, selectedTypes }) => {
  const filteredActivities = mockActivities
    .filter(activity => 
      (selectedTypes.length === 0 || selectedTypes.includes(activity.type)) &&
      (searchQuery === '' || 
        activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <div className="space-y-4">
      {filteredActivities.map((activity) => (
        <div
          key={activity.id}
          className="p-4 border rounded-lg bg-white hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-lg bg-gray-100`}>
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{activity.user.name}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-500">{activity.action}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(activity.status)}
                  <span className="text-sm text-gray-500">
                    {format(activity.timestamp, 'MMM d, yyyy h:mm a')}
                  </span>
                </div>
              </div>
              <p className="mt-1 text-gray-600">{activity.details}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;