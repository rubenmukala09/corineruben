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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface MenuItem {
  title: string;
  icon: React.ElementType;
  href?: string;
  children?: {
    title: string;
    href: string;
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
      { title: "Pages", href: "/admin/pages" },
      { title: "Testimonials", href: "/admin/testimonials" },
      { title: "Articles", href: "/admin/articles" },
      { title: "Team", href: "/admin/team" },
    ],
  },
  {
    title: "Clients",
    icon: Users,
    children: [
      { title: "Businesses", href: "/admin/businesses" },
      { title: "Individuals", href: "/admin/individuals" },
      { title: "Messages", href: "/admin/messages" },
    ],
  },
  {
    title: "E-Commerce",
    icon: ShoppingCart,
    children: [
      { title: "Products", href: "/admin/products" },
      { title: "Orders", href: "/admin/orders" },
      { title: "Inventory", href: "/admin/inventory" },
    ],
  },
  {
    title: "Communications",
    icon: Mail,
    children: [
      { title: "Inbox", href: "/admin/inbox" },
      { title: "Newsletter", href: "/admin/newsletter" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "Site Settings", href: "/admin/site-settings" },
      { title: "Users", href: "/admin/users" },
      { title: "Billing", href: "/admin/billing" },
    ],
  },
];

interface AdminSidebarProps {
  isOpen: boolean;
}

export const AdminSidebar = ({ isOpen }: AdminSidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const location = useLocation();
  const collapsed = !isOpen;

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
        {menuItems.map((item) => {
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
                  "flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-300",
                  "hover:bg-[#2A2540] group relative",
                  isActive(item.href!) && "bg-[#2A2540]"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {isActive(item.href!) && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[hsl(var(--accent))] rounded-r-full" />
                )}
                <Icon
                  className={cn(
                    "h-5 w-5 text-white flex-shrink-0",
                    collapsed && "mx-auto"
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
                  "flex items-center gap-3 w-full px-4 py-3 mx-2 rounded-lg transition-all duration-300",
                  "hover:bg-[#2A2540] group relative",
                  parentActive && "bg-[#2A2540]"
                )}
              >
                {parentActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[hsl(var(--accent))] rounded-r-full" />
                )}
                <Icon
                  className={cn(
                    "h-5 w-5 text-white flex-shrink-0",
                    collapsed && "mx-auto"
                  )}
                />
                {!collapsed && (
                  <>
                    <span className="text-white text-sm font-medium flex-1 text-left">
                      {item.title}
                    </span>
                    {isMenuOpen ? (
                      <ChevronDown className="h-4 w-4 text-white/70" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-white/70" />
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
                        "flex items-center gap-3 pl-[52px] pr-4 py-2 mx-2 rounded-lg transition-all duration-300",
                        "hover:bg-[#2A2540] relative",
                        isActive(child.href) && "bg-[#2A2540]"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {isActive(child.href) && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[hsl(var(--accent))] rounded-r-full" />
                      )}
                      <span className="text-white/90 text-sm">
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
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:block fixed left-0 top-0 h-screen bg-[#1F1B2E] transition-all duration-300 ease-out z-30",
          collapsed ? "w-[70px]" : "w-[260px]"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "md:hidden fixed left-0 top-0 h-screen bg-[#1F1B2E] transition-transform duration-300 ease-out z-50 w-[260px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
};
