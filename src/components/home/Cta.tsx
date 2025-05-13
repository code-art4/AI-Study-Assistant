import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTA = () => {
  return (
    <section className='py-16 md:py-24 bg-brand-50 dark:bg-brand-900/10'>
      <div className='container px-4 md:px-6 mx-auto'>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Ready to Transform Your Study Habits?
          </h2>
          <p className='text-xl text-muted-foreground mb-8'>
            Join thousands of students who have already improved their learning
            efficiency and academic performance.
          </p>
          <Button
            asChild
            size='lg'
            className='bg-brand-500 hover:bg-brand-600 shadow-md button-effect'
          >
            <Link to='/dashboard'>Get Started for Free</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
