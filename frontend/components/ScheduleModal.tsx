import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format, addHours } from 'date-fns';
import 'react-calendar/dist/Calendar.css';

// Add new interfaces for the form data
interface Agency {
  id: string;
  name: string;
  location: string;
}

interface Certification {
  id: string;
  name: string;
  required: boolean;
}

const agencies: Agency[] = [
  { id: '1', name: 'MedStaff Solutions', location: 'New York' },
  { id: '2', name: 'Healthcare Pros', location: 'Los Angeles' },
  { id: '3', name: 'NurseTemp Agency', location: 'Chicago' },
];

const availableCertifications: Certification[] = [
  { id: 'rn', name: 'RN License', required: true },
  { id: 'bls', name: 'BLS', required: true },
  { id: 'acls', name: 'ACLS', required: false },
  { id: 'pals', name: 'PALS', required: false },
  { id: 'ccrn', name: 'CCRN', required: false },
];

export interface ScheduleData {
  selectedDate: Date;
  startTime: string;
  endTime: string;
  type: string;
  status: string;
  certifications: string[];
  gender: string;
  baseRate: string;
  incentive: string;
  agencyId: string;
  department: string;
  totalRate: string;
}

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (scheduleData: ScheduleData) => void;
  initialData?: ScheduleData;
  isEditing?: boolean;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isEditing = false,
}) => {
  const now = new Date();
  const twoHoursLater = addHours(now, 2);

  const [formData, setFormData] = useState({
    startTime: initialData?.startTime || format(now, 'HH:mm'),
    endTime: initialData?.endTime || format(twoHoursLater, 'HH:mm'),
    selectedDate: initialData?.selectedDate || now,
    type: initialData?.type || 'shift',
    status: initialData?.status || 'on-time',
    certifications: initialData?.certifications || [] as string[],
    gender: initialData?.gender || 'any',
    baseRate: initialData?.baseRate || '25.00',
    incentive: initialData?.incentive || '',
    agencyId: initialData?.agencyId || '',
    department: initialData?.department || '',
  });

  // Add handleCertificationChange function
  const handleCertificationChange = (certId: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.includes(certId)
        ? prev.certifications.filter(id => id !== certId)
        : [...prev.certifications, certId]
    }));
  };

  const calculateTotalRate = () => {
    const base = parseFloat(formData.baseRate) || 0;
    const incentive = parseFloat(formData.incentive) || 0;
    return (base + incentive).toFixed(2);
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];
    
    if (!formData.agencyId) errors.push("Please select an agency");
    if (!formData.department) errors.push("Please enter a department");
    if (!formData.startTime || !formData.endTime) errors.push("Please set both start and end time");
    if (formData.certifications.length === 0) errors.push("Please select at least one certification");
    
    // Check if all required certifications are selected
    const missingRequired = availableCertifications
      .filter(cert => cert.required && !formData.certifications.includes(cert.id))
      .map(cert => cert.name);
    
    if (missingRequired.length > 0) {
      errors.push(`Missing required certifications: ${missingRequired.join(', ')}`);
    }

    // Validate time
    const startTime = new Date(`1970/01/01 ${formData.startTime}`);
    const endTime = new Date(`1970/01/01 ${formData.endTime}`);
    if (endTime <= startTime) {
      errors.push("End time must be after start time");
    }

    // Validate rates
    const baseRate = parseFloat(formData.baseRate);
    const incentive = parseFloat(formData.incentive || '0');
    if (baseRate <= 0) errors.push("Base rate must be greater than 0");
    if (incentive < 0) errors.push("Incentive cannot be negative");

    return errors;
  };

  const handleSubmit =  (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    console.table(formData)
    try {
      const scheduleData: ScheduleData = {
        ...formData,
        totalRate: calculateTotalRate(),
      };
       onSave(scheduleData);
     // onClose();
    } catch (error) {
      console.error('Error saving schedule:', error);
      alert('Failed to save schedule. Please try again.');
    }
  };

  if(!isOpen)
    return;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {isEditing ? 'Edit Schedule' : 'Add Schedule'}
          </h3>
          <button type="button" onClick={onClose}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <div className="mt-1">
              <Calendar
                onChange={(date: any) => {
                  console.log(date);
                  setFormData({ ...formData, selectedDate: date })
                }}
                value={formData.selectedDate}
                className="w-full border rounded-md"
                minDate={new Date()}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Agency</label>
            <select
              value={formData.agencyId}
              onChange={(e) => setFormData({ ...formData, agencyId: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300"
              required
            >
              <option value="">Select Agency</option>
              {agencies.map(agency => (
                <option key={agency.id} value={agency.id}>
                  {agency.name} - {agency.location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300"
              placeholder="e.g., Emergency, ICU, etc."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">Start</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">End</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300"
            >
              <option value="shift">Shift</option>
              <option value="out">Out of Office</option>
              <option value="meeting">Meeting</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300"
            >
              <option value="on-time">On Time</option>
              <option value="early">Early</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Required Certifications</label>
            <div className="space-y-2 border rounded-md p-3">
              {availableCertifications.map(cert => (
                <label key={cert.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.certifications.includes(cert.id)}
                    onChange={() => handleCertificationChange(cert.id)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">
                    {cert.name}
                    {cert.required && <span className="text-red-500 ml-1">*</span>}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender Preference</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300"
            >
              <option value="any">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Base Rate ($/hr)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.baseRate}
                onChange={(e) => setFormData({ ...formData, baseRate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Incentive ($/hr)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.incentive}
                onChange={(e) => setFormData({ ...formData, incentive: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm font-medium text-gray-700">
              Total Rate: ${calculateTotalRate()}/hr
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleModal;