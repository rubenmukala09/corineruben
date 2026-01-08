import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/admin/AdminLayout";
import SuperAdminDashboardHealth from "@/components/admin/super/SuperAdminDashboardHealth";
import SuperAdminActivityFeed from "@/components/admin/super/SuperAdminActivityFeed";
import { SystemHeartbeatMonitor } from "@/components/admin/SystemHeartbeatMonitor";
import { SecurityMonitor } from "@/components/admin/SecurityMonitor";

export default function SystemHealthDashboard() {
  return (
    <AdminLayout
      title="System Health & Monitoring"
      subtitle="Monitor backend services, security, and platform activity"
      searchPlaceholder="Search..."
      headerActions={
        <Link to="/admin">
          <Button className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white">
            Back to Dashboard
          </Button>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Dashboard Health Monitor */}
        <SuperAdminDashboardHealth />
        
        {/* System Heartbeat Monitor */}
        <SystemHeartbeatMonitor />
        
        {/* Security Monitor */}
        <SecurityMonitor />
        
        {/* Activity Feed */}
        <SuperAdminActivityFeed />
      </div>
    </AdminLayout>
  );
}
