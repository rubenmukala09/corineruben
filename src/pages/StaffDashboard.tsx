import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Building2, Users, TrendingUp, Calendar, Ticket, FileText, GraduationCap, Briefcase } from "lucide-react";

interface CRMStats {
  companies: number;
  contacts: number;
  deals: number;
  events: number;
  tickets: number;
  bookings: number;
  courses: number;
  invoices: number;
}

const StaffDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<CRMStats>({
    companies: 0,
    contacts: 0,
    deals: 0,
    events: 0,
    tickets: 0,
    bookings: 0,
    courses: 0,
    invoices: 0,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    // Check if user has staff or admin role
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .in("role", ["admin", "staff"])
      .maybeSingle();

    if (!roleData) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      });
      navigate("/");
      return;
    }
    
    await loadStats();
    setLoading(false);
  };

  const loadStats = async () => {
    try {
      const [
        companiesRes,
        contactsRes,
        dealsRes,
        eventsRes,
        ticketsRes,
        bookingsRes,
        coursesRes,
        invoicesRes,
      ] = await Promise.all([
        supabase.from("companies").select("*", { count: "exact", head: true }),
        supabase.from("contacts").select("*", { count: "exact", head: true }),
        supabase.from("deals").select("*", { count: "exact", head: true }),
        supabase.from("events").select("*", { count: "exact", head: true }),
        supabase.from("tickets").select("*", { count: "exact", head: true }),
        supabase.from("bookings").select("*", { count: "exact", head: true }),
        supabase.from("courses").select("*", { count: "exact", head: true }),
        supabase.from("invoices").select("*", { count: "exact", head: true }),
      ]);

      setStats({
        companies: companiesRes.count || 0,
        contacts: contactsRes.count || 0,
        deals: dealsRes.count || 0,
        events: eventsRes.count || 0,
        tickets: ticketsRes.count || 0,
        bookings: bookingsRes.count || 0,
        courses: coursesRes.count || 0,
        invoices: invoicesRes.count || 0,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard statistics",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text-primary">Staff Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome to the CRM Dashboard</h2>
          <p className="text-muted-foreground">Manage your business relationships and operations</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Companies</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.companies}</div>
              <p className="text-xs text-muted-foreground mt-1">Active companies</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Contacts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.contacts}</div>
              <p className="text-xs text-muted-foreground mt-1">Total contacts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.deals}</div>
              <p className="text-xs text-muted-foreground mt-1">In pipeline</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.tickets}</div>
              <p className="text-xs text-muted-foreground mt-1">Support requests</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Calendar className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Events & Activities</CardTitle>
              <CardDescription>Manage meetings and tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.events}</p>
              <p className="text-sm text-muted-foreground">Scheduled events</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Briefcase className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Bookings</CardTitle>
              <CardDescription>Service appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.bookings}</p>
              <p className="text-sm text-muted-foreground">Active bookings</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <GraduationCap className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Courses</CardTitle>
              <CardDescription>Training programs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.courses}</p>
              <p className="text-sm text-muted-foreground">Available courses</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <FileText className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Invoices</CardTitle>
              <CardDescription>Financial documents</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.invoices}</p>
              <p className="text-sm text-muted-foreground">Total invoices</p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common CRM tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Add New Contact
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Building2 className="mr-2 h-4 w-4" />
                Create Company
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                New Deal
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
