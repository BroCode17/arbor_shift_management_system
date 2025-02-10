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


export const monthlyShifts = [
  {
    "id": "shift1",
    "date": "2025-02-01",
    "time": "7a-3p",
    "department": "Emergency",
    "location": "West Wing",
    "rate": 45,
    "status": "available",
    "positions": 2,
    "code": "PRD H01 #289150",
    "requirements": ["RN License", "2+ years experience"]
  },
  {
    "id": "shift2",
    "date": "2025-02-02",
    "time": "3p-11p",
    "department": "Surgery",
    "location": "East Wing",
    "rate": 50,
    "status": "available",
    "positions": 1,
    "code": "PRD H01 #289151",
    "requirements": ["RN License", "3+ years experience"]
  },
  {
    "id": "shift3",
    "date": "2025-02-03",
    "time": "11p-7a",
    "department": "Pediatrics",
    "location": "North Wing",
    "rate": 48,
    "status": "available",
    "positions": 3,
    "code": "PRD H01 #289152",
    "requirements": ["RN License", "1+ years experience"]
  },
  {
    "id": "shift4",
    "date": "2025-02-04",
    "time": "7a-3p",
    "department": "ICU",
    "location": "South Wing",
    "rate": 60,
    "status": "available",
    "positions": 2,
    "code": "PRD H01 #289153",
    "requirements": ["RN License", "4+ years experience"]
  },
  {
    "id": "shift5",
    "date": "2025-02-05",
    "time": "3p-11p",
    "department": "Oncology",
    "location": "West Wing",
    "rate": 55,
    "status": "available",
    "positions": 1,
    "code": "PRD H01 #289154",
    "requirements": ["RN License", "2+ years experience"]
  },
  {
    "id": "shift6",
    "date": "2025-02-06",
    "time": "11p-7a",
    "department": "Cardiology",
    "location": "East Wing",
    "rate": 52,
    "status": "available",
    "positions": 2,
    "code": "PRD H01 #289155",
    "requirements": ["RN License", "3+ years experience"]
  },
  {
    "id": "shift7",
    "date": "2025-02-07",
    "time": "7a-3p",
    "department": "Neurology",
    "location": "North Wing",
    "rate": 58,
    "status": "available",
    "positions": 2,
    "code": "PRD H01 #289156",
    "requirements": ["RN License", "2+ years experience"]
  },
  {
    "id": "shift8",
    "date": "2025-02-08",
    "time": "3p-11p",
    "department": "Orthopedics",
    "location": "South Wing",
    "rate": 50,
    "status": "available",
    "positions": 1,
    "code": "PRD H01 #289157",
    "requirements": ["RN License", "3+ years experience"]
  },
  {
    "id": "shift9",
    "date": "2025-02-09",
    "time": "11p-7a",
    "department": "Geriatrics",
    "location": "West Wing",
    "rate": 47,
    "status": "available",
    "positions": 2,
    "code": "PRD H01 #289158",
    "requirements": ["RN License", "1+ years experience"]
  },
  {
    "id": "shift10",
    "date": "2025-02-10",
    "time": "7a-3p",
    "department": "Emergency",
    "location": "East Wing",
    "rate": 45,
    "status": "available",
    "positions": 2,
    "code": "PRD H01 #289159",
    "requirements": ["RN License", "2+ years experience"]
  },
  {
    "id": "shift11",
    "date": "2025-02-11",
    "time": "3p-11p",
    "department": "Surgery",
    "location": "North Wing",
    "rate": 50,
    "status": "available",
    "positions": 1,
    "code": "PRD H01 #289160",
    "requirements": ["RN License", "3+ years experience"]
  },
  {
    "id": "shift12",
    "date": "2025-02-12",
    "time": "11p-7a",
    "department": "Pediatrics",
    "location": "South Wing",
    "rate": 48,
    "status": "available",
    "positions": 3,
    "code": "PRD H01 #289161",
    "requirements": ["RN License", "1+ years experience"]
  },
  {
    "id": "shift13",
    "date": "2025-02-13",
    "time": "7a-3p",
    "department": "ICU",
    "location": "West Wing",
    "rate": 60,
    "status": "available",
    "positions": 2,
    "code": "PRD H01 #289162",
    "requirements": ["RN License", "4+ years experience"]
  },
  {
    "id": "shift14",
    "date": "2025-02-14",
    "time": "3p-11p",
    "department": "Oncology",
    "location": "East Wing",
    "rate": 55,
    "status": "available",
    "positions": 1,
    "code": "PRD H01 #289163",
    "requirements": ["RN License", "2+ years experience"]
  },
  {
    "id": "shift15",
    "date": "2025-02-15",
    "time": "11p-7a",
    "department": "Cardiology",
    "location": "North Wing",
    "rate": 52,
    "status": "available",
    "positions": 2,
    "code": "PRD H01 #289164",
    "requirements": ["RN License", "3+ years experience"]
  },
  {
    "id": "shift16",
    "date": "2025-02-16",
    "time": "7a-3p",
    "department": "Neurology",
    "location": "South Wing",
    "rate": 58,
    "status": "available",
    "positions": 2,
    "code": "PRD H01 #289165",
    "requirements": ["RN License", "2+ years experience"]
  },
  {
    "id": "shift17",
    "date": "2025-02-17",
    "time": "3p-11p",
    "department": "Orthopedics",
    "location": "West Wing",
    "rate": 50,
    "status": "available",
    "positions": 1,
    "code": "PRD H01 #289166",
    "requirements": ["RN License", "3+ years experience"]
  },
  {
    "id": "shift18",
    "date": "2025-02-18",
    "time": "11p-7a",
    "department": "Geriatrics",
    "location": "East Wing",
    "rate": 47,
    "status": "available",
    "positions": 2,
    "code": "PRD H01 #289167",
    "requirements": ["RN License", "1+ years experience"]
  },
  {
    "id": "shift19",
    "date": "2025-02-19",
    "time": "7a-3p",
    "department": "Emergency",
    "location": "North Wing",
    "rate": 45,
    "status": "available",
    "positions": 2,
    "code": "PRD H01 #289168",
    "requirements": ["RN License", "2+ years experience"]
  },
  {
    "id": "shift20",
    "date": "2025-02-20",
    "time": "3p-11p",
    "department": "Surgery",
    "location": "South Wing",
    "rate": 50,
    "status": "available",
    "positions": 1,
    "code": "PRD H01 #289169",
    "requirements": ["RN License", "3+ years experience"]
  },
  {
    "id": "shift21",
    "date": "2025-02-21",
    "time": "11p-7a",
    "department": "Pediatrics",
    "location": "West Wing",
    "rate": 48,
    "status": "available",
    "positions": 3,
    "code": "PRD H01 #289170",
    "requirements": ["RN License", "1+ years experience"]
  },
  {
    "id": "shift22",
    "date": "2025-02-22",
    "time": "7a-3p",
    "department": "ICU",
    "location": "East Wing",
    "rate": 60,
    "status": "available",
    "positions": 2,
    "code": "PRD H01 #289171",
    "requirements": ["RN License", "4+ years experience"]
  },
  {
    "id": "shift23",
    "date": "2025-02-23",
    "time": "3p-11p",
    "department": "Oncology",
    "location": "North Wing",
    "rate": 55,
    "status": "available",
    "positions": 1,
    "code": "PRD H01 #289172",
    "requirements": ["RN License", "2+ years experience"]
  },
  {
    "id": "shift24",
    "date": "2025-02-24",
    "time": "11p-7a",
    "department": "Cardiology",
    "location": "South Wing",
    "rate": 52,
    "status": "available",
    "positions": 2,
    "code": "PRD H01 #289173",
    "requirements": ["RN License", "3+ years experience"]
  },
  {
    "id": "shift25",
    "date": "2025-02-25",
    "time": "7a-3p",
    "department": "Neurology",
    "location": "West Wing",
    "rate": 58,
    "status": "available",
    "positions": 2,
    "code": "PRD H01 #289174",
    "requirements": ["RN License", "2+ years experience"]
  },
  {
    "id": "shift26",
    "date": "2025-02-26",
    "time": "3p-11p",
    "department": "Orthopedics",
    "location": "East Wing",
    "rate": 50,
    "status": "available",
    "positions": 1,
    "code": "PRD H01 #289175",
    "requirements": ["RN License", "3+ years experience"]
  },
  {
    "id": "shift27",
    "date": "2025-02-27",
    "time": "11p-7a",
    "department": "Geriatrics",
    "location": "North Wing",
    "rate": 47,
    "status": "available",
    "positions": 2,
    "code": "PRD H01 #289176",
    "requirements": ["RN License", "1+ years experience"]
  },
  {
    "id": "shift28",
    "date": "2025-02-28",
    "time": "7a-3p",
    "department": "Emergency",
    "location": "South Wing",
    "rate": 45,
    "status": "available",
    "positions": 2,
    "code": "PRD H01 #289177",
    "requirements": ["RN License", "2+ years experience"]
  },
  {
    "id": "shift29",
    "date": "2025-02-29",
    "time": "3p-11p",
    "department": "Surgery",
    "location": "West Wing",
    "rate": 50,
    "status": "available",
    "positions": 1,
    "code": "PRD H01 #289178",

    "requirements": ["RN License", "2+ years experience"]
  },
  {
    "id": "shift30",
    "date": "2025-02-29",
    "time": "11p-7a",
    "department": "Pediatrics",
    "location": "East Wing",
    "rate": 48,
    "status": "available",
    "positions": 3,
    "code": "PRD H01 #289179",
    "requirements": ["RN License", "1+ years experience"]
  },
  {
    "id": "shift31",
    "date": "2025-02-28",
    "time": "7a-3p",
    "department": "ICU",
    "location": "North Wing",
    "rate": 60,
    "status": "available",
    "positions": 2,
    "code": "PRD H01 #289180",
    "requirements": ["RN License", "4+ years experience"]
  },
  {
    "id": "shift32",
    "date": "2025-02-25",
    "time": "3p-11p",
    "department": "Oncology",
    "location": "South Wing",
    "rate": 55,
    "status": "available",
    "positions": 1,
    "code": "PRD H01 #289181",
    "requirements": ["RN License", "2+ years experience"]
  }]