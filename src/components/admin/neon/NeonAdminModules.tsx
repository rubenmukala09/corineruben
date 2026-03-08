import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  FileText,
  Users,
  ShoppingCart,
  Mail,
  Settings,
  Briefcase,
  CheckCircle2,
  Shield,
  BarChart3,
  Package,
  MessageSquare,
  Star,
  UserPlus,
  Globe,
  CreditCard,
  Activity,
} from "lucide-react";

interface ModuleStats {
  pendingBookings?: number;
  pendingInquiries?: number;
  pendingApplications?: number;
  unreadMessages?: number;
  lowStockProducts?: number;
}

interface NeonAdminModulesProps {
  stats?: ModuleStats;
}

const modules = [
  {
    title: "Security Center",
    description: "Threat monitoring & protection",
    icon: Shield,
    href: "/admin",
    gradient: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-500/20",
    badge: null,
  },
  {
    title: "Content Management",
    description: "Pages, articles & testimonials",
    icon: FileText,
    href: "/admin/content/pages",
    gradient: "from-purple-500 to-pink-600",
    glow: "shadow-purple-500/20",
    badge: null,
  },
  {
    title: "Client Management",
    description: "Businesses & individuals",
    icon: Users,
    href: "/admin/clients/businesses",
    gradient: "from-blue-500 to-indigo-600",
    glow: "shadow-blue-500/20",
    badge: null,
  },
  {
    title: "E-Commerce",
    description: "Products, orders & inventory",
    icon: ShoppingCart,
    href: "/admin/ecommerce/products",
    gradient: "from-green-500 to-emerald-600",
    glow: "shadow-green-500/20",
    badgeKey: "lowStockProducts",
  },
  {
    title: "Service Requests",
    description: "Bookings & inquiries",
    icon: Briefcase,
    href: "/admin/bookings",
    gradient: "from-amber-500 to-orange-600",
    glow: "shadow-orange-500/20",
    badgeKey: "pendingBookings",
  },
  {
    title: "Communications",
    description: "Email campaigns & inbox",
    icon: Mail,
    href: "/admin/email-campaigns",
    gradient: "from-pink-500 to-rose-600",
    glow: "shadow-pink-500/20",
    badgeKey: "unreadMessages",
  },
  {
    title: "Analytics",
    description: "Reports & insights",
    icon: BarChart3,
    href: "/admin/analytics",
    gradient: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/20",
    badge: null,
  },
  {
    title: "System Health",
    description: "Monitoring & diagnostics",
    icon: Activity,
    href: "/admin/testing",
    gradient: "from-teal-500 to-cyan-600",
    glow: "shadow-teal-500/20",
    badge: null,
  },
];

export function NeonAdminModules({ stats }: NeonAdminModulesProps) {
  const getBadgeValue = (badgeKey?: string) => {
    if (!badgeKey || !stats) return null;
    const value = stats[badgeKey as keyof ModuleStats];
    return value && value > 0 ? value : null;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-purple-400" />
          Admin Modules
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {modules.map((module) => {
          const Icon = module.icon;
          const badgeValue = getBadgeValue(module.badgeKey);

          return (
            <Link key={module.title} to={module.href}>
              <Card
                className={`relative overflow-hidden bg-[#1F2937] border-gray-800/50 p-4 hover:border-gray-700/50 transition-all duration-200 group cursor-pointer shadow-lg ${module.glow} hover:scale-[1.02]`}
              >
                <div
                  className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 transition-opacity duration-500`}
                />

                {badgeValue && (
                  <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {badgeValue}
                  </span>
                )}

                <div className="relative z-10">
                  <div
                    className={`w-10 h-10 mb-3 bg-gradient-to-br ${module.gradient} rounded-lg flex items-center justify-center shadow-lg ${module.glow} group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-medium text-white text-sm group-hover:text-cyan-400 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                    {module.description}
                  </p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
