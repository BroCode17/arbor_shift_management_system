'use client'
import React from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Calendar, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';

interface PeopleGridProps {
  view: 'grid' | 'list';
  searchQuery: string;
  selectedDepartments: string[];
  selectedRoles: string[];
}

const PeopleGrid: React.FC<PeopleGridProps> = ({
  view,
  searchQuery,
  selectedDepartments,
  selectedRoles,
}) => {
  const mockEmployees = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'RN',
      department: 'Emergency',
      email: 'sarah.j@hospital.com',
      phone: '(555) 123-4567',
      location: 'West Wing',
      avatar: '/avatars/sarah.jpg',
      startDate: new Date('2023-01-15'),
      status: 'active',
      certifications: ['BLS', 'ACLS', 'PALS'],
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'MD',
      department: 'Cardiology',
      email: 'michael.c@hospital.com',
      phone: '(555) 234-5678',
      location: 'East Wing',
      avatar: '/avatars/michael.jpg',
      startDate: new Date('2022-08-20'),
      status: 'active',
      certifications: ['BLS', 'ACLS', 'Board Certified'],
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'PA',
      department: 'Pediatrics',
      email: 'emily.r@hospital.com',
      phone: '(555) 345-6789',
      location: 'North Wing',
      avatar: '/avatars/emily.jpg',
      startDate: new Date('2023-03-10'),
      status: 'active',
      certifications: ['BLS', 'PALS'],
    },
    {
      id: '4',
      name: 'James Wilson',
      role: 'RN',
      department: 'Surgery',
      email: 'james.w@hospital.com',
      phone: '(555) 456-7890',
      location: 'South Wing',
      avatar: '/avatars/james.jpg',
      startDate: new Date('2022-11-05'),
      status: 'inactive',
      certifications: ['BLS', 'ACLS', 'CNOR'],
    },
    {
      id: '5',
      name: 'Lisa Kim',
      role: 'NP',
      department: 'Family Medicine',
      email: 'lisa.k@hospital.com',
      phone: '(555) 567-8901',
      location: 'Main Building',
      avatar: '/avatars/lisa.jpg',
      startDate: new Date('2023-02-28'),
      status: 'active',
      certifications: ['BLS', 'FNP-C'],
    },
    {
      id: '6',
      name: 'David Thompson',
      role: 'MD',
      department: 'Neurology',
      email: 'david.t@hospital.com',
      phone: '(555) 678-9012',
      location: 'East Wing',
      avatar: '/avatars/david.jpg',
      startDate: new Date('2022-06-15'),
      status: 'active',
      certifications: ['BLS', 'ACLS', 'Board Certified'],
    },
    {
      id: '7',
      name: 'Maria Garcia',
      role: 'RN',
      department: 'ICU',
      email: 'maria.g@hospital.com',
      phone: '(555) 789-0123',
      location: 'West Wing',
      avatar: '/avatars/maria.jpg',
      startDate: new Date('2023-04-01'),
      status: 'active',
      certifications: ['BLS', 'ACLS', 'CCRN'],
    },
    {
      id: '8',
      name: 'Robert Lee',
      role: 'PA',
      department: 'Orthopedics',
      email: 'robert.l@hospital.com',
      phone: '(555) 890-1234',
      location: 'South Wing',
      avatar: '/avatars/robert.jpg',
      startDate: new Date('2022-09-12'),
      status: 'active',
      certifications: ['BLS', 'OCS'],
    },
    {
      id: '9',
      name: 'Amanda White',
      role: 'NP',
      department: 'Oncology',
      email: 'amanda.w@hospital.com',
      phone: '(555) 901-2345',
      location: 'North Wing',
      avatar: '/avatars/amanda.jpg',
      startDate: new Date('2023-01-20'),
      status: 'inactive',
      certifications: ['BLS', 'AOCNP'],
    },
    {
      id: '10',
      name: 'Thomas Brown',
      role: 'MD',
      department: 'Psychiatry',
      email: 'thomas.b@hospital.com',
      phone: '(555) 012-3456',
      location: 'Main Building',
      avatar: '/avatars/thomas.jpg',
      startDate: new Date('2022-07-30'),
      status: 'active',
      certifications: ['BLS', 'Board Certified', 'ABPN'],
    },
    // Add more mock employees...
  ];

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = 
      searchQuery === '' ||
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(employee.department);

    const matchesRole =
      selectedRoles.length === 0 ||
      selectedRoles.includes(employee.role);

    return matchesSearch && matchesDepartment && matchesRole;
  });
 
  // Helper function to generate background color based on first name
function getBackgroundColor(firstName: string) {
    const colors = [
      'bg-pink-50',
      'bg-purple-50',
      'bg-indigo-50',
      'bg-blue-50',
      'bg-green-50',
      'bg-yellow-50',
      'bg-orange-50',
      'bg-red-50',
      'bg-teal-50',
      'bg-cyan-50'
    ];
    
    // Use the sum of character codes to determine color index
    const sum = firstName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  }

  if (view === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map((employee) => (
          <div
            key={employee.id}
            className={`p-4 border rounded-lg hover:shadow-md transition-shadow ${getBackgroundColor(employee.name.split(' ')[0])}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12">
                  <Image
                    src={employee.avatar}
                    alt={employee.name}
                    fill
                    className="rounded-full object-cover"
                  />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    employee.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div>
                  <h3 className="font-medium">{employee.name}</h3>
                  <p className="text-sm text-gray-500">{employee.role}</p>
                </div>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreVertical className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                {employee.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                {employee.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                {employee.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                Started {format(employee.startDate, 'MMM d, yyyy')}
              </div>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap gap-1">
                {employee.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Certifications
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredEmployees.map((employee) => (
            <tr key={employee.id} className={`hover:bg-gray-50 `}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <Image
                      src={employee.avatar}
                      alt={employee.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{employee.name}</div>
                    <div className="text-sm text-gray-500">{employee.role}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm">{employee.email}</div>
                <div className="text-sm text-gray-500">{employee.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm">{employee.department}</div>
                <div className="text-sm text-gray-500">{employee.location}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-wrap gap-1">
                  {employee.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  employee.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {employee.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeopleGrid;