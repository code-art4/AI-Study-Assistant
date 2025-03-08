
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Calendar, 
  BarChart4, 
  PenTool, 
  Brain, 
  Clock, 
  ChevronRight 
} from "lucide-react";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        
        {/* How it works section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience the seamless journey from chaos to organized learning with our AI-powered platform.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
              {[
                {
                  step: 1,
                  title: "Set Your Goals",
                  description: "Define your learning objectives, deadlines, and subjects you want to master.",
                  icon: <PenTool className="w-6 h-6 text-brand-500" />
                },
                {
                  step: 2,
                  title: "Let AI Create Your Plan",
                  description: "Our algorithm generates a personalized study schedule optimized for your goals.",
                  icon: <Brain className="w-6 h-6 text-brand-500" />
                },
                {
                  step: 3,
                  title: "Study Efficiently",
                  description: "Follow your AI-optimized plan and use our tools to maximize knowledge retention.",
                  icon: <Clock className="w-6 h-6 text-brand-500" />
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="relative animate-on-scroll opacity-0 translate-y-4 transition-all duration-700"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Connecting line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-border z-0 -translate-y-1/2" />
                  )}
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center mb-4 border border-brand-100 dark:border-brand-800">
                      <span className="text-xl font-semibold text-brand-600 dark:text-brand-400">{item.step}</span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mb-3 -mt-8 ml-8 border border-border">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features detailed section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            {[
              {
                title: "AI-Powered Study Planner",
                description: "Our advanced algorithm creates personalized study schedules based on your deadlines, learning style, and priorities.",
                features: [
                  "Smart time allocation for each subject",
                  "Adaptive rescheduling when plans change",
                  "Optimized breaks using the Pomodoro technique",
                  "Spaced repetition integration for better retention"
                ],
                icon: <Calendar className="w-12 h-12 text-brand-500" />,
                image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                direction: "ltr"
              },
              {
                title: "Document Summarization",
                description: "Upload any study material and our AI will extract key points, create summaries, and generate study notes.",
                features: [
                  "OCR technology for scanning physical documents",
                  "Key concept extraction and highlighting",
                  "Automatic flashcard generation",
                  "Voice-to-text for lecture recordings"
                ],
                icon: <BookOpen className="w-12 h-12 text-brand-500" />,
                image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                direction: "rtl"
              },
              {
                title: "Intelligent Quiz Generation",
                description: "Test your knowledge with AI-generated quizzes created from your study materials and learning objectives.",
                features: [
                  "Question difficulty adapts to your knowledge level",
                  "Explanations for every answer",
                  "Focus on areas where you need improvement",
                  "Track progress with detailed analytics"
                ],
                icon: <BarChart4 className="w-12 h-12 text-brand-500" />,
                image: "https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                direction: "ltr"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${feature.direction === 'rtl' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center mb-24 last:mb-0 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700`}
              >
                <div className="flex-1">
                  <div className="mb-4 inline-block">
                    <div className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-xl">
                      {feature.icon}
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{feature.title}</h2>
                  <p className="text-xl text-muted-foreground mb-6">{feature.description}</p>
                  <ul className="space-y-3 mb-8">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <div className="mr-3 mt-1 w-5 h-5 text-white bg-brand-500 rounded-full flex items-center justify-center text-xs">✓</div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="bg-brand-500 hover:bg-brand-600 shadow-md button-effect">
                    <Link to={`/${feature.title.split(' ')[0].toLowerCase()}`}>
                      Try {feature.title.split(' ')[0]} 
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="flex-1">
                  <div className="relative overflow-hidden rounded-xl border border-border shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-transparent z-10" />
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 md:py-24 bg-brand-50 dark:bg-brand-900/10">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Study Habits?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of students who have already improved their learning efficiency and academic performance.
              </p>
              <Button asChild size="lg" className="bg-brand-500 hover:bg-brand-600 shadow-md button-effect">
                <Link to="/dashboard">Get Started for Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-brand-600 to-brand-400 rounded-md p-1.5">
                  <BookOpen className="h-5 w-5 text-white" strokeWidth={2.5} />
                </span>
                <span className="font-semibold text-xl tracking-tight">EduWhisperer</span>
              </Link>
              <p className="text-muted-foreground mt-2 text-sm">
                AI-powered study assistant for better learning outcomes
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div>
                <h4 className="font-semibold mb-3">Features</h4>
                <ul className="space-y-2">
                  <li><Link to="/planner" className="text-muted-foreground hover:text-foreground">Study Planner</Link></li>
                  <li><Link to="/summarizer" className="text-muted-foreground hover:text-foreground">Document Summarizer</Link></li>
                  <li><Link to="/quiz" className="text-muted-foreground hover:text-foreground">Quiz Generator</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Resources</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                  <li><Link to="/" className="text-muted-foreground hover:text-foreground">Guides</Link></li>
                  <li><Link to="/" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Legal</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                  <li><Link to="/" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                  <li><Link to="/" className="text-muted-foreground hover:text-foreground">Cookies</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} EduWhisperer. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground">Twitter</a>
              <a href="#" className="hover:text-foreground">LinkedIn</a>
              <a href="#" className="hover:text-foreground">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
