'use client'
import React from 'react';
import { 
  TrendingUp, Clock, CheckCircle, AlertCircle,
  BarChart2, Users, Calendar, Target
} from 'lucide-react';

const ProjectStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Active Projects</p>
            <h3 className="text-2xl font-semibold mt-1">24</h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <TrendingUp className="h-6 w-6 text-blue-500" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-green-500">+12%</span>
          <span className="text-gray-500 ml-2">from last month</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">In Progress</p>
            <h3 className="text-2xl font-semibold mt-1">12</h3>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <Clock className="h-6 w-6 text-yellow-500" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Completed</p>
            <h3 className="text-2xl font-semibold mt-1">156</h3>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-green-500">92%</span>
          <span className="text-gray-500 ml-2">success rate</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">At Risk</p>
            <h3 className="text-2xl font-semibold mt-1">3</h3>
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-red-500">Urgent attention needed</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectStats;