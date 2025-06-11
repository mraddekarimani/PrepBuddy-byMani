import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';
import ProgressCard from './ProgressCard';
import StreakCard from './StreakCard';
import CompletionRateCard from './CompletionRateCard';
import TaskList from '../tasks/TaskList';
import CategoryList from '../categories/CategoryList';
import TipsSection from '../tips/TipsSection';
import TaskCalendar from '../calendar/TaskCalendar';

const Dashboard: React.FC = () => {
  const { currentDay, navigateDay } = useTasks();

  return (
    <div className="space-y-6 py-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProgressCard />
        <StreakCard />
        <CompletionRateCard />
      </div>
      
      {/* Calendar */}
      <TaskCalendar />
      
      {/* Day Navigation */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Day {currentDay}: Your Tasks</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => navigateDay('prev')}
            disabled={currentDay <= 1}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
            aria-label="Previous day"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={() => navigateDay('next')}
            disabled={currentDay >= 100}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
            aria-label="Next day"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TaskList />
        </div>
        <div className="space-y-6">
          <CategoryList />
          <TipsSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;