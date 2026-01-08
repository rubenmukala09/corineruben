import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Search, Filter, DollarSign, Users, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (error) {
      toast.error("Failed to load subscriptions");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch =
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.stripe_customer_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    const matchesService = serviceFilter === "all" || sub.service_type === serviceFilter;
    return matchesSearch && matchesStatus && matchesService;
  });

  const stats = {
    total: subscriptions.length,
    active: subscriptions.filter((s) => s.status === "active").length,
    mrr: subscriptions
      .filter((s) => s.status === "active")
      .reduce((acc, s) => acc + (s.amount || 0), 0) / 100,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#F9FAFB]">Subscription Management</h1>
        <p className="text-[#9CA3AF]">
          Manage all customer subscriptions and billing
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#9CA3AF]">Total Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-[#06B6D4]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#F9FAFB]">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#9CA3AF]">Active Subscriptions</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#10B981]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#F9FAFB]">{stats.active}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#9CA3AF]">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-[#8B5CF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#F9FAFB]">${stats.mrr.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-[#111827] border-gray-800">
        <CardHeader>
          <CardTitle className="text-[#F9FAFB]">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                <Input
                  placeholder="Search by email or customer ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#1F2937] border-gray-700 text-[#F9FAFB]"
                />
              </div>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-[#1F2937] border-gray-700">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="past_due">Past Due</SelectItem>
              </SelectContent>
            </Select>

            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-[200px] bg-[#1F2937] border-gray-700">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="ai_receptionist">AI Receptionist</SelectItem>
                <SelectItem value="ai_insurance">AI Insurance</SelectItem>
                <SelectItem value="family_shield">Family Shield</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Subscriptions Table */}
      <Card className="bg-[#111827] border-gray-800">
        <CardHeader>
          <CardTitle className="text-[#F9FAFB]">All Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-[#9CA3AF]" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-[#9CA3AF]">Email</TableHead>
                  <TableHead className="text-[#9CA3AF]">Service</TableHead>
                  <TableHead className="text-[#9CA3AF]">Plan</TableHead>
                  <TableHead className="text-[#9CA3AF]">Status</TableHead>
                  <TableHead className="text-[#9CA3AF]">Next Billing</TableHead>
                  <TableHead className="text-right text-[#9CA3AF]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-[#9CA3AF]">
                      No subscriptions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubscriptions.map((sub) => (
                    <TableRow key={sub.id} className="border-gray-700">
                      <TableCell className="font-medium text-[#F9FAFB]">{sub.email}</TableCell>
                      <TableCell className="text-[#9CA3AF]">
                        {sub.service_type.replace(/_/g, ' ').toUpperCase()}
                      </TableCell>
                      <TableCell className="text-[#9CA3AF]">{sub.plan_tier}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            sub.status === 'active'
                              ? 'default'
                              : sub.status === 'past_due'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {sub.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[#9CA3AF]">
                        {new Date(sub.current_period_end).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
