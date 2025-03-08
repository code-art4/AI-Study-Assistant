
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  onClick?: () => void;
  badge?: string;
}

const FeatureCard = ({ title, description, icon, className, onClick, badge }: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-xl p-6 hover-effect cursor-pointer relative",
        onClick && "hover:border-brand-200 dark:hover:border-brand-800",
        className
      )}
      onClick={onClick}
    >
      {badge && (
        <span className="absolute top-3 right-3 text-xs font-medium px-2 py-1 bg-brand-100 dark:bg-brand-900/50 text-brand-800 dark:text-brand-300 rounded-full">
          {badge}
        </span>
      )}
      <div className="rounded-full w-12 h-12 flex items-center justify-center bg-brand-50 dark:bg-brand-900/20 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
