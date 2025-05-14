import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import DashboardComponent from '@/components/dashboard';
import { isToday } from '@/utils/dateUtils';
import { StudyPlan, StudyTask, UserProgress } from '@/types';
import { mockPlans, mockProgress, mockTasks } from '@/data/mockData';

const Dashboard = () => {
  const [progress, setProgress] = useState<UserProgress>(mockProgress);
  const [tasks, setTasks] = useState<StudyTask[]>(mockTasks);
  const [plans, setPlans] = useState<StudyPlan[]>(mockPlans);

  // Mock loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Toggle task completion
  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    // Update progress
    setProgress((prev) => {
      const completedCount = tasks.filter((t) =>
        t.id === taskId ? !t.completed : t.completed
      ).length;
      return {
        ...prev,
        completedTasks: completedCount,
      };
    });
  };

  // Filter tasks due today
  const tasksToday = tasks.filter((task) => isToday(task.dueDate));
  const tasksDue = tasks
    .filter((task) => !task.completed)
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  // Calculate completion percentage
  const completionPercentage = Math.round(
    (progress.completedTasks / progress.totalTasks) * 100
  );

  const overviewProps = {
    completionPercentage,
    progress,
    tasksToday,
    plans,
    toggleTaskCompletion,
  };

  const tasksProps = { tasksDue, toggleTaskCompletion };

  const dashboardComponentProps = {
    overviewProps,
    tasksProps,
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
        <DashboardComponent {...dashboardComponentProps} />
      </main>
    </div>
  );
};

export default Dashboard;
