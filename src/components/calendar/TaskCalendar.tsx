import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useTasks } from '../../contexts/TaskContext';

const TaskCalendar: React.FC = () => {
  const { tasks } = useTasks();

  const events = tasks.map(task => ({
    title: task.title,
    date: task.createdAt.split('T')[0],
    backgroundColor: task.completed ? '#10B981' : '#7C3AED',
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
      <h3 className="text-lg font-medium mb-4">Progress Calendar</h3>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth'
        }}
      />
    </div>
  );
};

export default TaskCalendar;