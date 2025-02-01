'use client'
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Calendar, Clock, Users, MoreVertical, AlertCircle } from 'lucide-react';
import Image from 'next/image';

interface ProjectBoardProps {
  searchQuery: string;
  selectedStatus: string[];
  selectedPriority: string[];
}

export const mockProjects = [
  {
    id: '1',
    title: 'Emergency Room Renovation',
    description: 'Modernizing the emergency department facilities and equipment',
    status: 'planning',
    priority: 'high',
    progress: 25,
    dueDate: '2024-03-15',
    team: [
      { name: 'Sarah Johnson', avatar: '/avatars/sarah.jpg' },
      { name: 'Mike Chen', avatar: '/avatars/mike.jpg' },
    ],
  },
];

const columns = [
  { id: 'planning', title: 'Planning', color: 'bg-gray-100' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100' },
  { id: 'review', title: 'Review', color: 'bg-yellow-100' },
  { id: 'completed', title: 'Completed', color: 'bg-green-100' },
];

interface ProjectsByStatus {
  [key: string]: typeof mockProjects;
}

const ProjectBoard: React.FC<ProjectBoardProps> = ({
  searchQuery,
  selectedStatus,
  selectedPriority,
}) => {
  const initialProjectsByStatus = columns.reduce((acc, column) => {
    acc[column.id] = mockProjects.filter(project => project.status === column.id);
    return acc;
  }, {} as ProjectsByStatus);

  const [projectsByStatus, setProjectsByStatus] = useState<ProjectsByStatus>(initialProjectsByStatus);

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceCol = projectsByStatus[source.droppableId];
    const destCol = projectsByStatus[destination.droppableId];
    const project = sourceCol[source.index];

    if (source.droppableId === destination.droppableId) {
      // Reorder within the same column
      const newCol = [...sourceCol];
      const [removed] = newCol.splice(source.index, 1);
      newCol.splice(destination.index, 0, removed);
      setProjectsByStatus({
        ...projectsByStatus,
        [source.droppableId]: newCol,
      });
    } else {
      // Move to another column
      const newSourceCol = [...sourceCol];
      const [removed] = newSourceCol.splice(source.index, 1);

      const newDestCol = [...destCol];
      newDestCol.splice(destination.index, 0, {
        ...removed,
        status: destination.droppableId,
      });

      setProjectsByStatus({
        ...projectsByStatus,
        [source.droppableId]: newSourceCol,
        [destination.droppableId]: newDestCol,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map((column) => (
          <div key={column.id} className="bg-white rounded-lg border">
            <div className={`p-4 ${column.color} rounded-t-lg border-b`}>
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{column.title}</h3>
                <span className="text-sm text-gray-500">
                  {projectsByStatus[column.id].length}
                </span>
              </div>
            </div>
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-2 min-h-[500px] ${
                    snapshot.isDraggingOver ? 'bg-gray-50' : ''
                  }`}
                >
                  {projectsByStatus[column.id].length === 0 && (
                    <div className="text-center text-gray-400 p-4 text-sm">
                      No projects in this status
                    </div>
                  )}

                  {projectsByStatus[column.id].map((project, index) => (
                    <Draggable
                      key={project.id}
                      draggableId={project.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-2 p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{project.title}</h4>
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical size={16} />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {project.description}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <Clock size={14} className="mr-1" />
                            <span>Due {project.dueDate}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex">
                              {project.team.map((member, i) => (
                                <Image
                                  key={i}
                                  src={member.avatar}
                                  width={28}
                                  height={28}
                                  alt={member.name}
                                  className="rounded-full border-2 border-white -mr-2"
                                />
                              ))}
                            </div>
                            {project.priority === 'high' && (
                              <AlertCircle size={16} className="text-red-500" />
                            )}
                          </div>
                          </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default ProjectBoard;