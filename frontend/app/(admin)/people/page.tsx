'use client'
import React, { useState } from 'react';
import Header from "../../../components/Header";
import PeopleGrid from "../../../components/PeopleGrid";
import { Plus, Search, Filter, Download } from 'lucide-react';
import AddEmployeeModal from '../../../components/AddEmployeeModal';

export default function People() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="p-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">People</h1>
            <p className="text-gray-500">Manage your team members and their roles</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Employee
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search employees..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`px-4 py-2 border rounded-lg flex items-center gap-2 ${
                filterOpen ? 'bg-blue-50 border-blue-500 text-blue-600' : ''
              }`}
            >
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <div className="border rounded-lg flex overflow-hidden">
              <button
                onClick={() => setView('grid')}
                className={`px-4 py-2 ${view === 'grid' ? 'bg-blue-50 text-blue-600' : ''}`}
              >
                Grid
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 ${view === 'list' ? 'bg-blue-50 text-blue-600' : ''}`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {filterOpen && (
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-3">Department</h3>
                <div className="flex flex-wrap gap-2">
                  {['Emergency', 'Surgery', 'Pediatrics', 'ICU', 'Cardiology'].map((dept) => (
                    <button
                      key={dept}
                      onClick={() => {
                        if (selectedDepartments.includes(dept)) {
                          setSelectedDepartments(selectedDepartments.filter(d => d !== dept));
                        } else {
                          setSelectedDepartments([...selectedDepartments, dept]);
                        }
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedDepartments.includes(dept)
                          ? 'bg-blue-500 text-white'
                          : 'bg-white border'
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-3">Role</h3>
                <div className="flex flex-wrap gap-2">
                  {['RN', 'LPN', 'CNA', 'PA', 'NP'].map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        if (selectedRoles.includes(role)) {
                          setSelectedRoles(selectedRoles.filter(r => r !== role));
                        } else {
                          setSelectedRoles([...selectedRoles, role]);
                        }
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedRoles.includes(role)
                          ? 'bg-blue-500 text-white'
                          : 'bg-white border'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <PeopleGrid
          view={view}
          searchQuery={searchQuery}
          selectedDepartments={selectedDepartments}
          selectedRoles={selectedRoles}
        />

        <AddEmployeeModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      </div>
    </div>
  );
}