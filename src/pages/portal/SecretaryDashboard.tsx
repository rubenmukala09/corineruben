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
  ClipboardList,
  LogOut,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  UserCheck,
  Mail,
} from "lucide-react";

interface BookingRequest {
  id: string;
  full_name: string;
  email: string;
  service_name: string;
  status: string;
  created_at: string;
  request_number: string;
}

interface ClientMessage {
  id: string;
  subject: string | null;
  content: string;
  is_read: boolean | null;
  created_at: string | null;
  is_from_client: boolean | null;
}

function SecretaryDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [messages, setMessages] = useState<ClientMessage[]>([]);
  const [stats, setStats] = useState({
    totalClients: 0,
    pendingBookings: 0,
    unreadMessages: 0,
    todayAppointments: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const [
      { data: bookingsData },
      { data: messagesData },
      { count: clientsCount },
      { count: pendingCount },
      { count: unreadCount },
    ] = await Promise.all([
      supabase
        .from("booking_requests")
        .select("id, full_name, email, service_name, status, created_at, request_number")
        .order("created_at", { ascending: false })
        .limit(10),
      supabase
        .from("client_messages")
        .select("id, subject, content, is_read, created_at, is_from_client")
        .eq("is_read", false)
        .order("created_at", { ascending: false })
        .limit(8),
      supabase.from("clients").select("*", { count: "exact", head: true }),
      supabase.from("booking_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
      supabase.from("client_messages").select("*", { count: "exact", head: true }).eq("is_read", false),
    ]);

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const { count: apptCount } = await supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .gte("scheduled_start", startOfToday.toISOString())
      .lte("scheduled_start", endOfToday.toISOString());

    if (bookingsData) setBookings(bookingsData);
    if (messagesData) setMessages(messagesData);
    setStats({
      totalClients: clientsCount || 0,
      pendingBookings: pendingCount || 0,
      unreadMessages: unreadCount || 0,
      todayAppointments: apptCount || 0,
    });
    setLoading(false);
  };

  const handleBookingAction = async (id: string, action: "confirmed" | "denied") => {
    const { error } = await supabase
      .from("booking_requests")
      .update({ status: action })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: action === "confirmed" ? "✅ Booking Confirmed" : "❌ Booking Denied" });
      loadData();
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "confirmed": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "denied": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  if (loading) return <PortalLoadingSkeleton />;

  return (
    <div className="min-h-screen bg-[#0B1120] text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800/60 bg-[#111827]/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/5">
                <Link to="/portal"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">Office Manager</h1>
                <p className="text-sm text-gray-500">Bookings • Clients • Appointments</p>
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
            { label: "Total Clients", value: stats.totalClients, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
            { label: "Pending Bookings", value: stats.pendingBookings, icon: ClipboardList, color: "text-amber-400", bg: "bg-amber-500/10" },
            { label: "Unread Messages", value: stats.unreadMessages, icon: MessageSquare, color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { label: "Today's Appointments", value: stats.todayAppointments, icon: CalendarDays, color: "text-purple-400", bg: "bg-purple-500/10" },
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
          {/* Bookings Queue */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-[#1F2937] border-gray-800/50 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-amber-400" />
                  Booking Requests
                </h2>
                <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Link to="/admin/bookings">View All</Link>
                </Button>
              </div>
              <div className="space-y-3">
                {bookings.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No booking requests</p>
                ) : (
                  bookings.map((b) => (
                    <div key={b.id} className="flex items-center justify-between p-3 bg-[#111827] rounded-lg border border-gray-800/40">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-white text-sm truncate">{b.full_name}</p>
                          <Badge className={`text-[10px] ${statusColor(b.status)}`}>{b.status}</Badge>
                        </div>
                        <p className="text-xs text-gray-500 truncate">{b.service_name} • {b.request_number}</p>
                      </div>
                      {b.status === "pending" && (
                        <div className="flex gap-1 ml-2">
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-emerald-400 hover:bg-emerald-500/10"
                            onClick={() => handleBookingAction(b.id, "confirmed")}>
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-400 hover:bg-red-500/10"
                            onClick={() => handleBookingAction(b.id, "denied")}>
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Unread Messages */}
            <Card className="bg-[#1F2937] border-gray-800/50 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  Unread Messages
                </h2>
                <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Link to="/portal/messages">View All</Link>
                </Button>
              </div>
              <div className="space-y-3">
                {messages.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">All caught up!</p>
                ) : (
                  messages.map((m) => (
                    <div key={m.id} className="p-3 bg-[#111827] rounded-lg border border-gray-800/40">
                      <p className="font-medium text-white text-sm">{m.subject || "No Subject"}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{m.content}</p>
                      <p className="text-[10px] text-gray-600 mt-1">
                        {m.created_at ? new Date(m.created_at).toLocaleString() : ""}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <Card className="bg-[#1F2937] border-gray-800/50 p-5">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-400" />
                Quick Access
              </h2>
              <div className="space-y-2">
                {[
                  { label: "Business Clients", path: "/admin/clients/businesses", icon: Building2 },
                  { label: "Individual Clients", path: "/admin/clients/individuals", icon: UserCheck },
                  { label: "Service Inquiries", path: "/admin/service-inquiries", icon: ClipboardList },
                  { label: "Appointments", path: "/admin/bookings", icon: CalendarDays },
                ].map((link) => {
                  const Icon = link.icon;
                  return (
                    <Button key={link.path} asChild variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/5">
                      <Link to={link.path}>
                        <Icon className="w-4 h-4 mr-2" />{link.label}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </Card>

            {/* Calendar */}
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

export default SecretaryDashboard;
