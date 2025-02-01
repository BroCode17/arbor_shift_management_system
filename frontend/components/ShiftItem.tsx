import React from 'react';
import Image from 'next/image';


interface ShiftDetails {
  location: string;
  department: string;
  claimedBy?: string | null;  // Add null as possible value
  certifications: string[];
  hourlyRate: number;
  notes?: string;
  supervisorOnDuty: string;
  breakTime: string;
}

interface Shift {
  time: string;
  status?: 'on-time' | 'early' | 'late' | 'unclaimed';  // Add unclaimed status
  type?: 'shift' | 'out' | 'meeting';
  details: ShiftDetails;
}

interface ShiftItemsProps {
  entry: {
    id: string;
    name: string;
    employeeId: string;
    role: string;
    department: string;
    avatar: string;
    schedules: {
      date: string;
      shifts: Shift[];
    }[];
  };
  onScheduleClick: (name: string, date: string) => void;
  daysToShow: { date: string }[];
}

export const ShiftItems: React.FC<ShiftItemsProps> = ({
  entry, 
  onScheduleClick,
  daysToShow 
}) => {
 
  return (
    <>
      <div className="p-4 flex items-center gap-3 border-b sticky left-0 bg-white z-10">
        <div className="relative group">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative">
            <Image
              src={entry.avatar}
              alt={entry.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute hidden group-hover:block bg-white p-2 rounded shadow-lg z-20 w-48">
            <p className="font-medium">{entry.name}</p>
            <p className="text-sm text-gray-600">ID: {entry.employeeId}</p>
            <p className="text-sm text-gray-600">Role: {entry.role}</p>
            <p className="text-sm text-gray-600">Dept: {entry.department}</p>
          </div>
        </div>
        <span className="font-medium truncate">{entry.name}</span>
      </div>

      {daysToShow.map((day, dayIndex) => {
        const schedule = entry.schedules.find(s => 
          new Date(s.date).getDate().toString() === day.date
        );

        return (
          <div
            key={`${entry.id}-${day.date}`}
            className="p-2 border-b border-l min-h-[80px] bg-white"
          >
            {schedule?.shifts.map((shift, shiftIdx) => (
              <div
                key={shiftIdx}
                onClick={() => onScheduleClick(entry.name, schedule.date)}
                className={`p-2 rounded mb-2 transition-colors cursor-pointer ${
                  shift.type === 'shift'
                    ? shift.status === 'unclaimed'
                      ? 'bg-gray-100 hover:bg-gray-200'
                      : 'bg-blue-100 hover:bg-blue-200'
                    : shift.type === 'out'
                    ? 'bg-orange-100 hover:bg-orange-200'
                    : 'bg-yellow-100 hover:bg-yellow-200'
                }`}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    {shift.status && (
                      <span
                        className={`w-2 h-2 rounded-full ${
                          shift.status === 'unclaimed'
                            ? 'bg-gray-500'
                            : shift.status === 'on-time'
                            ? 'bg-green-500'
                            : shift.status === 'early'
                            ? 'bg-blue-500'
                            : 'bg-yellow-500'
                        }`}
                      />
                    )}
                    <span className="text-xs md:text-sm font-medium">
                      {shift.time}
                      {shift.status === 'unclaimed' && (
                        <span className="ml-2 text-gray-500">(Unclaimed)</span>
                      )}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 hidden md:block">
                    <p className="truncate">Location: {shift.details.location}</p>
                    <p className="truncate">Dept: {shift.details.department}</p>
                    <p className="truncate">Rate: ${shift.details.hourlyRate}/hr</p>
                    <p className="truncate">Break: {shift.details.breakTime}</p>
                    {shift.details.certifications.length > 0 && (
                      <div className="flex gap-1 flex-wrap mt-1">
                        {shift.details.certifications.map((cert, i) => (
                          <span
                            key={i}
                            className="bg-gray-200 px-1 rounded text-xs"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};

export default ShiftItems;