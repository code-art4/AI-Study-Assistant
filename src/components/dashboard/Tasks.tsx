import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { formatDate, formatDuration } from '@/utils/dateUtils';
import { StudyTask } from '@/types';
import Task from './Task';

interface ITasks {
  tasks: StudyTask[];
  toggleTaskCompletion: (task: string) => void;
}
const Tasks = (props) => {
  const { tasks, toggleTaskCompletion }: ITasks = props;
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
          {tasks?.length > 0 ? (
            tasks.map((task) => <Task task={task} key={task._id} />)
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
