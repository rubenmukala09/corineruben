import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Shield,
  Users,
  Activity,
  Bell,
  Settings,
  ChevronDown,
  Database,
  FileText,
  BarChart3,
  Lock,
  Smartphone,
  Globe,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MenuItem {
  title: string;
  icon: React.ElementType;
  href?: string;
  children?: { title: string; href: string }[];
}

const menuItems: MenuItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { title: "Threat Monitor", icon: Shield, href: "/admin/threats" },
  { title: "Family Devices", icon: Smartphone, href: "/admin/devices" },
  {
    title: "Analytics",
    icon: BarChart3,
    children: [
      { title: "Overview", href: "/admin/analytics" },
      { title: "Reports", href: "/admin/reports" },
      { title: "Insights", href: "/admin/insights" },
    ],
  },
  { title: "User Management", icon: Users, href: "/admin/users" },
  { title: "Activity Log", icon: Activity, href: "/admin/activity" },
  { title: "Database", icon: Database, href: "/admin/database" },
  { title: "Notifications", icon: Bell, href: "/admin/notifications" },
  { title: "Security", icon: Lock, href: "/admin/security" },
  { title: "Settings", icon: Settings, href: "/admin/settings" },
];

interface CyberSidebarProps {
  isOpen: boolean;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function CyberSidebar({ isOpen, isMobileOpen, onMobileClose }: CyberSidebarProps) {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (title: string) => {
    setExpandedMenus((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const isActive = (href?: string) => href && location.pathname === href;
  const isChildActive = (children?: { href: string }[]) =>
    children?.some((child) => location.pathname === child.href);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#111827] border-r border-gray-800">
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-gray-800">
        <Link to="/admin" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] flex items-center justify-center">
            <Globe className="h-5 w-5 text-white" />
          </div>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-bold text-[#F9FAFB]"
            >
              InVision
            </motion.span>
          )}
        </Link>
        {isMobileOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileClose}
            className="ml-auto text-[#9CA3AF] hover:text-white hover:bg-gray-800 md:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href) || isChildActive(item.children);
          const expanded = expandedMenus.includes(item.title);

          return (
            <div key={item.title}>
              {item.children ? (
                <button
                  onClick={() => toggleMenu(item.title)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                    ${active ? "bg-gray-800 text-[#F9FAFB]" : "text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800/50"}`}
                >
                  {/* Blue vertical indicator for active */}
                  {active && (
                    <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-[#3B82F6] to-[#06B6D4] rounded-r" />
                  )}
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {isOpen && (
                    <>
                      <span className="flex-1 text-left text-sm font-medium">{item.title}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                      />
                    </>
                  )}
                </button>
              ) : (
                <Link
                  to={item.href || "#"}
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                    ${active 
                      ? "bg-gray-800 text-[#F9FAFB]" 
                      : "text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800/50"
                    }`}
                >
                  {/* Blue vertical indicator for active */}
                  {active && (
                    <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-[#3B82F6] to-[#06B6D4] rounded-r" />
                  )}
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {isOpen && <span className="text-sm font-medium">{item.title}</span>}
                </Link>
              )}

              {/* Submenu */}
              <AnimatePresence>
                {item.children && expanded && isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-8 mt-1 space-y-1"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className={`block px-3 py-2 rounded-lg text-sm transition-all
                          ${location.pathname === child.href
                            ? "text-[#06B6D4] bg-[#06B6D4]/10"
                            : "text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800/50"
                          }`}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          {isOpen && (
            <span className="text-xs text-[#9CA3AF]">System Online</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block fixed left-0 top-0 h-full z-50 transition-all duration-300
          ${isOpen ? "w-[260px]" : "w-[70px]"}`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 h-full w-[260px] z-50 md:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
