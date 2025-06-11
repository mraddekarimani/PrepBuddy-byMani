import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';
import AddCategoryForm from './AddCategoryForm';

const CategoryList: React.FC = () => {
  const { categories, deleteCategory } = useTasks();
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Categories</h3>
        <button
          onClick={() => setIsAddingCategory(true)}
          className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      
      {isAddingCategory && (
        <div className="mb-4">
          <AddCategoryForm onClose={() => setIsAddingCategory(false)} />
        </div>
      )}
      
      <div className="space-y-2">
        {categories.map(category => (
          <div 
            key={category.id}
            className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 group"
          >
            <div className="flex items-center">
              <span 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: category.color }}
              ></span>
              <span className="text-sm">{category.name}</span>
            </div>
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => deleteCategory(category.id)}
                className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        
        {categories.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-2">
            No categories yet. Add your first category!
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryList;