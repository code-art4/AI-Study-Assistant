import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/home/Footer';
import Features from '@/components/home/Features';
import CTA from '@/components/home/Cta';
import Works from '@/components/home/Works';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main>
        <Hero />
        <Works />
        <Features />
        <CTA />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
