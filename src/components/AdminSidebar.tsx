import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Users,
  ShoppingCart,
  Mail,
  Settings,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Newspaper,
  Star,
  UserCircle,
  Building2,
  MessageSquare,
  Package,
  ShoppingBag,
  Boxes,
  Inbox,
  Send,
  Globe,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useUserRole } from "@/hooks/useUserRole";

interface MenuItem {
  title: string;
  icon: React.ElementType;
  href?: string;
  permission?: string;
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
  },
  {
    title: "Content",
    icon: FileText,
    children: [
      { title: "Pages", href: "/admin/content/pages" },
      { title: "Testimonials", href: "/admin/content/testimonials" },
      { title: "Articles", href: "/admin/content/articles", permission: "view_training" },
      { title: "Team", href: "/admin/content/team" },
    ],
  },
  {
    title: "Clients",
    icon: Users,
    children: [
      { title: "Businesses", href: "/admin/clients/businesses", permission: "view_business_clients" },
      { title: "Individuals", href: "/admin/clients/individuals", permission: "view_individual_clients" },
      { title: "Messages", href: "/admin/clients/messages", permission: "view_messages" },
    ],
  },
  {
    title: "E-Commerce",
    icon: ShoppingCart,
    permission: "view_products",
    children: [
      { title: "Products", href: "/admin/ecommerce/products" },
      { title: "Orders", href: "/admin/ecommerce/orders" },
      { title: "Inventory", href: "/admin/ecommerce/inventory" },
    ],
  },
  {
    title: "Communications",
    icon: Mail,
    permission: "view_messages",
    children: [
      { title: "Inbox", href: "/admin/communications/inbox" },
      { title: "Newsletter", href: "/admin/communications/newsletter" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "Site Settings", href: "/admin/settings/site" },
      { title: "Users", href: "/admin/settings/users" },
      { title: "Billing", href: "/admin/settings/billing" },
    ],
  },
  {
    title: "Testing",
    icon: CheckCircle2,
    children: [
      { title: "System Health", href: "/admin/testing" },
      { title: "Launch Checklist", href: "/admin/testing/checklist" },
    ],
  },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onMobileClose?: () => void;
  isMobileOpen?: boolean;
}

export const AdminSidebar = ({ isOpen, onMobileClose, isMobileOpen = false }: AdminSidebarProps) => {
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const location = useLocation();
  const collapsed = !isOpen;
  const { hasPermission, isAdmin } = useUserRole();

  const canAccessItem = (permission?: string) => {
    if (!permission) return true;
    if (isAdmin()) return true;
    return hasPermission(permission);
  };

  const filteredMenuItems = menuItems.filter(item => canAccessItem(item.permission))
    .map(item => ({
      ...item,
      children: item.children?.filter(child => canAccessItem(child.permission))
    }));

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((m) => m !== title) : [...prev, title]
    );
  };

  const isActive = (href: string) => location.pathname === href;
  const isParentActive = (children?: { href: string }[]) =>
    children?.some((child) => location.pathname === child.href);

  const SidebarContent = () => (
    <div className="flex flex-col h-full pt-16">
      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const hasChildren = !!item.children;
          const isMenuOpen = openMenus.includes(item.title);
          const parentActive = isParentActive(item.children);

          if (!hasChildren) {
            return (
              <Link
                key={item.title}
                to={item.href!}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-300 ease-out relative",
                  "hover:bg-[#2A2540]",
                  isActive(item.href!) && "bg-[#2A2540] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#14B8A6] before:rounded-r"
                )}
                onClick={onMobileClose}
              >
                {isActive(item.href!) && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500 rounded-r-full" />
                )}
                <Icon
                  className={cn(
                    "h-5 w-5 text-white flex-shrink-0 transition-opacity duration-300",
                    collapsed && "mx-auto opacity-70"
                  )}
                />
                {!collapsed && (
                  <span className="text-white text-sm font-medium">
                    {item.title}
                  </span>
                )}
              </Link>
            );
          }

          return (
            <Collapsible
              key={item.title}
              open={isMenuOpen}
              onOpenChange={() => toggleMenu(item.title)}
            >
              <CollapsibleTrigger
                className={cn(
                  "flex items-center gap-3 w-full px-4 py-3 mx-2 rounded-lg transition-all duration-300 ease-out",
                  "hover:bg-[#2A2540] group relative",
                  parentActive && "bg-[#2A2540]"
                )}
              >
                {parentActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500 rounded-r-full" />
                )}
                <Icon
                  className={cn(
                    "h-5 w-5 text-white flex-shrink-0 transition-opacity duration-300",
                    collapsed && "mx-auto opacity-70"
                  )}
                />
                {!collapsed && (
                  <>
                    <span className="text-white text-sm font-medium flex-1 text-left">
                      {item.title}
                    </span>
                    {isMenuOpen ? (
                      <ChevronDown className="h-4 w-4 text-white/70 transition-transform duration-300" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-white/70 transition-transform duration-300" />
                    )}
                  </>
                )}
              </CollapsibleTrigger>
              {!collapsed && (
                <CollapsibleContent className="space-y-1 mt-1">
                  {item.children?.map((child) => (
                    <Link
                      key={child.href}
                      to={child.href}
                      className={cn(
                        "flex items-center gap-3 pl-12 pr-4 py-2 mx-2 rounded-lg transition-all duration-300 ease-out",
                        "hover:bg-[#2A2540] relative",
                        isActive(child.href) && "bg-[#2A2540]"
                      )}
                      onClick={onMobileClose}
                    >
                      {isActive(child.href) && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500 rounded-r-full" />
                      )}
                      <span className="text-white/90 text-xs">
                        {child.title}
                      </span>
                    </Link>
                  ))}
                </CollapsibleContent>
              )}
            </Collapsible>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-[#1A1626] text-white transition-all duration-300 ease-out z-30 border-r border-white/5 shadow-2xl hidden md:block",
          collapsed ? "w-[70px]" : "w-[260px]"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 z-40 md:hidden animate-fade-in backdrop-blur-sm"
            onClick={onMobileClose}
          />
          
          {/* Mobile Sidebar - Slides in from left */}
          <aside
            className={cn(
              "fixed left-0 top-0 h-screen w-[280px] bg-[#1A1626] text-white z-50 md:hidden",
              "transform transition-transform duration-300 ease-out shadow-2xl",
              isMobileOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            {/* Close button inside sidebar */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-[#2A2540] rounded-full"
              onClick={onMobileClose}
            >
              <X size={20} />
            </Button>
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
};
