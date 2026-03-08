import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, BookOpen, Activity, Clock, TrendingUp, CheckCircle } from "lucide-react";

export default function UserAnalytics() {
  const { user } = useAuth();

  const { data: stats } = useQuery({
    queryKey: ["user-analytics", user?.id],
    queryFn: async () => {
      const [scamChecks, enrollments, tickets, activityLog] = await Promise.all([
        supabase.from("analytics_events").select("id", { count: "exact", head: true }).eq("user_id", user!.id).eq("event_name", "scam_check"),
        supabase.from("enrollments").select("*").eq("user_id", user!.id),
        supabase.from("support_tickets").select("id, status", { count: "exact" }).eq("user_id", user!.id),
        supabase.from("activity_log").select("*").eq("user_id", user!.id).order("created_at", { ascending: false }).limit(10),
      ]);

      const completedCourses = enrollments.data?.filter((e: any) => e.status === "completed").length || 0;
      const totalCourses = enrollments.data?.length || 0;
      const avgProgress = totalCourses > 0 ? Math.round(enrollments.data!.reduce((sum: number, e: any) => sum + (e.progress_percentage || 0), 0) / totalCourses) : 0;

      // Simple security score based on activity
      const securityScore = Math.min(100, 50 + (scamChecks.count || 0) * 5 + completedCourses * 10);

      return {
        scamChecks: scamChecks.count || 0,
        completedCourses,
        totalCourses,
        avgProgress,
        securityScore,
        totalTickets: tickets.count || 0,
        recentActivity: activityLog.data || [],
      };
    },
    enabled: !!user,
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <p className="text-muted-foreground">Your personal activity and security overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <Shield className={`h-8 w-8 mx-auto mb-2 ${getScoreColor(stats?.securityScore || 0)}`} />
            <p className={`text-3xl font-bold ${getScoreColor(stats?.securityScore || 0)}`}>{stats?.securityScore || 0}</p>
            <p className="text-xs text-muted-foreground">Security Score</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Activity className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold">{stats?.scamChecks || 0}</p>
            <p className="text-xs text-muted-foreground">Scam Checks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold">{stats?.completedCourses || 0}/{stats?.totalCourses || 0}</p>
            <p className="text-xs text-muted-foreground">Courses Done</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold">{stats?.avgProgress || 0}%</p>
            <p className="text-xs text-muted-foreground">Avg Progress</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Security Tips</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                { done: (stats?.scamChecks || 0) > 0, text: "Run your first scam check" },
                { done: (stats?.completedCourses || 0) > 0, text: "Complete a training course" },
                { done: (stats?.securityScore || 0) >= 80, text: "Achieve 80+ security score" },
                { done: false, text: "Enable SMS security alerts" },
              ].map((tip, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle className={`h-5 w-5 flex-shrink-0 ${tip.done ? "text-green-600" : "text-muted-foreground/30"}`} />
                  <span className={`text-sm ${tip.done ? "line-through text-muted-foreground" : ""}`}>{tip.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Recent Activity</CardTitle></CardHeader>
          <CardContent>
            {stats?.recentActivity?.length ? (
              <ul className="space-y-3">
                {stats.recentActivity.slice(0, 5).map((a: any) => (
                  <li key={a.id} className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{a.action} - {a.entity_type}</p>
                      <p className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
