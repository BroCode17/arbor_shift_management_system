'use client'
import { useState } from "react";
import Header from "../../../components/Header";
import ScheduleControls from "../../../components/ScheduleControls";
import UnclaimedScheduleGrid from "../../../components/UnclaimedScheduleGrid";
import { getUnclaimedShifts } from "../../../data/mockShifts";

export default function UnclaimedSchedules() {
  const [showUnscheduled, setShowUnscheduled] = useState(true);
  const [shifts, setShifts] = useState(getUnclaimedShifts());

  const handleDateChange = (date: Date) => {
    // Filter shifts based on date if needed
    console.log('Date changed:', date);
  };

  const handleAddSchedule = () => {
    // Handle adding new schedule
    console.log('Adding new schedule');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Unclaimed Schedules</h1>
          <div className="flex items-center gap-2">
            <span>Show all shifts</span>
            <button
              onClick={() => setShowUnscheduled(!showUnscheduled)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                showUnscheduled ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full transform transition-transform ${
                  showUnscheduled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
        
        <ScheduleControls
          onDateChange={handleDateChange}
          onAddSchedule={handleAddSchedule}
        />
        
        <UnclaimedScheduleGrid shifts={shifts} />
      </div>
    </div>
  );
}