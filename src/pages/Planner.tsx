
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Calendar, Clock, CalendarDays, Users, CheckCircle, Edit2, Trash2, AlertCircle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { StudyPlan } from "@/types";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";

// Placeholder for Google Auth component
const GoogleAuthButton = () => (
  <Button variant="outline" className="w-full flex justify-center items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
    Sign in with Google
  </Button>
);

// Mock data for the study plans
const mockPlans: StudyPlan[] = [
  {
    id: "1",
    title: "Final Exam Preparation - Machine Learning",
    description: "Comprehensive review of all course materials for the final exam",
    goal: "Score at least 90% on the final exam",
    startDate: new Date(new Date().setDate(new Date().getDate() - 5)),
    endDate: new Date(new Date().setDate(new Date().getDate() + 10)),
    subject: "Machine Learning",
    sessions: Array(12).fill(null).map((_, i) => ({
      id: `s${i}`,
      title: `Study Session ${i + 1}`,
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 90 * 60000),
      subject: "Machine Learning",
      tasks: [],
      completed: i < 5
    }))
  },
  {
    id: "2",
    title: "Research Paper - Quantum Computing",
    description: "Research, outline, and write a 15-page paper on quantum algorithms",
    goal: "Complete and submit paper before deadline",
    startDate: new Date(new Date().setDate(new Date().getDate() - 10)),
    endDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    subject: "Quantum Computing",
    sessions: Array(8).fill(null).map((_, i) => ({
      id: `s${i}`,
      title: `Research Session ${i + 1}`,
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 120 * 60000),
      subject: "Quantum Computing",
      tasks: [],
      completed: i < 6
    }))
  }
];

interface PlanDetailsProps {
  plan: StudyPlan;
  onEdit: () => void;
  onDelete: () => void;
}

