
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';
import { StudyTask } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { syncTaskWithGoogleCalendar } from '@/utils/googleCalendarSync';

interface TaskFormProps {
  onSubmit: (task: Omit<StudyTask, 'id'>) => void;
  onCancel: () => void;
  initialValues?: StudyTask;
  isEditing?: boolean;
}

const TaskForm = ({ onSubmit, onCancel, initialValues, isEditing = false }: TaskFormProps) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [subject, setSubject] = useState(initialValues?.subject || '');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>(initialValues?.priority || 'medium');
  const [dueDate, setDueDate] = useState<Date | undefined>(initialValues?.dueDate || undefined);
  const [estimatedTime, setEstimatedTime] = useState(initialValues?.estimatedTime?.toString() || '60');
  const [tags, setTags] = useState<string[]>(initialValues?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [syncToCalendar, setSyncToCalendar] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !subject || !dueDate) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const task: Omit<StudyTask, 'id'> = {
      title,
      description,
      subject,
      priority,
      completed: initialValues?.completed || false,
      dueDate,
      estimatedTime: parseInt(estimatedTime) || 60,
      tags
    };
    
    onSubmit(task);
    
    if (syncToCalendar && dueDate) {
      // If user has requested to sync with calendar
      if (isEditing && initialValues) {
        // For editing, we use the existing ID for sync
        await syncTaskWithGoogleCalendar({
          ...task,
          id: initialValues.id
        });
      } else {
        // For new tasks, we'll sync in the onSubmit handler after ID is assigned
        toast({
          title: "Calendar Sync Scheduled",
          description: "Your task will be synced to your calendar."
        });
      }
    }
  };
  
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Task Title *
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium">
            Subject *
          </label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="priority" className="text-sm font-medium">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
            className="w-full p-2 border border-border rounded-md"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Due Date *
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="estimated-time" className="text-sm font-medium">
            Estimated Time (minutes)
          </label>
          <Input
            id="estimated-time"
            type="number"
            min="5"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
            placeholder="60"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Tags
        </label>
        <div className="flex items-center space-x-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add a tag"
            onKeyDown={handleTagKeyDown}
          />
          <Button type="button" onClick={handleAddTag} variant="secondary">
            Add
          </Button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="bg-muted px-2 py-1 rounded-md text-sm flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="sync-calendar"
          checked={syncToCalendar}
          onChange={(e) => setSyncToCalendar(e.target.checked)}
          className="rounded border-gray-300"
        />
        <label htmlFor="sync-calendar" className="text-sm">
          Sync to Google Calendar
        </label>
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-brand-500 hover:bg-brand-600">
          {isEditing ? 'Update' : 'Create'} Task
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
