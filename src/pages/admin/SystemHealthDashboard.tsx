import SuperAdminDashboardHealth from "@/components/admin/super/SuperAdminDashboardHealth";
import SuperAdminActivityFeed from "@/components/admin/super/SuperAdminActivityFeed";
import { SystemHeartbeatMonitor } from "@/components/admin/SystemHeartbeatMonitor";
import { SecurityMonitor } from "@/components/admin/SecurityMonitor";

export default function SystemHealthDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#F9FAFB]">System Health & Monitoring</h1>
        <p className="text-[#9CA3AF]">Monitor backend services, security, and platform activity</p>
      </div>
      <div className="space-y-6">
        <SuperAdminDashboardHealth />
        <SystemHeartbeatMonitor />
        <SecurityMonitor />
        <SuperAdminActivityFeed />
      </div>
    </div>
  );
}
