import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, ChevronRight, Shield, AlertTriangle, Info, CheckCircle, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  type: 'job_assignment' | 'schedule_change' | 'new_message' | 'appointment_reminder' | 'time_off_response' | 'system';
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

const typeConfig: Record<string, { color: string; bg: string; border: string; icon: any }> = {
  system: { 
    color: "text-[#F97316]", 
    bg: "bg-[#F97316]/10", 
    border: "border-[#F97316]/30", 
    icon: Shield,
  },
  job_assignment: { 
    color: "text-[#3B82F6]", 
    bg: "bg-[#3B82F6]/10", 
    border: "border-[#3B82F6]/30", 
    icon: Info,
  },
  schedule_change: { 
    color: "text-[#FBBF24]", 
    bg: "bg-[#FBBF24]/10", 
    border: "border-[#FBBF24]/30", 
    icon: AlertTriangle,
  },
  new_message: { 
    color: "text-[#06B6D4]", 
    bg: "bg-[#06B6D4]/10", 
    border: "border-[#06B6D4]/30", 
    icon: Bell,
  },
  appointment_reminder: { 
    color: "text-[#10B981]", 
    bg: "bg-[#10B981]/10", 
    border: "border-[#10B981]/30", 
    icon: CheckCircle,
  },
  time_off_response: { 
    color: "text-[#A855F7]", 
    bg: "bg-[#A855F7]/10", 
    border: "border-[#A855F7]/30", 
    icon: Info,
  },
  default: { 
    color: "text-[#9CA3AF]", 
    bg: "bg-gray-500/10", 
    border: "border-gray-700", 
    icon: Bell,
  },
};

export function CyberRecentAlerts() {
  // Fetch notifications from database
  const { data: notifications, isLoading } = useQuery({
    queryKey: ['recent-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('id, type, title, message, created_at, is_read')
        .order('created_at', { ascending: false })
        .limit(5);
      if (error) throw error;
      return data as Notification[];
    },
    refetchInterval: 30000,
  });

  const alertCount = notifications?.filter(n => !n.is_read).length || 0;
  const hasData = notifications && notifications.length > 0;

  return (
    <Card className="p-6 bg-[#111827] border border-gray-800 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center relative">
            <Bell className="h-5 w-5 text-white" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#EF4444] rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                {alertCount}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#F9FAFB]">Security Alerts</h2>
            <p className="text-sm text-[#9CA3AF]">Real-time notifications</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-[#06B6D4] hover:text-[#06B6D4] hover:bg-[#06B6D4]/10"
        >
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Alert List */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#374151 #111827' }}>
        {isLoading ? (
          <div className="py-12 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#F97316]" />
          </div>
        ) : !hasData ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#374151]/30 flex items-center justify-center mb-3">
              <Bell className="h-7 w-7 text-[#9CA3AF]" />
            </div>
            <h3 className="text-base font-medium text-[#F9FAFB] mb-1">All Clear</h3>
            <p className="text-xs text-[#9CA3AF] max-w-[200px]">
              No security alerts at this time. You're protected.
            </p>
          </div>
        ) : (
          notifications.map((notification) => {
            const config = typeConfig[notification.type] || typeConfig.default;
            const Icon = config.icon;

            return (
              <div
                key={notification.id}
                className={`p-4 rounded-lg ${config.bg} border ${config.border} 
                  hover:border-opacity-100 cursor-pointer group`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-[#F9FAFB] truncate">
                        {notification.title}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.color} font-medium uppercase border ${config.border}`}>
                        {notification.type}
                      </span>
                    </div>
                    <p className="text-xs text-[#9CA3AF] line-clamp-1 mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-600">
                      {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}
