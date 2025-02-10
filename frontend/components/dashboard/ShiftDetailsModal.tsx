'use client'
import React from 'react';
import { X, Clock, MapPin, User, FileText, Phone, Mail } from 'lucide-react';
import Image from 'next/image';

interface ShiftDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift: {
    id: string;
    date: string;
    time: string;
    department: string;
    location: string;
    supervisor: {
      name: string;
      avatar: string;
      phone: string;
      email: string;
    };
    notes?: string;
    requirements?: string[];
  };
}

const ShiftDetailsModal: React.FC<ShiftDetailsModalProps> = ({ isOpen, onClose, shift }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Shift Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{shift.time}</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{shift.location}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-medium mb-4">Supervisor</h3>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={shift.supervisor.avatar}
                  alt={shift.supervisor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="font-medium">{shift.supervisor.name}</div>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <a href={`tel:${shift.supervisor.phone}`} className="flex items-center gap-1 hover:text-blue-500">
                    <Phone className="w-4 h-4" />
                    <span>Call</span>
                  </a>
                  <a href={`mailto:${shift.supervisor.email}`} className="flex items-center gap-1 hover:text-blue-500">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {shift.notes && (
            <div className="border-t pt-6">
              <h3 className="font-medium mb-4">Notes</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 mt-1 text-gray-500" />
                  <p className="text-sm text-gray-600">{shift.notes}</p>
                </div>
              </div>
            </div>
          )}

          {shift.requirements && shift.requirements.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="font-medium mb-4">Requirements</h3>
              <ul className="space-y-2">
                {shift.requirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShiftDetailsModal;