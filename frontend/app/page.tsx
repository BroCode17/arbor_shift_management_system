'use client'
import { useState } from "react";
import Image from "next/image";
import Show from "../components/show";
import Header from "../components/Header";
import ScheduleControls from "../components/ScheduleControls";
import ScheduleGrid from "../components/ScheduleGrid";

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
    // You can add additional logic here if needed
  };

  const handleAddSchedule = () => {
    setIsAddScheduleModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ScheduleControls 
        onDateChange={handleDateChange}
        onAddSchedule={handleAddSchedule}
      />
      <div className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-lg font-semibold">Members</h2>
          <div className="flex items-center gap-2">
            <span>Show unscheduled</span>
            <div className="w-12 h-6 bg-blue-500 rounded-full p-1 cursor-pointer">
              <div className="bg-white w-4 h-4 rounded-full transform translate-x-6"></div>
            </div>
          </div>
        </div>
        
        <ScheduleGrid  />
        {/* <ScheduleGrid currentDate={currentDate} isModalOpen={isAddScheduleModalOpen} onModalClose={() => setIsAddScheduleModalOpen(false)} /> */}
      </div>
    </div>
  );
}
