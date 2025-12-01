import { AdminLayout } from "@/components/AdminLayout";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { QuickActions } from "@/components/admin/QuickActions";
import { UpcomingTasks } from "@/components/admin/UpcomingTasks";

export default function Admin() {
  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to the admin panel
        </p>
      </div>

      {/* Dashboard Stats Cards */}
      <DashboardStats />

      {/* Revenue Overview Chart & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Upcoming Tasks */}
      <UpcomingTasks />
    </AdminLayout>
  );
}
