import { useState, useEffect, memo } from 'react';
import Navbar from '@/components/Navbar';
import DashboardComponent from '@/components/dashboard';
import { isToday } from '@/utils/dateUtils';
import { StudyPlan, StudyTask, UserProgress } from '@/types';
import { mockPlans, mockProgress, mockTasks } from '@/data/mockData';
import useQuery from '@/hooks/useQuery';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const [progress, setProgress] = useState<UserProgress>(mockProgress);
  // const [tasks, setTasks] = useState<StudyTask[]>(mockTasks);
  // const [plans, setPlans] = useState<StudyPlan[]>(mockPlans);

  // Mock loading state
  // const [loading, setLoading] = useState(true);

  const {
    loading: isTasksLoading,
    status: tasksStatus,
    error: tasksError,
    data: returnedTasks,
  } = useQuery({
    url: 'tasks/',
    method: 'get',
  });

  const {
    loading: isPlansLoading,
    status: planStatus,
    error: planError,
    data: returnedPlans,
  } = useQuery({
    url: 'studyPlans/',
    method: 'get',
  });

  const tasks = returnedTasks?.data;
  const plans = returnedPlans?.data;
  console.log(returnedPlans, returnedTasks);
  // Toggle task completion
  const toggleTaskCompletion = (taskId: string) => {
    // useQuery({
    //   url: 'tasks/task/update/',
    //   method: 'get',
    // });
  };

  // Calculate completion percentage
  const completionPercentage = Math.round(
    (progress.completedTasks / progress.totalTasks) * 100
  );

  const overviewProps = {
    completionPercentage,
    progress,
    tasks,
    plans,
    toggleTaskCompletion,
  };

  // const tasksProps = { tasks: data?.data, toggleTaskCompletion };

  const dashboardComponentProps = {
    overviewProps,
    tasks,
    plans,
  };

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main className='pt-24 pb-16 container px-4 md:px-6'>
        <header className='mb-8'>
          <h1 className='text-3xl font-bold mb-2'>Study Dashboard</h1>
          <p className='text-muted-foreground'>
            Track your progress, manage tasks, and optimize your study time
          </p>
        </header>
        {isTasksLoading || isPlansLoading ? (
          <div className='space-y-4'>
            <Skeleton className='h-8 w-1/3' /> {/* Title placeholder */}
            <Skeleton className='h-24 w-full' /> {/* First card */}
            <Skeleton className='h-24 w-full' /> {/* Second card */}
          </div>
        ) : (
          <DashboardComponent {...dashboardComponentProps} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
