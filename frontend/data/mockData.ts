import { User, Department, Location, Shift, ShiftPreference } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'sarah.johnson@hospital.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'Registered Nurse',
    department: 'Emergency',
    employeeId: 'RN001',
    hourlyRate: 45.00,
    avatar: '/avatars/sarah.jpg',
    certifications: [
      {
        id: 'cert1',
        name: 'RN License',
        issuingAuthority: 'State Board',
        issueDate: '2022-01-01',
        expiryDate: '2024-01-01',
        status: 'valid'
      }
    ]
  },
  // Add more users...
];

export const mockDepartments: Department[] = [
  {
    id: 'd1',
    name: 'Emergency',
    location: 'Main Building',
    managerId: '1'
  },
  // Add more departments...
];

export const mockLocations: Location[] = [
  {
    id: 'l1',
    name: 'West Wing',
    address: '123 Hospital Street',
    wing: 'West',
    floor: 1
  },
  // Add more locations...
];

export const mockShifts: Shift[] = [
  {
    id: 'shift-1',
    templateId: 't1',
    shiftDate: '2025-02-10',
    startTime: '06:40',
    endTime: '7:40',
    status: 'approved',
    hourlyRate: 45.00,
    departmentId: 'd1',
    locationId: 'l1',
    department: 'Emergency',
    location: 'West Wing'
  },
  // Add more shifts...
];

export const mockPreferences: ShiftPreference = {
  userId: '1',
  preferredLocations: ['l1', 'l2'],
  preferredDepartments: ['d1'],
  preferredShiftTypes: ['morning', 'afternoon'],
  minHourlyRate: 40,
  maxDistance: 25,
  autoApply: false,
  notificationPreferences: {
    openShifts: true,
    scheduleChanges: true,
    reminders: true
  }
};