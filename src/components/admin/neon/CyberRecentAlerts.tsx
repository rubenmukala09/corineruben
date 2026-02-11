import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, ChevronRight, Shield, AlertTriangle, Wifi, Mail, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Alert {
  id: string;
  type: "phishing" | "malware" | "network" | "breach" | "deepfake";
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: Date;
}

const severityConfig = {
  low: { 
    color: "text-[#9CA3AF]", 
    bg: "bg-gray-500/10", 
    border: "border-gray-700", 
    pulse: false 
  },
  medium: { 
    color: "text-[#FBBF24]", 
    bg: "bg-[#FBBF24]/10", 
    border: "border-[#FBBF24]/30", 
    pulse: false 
  },
  high: { 
    color: "text-[#F97316]", 
    bg: "bg-[#F97316]/10", 
    border: "border-[#F97316]/30", 
    pulse: false 
  },
  critical: { 
    color: "text-[#EF4444]", 
    bg: "bg-[#EF4444]/10", 
    border: "border-[#EF4444]/30", 
    pulse: true 
  },
};

const typeIcons = {
  phishing: Mail,
  malware: AlertTriangle,
  network: Wifi,
  breach: Shield,
  deepfake: Smartphone,
};

export function CyberRecentAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from("threat_events")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (data && data.length > 0) {
        const mappedAlerts: Alert[] = data.map((event: any) => ({
          id: event.id,
          type: mapThreatType(event.threat_type),
          title: event.threat_type || "Security Alert",
          description: event.description || "Threat detected and logged",
          severity: mapSeverity(event.severity),
          timestamp: new Date(event.created_at),
        }));
        setAlerts(mappedAlerts);
      } else {
        setAlerts([]);
      }
    } catch (err) {
      console.error("Error loading alerts:", err);
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  const mapThreatType = (type: string): Alert["type"] => {
    const typeMap: Record<string, Alert["type"]> = {
      phishing: "phishing",
      deepfake: "deepfake",
      malware: "malware",
      network: "network",
      breach: "breach",
    };
    return typeMap[type?.toLowerCase()] || "phishing";
  };

  const mapSeverity = (severity: string): Alert["severity"] => {
    const sevMap: Record<string, Alert["severity"]> = {
      low: "low",
      medium: "medium",
      high: "high",
      critical: "critical",
    };
    return sevMap[severity?.toLowerCase()] || "medium";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="p-6 bg-[#111827] border border-gray-800 rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center relative">
              <Bell className="h-5 w-5 text-white" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#EF4444] rounded-full text-[10px] text-white flex items-center justify-center font-bold animate-pulse">
                {alerts.length}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#F9FAFB]">Security Alerts</h2>
              <p className="text-sm text-[#9CA3AF]">Real-time notifications</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#06B6D4] hover:text-[#06B6D4] hover:bg-[#06B6D4]/10"
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Alert List */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#374151 #111827' }}>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-[#9CA3AF] text-sm">Loading alerts...</p>
            </div>
          ) : alerts.length === 0 ? (
            <div className="text-center py-8 px-4">
              <Shield className="w-12 h-12 mx-auto text-[#10B981] mb-3 opacity-50" />
              <p className="text-[#9CA3AF] text-sm mb-1">No security alerts</p>
              <p className="text-xs text-gray-500">Your systems are running smoothly</p>
            </div>
          ) : (
          <AnimatePresence>
            {alerts.map((alert, index) => {
              const severity = severityConfig[alert.severity];
              const Icon = typeIcons[alert.type];

              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className={`p-4 rounded-lg ${severity.bg} border ${severity.border} 
                    hover:border-opacity-100 transition-all cursor-pointer group`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg ${severity.bg} flex items-center justify-center flex-shrink-0
                      ${severity.pulse ? 'animate-pulse' : ''}`}>
                      <Icon className={`h-4 w-4 ${severity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-[#F9FAFB] truncate">
                          {alert.title}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${severity.bg} ${severity.color} font-medium uppercase border ${severity.border}`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-xs text-[#9CA3AF] line-clamp-1 mb-2">
                        {alert.description}
                      </p>
                      <p className="text-xs text-gray-600">
                        {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
