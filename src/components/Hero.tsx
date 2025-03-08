
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, BarChart4 } from 'lucide-react';

const Hero = () => {
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-4');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);
  
  // Function to scroll to features section
  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    const featuresElement = document.getElementById('features');
    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="relative overflow-hidden" ref={observerRef}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/50 to-transparent dark:from-brand-950/20 pointer-events-none" />
      
      {/* Hero content */}
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-20">
          <div 
            className={`max-w-3xl mx-auto text-center transition-all duration-700 transform ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-block mb-4">
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-brand-700 dark:text-brand-300 bg-brand-100/50 dark:bg-brand-900/20 rounded-full">
                <span className="flex w-2 h-2 rounded-full bg-brand-500 mr-2 animate-pulse" />
                AI-Powered Study Assistant
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 to-foreground/50">
              Study Smarter, Not Harder
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Boost your academic performance with AI-generated study plans, document summaries, and quizzes tailored to your needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-brand-500 hover:bg-brand-600 shadow-md button-effect">
                <Link to="/dashboard">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-brand-200 hover:bg-brand-50 dark:border-brand-800 dark:hover:bg-brand-900/50 button-effect" onClick={scrollToFeatures}>
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </div>
          
          {/* Browser mockup */}
          <div 
            className={`relative w-full max-w-4xl mx-auto transition-all duration-1000 delay-300 transform rounded-xl shadow-2xl ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
          >
            <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-border">
              {/* Browser UI */}
              <div className="flex items-center p-3 border-b border-border bg-muted/30">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="mx-auto text-xs text-muted-foreground">EduWhisperer - AI Study Assistant</div>
              </div>
              
              {/* App screenshot */}
              <div className="relative bg-background w-full aspect-[16/9] overflow-hidden">
                <div className="absolute inset-0 flex">
                  {/* Dashboard preview - simplified for hero */}
                  <div className="w-1/5 h-full border-r border-border p-4 bg-muted/20">
                    <div className="space-y-2">
                      <div className="w-full h-8 rounded-md bg-muted animate-pulse" />
                      <div className="w-3/4 h-6 rounded-md bg-muted/70 animate-pulse" />
                      <div className="w-4/5 h-6 rounded-md bg-muted/70 animate-pulse" />
                      <div className="w-full h-6 rounded-md bg-muted/70 animate-pulse" />
                    </div>
                  </div>
                  
                  {/* Main content preview */}
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex justify-between mb-6">
                      <div className="w-1/3 h-8 rounded-md bg-muted animate-pulse" />
                      <div className="w-24 h-8 rounded-md bg-brand-100 dark:bg-brand-900/50 animate-pulse" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="glass-card rounded-xl p-4 shadow-sm flex flex-col">
                          <div className="w-8 h-8 rounded-md bg-brand-100 dark:bg-brand-900/50 mb-3" />
                          <div className="w-2/3 h-5 rounded-md bg-muted mb-2" />
                          <div className="w-full h-4 rounded-md bg-muted/70" />
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex-1 glass-card rounded-xl p-5 shadow-sm">
                      <div className="w-1/4 h-6 rounded-md bg-muted mb-4" />
                      <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="flex items-center">
                            <div className="w-5 h-5 rounded-md bg-muted/70 mr-3" />
                            <div className="w-2/3 h-5 rounded-md bg-muted" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Reflection effect */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-5/6 h-4 bg-black/5 dark:bg-white/5 blur-lg rounded-full" />
          </div>
        </div>
        
        {/* Features section */}
        <div id="features" className="py-16 md:py-24">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enhance Your Learning Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Unlock your full potential with our AI-powered features designed to transform how you study.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: <Calendar className="w-10 h-10 text-brand-500" />,
                title: "AI Study Planner",
                description: "Generate personalized study schedules based on your deadlines, priorities, and learning style.",
                link: "/planner"
              },
              {
                icon: <BookOpen className="w-10 h-10 text-brand-500" />,
                title: "Document Summarization",
                description: "Upload documents and get AI-generated summaries, key points, and flashcards to accelerate your learning.",
                link: "/summarizer"
              },
              {
                icon: <BarChart4 className="w-10 h-10 text-brand-500" />,
                title: "Smart Quizzes",
                description: "Create AI-generated quizzes from your study materials to test your knowledge and reinforce learning.",
                link: "/quiz"
              }
            ].map((feature, index) => (
              <Link 
                key={index}
                to={feature.link}
                className="glass-card rounded-xl p-6 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 hover-effect"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="rounded-full w-16 h-16 flex items-center justify-center bg-brand-50 dark:bg-brand-900/20 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
