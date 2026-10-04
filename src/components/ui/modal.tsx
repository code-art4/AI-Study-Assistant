import { useState, KeyboardEvent } from "react";
import { Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import useQuery from "@/hooks/useQuery";

export type Priority = "low" | "medium" | "high";

export interface NewTask {
  title: string;
  description: string;
  subject: string;
  timeToFinish: number;
  dueDate: string; // YYYY-MM-DD
  priority: Priority;
  categories: string[];
}

interface NewTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (task: NewTask) => void;
  subjects?: string[]; // suggestions shown in the Subject field
  title: string;
  description: string;
  modalId: string;
  buttonName: string;
}

const priorities: { value: Priority; label: string; active: string }[] = [
  { value: "low", label: "Low", active: "text-green-700" },
  { value: "medium", label: "Medium", active: "text-amber-700" },
  { value: "high", label: "High", active: "text-red-700" },
];

const emptyTask: NewTask = {
  title: "",
  description: "",
  subject: "",
  timeToFinish: 2,
  dueDate: "",
  priority: "medium",
  categories: [],
};

export default function NewTaskModal({
  open,
  onOpenChange,
  onCreate,
  subjects = [],
  title,
  description,
  modalId,
  buttonName,
}: NewTaskModalProps) {
  const [task, setTask] = useState<NewTask>(emptyTask);
  const [tagInput, setTagInput] = useState("");

  const update = <K extends keyof NewTask>(key: K, value: NewTask[K]) =>
    setTask((t) => ({ ...t, [key]: value }));

  const addTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const tag = tagInput.trim();
    if (tag && !task.categories.includes(tag)) {
      update("categories", [...task.categories, tag]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) =>
    update(
      "categories",
      task.categories.filter((c) => c !== tag),
    );

  const reset = () => {
    setTask(emptyTask);
    setTagInput("");
  };

  const close = () => {
    onOpenChange(false);
    reset();
  };

  const {
    loading: isTaskCreating,
    error: taskError,
    success: TaskCreated,
    loadFn: createTask,
  } = useQuery({
    url: "tasks/task/create",
  });

  const submit = () => {
    if (!task.title.trim()) return;
    onCreate({ ...task, title: task.title.trim() });
    createTask(task);
    close();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => (v ? onOpenChange(true) : close())}
    >
      <DialogContent className="max-w-[540px] gap-0 rounded-2xl p-0">
        <DialogHeader className="flex-row items-start gap-3.5 space-y-0 p-6 pb-3 text-left">
          <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-500">
            <Plus className="h-5 w-5" />
          </div>
          <div>
            <DialogTitle className="text-xl font-bold tracking-tight">
              {title}
            </DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </div>
        </DialogHeader>

        <div className="grid gap-4 px-6 py-3">
          <div className="grid gap-1.5">
            <Label htmlFor={`${modalId}-title`}>Title</Label>
            <Input
              id={`${modalId}-title`}
              placeholder="e.g. Finish calculus problem set 6"
              value={task.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor={`${modalId}-desc`}>
              Description{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </Label>
            <Textarea
              id={`${modalId}-desc`}
              placeholder="What needs to get done?"
              value={task.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor={`${modalId}-subject`}>Subject</Label>
              <Input
                id={`${modalId}-subject`}
                list="task-subjects"
                placeholder="e.g. Chemistry"
                value={task.subject}
                onChange={(e) => update("subject", e.target.value)}
              />
              <datalist id="task-subjects">
                {subjects.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor={`${modalId}-hours`}>Estimated time (hours)</Label>
              <Input
                id={`${modalId}-hours`}
                type="number"
                min={0.5}
                step={0.5}
                value={task.timeToFinish}
                onChange={(e) => update("timeToFinish", Number(e.target.value))}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor={`${modalId}-due`}>Due date</Label>
              <Input
                id={`${modalId}-due`}
                type="date"
                value={task.dueDate}
                onChange={(e) => update("dueDate", e.target.value)}
              />
            </div>
            <div className="grid gap-1.5">
              <Label id={`${modalId}-priority-label`}>Priority</Label>
              <div
                role="group"
                aria-labelledby={`${modalId}-priority-label`}
                className="grid grid-cols-3 gap-1 rounded-xl bg-muted p-1"
              >
                {priorities.map((p) => {
                  const selected = task.priority === p.value;
                  return (
                    <button
                      key={p.value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => update("priority", p.value)}
                      className={`rounded-lg py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        selected
                          ? `bg-background shadow-sm ${p.active}`
                          : "text-muted-foreground"
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor={`${modalId}-tags`}>Categories</Label>
            <div className="flex flex-wrap gap-1.5 rounded-md border border-input p-1.5 focus-within:ring-2 focus-within:ring-ring">
              {task.categories.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-sky-100 py-0.5 pl-2.5 pr-1.5 text-xs text-sky-700"
                >
                  {tag}
                  <button
                    type="button"
                    aria-label={`Remove ${tag}`}
                    onClick={() => removeTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <input
                id={`${modalId}-tags`}
                className="min-w-[120px] flex-1 bg-transparent px-1.5 py-1 text-sm outline-none placeholder:text-muted-foreground"
                placeholder="Add a category"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={addTag}
              />
            </div>
            <p className="text-xs text-muted-foreground">Press Enter to add.</p>
          </div>
        </div>

        <DialogFooter className="mt-2 gap-2 border-t p-6 py-4 sm:justify-end">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={!task.title.trim()}>
            {buttonName}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- Usage ----------

import { useState } from "react";
import NewTaskModal from "./NewTaskModal";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>
  <Plus className="mr-2 h-4 w-4" /> New Task
</Button>

<NewTaskModal
  open={open}
  onOpenChange={setOpen}
  subjects={["Chemistry", "Mathematics", "Biology"]}
  onCreate={(task) => addTask(task)}  // your existing save logic
/>

*/
