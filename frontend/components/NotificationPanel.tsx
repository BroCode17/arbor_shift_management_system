'use client'
import React from 'react';
import { useNotificationStore } from '../store/notificationStore';
import { Bell, Check, Trash2, X } from 'lucide-react';
import { format } from 'date-fns';

const NotificationPanel = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { notifications, markAsRead, markAllAsRead, removeNotification } = useNotificationStore();

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border z-50">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">Notifications</h3>
        <div className="flex gap-2">
          <button 
            onClick={markAllAsRead}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Mark all as read
          </button>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 border-b hover:bg-gray-50 ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex justify-between">
                <div className="flex-1">
                  <h4 className="font-medium">{notification.title}</h4>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {format(notification.timestamp, 'MMM d, yyyy HH:mm')}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!notification.read && (
                    <button 
                      onClick={() => markAsRead(notification.id)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                  <button 
                    onClick={() => removeNotification(notification.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;