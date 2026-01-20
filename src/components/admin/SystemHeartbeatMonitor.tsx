import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Heart, AlertTriangle, XCircle, RefreshCw, Clock, Server } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface Heartbeat {
  service_name: string;
  last_heartbeat: string;
  status: "healthy" | "struggling" | "dead";
  error_log: string | null;
  threshold_minutes: number;
  description: string | null;
}

export function SystemHeartbeatMonitor() {
  const [heartbeats, setHeartbeats] = useState<Heartbeat[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const fetchHeartbeats = async () => {
    try {
      const { data, error } = await supabase
        .from("system_heartbeats")
        .select("*")
        .order("service_name");

      if (error) {
        console.error("Error fetching heartbeats:", error);
        toast({
          title: "Access Denied",
          description: "You need admin privileges to view system health.",
          variant: "destructive",
        });
        return;
      }

      setHeartbeats(data || []);
    } catch (err) {
      console.error("Heartbeat fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHeartbeats();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchHeartbeats, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchHeartbeats();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <Heart className="h-5 w-5 text-emerald-500 animate-pulse" />;
      case "struggling":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "dead":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Healthy</Badge>;
      case "struggling":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Struggling</Badge>;
      case "dead":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Dead</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "border-l-emerald-500";
      case "struggling":
        return "border-l-amber-500";
      case "dead":
        return "border-l-red-500";
      default:
        return "border-l-muted";
    }
  };

  const healthySummary = heartbeats.filter(h => h.status === "healthy").length;
  const strugglingSummary = heartbeats.filter(h => h.status === "struggling").length;
  const deadSummary = heartbeats.filter(h => h.status === "dead").length;

  if (loading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Activity className="h-5 w-5 animate-pulse" />
            <span>Loading system health...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Server className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">System Heartbeat Monitor</CardTitle>
              <CardDescription>Real-time status of critical security services</CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-400">{healthySummary} Healthy</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-400">{strugglingSummary} Struggling</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium text-red-400">{deadSummary} Dead</span>
            </div>
          </div>
        </div>

        {/* Service List */}
        <div className="space-y-2">
          {heartbeats.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No services configured for monitoring</p>
            </div>
          ) : (
            heartbeats.map((heartbeat) => (
              <div
                key={heartbeat.service_name}
                className={`p-4 rounded-lg bg-muted/30 border-l-4 ${getStatusColor(heartbeat.status)}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    {getStatusIcon(heartbeat.status)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-foreground">
                          {heartbeat.service_name.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                        </h4>
                        {getStatusBadge(heartbeat.status)}
                      </div>
                      {heartbeat.description && (
                        <p className="text-sm text-muted-foreground mt-1">{heartbeat.description}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Last scan: {formatDistanceToNow(new Date(heartbeat.last_heartbeat), { addSuffix: true })}
                        </span>
                        <span>Threshold: {heartbeat.threshold_minutes}min</span>
                      </div>
                      {heartbeat.error_log && (
                        <div className="mt-2 p-2 rounded bg-red-500/10 border border-red-500/20">
                          <p className="text-xs text-red-400 font-mono">{heartbeat.error_log}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
