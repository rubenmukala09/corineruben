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
  BarChart3,
  Lock,
  Smartphone,
  Globe,
  X,
  FileText,
  ShoppingCart,
  ClipboardList,
  Mail,
  Building2,
  TestTube,
  MessageSquare,
  Package,
  Heart,
  Calendar,
  Briefcase,
  Inbox,
  Newspaper,
  Rocket,
  CreditCard,
  UserCog,
  HeartHandshake,
  FileEdit,
  Quote,
  UsersRound,
  Ticket,
  BookOpen,
  Star,
  Image,
  UserPlus,
  KeyRound,
  Library,
  Sparkles,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MenuItem {
  title: string;
  icon: React.ElementType;
  href?: string;
  children?: { title: string; href: string; icon?: React.ElementType }[];
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    children: [
      { title: "Command Center", href: "/admin", icon: LayoutDashboard },
      { title: "Threat Monitor", href: "/admin/threats", icon: Shield },
      { title: "Family Devices", href: "/admin/devices", icon: Smartphone },
      { title: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      { title: "User Management", href: "/admin/users", icon: Users },
      { title: "Activity Log", href: "/admin/activity", icon: Activity },
      { title: "Database", href: "/admin/database", icon: Database },
      { title: "Notifications", href: "/admin/notifications", icon: Bell },
      { title: "Security", href: "/admin/security", icon: Lock },
    ],
  },
  {
    title: "Content",
    icon: FileText,
    children: [
      { title: "Pages", href: "/admin/content/pages", icon: FileEdit },
      { title: "Articles", href: "/admin/content/articles", icon: FileText },
      { title: "Testimonials", href: "/admin/content/testimonials", icon: Quote },
      { title: "Team", href: "/admin/content/team", icon: UsersRound },
      { title: "Portfolio", href: "/admin/content/portfolio", icon: Image },
      { title: "Knowledge Base", href: "/admin/content/knowledge-base", icon: BookOpen },
      { title: "Reviews", href: "/admin/content/reviews", icon: Star },
    ],
  },
  {
    title: "Clients",
    icon: Building2,
    children: [
      { title: "Business Clients", href: "/admin/clients/businesses", icon: Building2 },
      { title: "Individual Clients", href: "/admin/clients/individuals", icon: UserPlus },
      { title: "Messages", href: "/admin/clients/messages", icon: MessageSquare },
    ],
  },
  {
    title: "E-Commerce",
    icon: ShoppingCart,
    children: [
      { title: "Products", href: "/admin/ecommerce/products", icon: Package },
      { title: "Orders", href: "/admin/ecommerce/orders", icon: ShoppingCart },
      { title: "Inventory", href: "/admin/ecommerce/inventory", icon: Package },
      { title: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
      { title: "Book Access", href: "/admin/ecommerce/book-access", icon: KeyRound },
      { title: "Donations", href: "/admin/donations", icon: Heart },
    ],
  },
  {
    title: "Requests",
    icon: ClipboardList,
    children: [
      { title: "Service Inquiries", href: "/admin/service-inquiries", icon: ClipboardList },
      { title: "Bookings", href: "/admin/bookings", icon: Calendar },
      { title: "Job Applications", href: "/admin/job-applications", icon: Briefcase },
      { title: "Support Tickets", href: "/admin/support/tickets", icon: Ticket },
    ],
  },
  {
    title: "Communications",
    icon: Mail,
    children: [
      { title: "Email Campaigns", href: "/admin/email-campaigns", icon: Mail },
      { title: "Inbox", href: "/admin/communications/inbox", icon: Inbox },
      { title: "Newsletter", href: "/admin/communications/newsletter", icon: Newspaper },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "Site Settings", href: "/admin/settings/site", icon: Settings },
      { title: "User Roles", href: "/admin/settings/users", icon: UserCog },
      { title: "Billing", href: "/admin/settings/billing", icon: CreditCard },
    ],
  },
  {
    title: "Digital Library",
    icon: Library,
    children: [
      { title: "All Books", href: "/admin/books", icon: BookOpen },
      { title: "Add Book", href: "/admin/books/new", icon: Layers },
      { title: "Book Access IDs", href: "/admin/ecommerce/book-access", icon: KeyRound },
    ],
  },
  {
    title: "Testing",
    icon: TestTube,
    children: [
      { title: "System Health", href: "/admin/testing", icon: HeartHandshake },
      { title: "Launch Checklist", href: "/admin/testing/checklist", icon: Rocket },
    ],
  },
];

interface CyberSidebarProps {
  isOpen: boolean;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function CyberSidebar({
  isOpen,
  isMobileOpen,
  onMobileClose,
}: CyberSidebarProps) {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["Dashboard"]);

  const toggleMenu = (title: string) => {
    setExpandedMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
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
                  {active && (
                    <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-[#3B82F6] to-[#06B6D4] rounded-r" />
                  )}
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {isOpen && (
                    <>
                      <span className="flex-1 text-left text-sm font-medium">
                        {item.title}
                      </span>
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
                    ${
                      active
                        ? "bg-gray-800 text-[#F9FAFB]"
                        : "text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800/50"
                    }`}
                >
                  {active && (
                    <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-[#3B82F6] to-[#06B6D4] rounded-r" />
                  )}
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {isOpen && (
                    <span className="text-sm font-medium">{item.title}</span>
                  )}
                </Link>
              )}

              {/* Submenu */}
              <AnimatePresence>
                {item.children && expanded && isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-4 mt-1 space-y-1"
                  >
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      return (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={onMobileClose}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all
                            ${
                              location.pathname === child.href
                                ? "text-[#06B6D4] bg-[#06B6D4]/10"
                                : "text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800/50"
                            }`}
                        >
                          {ChildIcon && <ChildIcon className="h-4 w-4" />}
                          {child.title}
                        </Link>
                      );
                    })}
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
