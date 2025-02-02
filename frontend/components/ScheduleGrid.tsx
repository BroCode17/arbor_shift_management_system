'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ScheduleModal from './ScheduleModal';
import ScheduleControls from './ScheduleControls';
import { format, addDays } from 'date-fns';
import ShiftItems from './ShiftItem';
import { getEmployeeShifts } from '@/data/mockShifts';

interface ScheduleEntry {
    id: number;
    name: string;
    avatar: string;
    schedules: {
        date: string;
        shifts: Array<{
            time: string;
            status?: 'on-time' | 'early';
            type?: 'shift' | 'out' | 'meeting';
        }>;
    }[];
}



interface ScheduleGridProps {
  currentDate: Date;
  isModalOpen: boolean;
  onModalClose: () => void;
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  currentDate,
  isModalOpen,
  onModalClose
}) => {
  const [schedules, setSchedules] = useState(getEmployeeShifts());
  
  // Update the initial state to use the passed currentDate
  const [selectedDate, setSelectedDate] = useState(currentDate);

  // Add effect to update selectedDate when currentDate changes
  useEffect(() => {
    setSelectedDate(currentDate);
  }, [currentDate]);

    const [selectedSchedule, setSelectedSchedule] = useState<{
        member?: string;
        date?: string;
    }>({});

    const handleSaveSchedule = async (scheduleData: any) => {
        try {
          // Here you would typically make an API call to save the data
          // For now, we'll just log it
        
          
          // Update your local state or trigger a refetch
           setSchedules([...schedules, scheduleData]);
          
          // Close the modal
          //setIsModalOpen(false);
        } catch (error) {
          console.error('Error saving schedule:', error);
          throw error; // This will trigger the error handling in the modal
        }
      };
      

    const onScheduleClick = (member: string, date: string) => {
        console.log(member + date);
    }
    const getDaysArray = (startDate: Date) => {
        return Array.from({ length: 4 }, (_, i) => {
            const date = addDays(startDate, i);
            return {
                day: format(date, 'EEE').toUpperCase(),
                date: format(date, 'd'),
                fullDate: date,
            };
        });
    };

    const [daysToShow, setDaysToShow] = useState(getDaysArray(selectedDate));

    useEffect(() => {
        setDaysToShow(getDaysArray(selectedDate));
    }, [selectedDate]);

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    

    const isCurrentDate = (date: Date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

   
    return (
        <div className="max-w-full overflow-x-auto">
            <div className="border rounded-lg overflow-hidden min-w-[768px]">
                <div className="grid grid-cols-[minmax(200px,250px)_repeat(4,minmax(150px,1fr))] bg-gray-50">
                    <div className="p-4 font-medium border-b sticky left-0 bg-gray-50">Name</div>
                    {daysToShow.map((day) => (
                        <div 
                            key={day.date} 
                            className={`p-4 text-center border-b border-l ${
                                isCurrentDate(day.fullDate) 
                                    ? 'bg-blue-50 border-l-2 border-r-2 border-blue-500' 
                                    : ''
                            }`}
                        >
                            <div className={`text-xl md:text-2xl font-medium ${
                                isCurrentDate(day.fullDate) ? 'text-blue-600' : ''
                            }`}>
                                {day.date}
                            </div>
                            <div className={`text-xs md:text-sm ${
                                isCurrentDate(day.fullDate) ? 'text-blue-500' : 'text-gray-500'
                            }`}>
                                {day.day}
                            </div>
                        </div>
                    ))}

                    {schedules.map((entry, index) => (
                        <ShiftItems
                            key={index}
                            entry={entry}
                            onScheduleClick={onScheduleClick}
                            daysToShow={daysToShow}
                        />
                    ))}
                </div>
            </div>

            <ScheduleModal
                isOpen={isModalOpen}
                onClose={onModalClose}
                onSave={handleSaveSchedule}
            />
        </div>
    );
};

export default ScheduleGrid;