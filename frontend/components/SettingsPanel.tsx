'use client'
import React from 'react';
import { useSettingsStore } from '../store/settingsStore';
import { X } from 'lucide-react';

const SettingsPanel = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { settings, updateSettings } = useSettingsStore();

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border z-50">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">Settings</h3>
        <button onClick={onClose}>
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      <div className="p-4 space-y-6">
        <div>
          <h4 className="font-medium mb-2">Theme</h4>
          <select
            value={settings.theme}
            onChange={(e) => updateSettings({ theme: e.target.value as 'light' | 'dark' })}
            className="w-full p-2 border rounded"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div>
          <h4 className="font-medium mb-2">Notifications</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => updateSettings({
                  notifications: { ...settings.notifications, email: e.target.checked }
                })}
                className="mr-2"
              />
              Email Notifications
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) => updateSettings({
                  notifications: { ...settings.notifications, push: e.target.checked }
                })}
                className="mr-2"
              />
              Push Notifications
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.desktop}
                onChange={(e) => updateSettings({
                  notifications: { ...settings.notifications, desktop: e.target.checked }
                })}
                className="mr-2"
              />
              Desktop Notifications
            </label>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Time Format</h4>
          <select
            value={settings.timeFormat}
            onChange={(e) => updateSettings({ timeFormat: e.target.value as '12h' | '24h' })}
            className="w-full p-2 border rounded"
          >
            <option value="12h">12-hour</option>
            <option value="24h">24-hour</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;