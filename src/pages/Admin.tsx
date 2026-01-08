import { useState } from "react";
import { Search, Bell, Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import { CyberSidebar } from "@/components/admin/neon/CyberSidebar";
import { CyberGuardianStats } from "@/components/admin/neon/CyberGuardianStats";
import { GlobalThreatActivityChart } from "@/components/admin/neon/GlobalThreatActivityChart";
import { AttackVectorBarChart } from "@/components/admin/neon/AttackVectorBarChart";
import { DeviceSecurityShield } from "@/components/admin/neon/DeviceSecurityShield";
import { CyberRecentAlerts } from "@/components/admin/neon/CyberRecentAlerts";

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleBack = () => window.history.back();
  const handleForward = () => window.history.forward();

  return (
    <div className="flex min-h-screen bg-[#0B0F19] w-full overflow-x-hidden">
      {/* Cyber Sidebar */}
      <CyberSidebar 
        isOpen={sidebarOpen} 
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      
      {/* Top Bar - Minimalist Dark Style */}
      <header className={`fixed top-0 right-0 left-0 h-16 bg-[#111827]/95 backdrop-blur-xl border-b border-gray-800 z-40 
        transition-all duration-300 ${sidebarOpen ? 'md:left-[260px]' : 'md:left-[70px]'}`}>
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Left - Menu Toggle + Nav + Search */}
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
              className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800"
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            {/* Back/Forward Navigation */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800 h-9 w-9"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleForward}
                className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800 h-9 w-9"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Dark Grey Search Bar */}
            <div className="relative hidden sm:block max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
              <Input
                type="text"
                placeholder="Search threats, devices..."
                className="pl-10 bg-[#374151] border-gray-700 text-[#F9FAFB] placeholder:text-[#9CA3AF] 
                  focus:border-[#3B82F6] focus:ring-[#3B82F6]/20 h-10 rounded-lg"
              />
            </div>
          </div>

          {/* Right - Notifications + Profile */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full animate-pulse" />
            </Button>
            
            <div className="flex items-center gap-3 pl-3 border-l border-gray-700">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-[#F9FAFB]">Security Admin</p>
                <p className="text-xs text-[#9CA3AF]">Operator</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] 
                flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-[#3B82F6]/20">
                SA
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 pt-16 w-full ${sidebarOpen ? 'md:ml-[260px]' : 'md:ml-[70px]'}`}>
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-[#F9FAFB]">
                Security Command Center
              </h1>
              {/* Live Status Badge */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-xs font-medium text-[#10B981]">LIVE</span>
              </div>
            </div>
            <p className="text-[#9CA3AF]">
              Real-time threat monitoring and family protection overview
            </p>
          </motion.div>

          {/* Live Monitor Cards - 4 Mini-Charts */}
          <CyberGuardianStats />

          {/* Charts Grid - Main Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Threat Neutralization History - Large Spline Area Chart */}
            <div className="lg:col-span-2">
              <GlobalThreatActivityChart />
            </div>
            
            {/* Device Security Shield - Donut Chart */}
            <div className="lg:col-span-1">
              <DeviceSecurityShield />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Attack Vector Analysis - Vertical Bar Chart */}
            <AttackVectorBarChart />
            
            {/* Recent Alerts */}
            <CyberRecentAlerts />
          </div>
        </div>
      </main>
    </div>
  );
}
