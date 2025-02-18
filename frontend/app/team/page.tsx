'use client'
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Nurse',
      department: 'Emergency',
      avatar: '/sarah_profile.jpg',
      email: 'sarah.j@hospital.com',
      phone: '(555) 123-4567',
      location: 'West Wing',
      status: 'available',
      specialties: ['Critical Care', 'Emergency Medicine'],
      certifications: ['RN', 'ACLS', 'PALS'],
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Nurse',
      department: 'ICU',
      avatar: '/michael_profile.jpg',
      email: 'michael.c@hospital.com',
      phone: '(555) 234-5678',
      location: 'North Wing',
      status: 'busy',
      specialties: ['Intensive Care', 'Cardiac Care'],
      certifications: ['RN', 'CCRN', 'BLS'],
    },
    {
      id: 3,
      name: 'Emily Wilson',
      role: 'Nurse',
      department: 'Emergency',
      avatar: '/emily_profile.jpg',
      email: 'emily.w@hospital.com',
      phone: '(555) 345-6789',
      location: 'East Wing',
      status: 'available',
      specialties: ['Trauma Care', 'Pediatric Emergency'],
      certifications: ['RN', 'TNCC', 'ENPC'],
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !selectedDepartment || member.department === selectedDepartment;
    const matchesStatus = !selectedStatus || member.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Team Members</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search team members..."
              className="px-4 py-2 border rounded-lg w-64"
            />
            <select 
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">All Departments</option>
              <option value="Emergency">Emergency</option>
              <option value="ICU">ICU</option>
              <option value="Surgery">Surgery</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">All Status</option>
              <option value="available">Available</option>
              <option value="busy">Busy</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                    member.status === 'available' ? 'bg-green-500' : 
                    member.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                  <p className="text-sm text-gray-500">{member.department}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{member.location}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {member.certifications.map((cert, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}