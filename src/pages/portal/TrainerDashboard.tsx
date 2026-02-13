import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  GraduationCap,
  Users,
  Calendar as CalendarIcon,
  Award,
  LogOut,
} from "lucide-react";

type DashboardTask = Pick<Database["public"]["Tables"]["tasks"]["Row"], "id" | "title" | "description" | "status">;
type DashboardEvent = {
  id: string;
  title: string;
  start_time: string;
  event_type: string | null;
};

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : "An unexpected error occurred";

function TrainerDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState<DashboardTask[]>([]);
  const [events, setEvents] = useState<DashboardEvent[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({ 
        title: "👋 Signed Out Successfully",
        description: "You've been securely logged out. See you next time!"
      });
      navigate("/auth");
    } catch (error: unknown) {
      toast({
        title: "Error signing out",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  const [stats, setStats] = useState({
    upcomingSessions: 0,
    totalStudents: 0,
    activeCourses: 0,
  });

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: tasksData } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("due_date", { ascending: true })
      .limit(10);

    if (tasksData) {
      setTasks(tasksData as DashboardTask[]);
    }

    const { data: eventsData } = await supabase
      .from("events")
      .select("*")
      .eq("user_id", user.id)
      .gte("start_time", new Date().toISOString())
      .order("start_time", { ascending: true })
      .limit(5);

    if (eventsData) {
      setEvents(eventsData as DashboardEvent[]);
    }

    // Count upcoming training sessions
    const { count: sessionsCount } = await supabase
      .from("zoom_classes")
      .select("*", { count: "exact", head: true })
      .gte("scheduled_date", new Date().toISOString())
      .eq("instructor_id", user.id);

    // Count total students (zoom enrollments)
    const { count: studentsCount } = await supabase
      .from("zoom_class_enrollments")
      .select("*", { count: "exact", head: true });

    // Count active courses
    const { count: coursesCount } = await supabase
      .from("courses")
      .select("*", { count: "exact", head: true })
      .eq("active", true);

    setStats({
      upcomingSessions: sessionsCount || 0,
      totalStudents: studentsCount || 0,
      activeCourses: coursesCount || 0,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link to="/portal">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Trainer Dashboard</h1>
                <p className="text-sm text-muted-foreground">Training sessions and student management</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Upcoming Sessions", value: stats.upcomingSessions, icon: CalendarIcon, color: "text-blue-600" },
            { label: "Total Students", value: stats.totalStudents, icon: Users, color: "text-green-600" },
            { label: "Active Courses", value: stats.activeCourses, icon: GraduationCap, color: "text-purple-600" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} bg-primary/10 rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-bold">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Upcoming Training Sessions</h2>
              <div className="space-y-3">
                {events.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No upcoming sessions</p>
                ) : (
                  events.map((event) => (
                    <div key={event.id} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.start_time).toLocaleString()}
                        </p>
                      </div>
                      <Badge>{event.event_type}</Badge>
                    </div>
                  ))
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">My Tasks</h2>
              <div className="space-y-3">
                {tasks.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No tasks yet</p>
                ) : (
                  tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{task.title}</p>
                        {task.description && <p className="text-sm text-muted-foreground">{task.description}</p>}
                      </div>
                      <Badge>{task.status}</Badge>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Calendar</h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrainerDashboard;
