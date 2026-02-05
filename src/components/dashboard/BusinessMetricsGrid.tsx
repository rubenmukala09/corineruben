import { TrendingUp, TrendingDown, DollarSign, Users, Clock, Phone, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface MetricCardProps {
  title: string;
  value: string | null;
  change: number | null;
  icon: React.ElementType;
  color: string;
  isPlaceholder?: boolean;
}

function MetricCard({ title, value, change, icon: Icon, color, isPlaceholder }: MetricCardProps) {
  const isPositive = change !== null && change >= 0;
  
  if (isPlaceholder || value === null) {
    return (
      <Card className="relative overflow-hidden border-dashed border-muted-foreground/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center`}>
              <Icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-xs text-muted-foreground">Setup Required</div>
          </div>
          <div className="mt-3">
            <p className="text-lg font-medium text-muted-foreground">-</p>
            <p className="text-xs text-muted-foreground">{title}</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-20 h-20 rounded-full -mr-10 -mt-10 opacity-10 ${color}`} />
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          {change !== null && (
            <div className={`flex items-center gap-1 text-xs font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {Math.abs(change)}%
            </div>
          )}
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}

interface BusinessMetricsGridProps {
  revenueSaved?: number | null;
  leadsCaptured?: number | null;
  avgResponseTime?: number | null;
  callsHandled?: number | null;
  hasActiveAutomation?: boolean;
}

export function BusinessMetricsGrid({ 
  revenueSaved = null,
  leadsCaptured = null,
  avgResponseTime = null,
  callsHandled = null,
  hasActiveAutomation = false
}: BusinessMetricsGridProps) {
  const navigate = useNavigate();
  
  // If no automation is active, show setup state
  if (!hasActiveAutomation) {
    return (
      <Card className="border-dashed border-muted-foreground/30">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-muted flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No Automation Configured</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            Set up your first AI automation to start tracking metrics like revenue saved, leads captured, and response times.
          </p>
          <Button onClick={() => navigate("/business/ai-automation")}>
            Configure Automation
          </Button>
        </CardContent>
      </Card>
    );
  }

  const metrics = [
    {
      title: "Revenue Saved",
      value: revenueSaved !== null ? `$${revenueSaved.toLocaleString()}` : null,
      change: revenueSaved !== null ? 23 : null,
      icon: DollarSign,
      color: "bg-emerald-500"
    },
    {
      title: "Leads Captured",
      value: leadsCaptured !== null ? leadsCaptured.toLocaleString() : null,
      change: leadsCaptured !== null ? 18 : null,
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Response Time",
      value: avgResponseTime !== null ? `${avgResponseTime}s` : null,
      change: avgResponseTime !== null ? -45 : null,
      icon: Clock,
      color: "bg-violet-500"
    },
    {
      title: "Calls Handled",
      value: callsHandled !== null ? callsHandled.toLocaleString() : null,
      change: callsHandled !== null ? 12 : null,
      icon: Phone,
      color: "bg-orange-500"
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <MetricCard {...metric} isPlaceholder={metric.value === null} />
        </motion.div>
      ))}
    </div>
  );
}
