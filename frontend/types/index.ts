export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  employeeId: string;
  hourlyRate: number;
  avatar: string;
  certifications: Certification[];
}

export interface Department {
  id: string;
  name: string;
  location: string;
  managerId: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  wing: string;
  floor: number;
}

export interface Shift {
  id: string;
  templateId: string;
  shiftDate: string;
  startTime: string;
  endTime: string;
  status: 'open' | 'filled' | 'cancelled';
  hourlyRate: number;
  departmentId: string;
  locationId: string;
  department: string;
  location: string;
}

export interface ShiftPreference {
  userId: string;
  preferredLocations: string[];
  preferredDepartments: string[];
  preferredShiftTypes: ('morning' | 'afternoon' | 'night')[];
  minHourlyRate: number;
  maxDistance: number;
  autoApply: boolean;
  notificationPreferences: {
    openShifts: boolean;
    scheduleChanges: boolean;
    reminders: boolean;
  };
}

export interface Certification {
  id: string;
  name: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'expired' | 'pending' | 'approved';
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export interface ClockInRequest {
  shiftId: string;
  userId: string;
  location: GeoLocation;
  deviceId: string;
  timestamp: number;
  biometricVerified?: boolean;
}

export interface ClockOutRequest extends ClockInRequest {
  totalHours: number;
  notes?: string;
}

export interface ShiftLocation {
  id: string;
  name: string;
  coordinates: GeoLocation;
  radius: number; // Allowed radius in meters
}

// Add to existing ShiftState interface
export interface ShiftState {
  availableShifts: Shift[];
  myShifts: Shift[];
  preferences: ShiftPreference;
  activeClockIn: {
    shiftId: string | null;
    startTime: number | null;
    location: GeoLocation | null;
  } | null;
  loading: boolean;
  error: string | null;
}

// Add to existing ShiftAction type
export type ShiftAction =
  | { type: 'SET_AVAILABLE_SHIFTS'; payload: Shift[] }
  | { type: 'SET_MY_SHIFTS'; payload: Shift[] }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<ShiftPreference> }
  | { type: 'APPLY_FOR_SHIFT'; payload: string }
  | { type: 'CLOCK_IN_REQUEST'; payload: ClockInRequest }
  | { type: 'CLOCK_IN_SUCCESS'; payload: { shiftId: string; startTime: number; location: GeoLocation } }
  | { type: 'CLOCK_IN_FAILURE'; payload: string }
  | { type: 'CLOCK_OUT_REQUEST'; payload: ClockOutRequest }
  | { type: 'CLOCK_OUT_SUCCESS'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };