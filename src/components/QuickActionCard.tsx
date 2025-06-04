
import React from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface QuickActionCardProps {
  title: string;
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ 
  title, 
  icon: Icon, 
  onClick, 
  className = '' 
}) => {
  return (
    <Card 
      className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md active:scale-95 ${className}`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="p-3 bg-travel-teal/10 rounded-full">
          <Icon className="w-6 h-6 text-travel-teal" />
        </div>
        <span className="text-sm font-medium text-gray-700">{title}</span>
      </div>
    </Card>
  );
};

export default QuickActionCard;
