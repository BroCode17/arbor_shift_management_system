'use client'
import React, { useState } from 'react';
import Header from "../../../components/Header";
import LocationOverview from "../../../components/locations/LocationOverview";
import FacilityManagement from "../../../components/locations/FacilityManagement";
import ResourceAllocation from "../../../components/locations/ResourceAllocation";
import { MapPin, Filter, Plus, Search } from 'lucide-react';

export default function Locations() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Location Management</h1>
            <p className="text-gray-500">Manage facilities and resources across locations</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-64"
              />
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
            </div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-white"
            >
              <option value="all">All Regions</option>
              <option value="north">North Region</option>
              <option value="south">South Region</option>
              <option value="east">East Region</option>
              <option value="west">West Region</option>
            </select>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Location
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="flex gap-4 border-b">
            {[
              { id: 'overview', label: 'Location Overview' },
              { id: 'facilities', label: 'Facility Management' },
              { id: 'resources', label: 'Resource Allocation' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <LocationOverview
            searchQuery={searchQuery}
            selectedRegion={selectedRegion}
            selectedStatus={selectedStatus}
          />
        )}

        {activeTab === 'facilities' && (
          <FacilityManagement
            searchQuery={searchQuery}
            selectedRegion={selectedRegion}
            selectedStatus={selectedStatus}
          />
        )}

        {activeTab === 'resources' && (
          <ResourceAllocation
            searchQuery={searchQuery}
            selectedRegion={selectedRegion}
            selectedStatus={selectedStatus}
          />
        )}
      </div>
    </div>
  );
}