const PlanDetails = ({ plan, onEdit, onDelete }: PlanDetailsProps) => {
  // Calculate completion percentage
  const completedSessions = plan.sessions.filter(session => session.completed).length;
  const totalSessions = plan.sessions.length;
  const completionPercentage = Math.round((completedSessions / totalSessions) * 100);
  
  const daysRemaining = Math.max(0, Math.ceil((plan.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{plan.title}</h2>
          <p className="text-muted-foreground">{plan.subject}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-2">
              <CalendarDays className="h-5 w-5 mr-2 text-brand-500" />
              <h3 className="font-medium">Duration</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {format(plan.startDate, "MMM dd, yyyy")} - {format(plan.endDate, "MMM dd, yyyy")}
            </p>
            <p className="text-sm font-medium mt-1">{daysRemaining} days remaining</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 mr-2 text-brand-500" />
              <h3 className="font-medium">Sessions</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {completedSessions} of {totalSessions} completed
            </p>
            <Progress value={completionPercentage} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-2">
              <Users className="h-5 w-5 mr-2 text-brand-500" />
              <h3 className="font-medium">Sync Status</h3>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
              <p className="text-sm text-muted-foreground">Not synced with Google Calendar</p>
            </div>
            <Button variant="link" className="px-0 py-1 h-auto text-brand-500">
              Sync Now
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Goal</h3>
        <Card>
          <CardContent className="pt-6">
            <p>{plan.goal}</p>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Study Sessions</h3>
          <Button variant="outline" size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Session
          </Button>
        </div>
        
        <div className="space-y-3">
          {plan.sessions.map((session, index) => (
            <Card key={session.id} className={`${session.completed ? "border-green-200 dark:border-green-900" : ""}`}>
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {session.completed ? (
                      <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mr-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center mr-3">
                        <Clock className="h-5 w-5 text-brand-500" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium">{session.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {format(session.startTime, "h:mm a")} - {format(session.endTime, "h:mm a")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!session.completed && (
                      <Button variant="outline" size="sm">Start</Button>
                    )}
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const Planner = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<StudyPlan | null>(null);
  const [plans, setPlans] = useState<StudyPlan[]>(mockPlans);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    startDate: "",
    endDate: "",
    goal: "",
    topics: ""
  });
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleViewPlan = (plan: StudyPlan) => {
    setCurrentPlan(plan);
    setShowPlanDetails(true);
  };
  
  const handleDeletePlan = (planId: string) => {
    setPlans(plans.filter(p => p.id !== planId));
    setShowPlanDetails(false);
    toast({
      title: "Plan Deleted",
      description: "Your study plan has been deleted successfully."
    });
  };
  
  const handleEditPlan = () => {
    // In a real app, we would populate the form with the current plan data
    setActiveTab("create");
    setShowPlanDetails(false);
    toast({
      title: "Edit Mode",
      description: "You can now edit your study plan."
    });
  };
  
  const handleGeneratePlan = () => {
    // Check if dates are valid
    if (!formData.startDate || !formData.endDate || !formData.title || !formData.subject) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call to generate plan
    toast({
      title: "Generating Plan",
      description: "Creating your personalized study plan..."
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
        sessions: Array(Math.floor(Math.random() * 5) + 5).fill(null).map((_, i) => ({
          id: `new-session-${i}`,
          title: `Study Session ${i + 1}`,
          startTime: new Date(),
          endTime: new Date(new Date().getTime() + 90 * 60000),
          subject: formData.subject,
          tasks: [],
          completed: false
        }))
      };
      
      setPlans(prev => [newPlan, ...prev]);
      setCurrentPlan(newPlan);
      setShowPlanDetails(true);
      
      // Reset form
      setFormData({
        title: "",
        subject: "",
        startDate: "",
        endDate: "",
        goal: "",
        topics: ""
      });
      
      toast({
        title: "Plan Created",
        description: "Your study plan has been generated successfully."
      });
    }, 2000);
  };
  
  const handleUseTemplate = (templateTitle: string) => {
    setFormData({
      title: templateTitle,
      subject: "",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0],
      goal: `Complete ${templateTitle} successfully`,
      topics: ""
    });
    
    setActiveTab("create");
    
    toast({
      title: "Template Selected",
      description: `The ${templateTitle} template has been loaded.`
    });
  };
  
  const handleCalendarSync = () => {
    setShowAuthDialog(true);
  };
  
  const handleAuthComplete = () => {
    setShowAuthDialog(false);
    toast({
      title: "Google Calendar Connected",
      description: "Your study plans will now sync with Google Calendar."
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <header className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">AI Study Planner</h1>
                <p className="text-muted-foreground">
                  Generate personalized study plans based on your goals, courses, and deadlines
                </p>
              </div>
              <Button variant="outline" onClick={handleCalendarSync}>
                <Calendar className="h-4 w-4 mr-2" />
                Sync with Google Calendar
              </Button>
            </div>
          </header>
          
          {!showPlanDetails ? (
            <Tabs defaultValue="create" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-2 w-[400px]">
                <TabsTrigger value="create">Create Plan</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>
              
              <TabsContent value="create" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Create New Study Plan</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form className="space-y-4">
                          <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium">
                              Plan Title
                            </label>
                            <input
                              id="title"
                              type="text"
                              className="w-full p-2 border border-border rounded-md"
                              placeholder="e.g. Midterm Preparation"
                              value={formData.title}
                              onChange={handleInputChange}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium">
                              Subject
                            </label>
                            <input
                              id="subject"
                              type="text"
                              className="w-full p-2 border border-border rounded-md"
                              placeholder="e.g. Introduction to Computer Science"
                              value={formData.subject}
                              onChange={handleInputChange}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="startDate" className="text-sm font-medium">
                                Start Date
                              </label>
                              <input
                                id="startDate"
                                type="date"
                                className="w-full p-2 border border-border rounded-md"
                                value={formData.startDate}
                                onChange={handleInputChange}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="endDate" className="text-sm font-medium">
                                End Date
                              </label>
                              <input
                                id="endDate"
                                type="date"
                                className="w-full p-2 border border-border rounded-md"
                                value={formData.endDate}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="goal" className="text-sm font-medium">
                              Study Goal
                            </label>
                            <textarea
                              id="goal"
                              className="w-full p-2 border border-border rounded-md"
                              rows={3}
                              placeholder="e.g. Prepare for midterm exam with focus on chapters 1-5"
                              value={formData.goal}
                              onChange={handleInputChange}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="topics" className="text-sm font-medium">
                              Key Topics (separated by commas)
                            </label>
                            <textarea
                              id="topics"
                              className="w-full p-2 border border-border rounded-md"
                              rows={3}
                              placeholder="e.g. Variables, Functions, Data Structures, Algorithms"
                              value={formData.topics}
                              onChange={handleInputChange}
                            />
                          </div>
                          
                          <div className="pt-4">
                            <Button 
                              className="w-full bg-brand-500 hover:bg-brand-600"
                              onClick={handleGeneratePlan}
                              type="button"
                            >
                              Generate Study Plan
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                    
                    {plans.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">Your Study Plans</h3>
                        <div className="space-y-4">
                          {plans.map(plan => (
                            <Card key={plan.id} className="hover-effect cursor-pointer" onClick={() => handleViewPlan(plan)}>
                              <CardContent className="pt-6">
                                <div className="flex justify-between">
                                  <div>
                                    <h4 className="font-medium">{plan.title}</h4>
                                    <p className="text-sm text-muted-foreground">{plan.subject}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {format(plan.startDate, "MMM d")} - {format(plan.endDate, "MMM d, yyyy")}
                                    </p>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <div className="text-sm font-medium mb-1">
                                      {plan.sessions.filter(s => s.completed).length}/{plan.sessions.length} Sessions
                                    </div>
                                    <Progress 
                                      value={(plan.sessions.filter(s => s.completed).length / plan.sessions.length) * 100} 
                                      className="h-2 w-24" 
                                    />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Study Tips</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/20 text-brand-500 mr-2">1</span>
                            <span>Break your study sessions into 25-minute focused periods with 5-minute breaks (Pomodoro Technique).</span>
                          </li>
                          <li className="flex items-start">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/20 text-brand-500 mr-2">2</span>
                            <span>Alternate between different subjects to maintain engagement and improve retention.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/20 text-brand-500 mr-2">3</span>
                            <span>Use active recall by testing yourself instead of passively reading.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/20 text-brand-500 mr-2">4</span>
                            <span>Schedule study sessions during your most productive hours of the day.</span>
                          </li>
                        </ul>
                        
                        <div className="mt-6 p-4 bg-muted rounded-lg">
                          <div className="flex items-center mb-2">
                            <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                            <h4 className="font-medium text-sm">Need More Structure?</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Our AI can analyze your learning style and schedule to create optimized study plans.
                          </p>
                          <Button variant="link" className="px-0 py-1 h-auto text-brand-500">
                            Take Learning Style Assessment
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="templates" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Exam Preparation",
                      description: "Intensive study plan for upcoming exams with spaced repetition.",
                      duration: "2-4 weeks"
                    },
                    {
                      title: "Semester Overview",
                      description: "Balanced study plan covering all subjects throughout the semester.",
                      duration: "3-4 months"
                    },
                    {
                      title: "Project Focus",
                      description: "Dedicated plan for completing a major project or assignment.",
                      duration: "1-3 weeks"
                    },
                    {
                      title: "New Subject Mastery",
                      description: "Step-by-step approach to mastering a new subject from scratch.",
                      duration: "1-2 months"
                    }
                  ].map((template, index) => (
                    <Card key={index} className="cursor-pointer hover-effect">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Calendar className="mr-2 h-5 w-5 text-brand-500" />
                          {template.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{template.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Duration: {template.duration}</span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUseTemplate(template.title)}
                          >
                            Use Template
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="space-y-4">
              <Button variant="outline" onClick={() => setShowPlanDetails(false)}>
                Back to All Plans
              </Button>
              
              {currentPlan && (
                <PlanDetails 
                  plan={currentPlan} 
                  onEdit={handleEditPlan}
                  onDelete={() => handleDeletePlan(currentPlan.id)}
                />
              )}
            </div>
          )}
        </div>
      </main>
      
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect with Google Calendar</DialogTitle>
            <DialogDescription>
              Sync your study plans with Google Calendar to stay organized across all your devices.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-muted p-4 rounded-md text-sm">
              <p>By connecting with Google Calendar, you authorize this app to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Create calendar events for your study sessions</li>
                <li>Read your existing calendar events to avoid conflicts</li>
                <li>Update or delete events created by this app</li>
              </ul>
            </div>
            
            <GoogleAuthButton />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAuthDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAuthComplete}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Planner;
