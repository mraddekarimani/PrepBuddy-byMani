import React from 'react';
import { BarChart2 } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';

const CompletionRateCard: React.FC = () => {
  const { getOverallStats } = useTasks();
  const { completionRate } = getOverallStats();
  const roundedRate = Math.round(completionRate);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-medium text-gray-600 dark:text-gray-400">Completion Rate</h2>
        <BarChart2 className="h-5 w-5 text-green-500" />
      </div>
      
      <h3 className="text-xl font-bold mb-4">{roundedRate}%</h3>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
        <div 
          className="bg-amber-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${roundedRate}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
        <span>0%</span>
        <span>{roundedRate}%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default CompletionRateCard;