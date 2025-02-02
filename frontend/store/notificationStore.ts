import { create } from 'zustand';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: Date;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) => set((state) => ({
    notifications: [{
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      read: false,
      timestamp: new Date()
    }, ...state.notifications],
    unreadCount: state.unreadCount + 1
  })),
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ),
    unreadCount: state.unreadCount - 1
  })),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true })),
    unreadCount: 0
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id),
    unreadCount: state.notifications.find(n => n.id === id)?.read ? 
      state.unreadCount : 
      state.unreadCount - 1
  }))
}));