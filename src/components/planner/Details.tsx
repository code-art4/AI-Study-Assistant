import React from 'react';
import {
  CalendarDays,
  Users,
  CheckCircle,
  Edit2,
  Trash2,
  PlusCircle,
} from 'lucide-react';
import { format } from 'date-fns';
import { StudyPlan } from '@/types';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';

interface PlanDetailsProps {
  plan: StudyPlan;
  onEdit: () => void;
  onDelete: () => void;
}

const PlanDetails = ({ plan, onEdit, onDelete }: PlanDetailsProps) => {
  // Calculate completion percentage
  const completedSessions = plan.sessions.filter(
    (session) => session.completed
  ).length;
  const totalSessions = plan.sessions.length;
  const completionPercentage = Math.round(
    (completedSessions / totalSessions) * 100
  );

  const daysRemaining = Math.max(
    0,
    Math.ceil(
      (plan.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    )
  );

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-start'>
        <div>
          <h2 className='text-2xl font-bold'>{plan.title}</h2>
          <p className='text-muted-foreground'>{plan.subject}</p>
        </div>
        <div className='flex space-x-2'>
          <Button variant='outline' size='sm' onClick={onEdit}>
            <Edit2 className='h-4 w-4 mr-2' />
            Edit
          </Button>
          <Button variant='outline' size='sm' onClick={onDelete}>
            <Trash2 className='h-4 w-4 mr-2' />
            Delete
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Card>
          <CardContent className='pt-6'>
            <div className='flex items-center mb-2'>
              <CalendarDays className='h-5 w-5 mr-2 text-brand-500' />
              <h3 className='font-medium'>Duration</h3>
            </div>
            <p className='text-sm text-muted-foreground'>
              {FormData(plan.startDate, 'MMM dd, yyyy')} -{' '}
              {FormData(plan.endDate, 'MMM dd, yyyy')}
            </p>
            <p className='text-sm font-medium mt-1'>
              {daysRemaining} days remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='pt-6'>
            <div className='flex items-center mb-2'>
              <Lock className='h-5 w-5 mr-2 text-brand-500' />
              <h3 className='font-medium'>Sessions</h3>
            </div>
            <p className='text-sm text-muted-foreground'>
              {completedSessions} of {totalSessions} completed
            </p>
            <Progress value={completionPercentage} className='h-2 mt-2' />
          </CardContent>
        </Card>

        <Card>
          <CardContent className='pt-6'>
            <div className='flex items-center mb-2'>
              <Users className='h-5 w-5 mr-2 text-brand-500' />
              <h3 className='font-medium'>Sync Status</h3>
            </div>
            <div className='flex items-center'>
              <div className='h-2 w-2 rounded-full bg-yellow-500 mr-2'></div>
              <p className='text-sm text-muted-foreground'>
                Not synced with Google Calendar
              </p>
            </div>
            <Button variant='link' className='px-0 py-1 h-auto text-brand-500'>
              Sync Now
            </Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className='text-lg font-medium mb-3'>Goal</h3>
        <Card>
          <CardContent className='pt-6'>
            <p>{plan.goal}</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className='flex justify-between items-center mb-3'>
          <h3 className='text-lg font-medium'>Study Sessions</h3>
          <Button variant='outline' size='sm'>
            <PlusCircle className='h-4 w-4 mr-2' />
            Add Session
          </Button>
        </div>

        <div className='space-y-3'>
          {plan.sessions.map((session) => (
            <Card
              key={session.id}
              className={`${
                session.completed
                  ? 'border-green-200 dark:border-green-900'
                  : ''
              }`}
            >
              <CardContent className='pt-6 pb-6'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    {session.completed ? (
                      <div className='h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mr-3'>
                        <CheckCircle className='h-5 w-5 text-green-500' />
                      </div>
                    ) : (
                      <div className='h-8 w-8 rounded-full bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center mr-3'>
                        <Lock className='h-5 w-5 text-brand-500' />
                      </div>
                    )}
                    <div>
                      <h4 className='font-medium'>{session.title}</h4>
                      <p className='text-sm text-muted-foreground'>
                        {format(session.startTime, 'h:mm a')} -{' '}
                        {format(session.endTime, 'h:mm a')}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-2'>
                    {!session.completed && (
                      <Button variant='outline' size='sm'>
                        Start
                      </Button>
                    )}
                    <Button variant='ghost' size='sm'>
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
