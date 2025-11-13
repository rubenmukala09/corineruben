import { useState } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminTopBar } from "@/components/AdminTopBar";
import { Card } from "@/components/ui/card";

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} />
      
      {/* Top Bar */}
      <AdminTopBar 
        sidebarOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 pt-16 ${sidebarOpen ? 'md:ml-[260px]' : 'md:ml-[70px]'}`}>
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome to the admin panel
            </p>
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Total Users</div>
              <div className="text-3xl font-bold">1,234</div>
              <div className="text-sm text-success mt-2">+12% from last month</div>
            </Card>
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Revenue</div>
              <div className="text-3xl font-bold">$12,345</div>
              <div className="text-sm text-success mt-2">+8% from last month</div>
            </Card>
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Active Orders</div>
              <div className="text-3xl font-bold">89</div>
              <div className="text-sm text-muted-foreground mt-2">Pending: 23</div>
            </Card>
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Satisfaction</div>
              <div className="text-3xl font-bold">98%</div>
              <div className="text-sm text-success mt-2">+2% from last month</div>
            </Card>
          </div>

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
