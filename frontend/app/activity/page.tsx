'use client'
import React, { useState } from 'react';
import Header from "../../components/Header";
import ActivityFeed from "../../components/ActivityFeed";
import { Filter, Search } from 'lucide-react';
import { format } from 'date-fns';

export default function Activity() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="p-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Activity Log</h1>
            <p className="text-gray-500">Track all system activities and changes</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search activities..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`px-4 py-2 border rounded-lg flex items-center gap-2 ${
                filterOpen ? 'bg-blue-50 border-blue-500 text-blue-600' : ''
              }`}
            >
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>

        {filterOpen && (
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="font-medium mb-3">Filter by type</h3>
            <div className="flex flex-wrap gap-2">
              {['Schedule', 'Timesheet', 'User', 'System', 'Location'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    if (selectedType.includes(type)) {
                      setSelectedType(selectedType.filter(t => t !== type));
                    } else {
                      setSelectedType([...selectedType, type]);
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedType.includes(type)
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        <ActivityFeed
          searchQuery={searchQuery}
          selectedTypes={selectedType}
        />
      </div>
    </div>
  );
}