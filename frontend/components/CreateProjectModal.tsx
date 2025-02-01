
import React, { useState } from 'react';
import { X, Upload, Plus, Calendar, Users, Clock } from 'lucide-react';
import Image from 'next/image';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: '',
    team: [] as string[],
    milestones: [{ title: '', dueDate: '', description: '' }],
    attachments: [] as File[],
    budget: '',
    department: '',
    tags: [] as string[],
  });

  const [selectedTeam, setSelectedTeam] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const mockTeamMembers = [
    { id: '1', name: 'Sarah Johnson', role: 'RN', avatar: '/avatars/sarah.jpg' },
    { id: '2', name: 'Mike Chen', role: 'LPN', avatar: '/avatars/mike.jpg' },
    // Add more team members...
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Create New Project</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4 flex gap-4">
            {['Project Info', 'Team & Timeline', 'Files & Budget'].map((s, i) => (
              <button
                key={s}
                onClick={() => setStep(i + 1)}
                className={`px-4 py-2 rounded-full text-sm ${
                  step === i + 1
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Project Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Describe your project"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select Department</option>
                    <option value="emergency">Emergency</option>
                    <option value="icu">ICU</option>
                    <option value="pediatrics">Pediatrics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => {
                          const newTags = [...formData.tags];
                          newTags.splice(index, 1);
                          setFormData({ ...formData, tags: newTags });
                        }}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newTag) {
                        setFormData({
                          ...formData,
                          tags: [...formData.tags, newTag]
                        });
                        setNewTag('');
                      }
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Team Members</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {mockTeamMembers.map((member) => (
                    <div
                      key={member.id}
                      className={`p-3 border rounded-lg flex items-center gap-3 cursor-pointer ${
                        selectedTeam.includes(member.id) ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => {
                        if (selectedTeam.includes(member.id)) {
                          setSelectedTeam(selectedTeam.filter(id => id !== member.id));
                        } else {
                          setSelectedTeam([...selectedTeam, member.id]);
                        }
                      }}
                    >
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Milestones</label>
                {formData.milestones.map((milestone, index) => (
                  <div key={index} className="mt-2 p-4 border rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={milestone.title}
                        onChange={(e) => {
                          const newMilestones = [...formData.milestones];
                          newMilestones[index].title = e.target.value;
                          setFormData({ ...formData, milestones: newMilestones });
                        }}
                        placeholder="Milestone title"
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <input
                        type="date"
                        value={milestone.dueDate}
                        onChange={(e) => {
                          const newMilestones = [...formData.milestones];
                          newMilestones[index].dueDate = e.target.value;
                          setFormData({ ...formData, milestones: newMilestones });
                        }}
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <textarea
                      value={milestone.description}
                      onChange={(e) => {
                        const newMilestones = [...formData.milestones];
                        newMilestones[index].description = e.target.value;
                        setFormData({ ...formData, milestones: newMilestones });
                      }}
                      placeholder="Milestone description"
                      rows={2}
                      className="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      milestones: [...formData.milestones, { title: '', dueDate: '', description: '' }]
                    });
                  }}
                  className="mt-2 flex items-center gap-2 text-blue-500 hover:text-blue-600"
                >
                  <Plus className="h-4 w-4" />
                  Add Milestone
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Budget</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Attachments</label>
                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload files</span>
                        <input
                          type="file"
                          multiple
                          className="sr-only"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            setFormData({ ...formData, attachments: [...formData.attachments, ...files] });
                          }}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PDF, DOC, XLS up to 10MB</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {formData.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newFiles = [...formData.attachments];
                          newFiles.splice(index, 1);
                          setFormData({ ...formData, attachments: newFiles });
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end gap-2">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Previous
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Create Project
              </button>
            )}
          </div>
        </form>
        </div>
        </div>
  );
}
export default CreateProjectModal