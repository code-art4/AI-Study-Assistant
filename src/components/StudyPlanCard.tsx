
import { Calendar, Clock, BookOpen } from 'lucide-react';
import { formatDate, getDaysUntil } from '@/utils/dateUtils';
import { StudyPlan } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface StudyPlanCardProps {
  plan: StudyPlan;
  onClick?: () => void;
  className?: string;
}

const StudyPlanCard = ({ plan, onClick, className }: StudyPlanCardProps) => {
  const daysUntil = getDaysUntil(plan.endDate);
  const isUrgent = daysUntil <= 3;
  const totalSessions = plan.sessions.length;
  const completedSessions = plan.sessions.filter(session => session.completed).length;
  const progress = totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0;
  
  return (
    <div 
      className={cn(
        "glass-card rounded-xl overflow-hidden transition-all duration-300",
        className
      )}
    >
      {/* Progress indicator */}
      <div className="h-1.5 bg-muted w-full">
        <div 
          className={cn(
            "h-full transition-all duration-500",
            isUrgent ? "bg-red-500" : "bg-brand-500"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium text-lg mb-1 line-clamp-1">{plan.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{plan.description}</p>
          </div>
          
          <div className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            isUrgent ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" : 
                      "bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-300"
          )}>
            {daysUntil === 0 ? "Due today" : 
             daysUntil < 0 ? "Overdue" : 
             `${daysUntil} day${daysUntil !== 1 ? 's' : ''} left`}
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDate(plan.startDate, 'short')}</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            <span>{plan.subject}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{completedSessions}/{totalSessions} sessions</span>
          </div>
        </div>
        
        <Button 
          onClick={onClick} 
          className="w-full bg-brand-500 hover:bg-brand-600 button-effect"
        >
          View Plan
        </Button>
      </div>
    </div>
  );
};

export default StudyPlanCard;
