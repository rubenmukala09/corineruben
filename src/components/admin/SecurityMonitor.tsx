import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, Activity, Users, Lock, Eye } from "lucide-react";
import { toast } from "sonner";

interface SecurityEvent {
  id: string;
  event_type: string;
  email: string | null;
  success: boolean;
  ip_address: string | null;
  reason: string | null;
  created_at: string;
}

interface ActivityLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string | null;
  ip_address: string | null;
  created_at: string;
}

interface SecurityStats {
  totalAuthEvents: number;
  failedLogins: number;
  suspiciousActivity: number;
  activeUsers: number;
}

export const SecurityMonitor = () => {
  const [authEvents, setAuthEvents] = useState<SecurityEvent[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [stats, setStats] = useState<SecurityStats>({
    totalAuthEvents: 0,
    failedLogins: 0,
    suspiciousActivity: 0,
    activeUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSecurityData();
    
    // Subscribe to real-time updates
    const authChannel = supabase
      .channel('auth-events')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'auth_audit_logs'
      }, () => {
        fetchSecurityData();
      })
      .subscribe();

    const activityChannel = supabase
      .channel('activity-logs')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'activity_log'
      }, () => {
        fetchSecurityData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(authChannel);
      supabase.removeChannel(activityChannel);
    };
  }, []);

  const fetchSecurityData = async () => {
    try {
      // Fetch recent auth events (last 24 hours)
      const { data: authData, error: authError } = await supabase
        .from('auth_audit_logs')
        .select('*')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false })
        .limit(20);

      if (authError) throw authError;

      // Fetch recent activity logs (last 24 hours)
      const { data: activityData, error: activityError } = await supabase
        .from('activity_log')
        .select('*')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false })
        .limit(20);

      if (activityError) throw activityError;

      setAuthEvents(authData || []);
      setActivityLogs(activityData || []);

      // Calculate stats
      const failedLogins = (authData || []).filter(
        e => e.event_type === 'login' && !e.success
      ).length;

      // Detect suspicious activity (multiple failed logins from same IP)
      const ipFailures = new Map<string, number>();
      (authData || []).forEach(e => {
        if (!e.success && e.ip_address) {
          ipFailures.set(e.ip_address, (ipFailures.get(e.ip_address) || 0) + 1);
        }
      });
      const suspiciousActivity = Array.from(ipFailures.values()).filter(count => count >= 3).length;

      // Get active users count (unique user_ids in activity logs)
      const activeUsers = new Set(
        (activityData || []).map(a => a.user_id).filter(Boolean)
      ).size;

      setStats({
        totalAuthEvents: authData?.length || 0,
        failedLogins,
        suspiciousActivity,
        activeUsers,
      });

      // Alert if suspicious activity detected
      if (suspiciousActivity > 0) {
        toast.error(`⚠️ ${suspiciousActivity} suspicious IP(s) detected with multiple failed logins!`);
      }

    } catch (error) {
      console.error('Error fetching security data:', error);
      toast.error('Failed to load security data');
    } finally {
      setLoading(false);
    }
  };

  const getEventBadge = (eventType: string, success: boolean) => {
    if (!success) {
      return <Badge variant="destructive">Failed</Badge>;
    }
    
    const badges: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
      login: { label: "Login", variant: "default" },
      logout: { label: "Logout", variant: "secondary" },
      signup: { label: "Signup", variant: "default" },
      password_reset: { label: "Password Reset", variant: "outline" },
      role_assignment: { label: "Role Assigned", variant: "default" },
      role_change: { label: "Role Changed", variant: "outline" },
    };

    const badge = badges[eventType] || { label: eventType, variant: "secondary" as const };
    return <Badge variant={badge.variant}>{badge.label}</Badge>;
  };

  const getActionIcon = (action: string) => {
    if (action.includes('INSERT')) return '➕';
    if (action.includes('UPDATE')) return '✏️';
    if (action.includes('DELETE')) return '🗑️';
    if (action.includes('SELECT')) return '👁️';
    return '📝';
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Activity className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2">Loading security data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Auth Events</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAuthEvents}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
            <Lock className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.failedLogins}</div>
            <p className="text-xs text-muted-foreground">Authentication failures</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspicious Activity</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{stats.suspiciousActivity}</div>
            <p className="text-xs text-muted-foreground">IPs with multiple failures</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">Unique users today</p>
          </CardContent>
        </Card>
      </div>

      {/* Authentication Events */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Recent Authentication Events
            </CardTitle>
            <Button variant="outline" size="sm" onClick={fetchSecurityData}>
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {authEvents.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No authentication events in the last 24 hours</p>
            ) : (
              authEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getEventBadge(event.event_type, event.success)}
                      <span className="font-medium">{event.email || 'Unknown user'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{event.ip_address || 'Unknown IP'}</span>
                      <span>•</span>
                      <span>{new Date(event.created_at).toLocaleString()}</span>
                    </div>
                    {event.reason && (
                      <p className="text-xs text-destructive mt-1">{event.reason}</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Activity Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Sensitive Data Access Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activityLogs.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No activity logged in the last 24 hours</p>
            ) : (
              activityLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{getActionIcon(log.action)}</span>
                      <span className="font-medium">{log.action}</span>
                      {log.entity_type && (
                        <>
                          <span className="text-muted-foreground">on</span>
                          <Badge variant="outline">{log.entity_type}</Badge>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>User: {log.user_id?.substring(0, 8) || 'System'}</span>
                      <span>•</span>
                      <span>{log.ip_address || 'Unknown IP'}</span>
                      <span>•</span>
                      <span>{new Date(log.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
