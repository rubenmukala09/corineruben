import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminTopBar } from "@/components/AdminTopBar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { BarChart3, TrendingUp, Users, Eye, MousePointerClick, Clock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays } from "date-fns";

export default function Analytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState(7); // Last 7 days

  const startDate = subDays(new Date(), dateRange).toISOString();

  // Fetch analytics data
  const { data: events } = useQuery({
    queryKey: ["analytics-events", startDate],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("analytics_events")
        .select("*")
        .gte("created_at", startDate)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const { data: pageViews } = useQuery({
    queryKey: ["page-views", startDate],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_views")
        .select("*")
        .gte("created_at", startDate);
      if (error) throw error;
      return data || [];
    },
  });

  const { data: sessions } = useQuery({
    queryKey: ["user-sessions", startDate],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_sessions")
        .select("*")
        .gte("started_at", startDate);
      if (error) throw error;
      return data || [];
    },
  });

  const { data: conversions } = useQuery({
    queryKey: ["conversions", startDate],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("conversion_events")
        .select("*")
        .gte("created_at", startDate);
      if (error) throw error;
      return data || [];
    },
  });

  // Calculate metrics
  const totalPageViews = pageViews?.length || 0;
  const totalSessions = sessions?.length || 0;
  const totalEvents = events?.length || 0;
  const totalConversions = conversions?.length || 0;
  const conversionRate = totalSessions > 0 ? ((totalConversions / totalSessions) * 100).toFixed(2) : "0.00";
  const avgSessionDuration = sessions && sessions.length > 0
    ? Math.round(sessions.reduce((acc, s) => acc + (s.duration_seconds || 0), 0) / sessions.length)
    : 0;

  // Get top pages
  const topPages = pageViews?.reduce((acc: any, pv) => {
    const url = pv.page_url || "Unknown";
    acc[url] = (acc[url] || 0) + 1;
    return acc;
  }, {});

  const topPagesArray = Object.entries(topPages || {})
    .map(([url, count]) => ({ url, count }))
    .sort((a: any, b: any) => b.count - a.count)
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-background">
      <AdminTopBar
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex">
        <AdminSidebar
          isOpen={sidebarOpen}
          isMobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />
        
        <main className="flex-1 p-6 lg:ml-64">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Track website performance, user behavior, and conversion metrics
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setDateRange(7)}>7 Days</Button>
              <Button variant="outline" onClick={() => setDateRange(30)}>30 Days</Button>
              <Button variant="outline" onClick={() => setDateRange(90)}>90 Days</Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPageViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Last {dateRange} days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSessions.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Unique visitors</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{conversionRate}%</div>
                <p className="text-xs text-muted-foreground">{totalConversions} conversions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Session Duration</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.floor(avgSessionDuration / 60)}m {avgSessionDuration % 60}s</div>
                <p className="text-xs text-muted-foreground">Time on site</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different views */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="pages">Top Pages</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="conversions">Conversions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Overview</CardTitle>
                  <CardDescription>Website traffic trends over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                    Chart visualization would go here (Recharts integration)
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pages" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Pages by Views</CardTitle>
                  <CardDescription>Most visited pages on your website</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPagesArray.map((page: any, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{page.url}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">{page.count} views</span>
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${(page.count / totalPageViews) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Events</CardTitle>
                  <CardDescription>Latest user interactions tracked</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {events?.slice(0, 20).map((event) => (
                      <div key={event.id} className="flex items-center justify-between py-2 border-b">
                        <div>
                          <p className="font-medium">{event.event_name}</p>
                          <p className="text-sm text-muted-foreground">{event.page_url}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(event.created_at), "MMM d, h:mm a")}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conversions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                  <CardDescription>Track user journey from visit to conversion</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conversions?.map((conversion) => (
                      <div key={conversion.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{conversion.conversion_type}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(conversion.created_at), "MMM d, yyyy h:mm a")}
                          </p>
                        </div>
                        {conversion.conversion_value && (
                          <span className="font-bold">${conversion.conversion_value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}