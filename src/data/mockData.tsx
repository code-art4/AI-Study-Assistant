import { StudyPlan, StudyTask, UserProgress } from '@/types';

export const mockProgress: UserProgress = {
  completedTasks: 18,
  totalTasks: 24,
  studyTimeToday: 130, // minutes
  studyTimeWeek: 860, // minutes
  completedQuizzes: 5,
};

export const mockTasks: StudyTask[] = [
  {
    id: '1',
    title: 'Read Chapter 5: Neural Networks',
    description:
      'Focus on understanding backpropagation and activation functions',
    subject: 'AI Fundamentals',
    priority: 'high',
    completed: false,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    estimatedTime: 60,
    tags: ['AI', 'Machine Learning'],
  },
  {
    id: '2',
    title: 'Complete Practice Problems Set A',
    description: 'Problems 1-15 on integration by parts',
    subject: 'Calculus II',
    priority: 'medium',
    completed: false,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    estimatedTime: 45,
    tags: ['Math', 'Calculus'],
  },
  {
    id: '3',
    title: 'Review Lecture Notes on Protein Synthesis',
    description: 'Transcription and translation processes',
    subject: 'Molecular Biology',
    priority: 'medium',
    completed: false,
    dueDate: new Date(),
    estimatedTime: 30,
    tags: ['Biology', 'Genetics'],
  },
  {
    id: '4',
    title: 'Finish Lab Report',
    description: 'Complete data analysis section and conclusion',
    subject: 'Chemistry',
    priority: 'high',
    completed: false,
    dueDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    estimatedTime: 90,
    tags: ['Chemistry', 'Lab'],
  },
];

export const mockPlans: StudyPlan[] = [
  {
    id: '1',
    title: 'Final Exam Preparation - Machine Learning',
    description:
      'Comprehensive review of all course materials for the final exam',
    goal: 'Score at least 90% on the final exam',
    startDate: new Date(new Date().setDate(new Date().getDate() - 5)),
    endDate: new Date(new Date().setDate(new Date().getDate() + 10)),
    subject: 'Machine Learning',
    sessions: Array(12)
      .fill(null)
      .map((_, i) => ({
        id: `s${i}`,
        title: `Study Session ${i + 1}`,
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + 90 * 60000),
        subject: 'Machine Learning',
        tasks: [],
        completed: i < 5,
      })),
  },
  {
    id: '2',
    title: 'Research Paper - Quantum Computing',
    description:
      'Research, outline, and write a 15-page paper on quantum algorithms',
    goal: 'Complete and submit paper before deadline',
    startDate: new Date(new Date().setDate(new Date().getDate() - 10)),
    endDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    subject: 'Quantum Computing',
    sessions: Array(8)
      .fill(null)
      .map((_, i) => ({
        id: `s${i}`,
        title: `Research Session ${i + 1}`,
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + 120 * 60000),
        subject: 'Quantum Computing',
        tasks: [],
        completed: i < 6,
      })),
  },
];
