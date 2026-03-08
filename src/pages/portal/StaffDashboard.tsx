import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { PortalLoadingSkeleton } from "@/components/portal/PortalLoadingSkeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Users,
  MessageSquare,
  CalendarDays,
  Headphones,
  LogOut,
  ClipboardCheck,
  Activity,
  Search,
} from "lucide-react";

interface DashboardTask {
  id: string;
  title: string;
  description: string | null;
  status: string | null;
}

interface Ticket {
  id: string;
  subject: string;
  status: string;
  priority: string | null;
  created_at: string;
}

function StaffDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState<DashboardTask[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [stats, setStats] = useState({
    activeClients: 0,
    openTickets: 0,
    unreadMessages: 0,
    todaysMeetings: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const [
      { data: tasksData },
      { data: ticketsData },
      { count: clientsCount },
      { count: ticketsCount },
      { count: messagesCount },
    ] = await Promise.all([
      supabase.from("tasks").select("id, title, description, status").eq("user_id", user.id).order("due_date", { ascending: true }).limit(8),
      supabase.from("tickets").select("id, subject, status, priority, created_at").eq("status", "open").order("created_at", { ascending: false }).limit(6),
      supabase.from("clients").select("*", { count: "exact", head: true }),
      supabase.from("tickets").select("*", { count: "exact", head: true }).eq("status", "open"),
      supabase.from("internal_messages").select("*", { count: "exact", head: true }).eq("recipient_id", user.id).eq("is_read", false),
    ]);

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const { count: meetingsCount } = await supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .gte("scheduled_start", startOfToday.toISOString())
      .lte("scheduled_start", endOfToday.toISOString())
      .eq("worker_id", user.id);

    if (tasksData) setTasks(tasksData);
    if (ticketsData) setTickets(ticketsData);
    setStats({
      activeClients: clientsCount || 0,
      openTickets: ticketsCount || 0,
      unreadMessages: messagesCount || 0,
      todaysMeetings: meetingsCount || 0,
    });
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const priorityColor = (p: string | null) => {
    switch (p) {
      case "high": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  if (loading) return <PortalLoadingSkeleton />;

  return (
    <div className="min-h-screen bg-[#0B1120] text-gray-100">
      <header className="border-b border-gray-800/60 bg-[#111827]/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/5">
                <Link to="/portal"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">Staff & Support</h1>
                <p className="text-sm text-gray-500">Tasks • Tickets • Clients</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-gray-400 hover:text-white hover:bg-white/5">
              <LogOut className="w-4 h-4 mr-2" />Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Active Clients", value: stats.activeClients, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
            { label: "Open Tickets", value: stats.openTickets, icon: Headphones, color: "text-amber-400", bg: "bg-amber-500/10" },
            { label: "Messages", value: stats.unreadMessages, icon: MessageSquare, color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { label: "Today's Meetings", value: stats.todaysMeetings, icon: CalendarDays, color: "text-purple-400", bg: "bg-purple-500/10" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label} className="bg-[#1F2937] border-gray-800/50 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <span className="text-2xl font-bold text-white">{s.value}</span>
                </div>
                <p className="text-xs text-gray-500">{s.label}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* My Tasks */}
            <Card className="bg-[#1F2937] border-gray-800/50 p-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-5">
                <ClipboardCheck className="w-5 h-5 text-blue-400" />
                My Tasks
              </h2>
              <div className="space-y-3">
                {tasks.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No tasks assigned</p>
                ) : (
                  tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-[#111827] rounded-lg border border-gray-800/40">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-white text-sm">{task.title}</p>
                        {task.description && <p className="text-xs text-gray-500 mt-0.5 truncate">{task.description}</p>}
                      </div>
                      <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-[10px]">{task.status}</Badge>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Support Tickets */}
            <Card className="bg-[#1F2937] border-gray-800/50 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-amber-400" />
                  Open Tickets
                </h2>
                <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Link to="/admin/support/tickets">View All</Link>
                </Button>
              </div>
              <div className="space-y-3">
                {tickets.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No open tickets</p>
                ) : (
                  tickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-3 bg-[#111827] rounded-lg border border-gray-800/40">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-white text-sm truncate">{ticket.subject}</p>
                        <p className="text-[10px] text-gray-600">{new Date(ticket.created_at).toLocaleDateString()}</p>
                      </div>
                      <Badge className={`text-[10px] ${priorityColor(ticket.priority)}`}>{ticket.priority || "normal"}</Badge>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-[#1F2937] border-gray-800/50 p-5">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-400" />
                Quick Access
              </h2>
              <div className="space-y-2">
                {[
                  { label: "Client Directory", path: "/admin/clients/businesses", icon: Users },
                  { label: "Support Tickets", path: "/admin/support/tickets", icon: Headphones },
                  { label: "Messages", path: "/portal/messages", icon: MessageSquare },
                  { label: "Activity Log", path: "/admin/activity", icon: Activity },
                ].map((link) => {
                  const Icon = link.icon;
                  return (
                    <Button key={link.path} asChild variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/5">
                      <Link to={link.path}><Icon className="w-4 h-4 mr-2" />{link.label}</Link>
                    </Button>
                  );
                })}
              </div>
            </Card>

            <Card className="bg-[#1F2937] border-gray-800/50 p-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <CalendarDays className="w-5 h-5 text-purple-400" />
                Calendar
              </h2>
              <div className="[&_.rdp]:bg-[#111827] [&_.rdp]:rounded-lg [&_.rdp]:border [&_.rdp]:border-gray-800/50 [&_.rdp]:p-3 [&_.rdp-day]:text-gray-300 [&_.rdp-day:hover]:bg-purple-500/20 [&_.rdp-day_button:hover]:bg-purple-500/20 [&_.rdp-day_button]:text-gray-300 [&_.rdp-day_button.rdp-day_selected]:bg-gradient-to-r [&_.rdp-day_button.rdp-day_selected]:from-purple-500 [&_.rdp-day_button.rdp-day_selected]:to-pink-600 [&_.rdp-day_button.rdp-day_selected]:text-white [&_.rdp-caption]:text-white [&_.rdp-head_cell]:text-gray-500 [&_.rdp-nav_button]:text-gray-400 [&_.rdp-nav_button:hover]:bg-purple-500/20">
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md" />
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StaffDashboard;
