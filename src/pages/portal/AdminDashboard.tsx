import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingRequestsTable } from "@/components/admin/BookingRequestsTable";
import { PurchaseRequestsTable } from "@/components/admin/PurchaseRequestsTable";
import { InquiriesTable } from "@/components/admin/InquiriesTable";
import { JobApplicationsTable } from "@/components/admin/JobApplicationsTable";
import { TestimonialsTable } from "@/components/admin/TestimonialsTable";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Users,
  Calendar as CalendarIcon,
  CheckSquare,
  TrendingUp,
  Shield,
  GraduationCap,
  Code,
  Headphones,
  LogOut,
  ShoppingCart,
  BookOpen,
  MessageSquare,
  Briefcase,
  Star,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalStaff: 0,
    activeProjects: 0,
    pendingTasks: 0,
    upcomingEvents: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({ 
        title: "👋 Signed Out Successfully",
        description: "You've been securely logged out. See you next time!"
      });
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const loadDashboardData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Load user's tasks
    const { data: tasksData } = await supabase
      .from("admin_tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("due_date", { ascending: true })
      .limit(5);

    if (tasksData) setTasks(tasksData);

    // Load user's events
    const { data: eventsData } = await supabase
      .from("admin_events")
      .select("*")
      .eq("user_id", user.id)
      .gte("start_time", new Date().toISOString())
      .order("start_time", { ascending: true })
      .limit(5);

    if (eventsData) setEvents(eventsData);

    // Count staff members from user_roles table
    const { count: staffCount } = await supabase
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .in("role", ["staff", "trainer", "developer", "analyst", "healthcare", "caregiver"]);

    // Count active jobs as projects
    const { count: projectsCount } = await supabase
      .from("jobs")
      .select("*", { count: "exact", head: true })
      .in("status", ["Pending", "In Progress"]);

    setStats({
      totalStaff: staffCount || 0,
      activeProjects: projectsCount || 0,
      pendingTasks: tasksData?.length || 0,
      upcomingEvents: eventsData?.length || 0,
    });
  };

  const statCards = [
    { label: "Total Staff", value: stats.totalStaff, icon: Users, color: "text-blue-600" },
    { label: "Active Projects", value: stats.activeProjects, icon: TrendingUp, color: "text-green-600" },
    { label: "Pending Tasks", value: stats.pendingTasks, icon: CheckSquare, color: "text-amber-600" },
    { label: "Upcoming Events", value: stats.upcomingEvents, icon: CalendarIcon, color: "text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
                <h1 className="text-2xl font-bold">Administrator Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage team and operations</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => {
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

        {/* Booking & Purchase Requests */}
        <Card className="p-6 mb-8">
          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="bookings" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Bookings
              </TabsTrigger>
              <TabsTrigger value="purchases" className="gap-2">
                <ShoppingCart className="w-4 h-4" />
                Purchases
              </TabsTrigger>
              <TabsTrigger value="inquiries" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Inquiries
              </TabsTrigger>
              <TabsTrigger value="applications" className="gap-2">
                <Briefcase className="w-4 h-4" />
                Applications
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="gap-2">
                <Star className="w-4 h-4" />
                Testimonials
              </TabsTrigger>
            </TabsList>
            <TabsContent value="bookings">
              <BookingRequestsTable />
            </TabsContent>
            <TabsContent value="purchases">
              <PurchaseRequestsTable />
            </TabsContent>
            <TabsContent value="inquiries">
              <InquiriesTable />
            </TabsContent>
            <TabsContent value="applications">
              <JobApplicationsTable />
            </TabsContent>
            <TabsContent value="testimonials">
              <TestimonialsTable />
            </TabsContent>
          </Tabs>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Tasks & Events */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tasks */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">My Tasks</h2>
                <Button size="sm">Add Task</Button>
              </div>
              <div className="space-y-3">
                {tasks.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No tasks yet</p>
                ) : (
                  tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'}`} />
                        <div>
                          <p className="font-medium">{task.title}</p>
                          {task.description && <p className="text-sm text-muted-foreground">{task.description}</p>}
                        </div>
                      </div>
                      <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
                        {task.status}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Upcoming Events */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Upcoming Events</h2>
                <Button size="sm">Add Event</Button>
              </div>
              <div className="space-y-3">
                {events.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No upcoming events</p>
                ) : (
                  events.map((event) => (
                    <div key={event.id} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <CalendarIcon className="w-5 h-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.start_time).toLocaleString()}
                        </p>
                        {event.location && <p className="text-sm text-muted-foreground mt-1">{event.location}</p>}
                      </div>
                      <Badge>{event.event_type}</Badge>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Team Overview */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Team Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { role: "Analysts", count: 0, icon: Shield, color: "bg-blue-100 text-blue-600" },
                  { role: "Trainers", count: 0, icon: GraduationCap, color: "bg-green-100 text-green-600" },
                  { role: "Developers", count: 0, icon: Code, color: "bg-purple-100 text-purple-600" },
                  { role: "Support", count: 1, icon: Headphones, color: "bg-amber-100 text-amber-600" },
                ].map((team) => {
                  const Icon = team.icon;
                  return (
                    <div key={team.role} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                      <div className={`w-10 h-10 ${team.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">{team.count}</p>
                        <p className="text-sm text-muted-foreground">{team.role}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Right Column - Calendar */}
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

            <Card className="p-6">
              <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Staff
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Reports
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
