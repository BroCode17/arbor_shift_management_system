import { format, addDays } from 'date-fns';

// Helper function to generate dates
const getNextDays = (startDate: Date, days: number) => {
  return Array.from({ length: days }, (_, i) => 
    format(addDays(startDate, i), 'yyyy-MM-dd')
  );
};

const nextWeekDates = getNextDays(new Date(), 7);

export const mockEmployees = [
  {
    id: "emp1",
    name: "Sarah Johnson",
    employeeId: "RN1234",
    role: "Registered Nurse",
    department: "Emergency",
    avatar: "/avatars/sarah.jpg",
    schedules: [
      {
        date: nextWeekDates[0],
        shifts: [
          {
            time: "15:00 - 23:00",
            status: "on-time",
            type: "shift",
            details: {
              location: "ICU Floor 2",
              department: "Intensive Care",
              certifications: ["RN", "ACLS", "PALS"],
              hourlyRate: 52.00,
              supervisorOnDuty: "Dr. Johnson",
              breakTime: "19:00 - 19:30",
              claimedBy: "Sarah Johnson"
            }
          }
        ]
      }
    ]
  },
  {
    id: "emp2",
    name: "Michael Chen",
    employeeId: "RN5678",
    role: "Surgical Nurse",
    department: "Surgery",
    avatar: "/avatars/michael.jpg",
    schedules: [
      {
        date: nextWeekDates[2],
        shifts: [
          {
            time: "09:00 - 17:00",
            status: "on-time",
            type: "shift",
            details: {
              location: "Surgery Wing B",
              department: "Surgery",
              certifications: ["RN", "ACLS", "CNOR"],
              hourlyRate: 65.00,
              supervisorOnDuty: "Dr. Anderson",
              breakTime: "13:00 - 13:30",
              claimedBy: "Michael Chen"
            }
          },
          {
            time: "17:00 - 19:00",
            status: "on-time",
            type: "shift",
            details: {
              location: "Surgery Wing B",
              department: "Surgery",
              certifications: ["RN", "ACLS", "CNOR"],
              hourlyRate: 65.00,
              supervisorOnDuty: "Dr. Anderson",
              breakTime: "13:00 - 13:30",
              claimedBy: "Michael Chen"
            }
          }
        ]
      }
    ]
  },
 
  {
    id: "emp3",
    name: "Emily Rodriguez",
    employeeId: "RN9012",
    role: "Cardiac Nurse",
    department: "Cardiology",
    avatar: "/avatars/emily.jpg",
    schedules: [
      {
        date: nextWeekDates[3],
        shifts: [
          {
            time: "15:00 - 23:00",
            status: "on-time",
            type: "shift",
            details: {
              location: "Cardiac Unit",
              department: "Cardiology",
              certifications: ["RN", "ACLS", "CCRN"],
              hourlyRate: 60.00,
              supervisorOnDuty: "Dr. Thompson",
              breakTime: "19:00 - 19:30",
              claimedBy: "Emily Rodriguez"
            }
          }
        ]
      }
    ]
  }
];

export const mockUnclaimedShifts = [
  {
    id: 'shift1',
    date: nextWeekDates[0],
    shifts: [
      {
        time: "07:00 - 15:00",
        status: "unclaimed",
        type: "shift",
        details: {
          location: "ER Wing A",
          department: "Emergency",
          certifications: ["RN", "BLS"],
          hourlyRate: 45.50,
          supervisorOnDuty: "Dr. Smith",
          breakTime: "11:00 - 11:30",
          claimedBy: null
        }
      }
    ]
  },
  {
    id: 'shift3',
    date: nextWeekDates[1],
    shifts: [
      {
        time: "23:00 - 07:00",
        status: "unclaimed",
        type: "shift",
        details: {
          location: "Pediatrics Ward",
          department: "Pediatrics",
          certifications: ["RN", "PALS", "BLS"],
          hourlyRate: 58.00,
          supervisorOnDuty: "Dr. Williams",
          breakTime: "03:00 - 03:30",
          claimedBy: null
        }
      }
    ]
  },
  {
    id: 'shift5',
    date: nextWeekDates[2],
    shifts: [
      {
        time: "07:00 - 15:00",
        status: "unclaimed",
        type: "shift",
        details: {
          location: "Maternity Ward",
          department: "Labor & Delivery",
          certifications: ["RN", "BLS", "NRP"],
          hourlyRate: 55.00,
          supervisorOnDuty: "Dr. Martinez",
          breakTime: "11:00 - 11:30",
          claimedBy: null
        }
      }
    ]
  }
];

export const getUnclaimedShifts = () => {
  return mockUnclaimedShifts;
};

export const getEmployeeShifts = () => {
  return mockEmployees;
};

export const getShiftsByDate = (date: string) => {
  return [...mockUnclaimedShifts, ...mockEmployees.map(emp => emp.schedules).flat()]
    .filter(shift => shift.date === date);
};