import React from 'react';
import { BookOpen } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useTasks } from '../../contexts/TaskContext';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const { theme } = useTheme();
  const { currentDay, getOverallStats } = useTasks();
  const { currentStreak } = getOverallStats();

  return (
    <header className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 text-violet-700 dark:text-violet-400">
        <BookOpen className="h-6 w-6" />
        <div>
          <h1 className="text-xl font-bold">PrepBuddy</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">by Mani</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <span className="mr-2 text-gray-700 dark:text-gray-300">Day:</span>
          <span className="px-3 py-1 bg-violet-600 text-white rounded-md font-medium">
            {currentDay}/100
          </span>
        </div>
        
        <div className="flex items-center">
          <span className="mr-2 text-gray-700 dark:text-gray-300">Streak:</span>
          <span className="px-3 py-1 bg-amber-500 text-white rounded-md font-medium">
            {currentStreak} days
          </span>
        </div>
        
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;