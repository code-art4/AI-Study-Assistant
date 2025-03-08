
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Planner = () => {
  const [activeTab, setActiveTab] = useState("create");
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI Study Planner</h1>
            <p className="text-muted-foreground">
              Generate personalized study plans based on your goals, courses, and deadlines
            </p>
          </header>
          
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
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="start-date" className="text-sm font-medium">
                              Start Date
                            </label>
                            <input
                              id="start-date"
                              type="date"
                              className="w-full p-2 border border-border rounded-md"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="end-date" className="text-sm font-medium">
                              End Date
                            </label>
                            <input
                              id="end-date"
                              type="date"
                              className="w-full p-2 border border-border rounded-md"
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
                          />
                        </div>
                        
                        <div className="pt-4">
                          <Button className="w-full bg-brand-500 hover:bg-brand-600">
                            Generate Study Plan
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
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
                        <Button variant="outline" size="sm">
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Planner;
