import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Users,
  ShoppingCart,
  Mail,
  Settings,
  X,
  ChevronDown,
  CheckCircle2,
  Briefcase,
  Shield,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/hooks/useUserRole";

interface MenuItem {
  title: string;
  icon: React.ElementType;
  href?: string;
  permission?: string;
  gradient: string;
  children?: {
    title: string;
    href: string;
    permission?: string;
  }[];
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Content",
    icon: FileText,
    gradient: "from-cyan-400 to-blue-500",
    children: [
      { title: "Pages", href: "/admin/content/pages" },
      { title: "Testimonials", href: "/admin/content/testimonials" },
      {
        title: "Articles",
        href: "/admin/content/articles",
        permission: "view_training",
      },
      { title: "Team", href: "/admin/content/team" },
    ],
  },
  {
    title: "Clients",
    icon: Users,
    gradient: "from-emerald-400 to-teal-500",
    children: [
      {
        title: "Businesses",
        href: "/admin/clients/businesses",
        permission: "view_business_clients",
      },
      {
        title: "Individuals",
        href: "/admin/clients/individuals",
        permission: "view_individual_clients",
      },
      {
        title: "Messages",
        href: "/admin/clients/messages",
        permission: "view_messages",
      },
    ],
  },
  {
    title: "E-Commerce",
    icon: ShoppingCart,
    permission: "view_products",
    gradient: "from-orange-400 to-rose-500",
    children: [
      { title: "Products", href: "/admin/ecommerce/products" },
      { title: "Orders", href: "/admin/ecommerce/orders" },
      { title: "Inventory", href: "/admin/ecommerce/inventory" },
      { title: "Donations", href: "/admin/donations" },
    ],
  },
  {
    title: "Requests",
    icon: Briefcase,
    gradient: "from-amber-400 to-orange-500",
    children: [
      { title: "Service Inquiries", href: "/admin/service-inquiries" },
      { title: "Bookings", href: "/admin/bookings" },
      { title: "Subscriptions", href: "/admin/subscriptions" },
    ],
  },
  {
    title: "Communications",
    icon: Mail,
    permission: "view_messages",
    gradient: "from-pink-400 to-rose-500",
    children: [
      { title: "Email Campaigns", href: "/admin/email-campaigns" },
      { title: "Inbox", href: "/admin/communications/inbox" },
      { title: "Newsletter", href: "/admin/communications/newsletter" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    gradient: "from-slate-400 to-zinc-500",
    children: [
      { title: "Site Settings", href: "/admin/settings/site" },
      { title: "Users", href: "/admin/settings/users" },
      { title: "Billing", href: "/admin/settings/billing" },
    ],
  },
  {
    title: "Testing",
    icon: CheckCircle2,
    gradient: "from-green-400 to-emerald-500",
    children: [
      { title: "System Health", href: "/admin/testing" },
      { title: "Launch Checklist", href: "/admin/testing/checklist" },
    ],
  },
];

interface PremiumSidebarProps {
  isOpen: boolean;
  onMobileClose?: () => void;
  isMobileOpen?: boolean;
}

export const PremiumSidebar = ({
  isOpen,
  onMobileClose,
  isMobileOpen = false,
}: PremiumSidebarProps) => {
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();
  const collapsed = !isOpen;
  const { hasPermission, isAdmin } = useUserRole();

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const canAccessItem = (permission?: string) => {
    if (!permission) return true;
    if (isAdmin()) return true;
    return hasPermission(permission);
  };

  const filteredMenuItems = menuItems
    .filter((item) => canAccessItem(item.permission))
    .map((item) => ({
      ...item,
      children: item.children?.filter((child) =>
        canAccessItem(child.permission),
      ),
    }));

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((m) => m !== title) : [...prev, title],
    );
  };

  const isActive = (href: string) => location.pathname === href;
  const isParentActive = (children?: { href: string }[]) =>
    children?.some((child) => location.pathname === child.href);

  const SidebarContent = () => (
    <div className="flex flex-col h-full relative">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient glow effects */}
      <div className="absolute top-20 -left-20 w-40 h-40 bg-violet-500/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-40 -right-10 w-32 h-32 bg-cyan-500/15 rounded-full blur-[60px] pointer-events-none" />

      {/* Logo Section */}
      <div className="h-20 flex items-center px-5 border-b border-white/[0.06] relative z-10">
        <Link to="/admin" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow duration-300">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="text-base font-semibold text-white tracking-tight">
                InVision
              </span>
              <span className="text-[10px] text-white/40 font-medium tracking-widest uppercase">
                Network
              </span>
            </motion.div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 relative z-10">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const hasChildren = !!item.children;
          const isMenuOpen = openMenus.includes(item.title);
          const parentActive = isParentActive(item.children);
          const isHovered = hoveredItem === item.title;
          const itemActive = item.href ? isActive(item.href) : parentActive;

          if (!hasChildren) {
            return (
              <motion.div
                key={item.title}
                onHoverStart={() => setHoveredItem(item.title)}
                onHoverEnd={() => setHoveredItem(null)}
                className="relative mb-1"
              >
                {/* Glow effect on hover/active */}
                <AnimatePresence>
                  {(isHovered || itemActive) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className={cn(
                        "absolute inset-0 rounded-xl blur-xl pointer-events-none",
                        `bg-gradient-to-r ${item.gradient}`,
                      )}
                      style={{ opacity: itemActive ? 0.25 : 0.15 }}
                    />
                  )}
                </AnimatePresence>

                <Link
                  to={item.href!}
                  className={cn(
                    "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                    "backdrop-blur-sm border border-transparent",
                    itemActive
                      ? "bg-white/[0.08] border-white/[0.1] shadow-lg"
                      : "hover:bg-white/[0.04] hover:border-white/[0.06]",
                    collapsed && "justify-center px-3",
                  )}
                  onClick={onMobileClose}
                >
                  {/* Icon with glow */}
                  <div className="relative">
                    <Icon
                      className={cn(
                        "h-5 w-5 transition-all duration-300",
                        itemActive ? "text-white" : "text-white/60",
                      )}
                    />
                    {itemActive && (
                      <div
                        className={cn(
                          "absolute inset-0 blur-md",
                          `bg-gradient-to-r ${item.gradient}`,
                        )}
                        style={{ opacity: 0.6 }}
                      />
                    )}
                  </div>

                  {!collapsed && (
                    <span
                      className={cn(
                        "text-sm font-medium transition-colors duration-300",
                        itemActive ? "text-white" : "text-white/70",
                      )}
                    >
                      {item.title}
                    </span>
                  )}

                  {/* Active indicator */}
                  {itemActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={cn(
                        "absolute right-3 w-1.5 h-1.5 rounded-full",
                        `bg-gradient-to-r ${item.gradient}`,
                      )}
                    />
                  )}
                </Link>
              </motion.div>
            );
          }

          return (
            <div
              key={item.title}
              className="mb-1 relative"
              onMouseEnter={() => setHoveredItem(item.title)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Glow effect */}
              <AnimatePresence>
                {(hoveredItem === item.title || parentActive) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={cn(
                      "absolute inset-0 rounded-xl blur-xl pointer-events-none -z-10",
                      `bg-gradient-to-r ${item.gradient}`,
                    )}
                    style={{ opacity: parentActive ? 0.2 : 0.1 }}
                  />
                )}
              </AnimatePresence>

              <button
                onClick={() => toggleMenu(item.title)}
                className={cn(
                  "relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                  "backdrop-blur-sm border border-transparent",
                  parentActive
                    ? "bg-white/[0.08] border-white/[0.1]"
                    : "hover:bg-white/[0.04] hover:border-white/[0.06]",
                  collapsed && "justify-center px-3",
                )}
              >
                <div className="relative">
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-all duration-300",
                      parentActive ? "text-white" : "text-white/60",
                    )}
                  />
                  {parentActive && (
                    <div
                      className={cn(
                        "absolute inset-0 blur-md",
                        `bg-gradient-to-r ${item.gradient}`,
                      )}
                      style={{ opacity: 0.6 }}
                    />
                  )}
                </div>

                {!collapsed && (
                  <>
                    <span
                      className={cn(
                        "flex-1 text-left text-sm font-medium transition-colors duration-300",
                        parentActive ? "text-white" : "text-white/70",
                      )}
                    >
                      {item.title}
                    </span>
                    <motion.div
                      animate={{ rotate: isMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4 text-white/40" />
                    </motion.div>
                  </>
                )}
              </button>

              {/* Submenu */}
              <AnimatePresence>
                {isMenuOpen && !collapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-4 mt-1 pl-4 border-l border-white/[0.06] space-y-0.5">
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={onMobileClose}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                            isActive(child.href)
                              ? "text-white bg-white/[0.06]"
                              : "text-white/50 hover:text-white/80 hover:bg-white/[0.03]",
                          )}
                        >
                          {isActive(child.href) && (
                            <motion.div
                              layoutId="subActiveIndicator"
                              className={cn(
                                "w-1 h-1 rounded-full",
                                `bg-gradient-to-r ${item.gradient}`,
                              )}
                            />
                          )}
                          <span className={isActive(child.href) ? "" : "ml-2"}>
                            {child.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Profile Widget */}
      {!collapsed && (
        <div className="p-4 border-t border-white/[0.06] relative z-10">
          <div className="relative p-4 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
            {/* Decorative glow */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full blur-2xl" />

            <div className="relative flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0a0a0f]">
                  <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  Admin Portal
                </p>
                <p className="text-xs text-white/40">System Online</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen text-white transition-all duration-500 ease-out z-30 hidden md:block",
          "bg-[#0a0a0f]/95 backdrop-blur-2xl border-r border-white/[0.06]",
          "shadow-[0_0_60px_-15px_rgba(139,92,246,0.3)]",
          collapsed ? "w-[70px]" : "w-[260px]",
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
              onClick={onMobileClose}
            />

            {/* Mobile Sidebar */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={cn(
                "fixed left-0 top-0 h-screen w-[280px] z-50 md:hidden",
                "bg-[#0a0a0f]/98 backdrop-blur-2xl border-r border-white/[0.06]",
                "shadow-[0_0_60px_-15px_rgba(139,92,246,0.4)]",
              )}
            >
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-5 right-4 z-10 text-white/60 hover:text-white hover:bg-white/10 rounded-xl"
                onClick={onMobileClose}
              >
                <X size={20} />
              </Button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
