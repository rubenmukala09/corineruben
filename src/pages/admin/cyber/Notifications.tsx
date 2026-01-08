import { Link } from "react-router-dom";
import { Bell, Shield, AlertTriangle, Info, CheckCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLayout } from "@/components/admin/AdminLayout";

const notifications = [
  { id: 1, title: "Critical Threat Detected", message: "A phishing attempt was blocked on john@email.com", type: "critical", time: "2 mins ago", read: false },
  { id: 2, title: "Device Scan Complete", message: "MacBook Pro scan completed successfully with no threats found", type: "success", time: "15 mins ago", read: false },
  { id: 3, title: "New Device Added", message: "iPad Air was added to family protection by Sarah", type: "info", time: "1 hour ago", read: true },
  { id: 4, title: "Database Updated", message: "Threat database updated with 1,234 new signatures", type: "info", time: "2 hours ago", read: true },
  { id: 5, title: "Subscription Renewal", message: "Your family protection plan renews in 7 days", type: "warning", time: "1 day ago", read: true },
];

export default function Notifications() {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "critical": return Shield;
      case "warning": return AlertTriangle;
      case "success": return CheckCircle;
      default: return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "critical": return "from-red-500 to-orange-500 text-red-400";
      case "warning": return "from-yellow-500 to-orange-500 text-yellow-400";
      case "success": return "from-green-500 to-emerald-500 text-green-400";
      default: return "from-blue-500 to-cyan-500 text-blue-400";
    }
  };

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
          <Button variant="outline" className="border-gray-700 text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800">
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
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              const colorClass = getNotificationColor(notification.type);
              return (
                <div 
                  key={notification.id} 
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
                    notification.read 
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
                      {!notification.read && (
                        <span className="w-2 h-2 bg-[#3B82F6] rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-[#9CA3AF] mt-1">{notification.message}</p>
                    <p className="text-xs text-[#6B7280] mt-2">{notification.time}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-[#9CA3AF] hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
