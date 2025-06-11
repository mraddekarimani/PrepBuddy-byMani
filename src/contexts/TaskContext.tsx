import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, Category, DayStats } from '../types';

interface TaskContextType {
  tasks: Task[];
  categories: Category[];
  currentDay: number;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (id: string) => void;
  getTasksForDay: (day: number) => Task[];
  getDayStats: (day: number) => DayStats;
  getOverallStats: () => { completionRate: number; currentStreak: number };
  navigateDay: (direction: 'prev' | 'next') => void;
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'DSA', color: '#7C3AED' },
  { id: '2', name: 'Aptitude', color: '#10B981' },
  { id: '3', name: 'CS Fundamentals', color: '#8B5CF6' },
  { id: '4', name: 'Resume', color: '#F59E0B' },
  { id: '5', name: 'Projects', color: '#EC4899' },
  { id: '6', name: 'Mock Interviews', color: '#EF4444' },
  { id: '7', name: 'Contests', color: '#6366F1' },
];

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : DEFAULT_CATEGORIES;
  });

  const [currentDay, setCurrentDay] = useState<number>(() => {
    const savedDay = localStorage.getItem('currentDay');
    return savedDay ? parseInt(savedDay, 10) : 33; // Default to day 33 as shown in mockup
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('currentDay', currentDay.toString());
  }, [currentDay]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prevTasks => 
      prevTasks.map(task => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: crypto.randomUUID(),
    };
    setCategories(prevCategories => [...prevCategories, newCategory]);
  };

  const deleteCategory = (id: string) => {
    setCategories(prevCategories => 
      prevCategories.filter(category => category.id !== id)
    );
  };

  const getTasksForDay = (day: number) => {
    return tasks.filter(task => task.day === day);
  };

  const getDayStats = (day: number): DayStats => {
    const dayTasks = getTasksForDay(day);
    const totalTasks = dayTasks.length;
    const completedTasks = dayTasks.filter(task => task.completed).length;
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return {
      totalTasks,
      completedTasks,
      completionRate,
    };
  };

  const getOverallStats = () => {
    // Calculate overall completion rate
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Calculate current streak
    let currentStreak = 0;
    // This is a simplified version - a more sophisticated implementation would track daily completions
    
    return {
      completionRate,
      currentStreak,
    };
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentDay > 1) {
      setCurrentDay(currentDay - 1);
    } else if (direction === 'next' && currentDay < 100) {
      setCurrentDay(currentDay + 1);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        categories,
        currentDay,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        addCategory,
        deleteCategory,
        getTasksForDay,
        getDayStats,
        getOverallStats,
        navigateDay,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};