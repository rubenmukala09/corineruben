import SuperAdminDashboardHealth from "@/components/admin/super/SuperAdminDashboardHealth";
import SuperAdminActivityFeed from "@/components/admin/super/SuperAdminActivityFeed";
import { SystemHeartbeatMonitor } from "@/components/admin/SystemHeartbeatMonitor";
import { SecurityMonitor } from "@/components/admin/SecurityMonitor";
import { SecurityAccessDashboard } from "@/components/admin/SecurityAccessDashboard";
import { FormSubmissionMonitor } from "@/components/admin/FormSubmissionMonitor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Activity, FileText, Server } from "lucide-react";

export default function SystemHealthDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">System Health & Monitoring</h1>
        <p className="text-muted-foreground">Monitor backend services, security, and platform activity</p>
      </div>
      
      <Tabs defaultValue="health" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="health" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            System Health
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security Access
          </TabsTrigger>
          <TabsTrigger value="forms" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Form Submissions
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Activity Monitor
          </TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="space-y-6">
          <SuperAdminDashboardHealth />
          <SystemHeartbeatMonitor />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SecurityAccessDashboard />
        </TabsContent>

        <TabsContent value="forms" className="space-y-6">
          <FormSubmissionMonitor />
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <SecurityMonitor />
          <SuperAdminActivityFeed />
        </TabsContent>
      </Tabs>
    </div>
  );
}
