import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, PenSquare, UserPlus, Mail, Package, Send } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface QuickAction {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  background: string;
  hoverBorder: string;
  iconColor: string;
  link: string;
  showBadge?: boolean;
}

const actions: QuickAction[] = [
  {
    id: "testimonial",
    icon: Plus,
    text: "Add Testimonial",
    background: "bg-purple-50",
    hoverBorder: "border-purple-300",
    iconColor: "text-purple-600",
    link: "/admin/testimonials",
  },
  {
    id: "article",
    icon: PenSquare,
    text: "Create Article",
    background: "bg-blue-50",
    hoverBorder: "border-blue-300",
    iconColor: "text-blue-600",
    link: "/admin/content/articles/new",
  },
  {
    id: "team",
    icon: UserPlus,
    text: "Add Team Member",
    background: "bg-green-50",
    hoverBorder: "border-green-300",
    iconColor: "text-green-600",
    link: "/admin/content/team/new",
  },
  {
    id: "messages",
    icon: Mail,
    text: "View Messages",
    background: "bg-teal-50",
    hoverBorder: "border-teal-300",
    iconColor: "text-teal-600",
    link: "/admin/messages",
    showBadge: true,
  },
  {
    id: "product",
    icon: Package,
    text: "Add Product",
    background: "bg-orange-50",
    hoverBorder: "border-orange-300",
    iconColor: "text-orange-600",
    link: "/admin/ecommerce/products/new",
  },
  {
    id: "newsletter",
    icon: Send,
    text: "Send Newsletter",
    background: "bg-pink-50",
    hoverBorder: "border-pink-300",
    iconColor: "text-pink-600",
    link: "/admin/communications/newsletter",
  },
];

export function QuickActions() {
  const navigate = useNavigate();
  const [ripples, setRipples] = useState<{ [key: string]: { x: number; y: number; id: number } | null }>({});

  // Fetch unread messages count
  const { data: unreadCount } = useQuery({
    queryKey: ["unread-messages-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("website_inquiries")
        .select("*", { count: "exact", head: true })
        .eq("status", "new");
      return count || 0;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const handleClick = (action: QuickAction, event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setRipples((prev) => ({
      ...prev,
      [action.id]: { x, y, id: Date.now() },
    }));

    setTimeout(() => {
      setRipples((prev) => ({
        ...prev,
        [action.id]: null,
      }));
    }, 600);

    setTimeout(() => {
      navigate(action.link);
    }, 200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-8"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
        <p className="text-base text-muted-foreground mt-1">Common tasks</p>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 quick-actions-grid">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const ripple = ripples[action.id];
          
          return (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
              onClick={(e) => handleClick(action, e)}
              className={`relative overflow-hidden min-h-[100px] sm:h-[120px] ${action.background} rounded-xl border-2 border-transparent 
                transition-all duration-300 ease-out
                md:hover:-translate-y-1 md:hover:shadow-lg md:hover:${action.hoverBorder}
                active:scale-[0.98]
                flex flex-col items-center justify-center p-4 sm:p-5
                cursor-pointer group`}
            >
              {/* Badge for unread messages */}
              {action.showBadge && unreadCount && unreadCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold 
                    rounded-full w-6 h-6 flex items-center justify-center"
                >
                  {unreadCount > 99 ? "99+" : unreadCount}
                </motion.div>
              )}

              {/* Icon */}
              <Icon 
                className={`w-7 h-7 sm:w-8 sm:h-8 mb-2 ${action.iconColor} transition-transform duration-300 
                  md:group-hover:scale-110`} 
              />
              
              {/* Text */}
              <span className="text-sm sm:text-base font-semibold text-gray-700 text-center px-2">
                {action.text}
              </span>

              {/* Ripple Effect */}
              {ripple && (
                <span
                  className="absolute rounded-full bg-white/40 pointer-events-none ripple-animation"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: 0,
                    height: 0,
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      <style>{`
        .ripple-animation {
          animation: ripple 0.6s ease-out;
          transform: translate(-50%, -50%);
        }
        
        @keyframes ripple {
          to {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }
      `}</style>
    </motion.div>
  );
}
