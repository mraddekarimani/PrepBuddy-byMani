import React, { useState } from 'react';
import { Check, Trash2, Edit, MessageSquare } from 'lucide-react';
import { Task } from '../../types';
import { useTasks } from '../../contexts/TaskContext';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskCompletion, deleteTask, updateTask, categories } = useTasks();
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(task.notes || '');
  
  const category = categories.find(cat => cat.name === task.category);
  const categoryColor = category?.color || '#7C3AED';

  const handleNotesSubmit = () => {
    updateTask(task.id, { notes });
    setIsEditingNotes(false);
  };

  return (
    <div className="flex flex-col p-3 border-b border-gray-200 dark:border-gray-700 group">
      <div className="flex items-center">
        <button
          onClick={() => toggleTaskCompletion(task.id)}
          className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center transition-colors ${
            task.completed 
              ? 'bg-green-500 text-white' 
              : 'border-2 border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-500'
          }`}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed && <Check className="h-4 w-4" />}
        </button>
        
        <div className="flex-1">
          <div className="flex items-center">
            <span 
              className="inline-block w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: categoryColor }}
            ></span>
            <p 
              className={`text-sm ${
                task.completed 
                  ? 'line-through text-gray-500 dark:text-gray-400' 
                  : 'text-gray-900 dark:text-gray-200'
              }`}
            >
              {task.title}
            </p>
          </div>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1 space-x-2">
            <span>{task.category}</span>
            {task.targetCompany && (
              <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                {task.targetCompany}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => setIsEditingNotes(!isEditingNotes)}
            className="p-1 text-gray-500 dark:text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
            aria-label="Add notes"
          >
            <MessageSquare className="h-4 w-4" />
          </button>
          <button 
            onClick={() => deleteTask(task.id)}
            className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            aria-label="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isEditingNotes && (
        <div className="mt-2 pl-9">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about this task..."
            className="w-full p-2 text-sm border rounded-md dark:border-gray-600 dark:bg-gray-700"
            rows={3}
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={() => setIsEditingNotes(false)}
              className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleNotesSubmit}
              className="px-3 py-1 text-sm bg-violet-600 text-white rounded-md hover:bg-violet-700"
            >
              Save Notes
            </button>
          </div>
        </div>
      )}

      {!isEditingNotes && task.notes && (
        <div className="mt-2 pl-9">
          <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded">
            {task.notes}
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskItem;