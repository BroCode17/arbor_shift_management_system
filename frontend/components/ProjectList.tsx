'use client'
import React from 'react';
import { 
  Calendar, Clock, Users, MoreVertical, 
  AlertCircle, ChevronDown, BarChart2 
} from 'lucide-react';
import Image from 'next/image';
import { mockProjects } from './ProjectBoard';

interface ProjectListProps {
  searchQuery: string;
  selectedStatus: string[];
  selectedPriority: string[];
}

const ProjectList: React.FC<ProjectListProps> = ({
  searchQuery,
  selectedStatus,
  selectedPriority,
}) => {
  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Project
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Team
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Progress
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Due Date
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockProjects?.map((project) => (
            <tr key={project.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <BarChart2 className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">{project.title}</div>
                    <div className="text-sm text-gray-500">{project.description}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex -space-x-2">
                  {project.team.map((member, i) => (
                    <div
                      key={i}
                      className="relative w-8 h-8 rounded-full border-2 border-white"
                    >
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        className="rounded-full"
                      />
                    </div>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-full max-w-xs">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full">
                    <div
                      className="h-1.5 bg-blue-500 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  project.status === 'completed' ? 'bg-green-100 text-green-800' :
                  project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  project.status === 'review' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {project.dueDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;