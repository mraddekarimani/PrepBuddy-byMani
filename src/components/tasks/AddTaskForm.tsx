import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';

interface AddTaskFormProps {
  onClose: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onClose }) => {
  const { addTask, categories, currentDay } = useTasks();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim()) {
      addTask({
        title: title.trim(),
        completed: false,
        category,
        day: currentDay,
      });
      
      setTitle('');
      onClose();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 animate-fadeIn transition-all duration-300"
    >
      <h3 className="text-lg font-medium mb-4">Add New Task</h3>
      
      <div className="mb-3">
        <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Task Title
        </label>
        <input
          type="text"
          id="taskTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="E.g., Solve 5 array problems"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="taskCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category
        </label>
        <select
          id="taskCategory"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
          required
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Task
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;