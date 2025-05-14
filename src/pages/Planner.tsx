import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Calendar, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import mockPlans from '../data/mockPlans';
import { StudyPlan } from '@/types';
import { format } from 'date-fns';
import PlanDetails from '@/components/planner/Details';
import DialogComponent from '@/components/planner/Dialog';
import Planner from './../components/planner/index';

const Planner = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<StudyPlan | null>(null);
  const [plans, setPlans] = useState<StudyPlan[]>(mockPlans);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    startDate: '',
    endDate: '',
    goal: '',
    topics: '',
  });
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleViewPlan = (plan: StudyPlan) => {
    setCurrentPlan(plan);
    setShowPlanDetails(true);
  };

  const handleDeletePlan = (planId: string) => {
    setPlans(plans.filter((p) => p.id !== planId));
    setShowPlanDetails(false);
    toast({
      title: 'Plan Deleted',
      description: 'Your study plan has been deleted successfully.',
    });
  };

  const handleEditPlan = () => {
    // In a real app, we would populate the form with the current plan data
    setActiveTab('create');
    setShowPlanDetails(false);
    toast({
      title: 'Edit Mode',
      description: 'You can now edit your study plan.',
    });
  };

  const handleGeneratePlan = () => {
    // Check if dates are valid
    if (
      !formData.startDate ||
      !formData.endDate ||
      !formData.title ||
      !formData.subject
    ) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    // Simulate API call to generate plan
    toast({
      title: 'Generating Plan',
      description: 'Creating your personalized study plan...',
    });

    setTimeout(() => {
      const newPlan: StudyPlan = {
        id: Date.now().toString(),
        title: formData.title,
        description: `Study plan for ${formData.subject} based on your goals and schedule`,
        goal: formData.goal,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        subject: formData.subject,
        sessions: Array(Math.floor(Math.random() * 5) + 5)
          .fill(null)
          .map((_, i) => ({
            id: `new-session-${i}`,
            title: `Study Session ${i + 1}`,
            startTime: new Date(),
            endTime: new Date(new Date().getTime() + 90 * 60000),
            subject: formData.subject,
            tasks: [],
            completed: false,
          })),
      };

      setPlans((prev) => [newPlan, ...prev]);
      setCurrentPlan(newPlan);
      setShowPlanDetails(true);

      // Reset form
      setFormData({
        title: '',
        subject: '',
        startDate: '',
        endDate: '',
        goal: '',
        topics: '',
      });

      toast({
        title: 'Plan Created',
        description: 'Your study plan has been generated successfully.',
      });
    }, 2000);
  };

  const handleCalendarSync = () => {
    setShowAuthDialog(true);
  };

  const PlannerProps = {
    showPlanDetails,
    handleCalendarSync,
    setFormData,
    setActiveTab,
    handleGeneratePlan,
    handleEditPlan,
    handleDeletePlan,
    handleViewPlan,
    handleInputChange,
  };

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <Planner {...PlannerProps} />

      <DialogComponent />
    </div>
  );
};

export default Planner;
