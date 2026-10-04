import { useState } from "react";
import {
  Calendar,
  BookOpen,
  BarChart4,
  Plus,
  Book,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import StudyPlanCard from "@/components/StudyPlanCard";
import { formatDuration, isToday } from "@/utils/dateUtils";
import { StudyPlan, StudyTask, UserProgress } from "@/types";
import Tasks from "./Tasks";
import Task from "./Task";

interface IOverview {
  completionPercentage: number;
  progress: UserProgress;
  tasks: StudyTask[];
  plans: StudyPlan[];
  toggleTaskCompletion: (task: string) => void;
  setActiveTab: (tab: string) => void;
}

// export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Overview = (props: IOverview) => {
  const { progress, tasks, plans, toggleTaskCompletion, setActiveTab } = props;

  const completionPercentage =
    (tasks?.filter((task) => task.completed).length / tasks?.length) * 100;

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const dueToday = tasks?.filter((task) =>
    isSameDay(new Date(task.dueDate), new Date()),
  );

  return (
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
            <div className="text-2xl font-bold mb-2">
              {Math.round(completionPercentage * 10) / 10}%
            </div>
            <Progress value={completionPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {tasks?.filter((task) => task.completed)?.length} of{" "}
              {tasks?.length} tasks completed
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
            <div className="text-2xl font-bold mb-1">
              {formatDuration(progress.studyTimeToday)}
            </div>
            <Progress
              value={(progress.studyTimeToday / 180) * 100}
              className="h-2"
            />
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
            <div className="text-2xl font-bold mb-1">
              {progress.completedQuizzes}
            </div>
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
          onClick={() => (window.location.href = "/planner")}
        />

        <FeatureCard
          title="Summarize Document"
          description="Upload a document and get an AI-generated summary and key points"
          icon={<BookOpen className="w-6 h-6 text-brand-500" />}
          onClick={() => (window.location.href = "/summarizer")}
        />

        <FeatureCard
          title="Generate Quiz"
          description="Create an AI-powered quiz based on your study materials"
          icon={<BarChart4 className="w-6 h-6 text-brand-500" />}
          onClick={() => (window.location.href = "/quiz")}
        />
      </div>

      {/* Today's Tasks */}
      {tasks?.length > 0 && dueToday?.length > 0 ? (
        <>
          <h2 className="text-xl font-semibold mt-8 mb-4">Today's Tasks</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-border shadow-sm p-5">
            <div className="space-y-4">
              {dueToday.map((task) => {
                // if (isToday(task.dueDate)) {
                return <Task task={task} key={task._id} />;
                // }
              })}
            </div>

            <div className="mt-6">
              <Button
                variant="outline"
                onClick={() => setActiveTab("tasks")}
                className="w-full"
              >
                View All Tasks
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-border shadow-sm p-6 text-center">
          <p className="text-muted-foreground">No tasks scheduled for today</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setActiveTab("tasks")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      )}

      {/* Current Study Plans */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Active Study Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans?.slice(0, 2).map((plan) => (
          <StudyPlanCard
            key={plan.id}
            plan={plan}
            onClick={() => setActiveTab("plans")}
          />
        ))}
      </div>
    </TabsContent>
  );
};

export default Overview;
