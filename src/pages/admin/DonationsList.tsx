import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import {
  Heart,
  Download,
  Search,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  RefreshCw,
  ExternalLink,
} from "lucide-react";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
import { useToast } from "@/hooks/use-toast";

interface Donation {
  id: string;
  donor_name: string;
  email: string;
  amount: number;
  donation_type: string;
  payment_status: string;
  stripe_payment_id: string | null;
  message: string | null;
  created_at: string;
}

const DonationsList = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: donations = [], isLoading, refetch } = useQuery({
    queryKey: ["donations", typeFilter, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from("donations_summary")
        .select("*")
        .order("created_at", { ascending: false });

      if (typeFilter !== "all") {
        query = query.eq("donation_type", typeFilter);
      }
      if (statusFilter !== "all") {
        query = query.eq("payment_status", statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Donation[];
    },
  });

  // Calculate stats
  const totalDonations = donations.filter(d => d.payment_status === "completed").reduce((sum, d) => sum + d.amount, 0);
  const monthlyDonors = donations.filter(d => d.donation_type === "monthly" && d.payment_status === "completed").length;
  const oneTimeDonors = donations.filter(d => d.donation_type === "one-time" && d.payment_status === "completed").length;
  const avgDonation = donations.length > 0 ? totalDonations / donations.filter(d => d.payment_status === "completed").length : 0;

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      donation.donor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      completed: { variant: "success", label: "Completed" },
      pending: { variant: "outline", label: "Pending" },
      failed: { variant: "destructive", label: "Failed" },
    };
    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    return (
      <Badge variant={type === "monthly" ? "default" : "secondary"}>
        {type === "monthly" ? "🔄 Monthly" : "💝 One-time"}
      </Badge>
    );
  };

  const exportToCSV = () => {
    const headers = ["Date", "Donor Name", "Email", "Amount", "Type", "Status", "Message"];
    const rows = filteredDonations.map(d => [
      format(new Date(d.created_at), "yyyy-MM-dd"),
      d.donor_name,
      d.email,
      d.amount.toFixed(2),
      d.donation_type,
      d.payment_status,
      d.message || ""
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `donations-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    
    toast({
      title: "Export Complete",
      description: `Exported ${filteredDonations.length} donations to CSV`,
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#F9FAFB]">Donations</h1>
          <p className="text-[#9CA3AF]">Manage and track all donations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => refetch()} className="border-gray-700 hover:bg-gray-800">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" onClick={exportToCSV} className="border-gray-700 hover:bg-gray-800">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Raised</p>
                <p className="text-2xl font-bold text-green-400">${totalDonations.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Monthly Donors</p>
                <p className="text-2xl font-bold text-white">{monthlyDonors}</p>
              </div>
              <RefreshCw className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">One-time Donors</p>
                <p className="text-2xl font-bold text-white">{oneTimeDonors}</p>
              </div>
              <Users className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Donation</p>
                <p className="text-2xl font-bold text-white">${avgDonation.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[250px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-white"
            />
          </div>
        </div>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700 text-white">
            <SelectValue placeholder="Donation Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="one-time">One-time</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700 text-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Donations Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-800/50">
              <TableHead className="text-slate-300">Date</TableHead>
              <TableHead className="text-slate-300">Donor</TableHead>
              <TableHead className="text-slate-300">Amount</TableHead>
              <TableHead className="text-slate-300">Type</TableHead>
              <TableHead className="text-slate-300">Status</TableHead>
              <TableHead className="text-slate-300">Message</TableHead>
              <TableHead className="text-slate-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-cyan-400" />
                  <span className="text-slate-400">Loading donations...</span>
                </TableCell>
              </TableRow>
            ) : filteredDonations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-slate-400">
                  <Heart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  No donations found
                </TableCell>
              </TableRow>
            ) : (
              filteredDonations.map((donation) => (
                <TableRow key={donation.id} className="border-slate-700 hover:bg-slate-800/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <div>
                        <div className="text-sm font-medium text-white">
                          {format(new Date(donation.created_at), "MMM d, yyyy")}
                        </div>
                        <div className="text-xs text-slate-400">
                          {format(new Date(donation.created_at), "h:mm a")}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-white">{donation.donor_name}</div>
                      <div className="text-sm text-slate-400">{donation.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-lg font-bold text-green-400">
                      ${donation.amount.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell>{getTypeBadge(donation.donation_type)}</TableCell>
                  <TableCell>{getStatusBadge(donation.payment_status)}</TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-400 max-w-[200px] truncate block">
                      {donation.message || "-"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {donation.stripe_payment_id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          window.open(
                            `https://dashboard.stripe.com/payments/${donation.stripe_payment_id}`,
                            "_blank"
                          );
                        }}
                        className="text-slate-400 hover:text-white"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Stripe
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default DonationsList;
