
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, BookOpen, BarChart, Settings, Menu, X, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/components/AuthService';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user, isAuthenticated, logout, showLoginDialog } = useAuth();
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
          
          {/* Call to Action or User Menu */}
          {!isMobile && (
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/20">
                        <User className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {user?.name || 'User'}
                      <p className="text-xs text-muted-foreground">{user?.email || ''}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/planner">Study Planner</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/summarizer">Summarizer</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/quiz">Quiz</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-500 dark:text-red-400 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                isLandingPage ? (
                  <Button asChild className="bg-brand-500 hover:bg-brand-600 shadow-md button-effect">
                    <Link to="/dashboard">Get Started</Link>
                  </Button>
                ) : (
                  <Button onClick={showLoginDialog} className="bg-brand-500 hover:bg-brand-600 shadow-md">
                    Sign In
                  </Button>
                )
              )}
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
            
            {isLandingPage && !isAuthenticated && (
              <div className="pt-3">
                <Button asChild className="w-full bg-brand-500 hover:bg-brand-600">
                  <Link to="/dashboard">Get Started</Link>
                </Button>
              </div>
            )}
            
            {!isLandingPage && !isAuthenticated && (
              <div className="pt-3">
                <Button onClick={showLoginDialog} className="w-full bg-brand-500 hover:bg-brand-600">
                  Sign In
                </Button>
              </div>
            )}
            
            {isAuthenticated && (
              <div className="pt-3 border-t border-border mt-3">
                <Button onClick={logout} variant="destructive" className="w-full mt-2">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
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
