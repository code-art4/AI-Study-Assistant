import { PenTool, Brain, Clock } from 'lucide-react';

interface ISteps {
  step: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

const Steps: ISteps[] = [
  {
    step: 1,
    title: 'Set Your Goals',
    description:
      'Define your learning objectives, deadlines, and subjects you want to master.',
    icon: <PenTool className='w-6 h-6 text-brand-500' />,
  },
  {
    step: 2,
    title: 'Let AI Create Your Plan',
    description:
      'Our algorithm generates a personalized study schedule optimized for your goals.',
    icon: <Brain className='w-6 h-6 text-brand-500' />,
  },
  {
    step: 3,
    title: 'Study Efficiently',
    description:
      'Follow your AI-optimized plan and use our tools to maximize knowledge retention.',
    icon: <Clock className='w-6 h-6 text-brand-500' />,
  },
];

export default Steps;
