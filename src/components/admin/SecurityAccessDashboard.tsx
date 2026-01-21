import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Eye, 
  Database, 
  UserCheck, 
  Activity,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Users,
  FileText
} from "lucide-react";
import { toast } from "sonner";

interface SensitiveAccessLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  details: {
    accessed_by?: string;
    target_user?: string;
    target_worker?: string;
    timestamp?: string;
  } | null;
  created_at: string;
}

interface RLSPolicyStatus {
  tablename: string;
  policyname: string;
  cmd: string;
  permissive: string;
}

interface AccessStats {
  profileAccesses: number;
  healthcareAccesses: number;
  seniorAccesses: number;
  workerAccesses: number;
  totalSensitiveAccesses: number;
  uniqueAccessors: number;
}

export const SecurityAccessDashboard = () => {
  const [accessLogs, setAccessLogs] = useState<SensitiveAccessLog[]>([]);
  const [rlsPolicies, setRlsPolicies] = useState<RLSPolicyStatus[]>([]);
  const [stats, setStats] = useState<AccessStats>({
    profileAccesses: 0,
    healthcareAccesses: 0,
    seniorAccesses: 0,
    workerAccesses: 0,
    totalSensitiveAccesses: 0,
    uniqueAccessors: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchSecurityData();

    // Subscribe to real-time updates for activity logs
    const channel = supabase
      .channel('sensitive-access-logs')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'activity_log',
        filter: 'action=in.(VIEW_SENSITIVE_PROFILE,VIEW_SENSITIVE_HEALTHCARE,VIEW_SENSITIVE_SENIOR,VIEW_SENSITIVE_WORKER)'
      }, () => {
        fetchSecurityData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchSecurityData = async () => {
    try {
      // Fetch sensitive access logs (last 24 hours)
      const { data: logsData, error: logsError } = await supabase
        .from('activity_log')
        .select('*')
        .in('action', [
          'VIEW_SENSITIVE_PROFILE',
          'VIEW_SENSITIVE_HEALTHCARE',
          'VIEW_SENSITIVE_SENIOR',
          'VIEW_SENSITIVE_WORKER'
        ])
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false })
        .limit(50);

      if (logsError) throw logsError;

      // Fetch RLS policy status
      const { data: policiesData, error: policiesError } = await supabase
        .from('rls_policy_status')
        .select('tablename, policyname, cmd, permissive')
        .order('tablename');

      if (policiesError) {
        console.warn('Could not fetch RLS policies:', policiesError);
      }

      const typedLogs = (logsData || []) as unknown as SensitiveAccessLog[];
      setAccessLogs(typedLogs);
      setRlsPolicies((policiesData || []) as RLSPolicyStatus[]);

      // Calculate stats
      const profileAccesses = typedLogs.filter(l => l.action === 'VIEW_SENSITIVE_PROFILE').length;
      const healthcareAccesses = typedLogs.filter(l => l.action === 'VIEW_SENSITIVE_HEALTHCARE').length;
      const seniorAccesses = typedLogs.filter(l => l.action === 'VIEW_SENSITIVE_SENIOR').length;
      const workerAccesses = typedLogs.filter(l => l.action === 'VIEW_SENSITIVE_WORKER').length;
      const uniqueAccessors = new Set(typedLogs.map(l => l.user_id).filter(Boolean)).size;

      setStats({
        profileAccesses,
        healthcareAccesses,
        seniorAccesses,
        workerAccesses,
        totalSensitiveAccesses: typedLogs.length,
        uniqueAccessors,
      });

    } catch (error) {
      console.error('Error fetching security data:', error);
      toast.error('Failed to load security access data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchSecurityData();
  };

  const getAccessIcon = (action: string) => {
    switch (action) {
      case 'VIEW_SENSITIVE_PROFILE':
        return <UserCheck className="h-4 w-4 text-blue-500" />;
      case 'VIEW_SENSITIVE_HEALTHCARE':
        return <Activity className="h-4 w-4 text-green-500" />;
      case 'VIEW_SENSITIVE_SENIOR':
        return <Users className="h-4 w-4 text-purple-500" />;
      case 'VIEW_SENSITIVE_WORKER':
        return <FileText className="h-4 w-4 text-orange-500" />;
      default:
        return <Eye className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getAccessLabel = (action: string) => {
    switch (action) {
      case 'VIEW_SENSITIVE_PROFILE':
        return 'Profile PII';
      case 'VIEW_SENSITIVE_HEALTHCARE':
        return 'Healthcare';
      case 'VIEW_SENSITIVE_SENIOR':
        return 'Senior Profile';
      case 'VIEW_SENSITIVE_WORKER':
        return 'Worker Data';
      default:
        return action;
    }
  };

  // Group policies by table
  const policyGroups = rlsPolicies.reduce((acc, policy) => {
    if (!acc[policy.tablename]) {
      acc[policy.tablename] = [];
    }
    acc[policy.tablename].push(policy);
    return acc;
  }, {} as Record<string, RLSPolicyStatus[]>);

  // Identify critical tables for monitoring
  const criticalTables = [
    'profiles', 'workers', 'healthcare_professional_profiles', 
    'senior_client_profiles', 'clients', 'user_roles'
  ];

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Activity className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2">Loading security access data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security Access Dashboard
          </h2>
          <p className="text-sm text-muted-foreground">
            Monitor sensitive data access and RLS policy status
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Access</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSensitiveAccesses}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile PII</CardTitle>
            <UserCheck className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{stats.profileAccesses}</div>
            <p className="text-xs text-muted-foreground">Views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthcare</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.healthcareAccesses}</div>
            <p className="text-xs text-muted-foreground">Views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Senior Profiles</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">{stats.seniorAccesses}</div>
            <p className="text-xs text-muted-foreground">Views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Worker Data</CardTitle>
            <FileText className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{stats.workerAccesses}</div>
            <p className="text-xs text-muted-foreground">Views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.uniqueAccessors}</div>
            <p className="text-xs text-muted-foreground">Accessors</p>
          </CardContent>
        </Card>
      </div>

      {/* RLS Policy Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            RLS Policy Status - Critical Tables
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {criticalTables.map(table => {
              const policies = policyGroups[table] || [];
              const hasRLS = policies.length > 0;
              const hasSelect = policies.some(p => p.cmd === 'SELECT');
              const hasInsert = policies.some(p => p.cmd === 'INSERT');
              const hasUpdate = policies.some(p => p.cmd === 'UPDATE');
              const hasDelete = policies.some(p => p.cmd === 'DELETE');

              return (
                <div 
                  key={table}
                  className={`p-4 rounded-lg border ${
                    hasRLS ? 'border-green-500/30 bg-green-500/5' : 'border-destructive/30 bg-destructive/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{table}</span>
                    {hasRLS ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant={hasSelect ? "default" : "outline"} className="text-xs">
                      SELECT
                    </Badge>
                    <Badge variant={hasInsert ? "default" : "outline"} className="text-xs">
                      INSERT
                    </Badge>
                    <Badge variant={hasUpdate ? "default" : "outline"} className="text-xs">
                      UPDATE
                    </Badge>
                    <Badge variant={hasDelete ? "default" : "outline"} className="text-xs">
                      DELETE
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {policies.length} {policies.length === 1 ? 'policy' : 'policies'}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Sensitive Access Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Recent Sensitive Data Access
            {stats.totalSensitiveAccesses > 20 && (
              <Badge variant="secondary" className="ml-2">
                High Activity
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {accessLogs.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No sensitive data access logged in the last 24 hours
              </p>
            ) : (
              accessLogs.slice(0, 15).map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getAccessIcon(log.action)}
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{getAccessLabel(log.action)}</Badge>
                        <span className="text-sm font-medium">
                          {log.entity_type}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        <span>By: {log.details?.accessed_by?.substring(0, 8) || 'Unknown'}</span>
                        <span className="mx-2">→</span>
                        <span>Target: {(log.details?.target_user || log.details?.target_worker || log.entity_id)?.substring(0, 8)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(log.created_at).toLocaleString()}
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
