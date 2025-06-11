import React from 'react';
import { Filter } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';

interface TaskFilterProps {
  activeFilters: string[];
  onFilterChange: (category: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ activeFilters, onFilterChange }) => {
  const { categories } = useTasks();

  return (
    <div className="flex flex-wrap items-center gap-2 py-3">
      <div className="flex items-center mr-1 text-gray-500 dark:text-gray-400">
        <Filter className="h-4 w-4 mr-1" />
        <span className="text-sm">Filter:</span>
      </div>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onFilterChange(category.name)}
          className={`text-xs px-2 py-1 rounded-full flex items-center space-x-1 transition-colors ${
            activeFilters.includes(category.name)
              ? 'bg-opacity-20 font-medium'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
          style={{
            backgroundColor: activeFilters.includes(category.name) 
              ? `${category.color}30` 
              : '',
            color: activeFilters.includes(category.name) 
              ? category.color 
              : ''
          }}
        >
          <span 
            className="w-2 h-2 rounded-full inline-block"
            style={{ backgroundColor: category.color }}
          ></span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;