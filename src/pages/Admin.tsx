import { useState } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminTopBar } from "@/components/AdminTopBar";
import { NeonDashboardStats } from "@/components/admin/neon/NeonDashboardStats";
import { ThreatActivityChart } from "@/components/admin/neon/ThreatActivityChart";
import { AttackVectorChart } from "@/components/admin/neon/AttackVectorChart";
import { FamilyProtectionChart } from "@/components/admin/neon/FamilyProtectionChart";
import { NeonRecentAlerts } from "@/components/admin/neon/NeonRecentAlerts";
import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#111827] w-full overflow-x-hidden">
      <AdminSidebar 
        isOpen={sidebarOpen} 
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      
      {/* Top Bar - Custom Neon Style */}
      <div className={`fixed top-0 right-0 left-0 h-16 bg-[#111827]/95 backdrop-blur-xl border-b border-gray-800/50 z-40 
        transition-all duration-300 ${sidebarOpen ? 'md:left-[260px]' : 'md:left-[70px]'}`}>
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Left - Menu Toggle + Search */}
          <div className="flex items-center gap-4 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (window.innerWidth < 768) {
                  setMobileSidebarOpen(!mobileSidebarOpen);
                } else {
                  setSidebarOpen(!sidebarOpen);
                }
              }}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
            
            {/* Search Bar */}
            <div className="relative hidden sm:block max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search threat database..."
                className="pl-10 bg-[#1F2937] border-gray-700 text-white placeholder:text-gray-500 
                  focus:border-cyan-500 focus:ring-cyan-500/20 h-10"
              />
            </div>
          </div>

          {/* Right - Notifications + Profile */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </Button>
            
            <div className="flex items-center gap-3 pl-3 border-l border-gray-700">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-gray-400">Security Operator</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 
                flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-cyan-500/20">
                AU
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 pt-16 w-full ${sidebarOpen ? 'md:ml-[260px]' : 'md:ml-[70px]'}`}>
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white">
              Security Command Center
            </h1>
            <p className="text-gray-400 mt-1">
              Real-time threat monitoring and family protection overview
            </p>
          </motion.div>

          {/* Dashboard Stats Cards - Neon Style */}
          <NeonDashboardStats />

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Threat Activity - Large Chart */}
            <div className="lg:col-span-2">
              <ThreatActivityChart />
            </div>
            
            {/* Family Protection - Donut */}
            <div className="lg:col-span-1">
              <FamilyProtectionChart />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Attack Vector Analysis */}
            <AttackVectorChart />
            
            {/* Recent Alerts */}
            <NeonRecentAlerts />
          </div>
        </div>
      </main>
    </div>
  );
}
