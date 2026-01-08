import { Activity, ShieldCheck, AlertTriangle, Database } from "lucide-react";
import { NeonMetricCard } from "./NeonMetricCard";

export function NeonDashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <NeonMetricCard
        icon={Activity}
        title="Active Scanners"
        value={8}
        suffix=" Running"
        accentColor="cyan"
        index={0}
        trend="up"
        trendValue="2 more"
        sparklineData={[50, 60, 55, 70, 65, 80, 75, 85, 80, 90]}
        status="healthy"
      />
      <NeonMetricCard
        icon={ShieldCheck}
        title="Threats Blocked"
        value={1240}
        accentColor="green"
        index={1}
        trend="up"
        trendValue="+12%"
        sparklineData={[40, 45, 50, 55, 60, 70, 75, 85, 90, 95]}
        status="healthy"
      />
      <NeonMetricCard
        icon={AlertTriangle}
        title="Pending Alerts"
        value={3}
        suffix=" Critical"
        accentColor="red"
        index={2}
        trend="down"
        trendValue="-2"
        sparklineData={[80, 70, 75, 65, 60, 55, 50, 45, 40, 35]}
        status="critical"
      />
      <NeonMetricCard
        icon={Database}
        title="Database Sync"
        value={100}
        suffix="%"
        accentColor="purple"
        index={3}
        trend="neutral"
        trendValue="Up to Date"
        sparklineData={[90, 92, 95, 93, 98, 96, 99, 97, 100, 100]}
        status="healthy"
      />
    </div>
  );
}
