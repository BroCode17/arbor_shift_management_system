import React from 'react';
import { LucideIcon } from 'lucide-react';

interface QuickActionCardProps {
  icon: React.ReactNode;
  title: string;
  badge?: number;
  onClick: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon,
  title,
  badge,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="relative p-4 border rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors group"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="text-gray-600 group-hover:text-blue-600">
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
          {title}
        </span>
      </div>
      {badge && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
};

export default QuickActionCard;