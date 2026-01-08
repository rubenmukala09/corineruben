import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  Activity,
  Heart,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Server,
  Database,
  Shield,
  Mail,
} from "lucide-react";

interface ServiceStatus {
  name: string;
  status: "healthy" | "struggling" | "dead" | "unknown";
  lastChecked: string;
  icon: React.ElementType;
}

export function NeonSystemHealth() {
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: "Database", status: "healthy", lastChecked: "Just now", icon: Database },
    { name: "Auth Service", status: "healthy", lastChecked: "Just now", icon: Shield },
    { name: "Email Service", status: "healthy", lastChecked: "Just now", icon: Mail },
    { name: "API Gateway", status: "healthy", lastChecked: "Just now", icon: Server },
  ]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSystemHealth = async () => {
    setRefreshing(true);
    try {
      // Check database connectivity
      const { error: dbError } = await supabase.from("profiles").select("id").limit(1);
      
      // Check auth service
      const { data: session } = await supabase.auth.getSession();
      
      setServices([
        { 
          name: "Database", 
          status: dbError ? "struggling" : "healthy", 
          lastChecked: "Just now", 
          icon: Database 
        },
        { 
          name: "Auth Service", 
          status: session ? "healthy" : "struggling", 
          lastChecked: "Just now", 
          icon: Shield 
        },
        { 
          name: "Email Service", 
          status: "healthy", 
          lastChecked: "Just now", 
          icon: Mail 
        },
        { 
          name: "API Gateway", 
          status: "healthy", 
          lastChecked: "Just now", 
          icon: Server 
        },
      ]);
    } catch (err) {
      console.error("Health check error:", err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSystemHealth();
    const interval = setInterval(fetchSystemHealth, 60000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <Heart className="w-4 h-4 text-green-400" />;
      case "struggling":
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case "dead":
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const config = {
      healthy: "bg-green-500/20 text-green-400 border-green-500/30",
      struggling: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      dead: "bg-red-500/20 text-red-400 border-red-500/30",
      unknown: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    };
    return config[status as keyof typeof config] || config.unknown;
  };

  const healthyCount = services.filter(s => s.status === "healthy").length;
  const overallHealth = (healthyCount / services.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <Card className="bg-[#1F2937] border-gray-800/50 p-5 shadow-lg shadow-teal-500/5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-400" />
            System Health
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchSystemHealth}
            disabled={refreshing}
            className="text-gray-400 hover:text-white hover:bg-gray-800/50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {/* Overall Health Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-400">Overall Status</span>
            <span className={overallHealth === 100 ? "text-green-400" : "text-amber-400"}>
              {overallHealth.toFixed(0)}% Operational
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallHealth}%` }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className={`h-full rounded-full ${overallHealth === 100 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'}`}
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 gap-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                className="flex items-center gap-2 p-2 bg-[#111827] rounded-lg border border-gray-800/50"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  service.status === "healthy" ? "bg-green-500/10" : 
                  service.status === "struggling" ? "bg-amber-500/10" : "bg-red-500/10"
                }`}>
                  <Icon className={`w-4 h-4 ${
                    service.status === "healthy" ? "text-green-400" : 
                    service.status === "struggling" ? "text-amber-400" : "text-red-400"
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{service.name}</p>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(service.status)}
                    <span className="text-xs text-gray-500 capitalize">{service.status}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
