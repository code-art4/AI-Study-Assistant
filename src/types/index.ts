
export interface StudyTask {
  id: string;
  title: string;
  description: string;
  subject: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueDate: Date;
  estimatedTime: number; // in minutes
  tags: string[];
}

export interface StudySession {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  subject: string;
  tasks: string[]; // StudyTask ids
  completed: boolean;
}

export interface StudyPlan {
  id: string;
  title: string;
  description: string;
  goal: string;
  startDate: Date;
  endDate: Date;
  subject: string;
  sessions: StudySession[];
}

export interface Document {
  id: string;
  title: string;
  content: string;
  subject: string;
  uploadDate: Date;
  summary?: string;
  tags: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct answer
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  subject: string;
  questions: QuizQuestion[];
  createdDate: Date;
  timeLimit?: number; // in minutes
}

export interface UserProgress {
  completedTasks: number;
  totalTasks: number;
  studyTimeToday: number; // in minutes
  studyTimeWeek: number; // in minutes
  completedQuizzes: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  studyPlans: StudyPlan[];
  documents: Document[];
  quizzes: Quiz[];
  progress: UserProgress;
}
