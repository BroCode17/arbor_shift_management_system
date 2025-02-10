'use client'
import React, { useState } from 'react';
import { X, Camera, Mail, Phone, MapPin, Shield, Bell, Briefcase, Clock, Calendar, Lock, User, Building, ChevronRight, AlertTriangle, DollarSign } from 'lucide-react';
import Image from 'next/image';

interface ProfileSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.j@hospital.com',
    phone: '(555) 123-4567',
    department: 'Emergency',
    role: 'Registered Nurse',
    experience: '5 years',
    certifications: ['RN License', 'BLS', 'ACLS'],
    preferredLocation: 'West Wing',
    notifications: {
      email: true,
      push: true,
      sms: false,
      schedule_updates: true,
      shift_reminders: true,
      payment_notifications: true
    },
    availability: {
      monday: { morning: true, afternoon: false, night: true },
      tuesday: { morning: true, afternoon: true, night: false },
      wednesday: { morning: false, afternoon: true, night: false },
      thursday: { morning: true, afternoon: true, night: false },
      friday: { morning: true, afternoon: false, night: false },
      saturday: { morning: false, afternoon: false, night: false },
      sunday: { morning: false, afternoon: false, night: false },
    }
  });

  const handleInputChange = (field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationToggle = (type: string) => {
    setProfileData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type as keyof typeof prev.notifications]
      }
    }));
  };

  const handleAvailabilityToggle = (day: string, shift: string) => {
    setProfileData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day as keyof typeof prev.availability],
          [shift]: !prev.availability[day as keyof typeof prev.availability][shift as keyof typeof prev.availability.monday]
        }
      }
    }));
  };

  if (!isOpen) return null;

  const menuItems = [
    { id: 'profile', icon: User, label: 'Profile Information' },
    { id: 'professional', icon: Briefcase, label: 'Professional Details' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'availability', icon: Calendar, label: 'Availability' },
    { id: 'security', icon: Shield, label: 'Security' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="grid grid-cols-5 min-h-[calc(100vh-12rem)] relative">
        {/* Sidebar */}
        <div className="col-span-1 border-r">
          <div className="p-6 border-b">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src="/avatars/sarah.jpg"
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 bg-blue-500 rounded-full text-white hover:bg-blue-600">
                  <Camera className="w-3 h-3" />
                </button>
              </div>
              <div>
                <h3 className="font-medium">{profileData.name}</h3>
                <p className="text-sm text-gray-500">{profileData.role}</p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${activeTab === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content - Add pb-20 for footer space */}
        <div className="col-span-4 p-8 overflow-y-auto pb-20">
          {activeTab === 'profile' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full border rounded-lg p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full border rounded-lg p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full border rounded-lg p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <select
                      value={profileData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="w-full border rounded-lg p-2.5"
                    >
                      <option>Emergency</option>
                      <option>ICU</option>
                      <option>Surgery</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Preferred Location</h3>
                <div className="grid grid-cols-3 gap-4">
                  {['West Wing', 'East Wing', 'North Wing'].map((location) => (
                    <label
                      key={location}
                      className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer ${profileData.preferredLocation === location
                          ? 'border-blue-500 bg-blue-50'
                          : 'hover:bg-gray-50'
                        }`}
                    >
                      <input
                        type="radio"
                        name="location"
                        checked={profileData.preferredLocation === location}
                        onChange={() => handleInputChange('preferredLocation', location)}
                        className="hidden"
                      />
                      <Building className="w-5 h-5 text-gray-500" />
                      <span>{location}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'professional' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-6">Professional Details</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      value={profileData.role}
                      onChange={() => {}}
                      className="w-full border rounded-lg p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience
                    </label>
                    <input
                      type="text"
                      value={profileData.experience}
                      onChange={() => {}}
                      className="w-full border rounded-lg p-2.5"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Certifications</h3>
                <div className="space-y-3">
                  {profileData.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-green-500" />
                        <span>{cert}</span>
                      </div>
                      <span className="text-sm text-gray-500">Valid</span>
                    </div>
                  ))}
                  <button className="w-full p-4 border rounded-lg text-blue-500 hover:bg-blue-50 flex items-center justify-center gap-2">
                    <span>Add Certification</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { id: 'email', icon: Mail, title: 'Email Notifications', description: 'Receive updates via email' },
                  { id: 'push', icon: Bell, title: 'Push Notifications', description: 'Receive instant updates on your device' },
                  { id: 'sms', icon: Phone, title: 'SMS Notifications', description: 'Receive text message updates' },
                  { id: 'schedule_updates', icon: Calendar, title: 'Schedule Updates', description: 'Get notified about schedule changes' },
                  { id: 'shift_reminders', icon: Clock, title: 'Shift Reminders', description: 'Receive reminders before your shifts' },
                  { id: 'payment_notifications', icon: DollarSign, title: 'Payment Notifications', description: 'Get notified about payments' },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profileData.notifications[item.id as keyof typeof profileData.notifications]}
                        onChange={() => handleNotificationToggle(item.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'availability' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-6">Weekly Availability</h2>
              <div className="space-y-4">
                {Object.entries(profileData.availability).map(([day, shifts]) => (
                  <div key={day} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="font-medium capitalize mb-4">{day}</div>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(shifts).map(([shift, isAvailable]) => (
                        <label
                          key={shift}
                          className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${isAvailable ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-100'
                            }`}
                        >
                          <input
                            type="checkbox"
                            checked={isAvailable}
                            onChange={() => handleAvailabilityToggle(day, shift)}
                            className="hidden"
                          />
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="capitalize">{shift}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8">
              <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
              <div className="space-y-4">
                <div className="p-6 border rounded-lg space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="font-medium">Change Password</div>
                        <div className="text-sm text-gray-500">Last changed 30 days ago</div>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      Update
                    </button>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full border rounded-lg p-2.5"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full border rounded-lg p-2.5"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full border rounded-lg p-2.5"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="font-medium">Two-Factor Authentication</div>
                        <div className="text-sm text-gray-500">Add an extra layer of security</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="p-6 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      <div>
                        <div className="font-medium">Delete Account</div>
                        <div className="text-sm text-gray-500">Permanently delete your account and all data</div>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="absolute bottom-0 right-0 left-0 bg-white border-t p-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Handle save changes
                console.log('Saving changes:', profileData);
                onClose();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings