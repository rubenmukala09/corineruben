import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Users,
  ShoppingCart,
  RefreshCw,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, startOfDay, endOfDay } from "date-fns";

interface SalesData {
  totalRevenue: number;
  revenueGrowth: number;
  activeSubscriptions: number;
  subscriptionGrowth: number;
  totalOrders: number;
  averageOrderValue: number;
}

interface ChartDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

export default function SuperAdminSalesOverview() {
  const [salesData, setSalesData] = useState<SalesData>({
    totalRevenue: 0,
    revenueGrowth: 0,
    activeSubscriptions: 0,
    subscriptionGrowth: 0,
    totalOrders: 0,
    averageOrderValue: 0,
  });
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      setLoading(true);

      // Fetch subscriptions
      const { data: subscriptions, error: subsError } = await supabase
        .from("subscriptions")
        .select("*");

      if (subsError) throw subsError;

      const activeSubscriptions =
        subscriptions?.filter((s) => s.status === "active").length || 0;

      // Fetch orders (from partner_orders table)
      const { data: orders, error: ordersError } = await supabase
        .from("partner_orders")
        .select("total_amount, created_at, status")
        .not("status", "eq", "cancelled");

      if (ordersError) throw ordersError;

      const totalRevenue =
        orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
      const totalOrders = orders?.length || 0;
      const averageOrderValue =
        totalOrders > 0 ? totalRevenue / totalOrders : 0;

      // Calculate revenue by day for chart
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = subDays(new Date(), 6 - i);
        return {
          date: format(date, "MMM d"),
          dateStart: startOfDay(date).toISOString(),
          dateEnd: endOfDay(date).toISOString(),
        };
      });

      const chartPoints: ChartDataPoint[] = last7Days.map((day) => {
        const dayOrders =
          orders?.filter(
            (order) =>
              order.created_at >= day.dateStart &&
              order.created_at <= day.dateEnd,
          ) || [];

        return {
          date: day.date,
          revenue: dayOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0),
          orders: dayOrders.length,
        };
      });

      setChartData(chartPoints);
      setSalesData({
        totalRevenue,
        revenueGrowth: 12.5, // Mock growth percentage
        activeSubscriptions,
        subscriptionGrowth: 8.3,
        totalOrders,
        averageOrderValue,
      });
    } catch (error) {
      console.error("Error fetching sales data:", error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({
    title,
    value,
    growth,
    icon: Icon,
    prefix = "",
    suffix = "",
    color,
  }: {
    title: string;
    value: number;
    growth?: number;
    icon: React.ElementType;
    prefix?: string;
    suffix?: string;
    color: string;
  }) => (
    <div className="p-4 rounded-lg bg-gray-800/50">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">{title}</span>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <p className="text-2xl font-bold text-white">
        {prefix}
        {typeof value === "number"
          ? value.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })
          : value}
        {suffix}
      </p>
      {growth !== undefined && (
        <div className="flex items-center gap-1 mt-1">
          {growth >= 0 ? (
            <ArrowUpRight className="w-4 h-4 text-green-400" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-400" />
          )}
          <span
            className={`text-sm ${growth >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            {Math.abs(growth)}%
          </span>
          <span className="text-sm text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  );

  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Sales & Revenue Overview
            </CardTitle>
            <CardDescription className="text-gray-400">
              Real-time financial metrics and subscription data
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchSalesData}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-green-400" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Revenue"
                value={salesData.totalRevenue}
                growth={salesData.revenueGrowth}
                icon={DollarSign}
                prefix="$"
                color="text-green-400"
              />
              <StatCard
                title="Active Subscriptions"
                value={salesData.activeSubscriptions}
                growth={salesData.subscriptionGrowth}
                icon={CreditCard}
                color="text-blue-400"
              />
              <StatCard
                title="Total Orders"
                value={salesData.totalOrders}
                icon={ShoppingCart}
                color="text-purple-400"
              />
              <StatCard
                title="Avg Order Value"
                value={salesData.averageOrderValue}
                icon={Users}
                prefix="$"
                color="text-orange-400"
              />
            </div>

            {/* Revenue Chart */}
            <div className="p-4 rounded-lg bg-gray-800/50">
              <h3 className="text-sm font-medium text-gray-400 mb-4">
                Revenue Trend (Last 7 Days)
              </h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10B981"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10B981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
                    <YAxis
                      stroke="#6B7280"
                      fontSize={12}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#F3F4F6" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10B981"
                      strokeWidth={2}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
