
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FeatureCard from "@/components/FeatureCard";
import StudyPlanCard from "@/components/StudyPlanCard";
import { Calendar, BookOpen, BarChart4, Plus, Book, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudyPlan, StudyTask, UserProgress } from "@/types";
import { formatDate, isToday, formatDuration } from "@/utils/dateUtils";

// Mock data
const mockProgress: UserProgress = {
  completedTasks: 18,
  totalTasks: 24,
  studyTimeToday: 130, // minutes
  studyTimeWeek: 860, // minutes
  completedQuizzes: 5
};

const mockTasks: StudyTask[] = [
  {
    id: "1",
    title: "Read Chapter 5: Neural Networks",
    description: "Focus on understanding backpropagation and activation functions",
    subject: "AI Fundamentals",
    priority: "high",
    completed: false,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    estimatedTime: 60,
    tags: ["AI", "Machine Learning"]
  },
  {
    id: "2",
    title: "Complete Practice Problems Set A",
    description: "Problems 1-15 on integration by parts",
    subject: "Calculus II",
    priority: "medium",
    completed: false,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    estimatedTime: 45,
    tags: ["Math", "Calculus"]
  },
  {
    id: "3",
    title: "Review Lecture Notes on Protein Synthesis",
    description: "Transcription and translation processes",
    subject: "Molecular Biology",
    priority: "medium",
    completed: false,
    dueDate: new Date(),
    estimatedTime: 30,
    tags: ["Biology", "Genetics"]
  },
  {
    id: "4",
    title: "Finish Lab Report",
    description: "Complete data analysis section and conclusion",
    subject: "Chemistry",
    priority: "high",
    completed: false,
    dueDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    estimatedTime: 90,
    tags: ["Chemistry", "Lab"]
  }
];

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

const Dashboard = () => {
  const [progress, setProgress] = useState<UserProgress>(mockProgress);
  const [tasks, setTasks] = useState<StudyTask[]>(mockTasks);
  const [plans, setPlans] = useState<StudyPlan[]>(mockPlans);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock loading state
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Toggle task completion
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed } 
          : task
      )
    );
    
    // Update progress
    setProgress(prev => {
      const completedCount = tasks.filter(t => t.id === taskId ? !t.completed : t.completed).length;
      return {
        ...prev,
        completedTasks: completedCount
      };
    });
  };
  
  // Filter tasks due today
  const tasksToday = tasks.filter(task => isToday(task.dueDate));
  const tasksDue = tasks.filter(task => !task.completed).sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  
  // Calculate completion percentage
  const completionPercentage = Math.round((progress.completedTasks / progress.totalTasks) * 100);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Study Dashboard</h1>
            <p className="text-muted-foreground">
              Track your progress, manage tasks, and optimize your study time
            </p>
          </header>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 md:w-[400px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="plans">Study Plans</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="shadow-sm overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-brand-500" />
                      Task Completion
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">{completionPercentage}%</div>
                    <Progress value={completionPercentage} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      {progress.completedTasks} of {progress.totalTasks} tasks completed
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-brand-500" />
                      Study Time Today
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-1">{formatDuration(progress.studyTimeToday)}</div>
                    <Progress value={(progress.studyTimeToday / 180) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatDuration(progress.studyTimeWeek)} this week
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Book className="w-4 h-4 mr-2 text-brand-500" />
                      Learning Activities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-1">{progress.completedQuizzes}</div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Quizzes completed this week
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Features */}
              <h2 className="text-xl font-semibold mt-8 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FeatureCard
                  title="Create Study Plan"
                  description="Generate an AI-optimized study schedule based on your goals"
                  icon={<Calendar className="w-6 h-6 text-brand-500" />}
                  onClick={() => window.location.href = '/planner'}
                />
                
                <FeatureCard
                  title="Summarize Document"
                  description="Upload a document and get an AI-generated summary and key points"
                  icon={<BookOpen className="w-6 h-6 text-brand-500" />}
                  onClick={() => window.location.href = '/summarizer'}
                />
                
                <FeatureCard
                  title="Generate Quiz"
                  description="Create an AI-powered quiz based on your study materials"
                  icon={<BarChart4 className="w-6 h-6 text-brand-500" />}
                  onClick={() => window.location.href = '/quiz'}
                />
              </div>
              
              {/* Today's Tasks */}
              <h2 className="text-xl font-semibold mt-8 mb-4">Today's Tasks</h2>
              {tasksToday.length > 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-border shadow-sm p-5">
                  <div className="space-y-4">
                    {tasksToday.map(task => (
                      <div key={task.id} className="flex items-start">
                        <div className="flex h-5 items-center mr-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                            className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                          />
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {task.subject} · {formatDuration(task.estimatedTime)}
                          </p>
                        </div>
                        <div 
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            task.priority === 'high' 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                              : task.priority === 'medium'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                                : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          }`}
                        >
                          {task.priority}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline" onClick={() => setActiveTab("tasks")} className="w-full">
                      View All Tasks
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-border shadow-sm p-6 text-center">
                  <p className="text-muted-foreground">No tasks scheduled for today</p>
                  <Button variant="outline" className="mt-4" onClick={() => setActiveTab("tasks")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              )}
              
              {/* Current Study Plans */}
              <h2 className="text-xl font-semibold mt-8 mb-4">Active Study Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plans.slice(0, 2).map(plan => (
                  <StudyPlanCard 
                    key={plan.id} 
                    plan={plan} 
                    onClick={() => setActiveTab("plans")}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tasks" className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">All Tasks</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Task
                </Button>
              </div>
              
              {/* Task List */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-border shadow-sm p-5">
                <div className="space-y-4">
                  {tasksDue.length > 0 ? (
                    tasksDue.map(task => (
                      <div key={task.id} className="flex items-start border-b border-border last:border-0 pb-4 last:pb-0">
                        <div className="flex h-5 items-center mr-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                            className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {task.title}
                            </p>
                            <p 
                              className={`text-xs font-medium px-2 py-1 rounded-full ${
                                task.priority === 'high' 
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                  : task.priority === 'medium'
                                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                                    : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              }`}
                            >
                              {task.priority}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {task.description}
                          </p>
                          <div className="flex items-center mt-2 text-sm text-muted-foreground">
                            <span className="mr-3">{task.subject}</span>
                            <span className="mr-3">·</span>
                            <span className="mr-3">{formatDuration(task.estimatedTime)}</span>
                            <span className="mr-3">·</span>
                            <span>Due: {formatDate(task.dueDate, 'short')}</span>
                          </div>
                          <div className="flex mt-2 space-x-2">
                            {task.tags.map(tag => (
                              <span key={tag} className="text-xs px-2 py-1 bg-muted rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No tasks remaining</p>
                      <Button variant="outline" className="mt-4">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Task
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="plans" className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Study Plans</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Plan
                </Button>
              </div>
              
              {/* Study Plans */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plans.map(plan => (
                  <StudyPlanCard 
                    key={plan.id} 
                    plan={plan} 
                    onClick={() => console.log(`View plan ${plan.id}`)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
