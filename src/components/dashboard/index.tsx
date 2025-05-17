import { useState } from 'react';
import Overview from './Overview';
import Tasks from './Tasks';
import Plans from './Plans';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = (props) => {
  const { overviewProps, tasks, plans } = props;

  const [activeTab, setActiveTab] = useState('overview');
  return (
    <Tabs
      defaultValue='overview'
      value={activeTab}
      onValueChange={setActiveTab}
      className='space-y-6'
    >
      <TabsList className='grid grid-cols-3 md:w-[400px]'>
        <TabsTrigger value='overview'>Overview</TabsTrigger>
        <TabsTrigger value='tasks'>Tasks</TabsTrigger>
        <TabsTrigger value='plans'>Study Plans</TabsTrigger>
      </TabsList>
      <Overview {...overviewProps} />
      <Tasks tasks={tasks} />
      <Plans plans={plans} />
    </Tabs>
  );
};

export default Dashboard;
