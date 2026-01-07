import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { motion } from "framer-motion";

type TimeFrame = "6months" | "12months" | "alltime";

interface ChartData {
  month: string;
  revenue: number;
  date: Date;
}

export function RevenueChart() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("6months");
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    total: 0,
    average: 0,
    highest: { amount: 0, month: "" },
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchRevenueData();
  }, [timeFrame]);

  const fetchRevenueData = async () => {
    try {
      setLoading(true);

      const now = new Date();
      let startDate = new Date();

      // Calculate start date based on timeframe
      if (timeFrame === "6months") {
        startDate.setMonth(now.getMonth() - 6);
      } else if (timeFrame === "12months") {
        startDate.setMonth(now.getMonth() - 12);
      } else {
        // All time - get earliest order
        const { data: earliestOrder } = await supabase
          .from("order_items")
          .select("created_at")
          .order("created_at", { ascending: true })
          .limit(1)
          .single();

        if (earliestOrder) {
          startDate = new Date(earliestOrder.created_at);
        }
      }

      // Fetch order items
      const { data: orderItems, error } = await supabase
        .from("order_items")
        .select("total, created_at")
        .gte("created_at", startDate.toISOString());

      if (error) throw error;

      // Group by month
      const monthlyRevenue = new Map<string, { revenue: number; date: Date }>();
      
      orderItems?.forEach((item) => {
        const date = new Date(item.created_at);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        
        if (!monthlyRevenue.has(monthKey)) {
          monthlyRevenue.set(monthKey, {
            revenue: 0,
            date: new Date(date.getFullYear(), date.getMonth(), 1),
          });
        }
        
        const current = monthlyRevenue.get(monthKey)!;
        current.revenue += Number(item.total || 0);
      });

      // Convert to array and sort
      const data = Array.from(monthlyRevenue.entries())
        .map(([key, value]) => ({
          month: value.date.toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
          revenue: Math.round(value.revenue),
          date: value.date,
        }))
        .sort((a, b) => a.date.getTime() - b.date.getTime());

      setChartData(data);

      // Calculate summary
      const total = data.reduce((sum, item) => sum + item.revenue, 0);
      const average = data.length > 0 ? total / data.length : 0;
      const highest = data.reduce(
        (max, item) => (item.revenue > max.amount ? { amount: item.revenue, month: item.month } : max),
        { amount: 0, month: "" }
      );

      setSummary({ total, average, highest });
    } catch (error: any) {
      console.error("Error fetching revenue data:", error);
      toast({
        title: "Error",
        description: "Failed to load revenue data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const exportChart = () => {
    // Create a CSV export
    const csvContent = [
      ["Month", "Revenue"],
      ...chartData.map((item) => [item.month, item.revenue]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `revenue-${timeFrame}-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Revenue data has been downloaded",
    });
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-foreground">{payload[0].payload.month}</p>
          <p className="text-lg font-bold text-primary">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="p-4 sm:p-6 mt-4 sm:mt-8 rounded-xl shadow-sm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Revenue Overview</h2>

          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            {/* Time Frame Tabs */}
            <div className="flex gap-1 sm:gap-2 flex-1 sm:flex-initial">
              {[
                { value: "6months" as TimeFrame, label: "6M" },
                { value: "12months" as TimeFrame, label: "12M" },
                { value: "alltime" as TimeFrame, label: "All" },
              ].map((tab) => (
                <Button
                  key={tab.value}
                  variant={timeFrame === tab.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeFrame(tab.value)}
                  className={`transition-all duration-300 flex-1 sm:flex-initial text-xs sm:text-sm ${
                    timeFrame === tab.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </Button>
              ))}
            </div>

            {/* Export Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={exportChart}
              className="relative group flex-shrink-0"
              title="Download Chart"
            >
              <Download className="h-4 w-4" />
              <span className="absolute -top-8 right-0 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
                Download Chart
              </span>
            </Button>
          </div>
        </div>

        {/* Chart */}
        {loading ? (
          <div className="h-64 sm:h-80 admin-chart flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : chartData.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-64 sm:h-80 admin-chart"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  tickLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  tickLine={false}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  width={45}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="url(#lineGradient)"
                  strokeWidth={3}
                  fill="url(#colorRevenue)"
                  animationDuration={1500}
                  animationEasing="ease-out"
                  dot={{
                    fill: "hsl(var(--primary))",
                    strokeWidth: 2,
                    r: 4,
                    stroke: "hsl(var(--background))",
                  }}
                  activeDot={{
                    r: 6,
                    fill: "hsl(var(--primary))",
                    stroke: "hsl(var(--background))",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        ) : (
          <div className="h-80 flex flex-col items-center justify-center text-center p-8">
            <span className="text-4xl mb-4">📊</span>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Revenue Data</h3>
            <p className="text-muted-foreground text-sm">Revenue will appear here as orders come in</p>
          </div>
        )}

        {/* Data Summary */}
        {!loading && chartData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-foreground">
                ${summary.total.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Average per Month</p>
              <p className="text-2xl font-bold text-foreground">
                ${Math.round(summary.average).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Highest Month</p>
              <p className="text-2xl font-bold text-foreground">
                ${summary.highest.amount.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{summary.highest.month}</p>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}
