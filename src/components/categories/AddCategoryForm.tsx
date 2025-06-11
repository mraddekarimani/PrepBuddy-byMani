import React, { useState } from 'react';
import { useTasks } from '../../contexts/TaskContext';

interface AddCategoryFormProps {
  onClose: () => void;
}

const COLORS = [
  '#7C3AED', // Violet
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#EC4899', // Pink
  '#6366F1', // Indigo
  '#8B5CF6', // Purple
  '#14B8A6', // Teal
];

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onClose }) => {
  const { addCategory } = useTasks();
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim()) {
      addCategory({
        name: name.trim(),
        color,
      });
      
      setName('');
      onClose();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 animate-fadeIn"
    >
      <div className="mb-3">
        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category Name
        </label>
        <input
          type="text"
          id="categoryName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="E.g., System Design"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-600 dark:text-white"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Color
        </label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-6 h-6 rounded-full transition-all ${
                color === c ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-300' : ''
              }`}
              style={{ backgroundColor: c }}
              aria-label={`Select color ${c}`}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1.5 text-sm bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors"
        >
          Add Category
        </button>
      </div>
    </form>
  );
};

export default AddCategoryForm;