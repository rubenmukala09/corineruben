import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Briefcase,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { ClientsTab } from "@/components/admin/ClientsTab";
import { PartnersTab } from "@/components/admin/PartnersTab";
import { OrdersTab } from "@/components/admin/OrdersTab";
import { RevenueAnalytics } from "@/components/admin/RevenueAnalytics";

const AdminDashboardNew = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { isAdminOrStaff, loading: roleLoading } = useUserRole();

  // Redirect if not admin or staff
  useEffect(() => {
    if (!roleLoading && !isAdminOrStaff) {
      navigate("/enhanced-auth");
    }
  }, [isAdminOrStaff, roleLoading, navigate]);

  // Fetch KPIs
  const { data: pendingJobs } = useQuery({
    queryKey: ["pendingJobs"],
    queryFn: async () => {
      const { count } = await supabase
        .from("jobs")
        .select("*", { count: "exact", head: true })
        .eq("status", "Pending");
      return count || 0;
    },
  });

  const { data: activeJobsToday } = useQuery({
    queryKey: ["activeJobsToday"],
    queryFn: async () => {
      const today = new Date().toISOString().split("T")[0];
      const { count } = await supabase
        .from("jobs")
        .select("*", { count: "exact", head: true })
        .in("status", ["Assigned", "In-Progress"])
        .gte("start_at", `${today}T00:00:00`)
        .lte("start_at", `${today}T23:59:59`);
      return count || 0;
    },
  });

  const { data: availableWorkers } = useQuery({
    queryKey: ["availableWorkers"],
    queryFn: async () => {
      const { data } = await supabase
        .from("workers")
        .select("current_status", { count: "exact" })
        .eq("current_status", "available");
      return { available: data?.length || 0 };
    },
  });

  const { data: totalClients } = useQuery({
    queryKey: ["totalClients"],
    queryFn: async () => {
      const { count } = await supabase
        .from("clients")
        .select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const handleLogout = async () => {
    await signOut();
    navigate("/enhanced-auth");
  };

  // Show loading while checking role
  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authorized, don't render (redirect handles this)
  if (!isAdminOrStaff) {
    return null;
  }

  const kpiCards = [
    {
      title: "Pending Requests",
      value: pendingJobs || 0,
      icon: AlertCircle,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Active Jobs Today",
      value: activeJobsToday || 0,
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Available Workers",
      value: `${availableWorkers?.available || 0}`,
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Total Clients",
      value: totalClients || 0,
      icon: CheckCircle2,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  const quickActions = [
    { label: "Assign New Job", icon: Plus, action: () => navigate("/admin/jobs/new") },
    { label: "Message Workers", icon: MessageSquare, action: () => setActiveTab("messages") },
    { label: "View Reports", icon: BarChart3, action: () => setActiveTab("reports") },
    { label: "Add New Client", icon: Plus, action: () => setActiveTab("clients") },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text-primary">Admin Portal</h1>
                <p className="text-sm text-muted-foreground">InVision Network Management</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiCards.map((kpi, idx) => (
            <Card key={idx} className="rounded-2xl shadow-subtle hover:shadow-strong transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{kpi.title}</p>
                    <p className="text-3xl font-bold">{kpi.value}</p>
                  </div>
                  <div className={`${kpi.bgColor} p-3 rounded-xl`}>
                    <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card/50 p-1 rounded-2xl shadow-subtle">
            <TabsTrigger value="overview" className="rounded-xl">Overview</TabsTrigger>
            <TabsTrigger value="partners" className="rounded-xl">Partners</TabsTrigger>
            <TabsTrigger value="orders" className="rounded-xl">Orders</TabsTrigger>
            <TabsTrigger value="revenue" className="rounded-xl">Revenue</TabsTrigger>
            <TabsTrigger value="clients" className="rounded-xl">Clients</TabsTrigger>
            <TabsTrigger value="workers" className="rounded-xl">Workers</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-xl">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <Card className="rounded-2xl shadow-subtle">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action, idx) => (
                    <Button
                      key={idx}
                      onClick={action.action}
                      className="h-24 bg-gradient-to-r from-primary to-accent hover:shadow-glow-purple transition-all duration-300 flex flex-col gap-2"
                    >
                      <action.icon className="w-6 h-6" />
                      {action.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="rounded-2xl shadow-subtle">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="font-medium">New job created: Client Training Session</p>
                      <p className="text-sm text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <p className="font-medium">Worker assigned to job #1234</p>
                      <p className="text-sm text-muted-foreground">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <div className="flex-1">
                      <p className="font-medium">New client added: Acme Corporation</p>
                      <p className="text-sm text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="partners">
            <Card className="rounded-2xl shadow-subtle">
              <CardHeader>
                <CardTitle>Partner Management</CardTitle>
              </CardHeader>
              <CardContent>
                <PartnersTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="rounded-2xl shadow-subtle">
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <OrdersTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue">
            <Card className="rounded-2xl shadow-subtle">
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <RevenueAnalytics />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients">
            <Card className="rounded-2xl shadow-subtle">
              <CardHeader>
                <CardTitle>Clients Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ClientsTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workers">
            <Card className="rounded-2xl shadow-subtle">
              <CardHeader>
                <CardTitle>Workers Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Workers management interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="rounded-2xl shadow-subtle">
              <CardHeader>
                <CardTitle>Settings & Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">System Settings</h3>
                    <p className="text-sm text-muted-foreground">Configure system-wide settings and preferences</p>
                  </div>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Default Commission Rate</p>
                        <p className="text-sm text-muted-foreground">Set default commission for new partners</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Manage email notification settings</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Payment Methods</p>
                        <p className="text-sm text-muted-foreground">Configure available payment methods</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboardNew;