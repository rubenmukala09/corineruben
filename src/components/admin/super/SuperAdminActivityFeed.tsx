import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Activity,
  User,
  ShoppingCart,
  LogIn,
  Settings,
  Shield,
  FileText,
  RefreshCw,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

interface ActivityLogEntry {
  id: string;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  user_id: string | null;
  details: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
}

export default function SuperAdminActivityFeed() {
  const [activities, setActivities] = useState<ActivityLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Filter function to exclude healthy heartbeats and only show errors/warnings
  const shouldShowActivity = (activity: ActivityLogEntry): boolean => {
    // If it's a system alert, check the status in details
    if (activity.action === 'SYSTEM_ALERT' && activity.details) {
      const details = activity.details as Record<string, unknown>;
      const alertType = details.alert_type as string;
      // Only show if it's an actual error/warning, not healthy status
      if (alertType === 'service_healthy' || alertType === 'all_healthy') {
        return false;
      }
      return true;
    }
    
    // Check for status field in details
    if (activity.details) {
      const details = activity.details as Record<string, unknown>;
      const status = (details.status as string)?.toLowerCase();
      if (status === 'healthy' || status === 'success' || status === 'ok') {
        return false;
      }
    }
    
    // Show all other activities
    return true;
  };

  useEffect(() => {
    fetchActivities();

    // Set up realtime subscription
    const channel = supabase
      .channel('activity-log-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'activity_log',
        },
        (payload) => {
          const newActivity = payload.new as ActivityLogEntry;
          if (shouldShowActivity(newActivity)) {
            setActivities(prev => [newActivity, ...prev].slice(0, 50));
          }
        }
      )
      .subscribe();

    // Auto-refresh every 30 seconds if enabled
    const interval = setInterval(() => {
      if (autoRefresh) {
        fetchActivities();
      }
    }, 30000);

    return () => {
      channel.unsubscribe();
      clearInterval(interval);
    };
  }, [autoRefresh]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('activity_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100); // Fetch more to filter

      if (error) throw error;
      
      // Filter out healthy heartbeats
      const filteredActivities = (data || []).filter(shouldShowActivity).slice(0, 50);
      setActivities(filteredActivities);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (action: string, entityType: string | null) => {
    const iconMap: Record<string, React.ReactNode> = {
      'LOGIN': <LogIn className="w-4 h-4" />,
      'LOGOUT': <LogIn className="w-4 h-4" />,
      'VIEW_SENSITIVE_PROFILE': <User className="w-4 h-4" />,
      'INSERT': <FileText className="w-4 h-4" />,
      'UPDATE': <Settings className="w-4 h-4" />,
      'DELETE': <AlertTriangle className="w-4 h-4" />,
      'purchase': <ShoppingCart className="w-4 h-4" />,
      'security': <Shield className="w-4 h-4" />,
    };

    return iconMap[action] || <Activity className="w-4 h-4" />;
  };

  const getActivityColor = (action: string, details?: Record<string, unknown> | null) => {
    // Check for status-based colors (Error=Red, Warning=Orange, Success=Green)
    if (details) {
      const status = (details.status as string)?.toLowerCase();
      const alertType = (details.alert_type as string)?.toLowerCase();
      
      if (status === 'error' || status === 'failed' || alertType === 'service_dead') {
        return 'from-red-500 to-red-600';
      }
      if (status === 'warning' || alertType === 'service_struggling') {
        return 'from-orange-500 to-amber-500';
      }
      if (status === 'success' || status === 'healthy') {
        return 'from-green-500 to-emerald-500';
      }
    }
    
    // System alerts default to warning/error colors
    if (action === 'SYSTEM_ALERT') {
      return 'from-red-500 to-orange-500';
    }

    const colorMap: Record<string, string> = {
      'LOGIN': 'from-green-500 to-emerald-500',
      'LOGOUT': 'from-gray-500 to-gray-600',
      'INSERT': 'from-blue-500 to-cyan-500',
      'UPDATE': 'from-yellow-500 to-orange-500',
      'DELETE': 'from-red-500 to-pink-500',
      'VIEW_SENSITIVE_PROFILE': 'from-purple-500 to-pink-500',
    };

    return colorMap[action] || 'from-gray-500 to-gray-600';
  };

  const formatAction = (activity: ActivityLogEntry) => {
    const { action, entity_type, details } = activity;
    
    // Format based on action type
    if (action.includes('VIEW_SENSITIVE')) {
      return `Viewed sensitive ${entity_type} data`;
    }
    
    if (action === 'INSERT') {
      return `Created new ${entity_type}`;
    }
    
    if (action === 'UPDATE') {
      return `Updated ${entity_type}`;
    }
    
    if (action === 'DELETE') {
      return `Deleted ${entity_type}`;
    }

    return action.replace(/_/g, ' ').toLowerCase();
  };

  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400" />
              Live Activity Feed
            </CardTitle>
            <CardDescription className="text-gray-400">
              Real-time platform activity monitoring
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={autoRefresh ? 'default' : 'outline'}
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={autoRefresh ? 'bg-green-600 hover:bg-green-700' : 'border-gray-700'}
            >
              {autoRefresh ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Live
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 mr-2" />
                  Paused
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchActivities}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading && activities.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-green-400" />
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No activity recorded yet</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${getActivityColor(activity.action, activity.details)}`}>
                    {getActivityIcon(activity.action, activity.entity_type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-white capitalize">
                        {formatAction(activity)}
                      </p>
                      {activity.entity_type && (
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                          {activity.entity_type}
                        </Badge>
                      )}
                    </div>
                    {activity.details && Object.keys(activity.details).length > 0 && (
                      <p className="text-sm text-gray-400 truncate">
                        {JSON.stringify(activity.details).slice(0, 100)}...
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span>{formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}</span>
                      {activity.ip_address && (
                        <>
                          <span>•</span>
                          <span>{activity.ip_address}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
