import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, Users, Eye, MousePointerClick, Clock, Download, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays } from "date-fns";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

export default function Analytics() {
  const [dateRange, setDateRange] = useState(7);

  const startDate = subDays(new Date(), dateRange).toISOString();

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

  const totalPageViews = pageViews?.length || 0;
  const totalSessions = sessions?.length || 0;
  const totalEvents = events?.length || 0;
  const totalConversions = conversions?.length || 0;
  const conversionRate = totalSessions > 0 ? ((totalConversions / totalSessions) * 100).toFixed(2) : "0.00";
  const avgSessionDuration = sessions && sessions.length > 0
    ? Math.round(sessions.reduce((acc, s) => acc + (s.duration_seconds || 0), 0) / sessions.length)
    : 0;

  const topPages = pageViews?.reduce((acc: any, pv) => {
    const url = pv.page_url || "Unknown";
    acc[url] = (acc[url] || 0) + 1;
    return acc;
  }, {});

  const topPagesArray = Object.entries(topPages || {})
    .map(([url, count]) => ({ url, count }))
    .sort((a: any, b: any) => b.count - a.count)
    .slice(0, 10);

  const pageViewsByDay = pageViews?.reduce((acc: any, pv) => {
    const day = format(new Date(pv.created_at), "MMM d");
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(pageViewsByDay || {})
    .map(([date, views]) => ({ date, views }))
    .slice(-14);

  const conversionsByType = conversions?.reduce((acc: any, conv) => {
    const type = conv.conversion_type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const conversionChartData = Object.entries(conversionsByType || {})
    .map(([type, count]) => ({ type, count }));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F9FAFB]">Analytics Dashboard</h1>
          <p className="text-[#9CA3AF]">
            Track website performance, user behavior, and conversion metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange.toString()} onValueChange={(v) => setDateRange(Number(v))}>
            <SelectTrigger className="w-[140px] bg-[#1F2937] border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-gray-700">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#9CA3AF]">Total Page Views</CardTitle>
            <Eye className="h-4 w-4 text-[#06B6D4]" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-7 w-20 bg-gray-700" />
                <Skeleton className="h-3 w-24 bg-gray-700" />
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold text-[#F9FAFB]">{totalPageViews.toLocaleString()}</div>
                <p className="text-xs text-[#9CA3AF]">Last {dateRange} days</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#9CA3AF]">Total Sessions</CardTitle>
            <Users className="h-4 w-4 text-[#10B981]" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-7 w-20 bg-gray-700" />
                <Skeleton className="h-3 w-24 bg-gray-700" />
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold text-[#F9FAFB]">{totalSessions.toLocaleString()}</div>
                <p className="text-xs text-[#9CA3AF]">Unique visitors</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#9CA3AF]">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#8B5CF6]" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-7 w-16 bg-gray-700" />
                <Skeleton className="h-3 w-24 bg-gray-700" />
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold text-[#F9FAFB]">{conversionRate}%</div>
                <p className="text-xs text-[#9CA3AF]">{totalConversions} conversions</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#9CA3AF]">Avg Session Duration</CardTitle>
            <Clock className="h-4 w-4 text-[#F97316]" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-7 w-20 bg-gray-700" />
                <Skeleton className="h-3 w-24 bg-gray-700" />
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold text-[#F9FAFB]">{Math.floor(avgSessionDuration / 60)}m {avgSessionDuration % 60}s</div>
                <p className="text-xs text-[#9CA3AF]">Time on site</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-[#111827]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pages">Top Pages</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-[#F9FAFB]">Traffic Overview</CardTitle>
              <CardDescription className="text-[#9CA3AF]">Page views over the last {dateRange} days</CardDescription>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                    <Legend />
                    <Line type="monotone" dataKey="views" stroke="#06B6D4" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-[#9CA3AF]">
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
            <Card className="bg-[#111827] border-gray-800">
              <CardHeader>
                <CardTitle className="text-[#F9FAFB]">Real-Time Activity</CardTitle>
                <CardDescription className="text-[#9CA3AF]">Recent events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {events?.slice(0, 5).map((event) => (
                    <div key={event.id} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[#9CA3AF]">{event.event_name}</span>
                      <span className="text-xs text-[#6B7280] ml-auto">
                        {format(new Date(event.created_at), "h:mm a")}
                      </span>
                    </div>
                  ))}
                  {(!events || events.length === 0) && (
                    <p className="text-sm text-[#9CA3AF] text-center py-4">No recent activity</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#111827] border-gray-800">
              <CardHeader>
                <CardTitle className="text-[#F9FAFB]">Top Pages Today</CardTitle>
                <CardDescription className="text-[#9CA3AF]">Most visited pages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {topPagesArray.slice(0, 5).map((page: any, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-[#9CA3AF] truncate flex-1">{page.url}</span>
                      <span className="font-medium text-[#F9FAFB] ml-2">{page.count}</span>
                    </div>
                  ))}
                  {topPagesArray.length === 0 && (
                    <p className="text-sm text-[#9CA3AF] text-center py-4">No page data yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-[#F9FAFB]">Top Pages by Views</CardTitle>
              <CardDescription className="text-[#9CA3AF]">Most visited pages on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPagesArray.map((page: any, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-[#F9FAFB]">{page.url}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-[#9CA3AF]">{page.count} views</span>
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-[#06B6D4] h-2 rounded-full"
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
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-[#F9FAFB]">Recent Events</CardTitle>
              <CardDescription className="text-[#9CA3AF]">Latest user interactions tracked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {events?.slice(0, 20).map((event) => (
                  <div key={event.id} className="flex items-center justify-between py-2 border-b border-gray-700">
                    <div>
                      <p className="font-medium text-[#F9FAFB]">{event.event_name}</p>
                      <p className="text-sm text-[#9CA3AF]">{event.page_url}</p>
                    </div>
                    <span className="text-sm text-[#9CA3AF]">
                      {format(new Date(event.created_at), "MMM d, h:mm a")}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversions" className="space-y-4">
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-[#F9FAFB]">Conversions by Type</CardTitle>
              <CardDescription className="text-[#9CA3AF]">Breakdown of conversion events</CardDescription>
            </CardHeader>
            <CardContent>
              {conversionChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={conversionChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="type" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                    <Legend />
                    <Bar dataKey="count" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-[#9CA3AF]">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No conversions yet</p>
                    <p className="text-sm">Conversions will appear as users complete actions</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-[#F9FAFB]">Recent Conversions</CardTitle>
              <CardDescription className="text-[#9CA3AF]">Latest conversion events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversions?.slice(0, 10).map((conversion) => (
                  <div key={conversion.id} className="flex items-center justify-between border-b border-gray-700 pb-3">
                    <div>
                      <p className="font-medium text-[#F9FAFB]">{conversion.conversion_type}</p>
                      {conversion.conversion_value && (
                        <p className="text-sm text-[#10B981]">${conversion.conversion_value}</p>
                      )}
                    </div>
                    <span className="text-sm text-[#9CA3AF]">
                      {format(new Date(conversion.created_at), "MMM d, h:mm a")}
                    </span>
                  </div>
                ))}
                {(!conversions || conversions.length === 0) && (
                  <p className="text-center text-[#9CA3AF] py-4">No conversions recorded yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
