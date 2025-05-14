import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { formatDate, formatDuration } from '@/utils/dateUtils';
import { StudyTask } from '@/types';

interface ITasks {
  tasksDue: StudyTask[];
  toggleTaskCompletion: (task: string) => void;
}
const Tasks = (props) => {
  const { tasksDue, toggleTaskCompletion }: ITasks = props;
  return (
    <TabsContent value='tasks' className='space-y-6'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>All Tasks</h2>
        <Button>
          <Plus className='w-4 h-4 mr-2' />
          New Task
        </Button>
      </div>

      {/* Task List */}
      <div className='bg-white dark:bg-gray-800 rounded-xl border border-border shadow-sm p-5'>
        <div className='space-y-4'>
          {tasksDue.length > 0 ? (
            tasksDue.map((task) => (
              <div
                key={task.id}
                className='flex items-start border-b border-border last:border-0 pb-4 last:pb-0'
              >
                <div className='flex h-5 items-center mr-3'>
                  <input
                    type='checkbox'
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className='h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500'
                  />
                </div>
                <div className='flex-1'>
                  <div className='flex justify-between'>
                    <p
                      className={`font-medium ${
                        task.completed
                          ? 'line-through text-muted-foreground'
                          : ''
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
                  <p className='text-sm text-muted-foreground mt-1'>
                    {task.description}
                  </p>
                  <div className='flex items-center mt-2 text-sm text-muted-foreground'>
                    <span className='mr-3'>{task.subject}</span>
                    <span className='mr-3'>·</span>
                    <span className='mr-3'>
                      {formatDuration(task.estimatedTime)}
                    </span>
                    <span className='mr-3'>·</span>
                    <span>Due: {formatDate(task.dueDate, 'short')}</span>
                  </div>
                  <div className='flex mt-2 space-x-2'>
                    {task.tags.map((tag) => (
                      <span
                        key={tag}
                        className='text-xs px-2 py-1 bg-muted rounded-full'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='text-center py-8'>
              <p className='text-muted-foreground'>No tasks remaining</p>
              <Button variant='outline' className='mt-4'>
                <Plus className='w-4 h-4 mr-2' />
                Add Task
              </Button>
            </div>
          )}
        </div>
      </div>
    </TabsContent>
  );
};

export default Tasks;
