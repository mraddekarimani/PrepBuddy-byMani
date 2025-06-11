import React from 'react';
import { Calendar } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';

const ProgressCard: React.FC = () => {
  const { currentDay } = useTasks();
  const progressPercentage = (currentDay / 100) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-medium text-gray-600 dark:text-gray-400">Progress</h2>
        <Calendar className="h-5 w-5 text-violet-600 dark:text-violet-400" />
      </div>
      
      <h3 className="text-xl font-bold mb-4">Day {currentDay}/100</h3>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
        <div 
          className="bg-violet-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
        <span>Start</span>
        <span>{Math.round(progressPercentage)}%</span>
        <span>Goal</span>
      </div>
    </div>
  );
};

export default ProgressCard;