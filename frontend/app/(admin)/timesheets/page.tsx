'use client'
import React, { useState } from 'react';
import Header from "../../../components/Header";
import ScheduleControls from "../../../components/ScheduleControls";
import TimesheetGrid from "../../../components/TimesheetGrid";
import { getEmployeeShifts } from '@/data/mockShifts';
import { startOfWeek, endOfWeek, format } from 'date-fns';

export default function Timesheets() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [employees] = useState(getEmployeeShifts());

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleExportCSV = () => {
    // Create CSV headers
    const headers = [
      'Employee Name',
      'Employee ID',
      'Role',
      'Department',
      'Date',
      'Shift Time',
      'Status',
      'Location',
      'Supervisor',
      'Hours Worked'
    ].join(',');

    // Create CSV rows
    const rows = employees.flatMap(employee => 
      employee.schedules.map(schedule => {
        return schedule.shifts.map(shift => {
          const [startTime, endTime] = shift.time.split(' - ');
          const [startHour] = startTime.split(':').map(Number);
          const [endHour] = endTime.split(':').map(Number);
          const hoursWorked = endHour - startHour;

          return [
            employee.name,
            employee.employeeId,
            employee.role,
            employee.department,
            schedule.date,
            shift.time,
            shift.status || 'pending',
            shift.details.location,
            shift.details.supervisorOnDuty,
            hoursWorked
          ].join(',');
        }).join('\n');
      }).join('\n')
    ).join('\n');

    // Combine headers and rows
    const csv = `${headers}\n${rows}`;

    // Create blob and download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `timesheet_${format(weekStart, 'yyyy-MM-dd')}_to_${format(weekEnd, 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Timesheets</h1>
            <p className="text-gray-500">
              Week of {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleExportCSV}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Export CSV
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Approve All
            </button>
          </div>
        </div>
        
        <ScheduleControls
          onDateChange={handleDateChange}
          onAddSchedule={() => {}}
        />
        
        <TimesheetGrid
          employees={employees}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}