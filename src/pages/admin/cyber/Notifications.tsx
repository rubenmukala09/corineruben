import { Link } from "react-router-dom";
import { Bell, Shield, AlertTriangle, Info, CheckCircle, Trash2, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  user_id: string | null;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  is_read: boolean;
  related_id: string | null;
  created_at: string;
}

export default function Notifications() {
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Notification[];
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('is_read', false);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('All notifications marked as read');
    },
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('Notification deleted');
    },
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "error": return Shield;
      case "warning": return AlertTriangle;
      case "success": return CheckCircle;
      default: return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "error": return "from-red-500 to-orange-500 text-red-400";
      case "warning": return "from-yellow-500 to-orange-500 text-yellow-400";
      case "success": return "from-green-500 to-emerald-500 text-green-400";
      default: return "from-blue-500 to-cyan-500 text-blue-400";
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <AdminLayout
      title="Notifications"
      subtitle="Stay updated on security events and alerts"
      searchPlaceholder="Search notifications..."
      headerActions={
        <div className="flex gap-3">
          <Link to="/admin">
            <Button variant="outline" className="border-gray-700 text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800">
              Back to Dashboard
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="border-gray-700 text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800"
            onClick={() => markAllReadMutation.mutate()}
            disabled={unreadCount === 0}
          >
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        </div>
      }
    >
      <Card className="bg-[#111827] border-gray-800">
        <CardHeader>
          <CardTitle className="text-[#F9FAFB] flex items-center gap-2">
            <Bell className="h-5 w-5" />
            All Notifications
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-[#3B82F6] rounded-full">
                {unreadCount} unread
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-[#9CA3AF]">Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#F9FAFB] mb-2">All caught up!</h3>
              <p className="text-[#9CA3AF]">You have no notifications at this time.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                const colorClass = getNotificationColor(notification.type);
                return (
                  <div 
                    key={notification.id} 
                    className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
                      notification.is_read 
                        ? 'bg-[#1F2937] border-gray-800' 
                        : 'bg-[#1F2937]/80 border-gray-700 ring-1 ring-[#3B82F6]/20'
                    }`}
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-[#F9FAFB]">{notification.title}</p>
                        {!notification.is_read && (
                          <span className="w-2 h-2 bg-[#3B82F6] rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-[#9CA3AF] mt-1">{notification.message}</p>
                      <p className="text-xs text-[#6B7280] mt-2">
                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-[#9CA3AF] hover:text-red-400"
                      onClick={() => deleteNotificationMutation.mutate(notification.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
