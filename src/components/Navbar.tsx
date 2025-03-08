
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, BookOpen, BarChart, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { to: '/', label: 'Home', icon: null, showOnLanding: true },
    { to: '/dashboard', label: 'Dashboard', icon: <BarChart className="w-4 h-4 mr-2" />, showOnLanding: false },
    { to: '/planner', label: 'Planner', icon: <Calendar className="w-4 h-4 mr-2" />, showOnLanding: false },
    { to: '/summarizer', label: 'Summarizer', icon: <BookOpen className="w-4 h-4 mr-2" />, showOnLanding: false },
    { to: '/quiz', label: 'Quiz', icon: <BookOpen className="w-4 h-4 mr-2" />, showOnLanding: false },
  ];
  
  const isLandingPage = location.pathname === '/';
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isLandingPage ? 'bg-background/70 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-[1.02]">
            <span className="bg-gradient-to-r from-brand-600 to-brand-400 rounded-md p-1.5">
              <BookOpen className="h-5 w-5 text-white" strokeWidth={2.5} />
            </span>
            <span className="font-semibold text-xl tracking-tight">EduWhisperer</span>
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks
                .filter(link => isLandingPage ? link.showOnLanding : true)
                .map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={isActive(link.to) ? "nav-item-active" : "nav-item"}
                  >
                    <span className="flex items-center">
                      {link.icon}
                      {link.label}
                    </span>
                  </Link>
                ))}
            </nav>
          )}
          
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden rounded-md p-2 text-foreground hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          )}
          
          {/* Call to Action */}
          {!isMobile && isLandingPage && (
            <div className="hidden md:block">
              <Button asChild className="bg-brand-500 hover:bg-brand-600 shadow-md button-effect">
                <Link to="/dashboard">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobile && isOpen && (
        <div className="md:hidden bg-background/90 backdrop-blur-lg animate-fade-in">
          <div className="py-3 px-4 space-y-1">
            {navLinks
              .filter(link => isLandingPage ? link.showOnLanding : true)
              .map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.to) 
                      ? "bg-accent text-foreground" 
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center">
                    {link.icon}
                    {link.label}
                  </span>
                </Link>
              ))}
            
            {isLandingPage && (
              <div className="pt-3">
                <Button asChild className="w-full bg-brand-500 hover:bg-brand-600">
                  <Link to="/dashboard">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
