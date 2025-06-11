import React from 'react';
import { Trophy } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';

const StreakCard: React.FC = () => {
  const { getOverallStats } = useTasks();
  const { currentStreak } = getOverallStats();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-medium text-gray-600 dark:text-gray-400">Current Streak</h2>
        <Trophy className="h-5 w-5 text-amber-500" />
      </div>
      
      <h3 className="text-xl font-bold mb-4">{currentStreak} days</h3>
      
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {currentStreak > 0 
          ? `Keep going! You're on a ${currentStreak} day streak.` 
          : 'Start your streak by completing today\'s tasks!'}
      </p>
    </div>
  );
};

export default StreakCard;