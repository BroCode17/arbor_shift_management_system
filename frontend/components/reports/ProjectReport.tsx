'use client'
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { Target, TrendingUp, AlertCircle } from 'lucide-react';

interface ProjectReportProps {
  dateRange: {
    start: Date;
    end: Date;
  };
}

const ProjectReport: React.FC<ProjectReportProps> = ({ dateRange }) => {
  const projectStatus = [
    { name: 'Completed', value: 18, color: '#10B981' },
    { name: 'In Progress', value: 12, color: '#3B82F6' },
    { name: 'Delayed', value: 4, color: '#EF4444' },
    { name: 'Planning', value: 8, color: '#6B7280' },
  ];

  const projectTrends = [
    { month: 'Jan', completed: 4, started: 6, delayed: 1 },
    { month: 'Feb', completed: 6, started: 4, delayed: 2 },
    { month: 'Mar', completed: 5, started: 7, delayed: 1 },
    { month: 'Apr', completed: 8, started: 5, delayed: 0 },
    { month: 'May', completed: 7, started: 6, delayed: 2 },
  ];

  const resourceAllocation = [
    { department: 'Emergency', allocated: 85, utilized: 78 },
    { department: 'ICU', allocated: 65, utilized: 62 },
    { department: 'Surgery', allocated: 55, utilized: 50 },
    { department: 'Pediatrics', allocated: 45, utilized: 43 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Project Success Rate</h3>
            <Target className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold">86.5%</div>
          <div className="text-sm text-green-500 mt-1">+3.2% vs last month</div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Resource Utilization</h3>
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold">92.8%</div>
          <div className="text-sm text-green-500 mt-1">+1.5% vs last month</div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">At Risk Projects</h3>
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold">4</div>
          <div className="text-sm text-red-500 mt-1">+2 vs last month</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Project Status Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {projectStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Project Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="completed" stroke="#10B981" />
                <Line type="monotone" dataKey="started" stroke="#3B82F6" />
                <Line type="monotone" dataKey="delayed" stroke="#EF4444" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-medium mb-4">Resource Allocation by Department</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={resourceAllocation}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="allocated" fill="#3B82F6" />
              <Bar dataKey="utilized" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-medium mb-4">Project Risk Analysis</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Impact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mitigation Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { name: 'ICU Expansion', risk: 'High', impact: 'Critical', status: 'In Progress' },
                { name: 'Staff Training Program', risk: 'Medium', impact: 'Moderate', status: 'Planned' },
                { name: 'Equipment Upgrade', risk: 'Low', impact: 'Minor', status: 'Completed' },
              ].map((project, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{project.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.risk === 'High' ? 'bg-red-100 text-red-800' :
                      project.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {project.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{project.impact}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectReport;