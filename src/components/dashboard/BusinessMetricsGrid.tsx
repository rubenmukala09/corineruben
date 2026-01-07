import { TrendingUp, TrendingDown, DollarSign, Users, Clock, Phone } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
}

function MetricCard({ title, value, change, icon: Icon, color }: MetricCardProps) {
  const isPositive = change >= 0;
  
  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-20 h-20 rounded-full -mr-10 -mt-10 opacity-10 ${color}`} />
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className={`flex items-center gap-1 text-xs font-medium ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(change)}%
          </div>
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function BusinessMetricsGrid() {
  const metrics = [
    {
      title: "Revenue Saved",
      value: "$12,450",
      change: 23,
      icon: DollarSign,
      color: "bg-emerald-500"
    },
    {
      title: "Leads Captured",
      value: "847",
      change: 18,
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Response Time",
      value: "0.8s",
      change: -45,
      icon: Clock,
      color: "bg-violet-500"
    },
    {
      title: "Calls Handled",
      value: "2,341",
      change: 12,
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
          <MetricCard {...metric} />
        </motion.div>
      ))}
    </div>
  );
}
