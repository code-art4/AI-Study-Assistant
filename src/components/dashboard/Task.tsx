import apiCall from '@/utils/apiCall';
import { formatDate } from '@/utils/dateUtils';
import React from 'react';

function Task({ task }) {
  const toggleTaskCompletion = (task) => {
    apiCall({
      url: `tasks/task/update/${task._id}`,
      method: 'PUT',
      values: { completed: true },
    });
  };

  return (
    <div className='flex items-start border-b border-border last:border-0 pb-4 last:pb-0'>
      <div className='flex h-5 items-center mr-3'>
        <input
          type='checkbox'
          checked={task.completed}
          onChange={() => toggleTaskCompletion(task)}
          className='h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500'
        />
      </div>
      <div className='flex-1'>
        <div className='flex justify-between'>
          <p
            className={`font-medium ${
              task.completed ? 'line-through text-muted-foreground' : ''
            }`}
          >
            {task.title}
          </p>
          <p
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              task.priority === 'high'
                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                : task.priority === 'medium'
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
            }`}
          >
            {task.priority}
          </p>
        </div>
        <p className='text-sm text-muted-foreground mt-1'>{task.description}</p>
        <div className='flex items-center mt-2 text-sm text-muted-foreground'>
          <span className='mr-3'>{task.subject}</span>
          <span className='mr-3'>·</span>
          <span className='mr-3'>{task.timeToFinish}</span>
          <span className='mr-3'>·</span>
          <span>Due: {formatDate(task.dueDate, 'short')}</span>
        </div>
        <div className='flex mt-2 space-x-2'>
          {task?.categories.map((tag) => (
            <span key={tag} className='text-xs px-2 py-1 bg-muted rounded-full'>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Task;
