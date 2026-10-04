import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, BookOpen, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface StudySession {
  id: string;
  title: string;
  date: string; // ISO string or YYYY-MM-DD
  durationMinutes: number;
  completed: boolean;
}

export interface StudyPlan {
  id: string;
  title: string;
  subject: string;
  dueDate: string; // ISO string or YYYY-MM-DD
  goals: string[];
  categories: string[];
  sessions: StudySession[];
}

interface StudyPlanPageProps {
  plan: StudyPlan;
  onToggleSession: (sessionId: string, completed: boolean) => void;
  onEdit?: () => void;
  onAddSession?: () => void;
  backTo?: string;
}

const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m}m`;
  return m ? `${h}h ${m}m` : `${h}h`;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatShortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });

export default function StudyPlanPage({
  plan,
  onToggleSession,
  onEdit,
  onAddSession,
  backTo = "/dashboard",
}: StudyPlanPageProps) {
  const stats = useMemo(() => {
    const total = plan.sessions.length;
    const done = plan.sessions.filter((s) => s.completed);
    const totalMinutes = plan.sessions.reduce(
      (a, s) => a + s.durationMinutes,
      0,
    );
    const doneMinutes = done.reduce((a, s) => a + s.durationMinutes, 0);
    return {
      total,
      doneCount: done.length,
      percent: total ? Math.round((done.length / total) * 100) : 0,
      totalMinutes,
      doneMinutes,
    };
  }, [plan.sessions]);

  const isComplete = stats.total > 0 && stats.doneCount === stats.total;
  const isOverdue = !isComplete && new Date(plan.dueDate) < new Date();

  return (
    <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 sm:py-6">
      <Link
        to={backTo}
        className="mb-3.5 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Study Plans
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="flex flex-wrap items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
            {plan.title}
            {isComplete ? (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                Completed
              </Badge>
            ) : isOverdue ? (
              <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                Overdue
              </Badge>
            ) : null}
          </h1>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Due {formatDate(plan.dueDate)}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              {plan.subject}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {stats.total} sessions, {formatDuration(stats.totalMinutes)} total
            </span>
          </div>
        </div>
        <div className="flex w-full gap-2 sm:w-auto">
          <Button
            variant="outline"
            className="flex-1 sm:flex-none"
            onClick={onEdit}
          >
            Edit plan
          </Button>
          <Button className="flex-1 sm:flex-none" onClick={onAddSession}>
            <Plus className="mr-1.5 h-4 w-4" />
            Add session
          </Button>
        </div>
      </div>

      <div className="mt-6 grid items-start gap-5 lg:grid-cols-[1fr_320px]">
        {/* Sessions */}
        <Card className="order-2 p-4 sm:p-5 lg:order-none lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Sessions</h2>
            <span className="text-sm text-muted-foreground">
              {stats.total - stats.doneCount} remaining
            </span>
          </div>

          {plan.sessions.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No sessions yet. Add your first session to get started.
            </p>
          ) : (
            <ul>
              {plan.sessions.map((session, i) => (
                <li key={session.id} className="border-t first:border-t-0">
                  <label className="flex cursor-pointer items-center gap-3 sm:gap-3.5 rounded-lg px-1 py-3.5 focus-within:ring-2 focus-within:ring-ring">
                    <input
                      type="checkbox"
                      className="h-[18px] w-[18px] shrink-0 cursor-pointer accent-sky-500"
                      checked={session.completed}
                      onChange={(e) =>
                        onToggleSession(session.id, e.target.checked)
                      }
                      aria-label={`Mark session ${i + 1} complete`}
                    />
                    <span className="hidden h-[30px] w-[30px] shrink-0 items-center sm:flex justify-center rounded-lg bg-sky-100 text-xs font-semibold text-sky-700">
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block font-medium ${
                          session.completed
                            ? "text-muted-foreground line-through"
                            : ""
                        }`}
                      >
                        {session.title}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatShortDate(session.date)}
                      </span>
                    </span>
                    <span className="ml-auto shrink-0 whitespace-nowrap text-sm text-muted-foreground">
                      {formatDuration(session.durationMinutes)}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Side panel: "contents" lets the cards reorder on mobile
            (progress, sessions, goals) and stack in a column on desktop */}
        <div className="contents">
          <Card className="order-1 p-4 sm:p-5 lg:order-none lg:col-start-2 lg:row-start-1">
            <span className="text-sm text-muted-foreground">Progress</span>
            <div className="text-4xl font-bold tracking-tight">
              {stats.percent}%
            </div>
            <div
              className="my-3 h-2 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={stats.percent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-sky-500 transition-all"
                style={{ width: `${stats.percent}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.doneCount} of {stats.total} sessions completed
            </p>
            <div className="mt-4 rounded-xl border bg-muted/40 p-3">
              <div className="text-lg font-semibold">
                {formatDuration(stats.doneMinutes)}
              </div>
              <span className="text-xs text-muted-foreground">Studied</span>
            </div>
          </Card>

          {(plan.goals.length > 0 || plan.categories.length > 0) && (
            <Card className="order-3 p-4 sm:p-5 lg:order-none lg:col-start-2 lg:row-start-2">
              <h2 className="text-lg font-semibold">Goals</h2>
              <ul className="mt-2 grid gap-2.5">
                {plan.goals.map((goal) => (
                  <li key={goal} className="flex gap-2.5 text-sm">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                    {goal}
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {plan.categories.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-muted px-2.5 py-0.5 text-xs"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Usage (react-router) ----------

// 1. Route:
<Route path="/study-plans/:id" element={<StudyPlanRoute />} />

// 2. "View Plan" button on the dashboard card:
<Button asChild className="w-full">
  <Link to={`/study-plans/${plan.id}`}>View Plan</Link>
</Button>

// 3. Route wrapper (swap the data calls for your own):
import { useParams } from "react-router-dom";

function StudyPlanRoute() {
  const { id } = useParams();
  const [plan, setPlan] = useState<StudyPlan | null>(null);

  useEffect(() => {
    fetchPlan(id!).then(setPlan);          // your data fetch
  }, [id]);

  if (!plan) return <p className="p-6">Loading...</p>;

  const toggle = (sessionId: string, completed: boolean) => {
    setPlan({
      ...plan,
      sessions: plan.sessions.map((s) =>
        s.id === sessionId ? { ...s, completed } : s
      ),
    });
    updateSession(plan.id, sessionId, completed); // persist it
  };

  return <StudyPlanPage plan={plan} onToggleSession={toggle} />;
}

*/
