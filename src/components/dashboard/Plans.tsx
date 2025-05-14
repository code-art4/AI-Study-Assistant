import StudyPlanCard from '@/components/StudyPlanCard';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { StudyPlan } from '@/types';

interface IPlans {
  plans: StudyPlan[];
}

const Plans = ({ plans }: IPlans) => {
  return (
    <TabsContent value='plans' className='space-y-6'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>Study Plans</h2>
        <Button>
          <Plus className='w-4 h-4 mr-2' />
          New Plan
        </Button>
      </div>

      {/* Study Plans */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {plans.map((plan) => (
          <StudyPlanCard
            key={plan.id}
            plan={plan}
            onClick={() => console.log(`View plan ${plan.id}`)}
          />
        ))}
      </div>
    </TabsContent>
  );
};

export default Plans;
