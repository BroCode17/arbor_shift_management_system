'use client'
import React, { useState } from 'react';
import Header from "../../../components/Header";
import ProjectBoard from "../../../components/ProjectBoard";
import ProjectList from "../../../components/ProjectList";
import ProjectStats from "../../../components/ProjectStats";
import { Plus, LayoutGrid, List, Filter, Search } from 'lucide-react';
import CreateProjectModal from '../../../components/CreateProjectModal';

export default function Projects() {
  const [view, setView] = useState<'board' | 'list'>('board');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Project Management</h1>
            <p className="text-gray-500">Manage and track your projects</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Project
          </button>
        </div>

        <ProjectStats />

        <div className="flex flex-col sm:flex-row gap-4 mb-6 mt-8">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
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
                onClick={() => setView('board')}
                className={`px-4 py-2 flex items-center gap-2 ${
                  view === 'board' ? 'bg-blue-50 text-blue-600' : ''
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                Board
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 flex items-center gap-2 ${
                  view === 'list' ? 'bg-blue-50 text-blue-600' : ''
                }`}
              >
                <List className="h-4 w-4" />
                List
              </button>
            </div>
          </div>
        </div>

        {filterOpen && (
          <div className="mb-6 p-4 border rounded-lg bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-3">Status</h3>
                <div className="flex flex-wrap gap-2">
                  {['Planning', 'In Progress', 'Review', 'Completed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        if (selectedStatus.includes(status)) {
                          setSelectedStatus(selectedStatus.filter(s => s !== status));
                        } else {
                          setSelectedStatus([...selectedStatus, status]);
                        }
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedStatus.includes(status)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-3">Priority</h3>
                <div className="flex flex-wrap gap-2">
                  {['Low', 'Medium', 'High', 'Urgent'].map((priority) => (
                    <button
                      key={priority}
                      onClick={() => {
                        if (selectedPriority.includes(priority)) {
                          setSelectedPriority(selectedPriority.filter(p => p !== priority));
                        } else {
                          setSelectedPriority([...selectedPriority, priority]);
                        }
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedPriority.includes(priority)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'board' ? (
          <ProjectBoard
            searchQuery={searchQuery}
            selectedStatus={selectedStatus}
            selectedPriority={selectedPriority}
          />
        ) : (
          <ProjectList
            searchQuery={searchQuery}
            selectedStatus={selectedStatus}
            selectedPriority={selectedPriority}
          />
        )}

        <CreateProjectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </div>
    </div>
  );
}