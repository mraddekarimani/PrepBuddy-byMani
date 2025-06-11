export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: string;
  day: number;
  createdAt: string;
  notes?: string;
  targetCompany?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface DayStats {
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
}

export type ThemeMode = 'light' | 'dark';