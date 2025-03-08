
import { StudyTask, StudyPlan, StudySession } from '@/types';

// This would connect to a backend in a real app
class TaskService {
  private tasks: Map<string, StudyTask> = new Map();
  private plans: Map<string, StudyPlan> = new Map();
  
  constructor() {
    // Load from localStorage if available
    this.loadFromStorage();
  }
  
  private loadFromStorage() {
    try {
      const tasksData = localStorage.getItem('studyTasks');
      const plansData = localStorage.getItem('studyPlans');
      
      if (tasksData) {
        const tasksArray: StudyTask[] = JSON.parse(tasksData);
        tasksArray.forEach(task => {
          // Convert string dates back to Date objects
          task.dueDate = new Date(task.dueDate);
          this.tasks.set(task.id, task);
        });
      }
      
      if (plansData) {
        const plansArray: StudyPlan[] = JSON.parse(plansData);
        plansArray.forEach(plan => {
          // Convert string dates back to Date objects
          plan.startDate = new Date(plan.startDate);
          plan.endDate = new Date(plan.endDate);
          plan.sessions.forEach(session => {
            session.startTime = new Date(session.startTime);
            session.endTime = new Date(session.endTime);
          });
          this.plans.set(plan.id, plan);
        });
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  }
  
  private saveToStorage() {
    try {
      localStorage.setItem('studyTasks', JSON.stringify(Array.from(this.tasks.values())));
      localStorage.setItem('studyPlans', JSON.stringify(Array.from(this.plans.values())));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }
  
  // Task methods
  getTask(id: string): StudyTask | undefined {
    return this.tasks.get(id);
  }
  
  getAllTasks(): StudyTask[] {
    return Array.from(this.tasks.values());
  }
  
  addTask(task: Omit<StudyTask, 'id'>): StudyTask {
    const id = `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newTask: StudyTask = { ...task, id };
    this.tasks.set(id, newTask);
    this.saveToStorage();
    return newTask;
  }
  
  updateTask(id: string, updates: Partial<StudyTask>): StudyTask | undefined {
    const task = this.tasks.get(id);
    if (!task) return undefined;
    
    const updatedTask = { ...task, ...updates };
    this.tasks.set(id, updatedTask);
    this.saveToStorage();
    return updatedTask;
  }
  
  deleteTask(id: string): boolean {
    const result = this.tasks.delete(id);
    if (result) this.saveToStorage();
    return result;
  }
  
  // Plan methods
  getPlan(id: string): StudyPlan | undefined {
    return this.plans.get(id);
  }
  
  getAllPlans(): StudyPlan[] {
    return Array.from(this.plans.values());
  }
  
  addPlan(plan: Omit<StudyPlan, 'id'>): StudyPlan {
    const id = `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newPlan: StudyPlan = { ...plan, id };
    this.plans.set(id, newPlan);
    this.saveToStorage();
    return newPlan;
  }
  
  updatePlan(id: string, updates: Partial<StudyPlan>): StudyPlan | undefined {
    const plan = this.plans.get(id);
    if (!plan) return undefined;
    
    const updatedPlan = { ...plan, ...updates };
    this.plans.set(id, updatedPlan);
    this.saveToStorage();
    return updatedPlan;
  }
  
  deletePlan(id: string): boolean {
    const result = this.plans.delete(id);
    if (result) this.saveToStorage();
    return result;
  }
  
  // Session methods
  addSessionToPlan(planId: string, session: Omit<StudySession, 'id'>): StudySession | undefined {
    const plan = this.plans.get(planId);
    if (!plan) return undefined;
    
    const id = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newSession: StudySession = { ...session, id };
    
    plan.sessions.push(newSession);
    this.saveToStorage();
    return newSession;
  }
  
  updateSession(planId: string, sessionId: string, updates: Partial<StudySession>): StudySession | undefined {
    const plan = this.plans.get(planId);
    if (!plan) return undefined;
    
    const sessionIndex = plan.sessions.findIndex(s => s.id === sessionId);
    if (sessionIndex === -1) return undefined;
    
    const updatedSession = { ...plan.sessions[sessionIndex], ...updates };
    plan.sessions[sessionIndex] = updatedSession;
    this.saveToStorage();
    return updatedSession;
  }
  
  deleteSession(planId: string, sessionId: string): boolean {
    const plan = this.plans.get(planId);
    if (!plan) return false;
    
    const initialLength = plan.sessions.length;
    plan.sessions = plan.sessions.filter(s => s.id !== sessionId);
    
    if (plan.sessions.length !== initialLength) {
      this.saveToStorage();
      return true;
    }
    
    return false;
  }
  
  // Google Calendar integration (mock)
  syncWithGoogleCalendar(taskId: string): Promise<boolean> {
    // This would be replaced with actual Google Calendar API integration
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`Task ${taskId} synced with Google Calendar`);
        resolve(true);
      }, 1000);
    });
  }
}

const taskService = new TaskService();
export default taskService;
