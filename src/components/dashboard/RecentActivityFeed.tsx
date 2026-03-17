import {
  Bot,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface ActivityItem {
  id: string;
  type: "call" | "email" | "booking" | "lead";
  title: string;
  description: string;
  status: "success" | "pending" | "failed";
  timestamp: Date;
  automation: string;
}

const getIcon = (type: string) => {
  switch (type) {
    case "call":
      return Phone;
    case "email":
      return Mail;
    case "booking":
      return Calendar;
    case "lead":
      return Bot;
    default:
      return Bot;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "success":
      return CheckCircle;
    case "pending":
      return Clock;
    case "failed":
      return AlertCircle;
    default:
      return CheckCircle;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "success":
      return "text-green-500";
    case "pending":
      return "text-yellow-500";
    case "failed":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

const mapActionToType = (
  action: string,
): "call" | "email" | "booking" | "lead" => {
  const actionLower = action.toLowerCase();
  if (actionLower.includes("call") || actionLower.includes("phone"))
    return "call";
  if (actionLower.includes("email") || actionLower.includes("mail"))
    return "email";
  if (
    actionLower.includes("book") ||
    actionLower.includes("appoint") ||
    actionLower.includes("schedule")
  )
    return "booking";
  return "lead";
};

const mapActionToStatus = (
  action: string,
): "success" | "pending" | "failed" => {
  const actionLower = action.toLowerCase();
  if (actionLower.includes("fail") || actionLower.includes("error"))
    return "failed";
  if (actionLower.includes("pending") || actionLower.includes("waiting"))
    return "pending";
  return "success";
};

export function RecentActivityFeed() {
  const { data: activities = [], isLoading } = useQuery({
    queryKey: ["recent-activity"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("activity_log")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;

      return (data || []).map(
        (item): ActivityItem => ({
          id: item.id,
          type: mapActionToType(item.action),
          title: item.action,
          description: item.entity_type
            ? `${item.entity_type} - ${item.entity_id?.slice(0, 8) || "N/A"}`
            : "System activity",
          status: mapActionToStatus(item.action),
          timestamp: new Date(item.created_at),
          automation: item.entity_type || "System",
        }),
      );
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <Badge variant="outline">Live</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-3 p-3">
              <Skeleton className="w-9 h-9 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            Recent Activity
          </CardTitle>
          <Badge variant="outline">Live</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No recent activity</p>
          </div>
        ) : (
          activities.map((item) => {
            const Icon = getIcon(item.type);
            const StatusIcon = getStatusIcon(item.status);

            return (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm truncate">{item.title}</p>
                    <StatusIcon
                      className={`w-3 h-3 shrink-0 ${getStatusColor(item.status)}`}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-[10px] h-5">
                      {item.automation}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground/60">
                      {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
