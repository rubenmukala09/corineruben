import {
  Shield,
  Mail,
  Phone,
  MessageSquare,
  QrCode,
  AlertTriangle,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ThreatEvent {
  id: string;
  threat_type: string;
  title?: string;
  description: string;
  severity: string;
  status: string;
  created_at: string;
}

interface ThreatActivityTimelineProps {
  userId?: string;
}

const getIcon = (type: string) => {
  switch (type?.toLowerCase()) {
    case "email":
    case "phishing":
      return Mail;
    case "sms":
    case "smishing":
      return MessageSquare;
    case "call":
    case "vishing":
      return Phone;
    case "qr":
    case "quishing":
      return QrCode;
    default:
      return AlertTriangle;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity?.toLowerCase()) {
    case "critical":
    case "high":
      return "text-red-500 bg-red-500/10";
    case "medium":
      return "text-orange-500 bg-orange-500/10";
    case "low":
      return "text-yellow-500 bg-yellow-500/10";
    default:
      return "text-muted-foreground bg-muted";
  }
};

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
};

export function ThreatActivityTimeline({
  userId,
}: ThreatActivityTimelineProps) {
  const [threats, setThreats] = useState<ThreatEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThreats = async () => {
      try {
        let query = supabase
          .from("threat_events")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5);

        if (userId) {
          query = query.eq("profile_id", userId);
        }

        const { data, error } = await query;

        if (error) {
          console.error("Error fetching threat events:", error);
          setThreats([]);
        } else {
          setThreats(data || []);
        }
      } catch (err) {
        console.error("Failed to fetch threats:", err);
        setThreats([]);
      } finally {
        setLoading(false);
      }
    };

    fetchThreats();
  }, [userId]);

  const hasActiveThreats = threats.some(
    (t) => t.status === "active" || t.status === "pending",
  );

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="w-5 h-5 text-primary" />
            Recent Threat Activity
          </CardTitle>
          <Badge
            variant="outline"
            className={
              hasActiveThreats
                ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/30"
                : "bg-green-500/10 text-green-600 border-green-500/30"
            }
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            {hasActiveThreats ? "Review Needed" : "All Clear"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3 p-3 animate-pulse">
                <div className="w-9 h-9 rounded-lg bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : threats.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-500/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-green-600" />
            </div>
            <p className="font-medium text-sm">No Threats Detected</p>
            <p className="text-xs text-muted-foreground mt-1">
              Your protection is active and monitoring for threats
            </p>
          </div>
        ) : (
          threats.map((threat, index) => {
            const Icon = getIcon(threat.threat_type);
            return (
              <div
                key={threat.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${getSeverityColor(threat.severity)}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm truncate">
                      {threat.title || `${threat.threat_type} Threat`}
                    </p>
                    <Badge
                      variant="secondary"
                      className={`text-xs shrink-0 ${
                        threat.status === "resolved" ||
                        threat.status === "blocked"
                          ? "bg-green-500/20 text-green-600"
                          : "bg-yellow-500/20 text-yellow-600"
                      }`}
                    >
                      {threat.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {threat.description}
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    {formatTimeAgo(threat.created_at)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
