import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminTopBar } from "@/components/AdminTopBar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, Users, Eye, MousePointerClick, Clock, Download, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays } from "date-fns";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

export default function Analytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState(7); // Last 7 days

  const startDate = subDays(new Date(), dateRange).toISOString();

  // Fetch analytics data
  const { data: events, isLoading: eventsLoading } = useQuery({
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

  const isLoading = eventsLoading;

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

  // Prepare chart data
  const pageViewsByDay = pageViews?.reduce((acc: any, pv) => {
    const day = format(new Date(pv.created_at), "MMM d");
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(pageViewsByDay || {})
    .map(([date, views]) => ({ date, views }))
    .slice(-14); // Last 14 days

  const conversionsByType = conversions?.reduce((acc: any, conv) => {
    const type = conv.conversion_type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const conversionChartData = Object.entries(conversionsByType || {})
    .map(([type, count]) => ({ type, count }));

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
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Track website performance, user behavior, and conversion metrics
              </p>
            </div>
            <div className="flex gap-2">
              <Select value={dateRange.toString()} onValueChange={(v) => setDateRange(Number(v))}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
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
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-7 w-20" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{totalPageViews.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Last {dateRange} days</p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-7 w-20" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{totalSessions.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Unique visitors</p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-7 w-16" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{conversionRate}%</div>
                    <p className="text-xs text-muted-foreground">{totalConversions} conversions</p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Session Duration</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-7 w-20" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{Math.floor(avgSessionDuration / 60)}m {avgSessionDuration % 60}s</div>
                    <p className="text-xs text-muted-foreground">Time on site</p>
                  </>
                )}
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
                  <CardDescription>Page views over the last {dateRange} days</CardDescription>
                </CardHeader>
                <CardContent>
                  {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                      <div className="text-center">
                        <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No traffic data yet</p>
                        <p className="text-sm">Data will appear as users visit your site</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Real-Time Activity</CardTitle>
                    <CardDescription>Recent events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {events?.slice(0, 5).map((event) => (
                        <div key={event.id} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-muted-foreground">{event.event_name}</span>
                          <span className="text-xs text-muted-foreground ml-auto">
                            {format(new Date(event.created_at), "h:mm a")}
                          </span>
                        </div>
                      ))}
                      {(!events || events.length === 0) && (
                        <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Pages Today</CardTitle>
                    <CardDescription>Most visited pages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {topPagesArray.slice(0, 5).map((page: any, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground truncate flex-1">{page.url}</span>
                          <span className="font-medium ml-2">{page.count}</span>
                        </div>
                      ))}
                      {topPagesArray.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">No page data yet</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
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
                  <CardTitle>Conversions by Type</CardTitle>
                  <CardDescription>Breakdown of conversion events</CardDescription>
                </CardHeader>
                <CardContent>
                  {conversionChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={conversionChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                      <div className="text-center">
                        <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No conversions yet</p>
                        <p className="text-sm">Conversions will appear as users complete actions</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Conversions</CardTitle>
                  <CardDescription>Latest conversion events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conversions?.slice(0, 10).map((conversion) => (
                      <div key={conversion.id} className="flex items-center justify-between border-b pb-3">
                        <div>
                          <p className="font-medium">{conversion.conversion_type}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(conversion.created_at), "MMM d, yyyy h:mm a")}
                          </p>
                        </div>
                        {conversion.conversion_value && (
                          <span className="font-bold text-green-600">${conversion.conversion_value}</span>
                        )}
                      </div>
                    ))}
                    {(!conversions || conversions.length === 0) && (
                      <p className="text-sm text-muted-foreground text-center py-8">No conversions yet</p>
                    )}
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