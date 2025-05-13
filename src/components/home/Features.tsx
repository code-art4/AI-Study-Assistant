import { BookOpen, Calendar, BarChart4, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Features = () => {
  return (
    <section className='py-16 md:py-24'>
      <div className='container px-4 md:px-6 mx-auto'>
        {[
          {
            title: 'AI-Powered Study Planner',
            description:
              'Our advanced algorithm creates personalized study schedules based on your deadlines, learning style, and priorities.',
            features: [
              'Smart time allocation for each subject',
              'Adaptive rescheduling when plans change',
              'Optimized breaks using the Pomodoro technique',
              'Spaced repetition integration for better retention',
            ],
            icon: <Calendar className='w-12 h-12 text-brand-500' />,
            image:
              'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            direction: 'ltr',
            link: 'planner',
          },
          {
            title: 'Document Summarization',
            description:
              'Upload any study material and our AI will extract key points, create summaries, and generate study notes.',
            features: [
              'OCR technology for scanning physical documents',
              'Key concept extraction and highlighting',
              'Automatic flashcard generation',
              'Voice-to-text for lecture recordings',
            ],
            icon: <BookOpen className='w-12 h-12 text-brand-500' />,
            image:
              'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            direction: 'rtl',
            link: 'summarizer',
          },
          {
            title: 'Intelligent Quiz Generation',
            description:
              'Test your knowledge with AI-generated quizzes created from your study materials and learning objectives.',
            features: [
              'Question difficulty adapts to your knowledge level',
              'Explanations for every answer',
              'Focus on areas where you need improvement',
              'Track progress with detailed analytics',
            ],
            icon: <BarChart4 className='w-12 h-12 text-brand-500' />,
            image:
              'https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            direction: 'ltr',
            link: 'quiz',
          },
        ].map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              feature.direction === 'rtl'
                ? 'md:flex-row-reverse'
                : 'md:flex-row'
            } gap-8 md:gap-12 items-center mb-24 last:mb-0 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700`}
          >
            <div className='flex-1'>
              <div className='mb-4 inline-block'>
                <div className='p-3 bg-brand-50 dark:bg-brand-900/20 rounded-xl'>
                  {feature.icon}
                </div>
              </div>
              <h2 className='text-3xl font-bold mb-4'>{feature.title}</h2>
              <p className='text-xl text-muted-foreground mb-6'>
                {feature.description}
              </p>
              <ul className='space-y-3 mb-8'>
                {feature.features.map((item, i) => (
                  <li key={i} className='flex items-start'>
                    <div className='mr-3 mt-1 w-5 h-5 text-white bg-brand-500 rounded-full flex items-center justify-center text-xs'>
                      ✓
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className='bg-brand-500 hover:bg-brand-600 shadow-md button-effect'
              >
                <Link to={`/${feature.link}`}>
                  Try {feature.link}
                  <ChevronRight className='ml-1 h-4 w-4' />
                </Link>
              </Button>
            </div>
            <div className='flex-1'>
              <div className='relative overflow-hidden rounded-xl border border-border shadow-xl'>
                <div className='absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-transparent z-10' />
                <img
                  src={feature.image}
                  alt={feature.title}
                  className='w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700'
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
