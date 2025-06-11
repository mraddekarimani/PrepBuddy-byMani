import React, { useState } from 'react';
import { Plus, RotateCcw } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';
import TaskItem from './TaskItem';
import TaskFilter from './TaskFilter';
import AddTaskForm from './AddTaskForm';

const TaskList: React.FC = () => {
  const { currentDay, getTasksForDay } = useTasks();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const dayTasks = getTasksForDay(currentDay);
  
  const filteredTasks = activeFilters.length > 0
    ? dayTasks.filter(task => activeFilters.includes(task.category))
    : dayTasks;

  const handleFilterChange = (category: string) => {
    setActiveFilters(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const resetFilters = () => {
    setActiveFilters([]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Today's Tasks</h3>
        <div className="flex space-x-2">
          <button
            onClick={resetFilters}
            disabled={activeFilters.length === 0}
            className={`p-2 rounded-md transition-colors ${
              activeFilters.length > 0
                ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                : 'text-gray-400 dark:text-gray-600 cursor-default'
            }`}
            aria-label="Reset filters"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsAddingTask(true)}
            className="px-3 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Task
          </button>
        </div>
      </div>
      
      <TaskFilter activeFilters={activeFilters} onFilterChange={handleFilterChange} />
      
      <div className="mt-2 border-t border-gray-200 dark:border-gray-700">
        {isAddingTask && (
          <div className="py-3">
            <AddTaskForm onClose={() => setIsAddingTask(false)} />
          </div>
        )}
        
        {filteredTasks.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              {dayTasks.length > 0 
                ? 'No tasks match your current filters' 
                : 'You have no tasks for today. Add a task to get started!'}
            </p>
            {dayTasks.length === 0 && (
              <button
                onClick={() => setIsAddingTask(true)}
                className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors flex items-center mx-auto"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Your First Task
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;