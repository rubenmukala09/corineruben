import { useState } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminTopBar } from "@/components/AdminTopBar";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { QuickActions } from "@/components/admin/QuickActions";
import { UpcomingTasks } from "@/components/admin/UpcomingTasks";
import { Card } from "@/components/ui/card";

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background w-full overflow-x-hidden">
      <AdminSidebar 
        isOpen={sidebarOpen} 
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      
      {/* Top Bar */}
      <AdminTopBar 
        sidebarOpen={sidebarOpen} 
        toggleSidebar={() => {
          // On mobile, toggle mobile sidebar
          if (window.innerWidth < 768) {
            setMobileSidebarOpen(!mobileSidebarOpen);
          } else {
            setSidebarOpen(!sidebarOpen);
          }
        }} 
      />
      
      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 pt-16 w-full ${sidebarOpen ? 'md:ml-[260px]' : 'md:ml-[70px]'}`}>
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
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

          {/* Additional Content Area */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <div className="font-medium">New user registration</div>
                  <div className="text-sm text-muted-foreground">5 minutes ago</div>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <div className="font-medium">Order #1234 completed</div>
                  <div className="text-sm text-muted-foreground">15 minutes ago</div>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="font-medium">New testimonial submitted</div>
                  <div className="text-sm text-muted-foreground">1 hour ago</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
