'use client'
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
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

// const mockData: ScheduleEntry[] = [
//     {
//         id: 1,
//         name: 'Adrian Goia',
//         avatar: '/avatars/adrian.jpg',
//         schedules: [
//             {
//                 date: '12',
//                 shifts: [{ time: '9 am - 5 pm', status: 'on-time', type: 'shift' }]
//             },
//             {
//                 date: '13',
//                 shifts: [{ time: '9 am - 5 pm', status: 'early', type: 'shift' }]
//             },
//             {
//                 date: '14',
//                 shifts: [{ time: '9 am - 5 pm', type: 'shift' }]
//             },
//             {
//                 date: '15',
//                 shifts: [{ time: 'All day', type: 'out' }]
//             }
//         ]
//     },
//     // Add more mock data as needed
// ];

const ScheduleGrid = () => {
    const [schedules, setSchedules] = useState(getEmployeeShifts());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
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
    console.log(daysToShow)
    return (
        <div className="max-w-full overflow-x-auto">
            <ScheduleControls
                onDateChange={handleDateChange}
                onAddSchedule={() => setIsModalOpen(true)}
            />
            <DragDropContext onDragEnd={(result) => {
                if (!result.destination) return;
                const items = Array.from(schedules);
                const [reorderedItem] = items.splice(result.source.index, 1);
                items.splice(result.destination.index, 0, reorderedItem);
                setSchedules(items);
            }}>
                <div className="border rounded-lg overflow-hidden min-w-[768px]">
                    <div className="grid grid-cols-[minmax(200px,250px)_repeat(4,minmax(150px,1fr))] bg-gray-50">
                        <div className="p-4 font-medium border-b sticky left-0 bg-gray-50">Name</div>
                        {daysToShow.map((day) => (
                            <div key={day.date} className="p-4 text-center border-b border-l">
                                <div className="text-xl md:text-2xl font-medium">{day.date}</div>
                                <div className="text-xs md:text-sm text-gray-500">{day.day}</div>
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
            </DragDropContext>

           
            // Then pass it to the modal
            <ScheduleModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSaveSchedule}
            />
        </div>
    );
};

export default ScheduleGrid;