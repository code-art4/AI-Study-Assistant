import { StudyPlan } from '@/types';

// Mock data for the study plans
const mockPlans: StudyPlan[] = [
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

export default mockPlans;
