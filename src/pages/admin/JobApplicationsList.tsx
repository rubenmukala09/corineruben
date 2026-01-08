import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import {
  Briefcase,
  Search,
  RefreshCw,
  Download,
  Eye,
  Mail,
  Phone,
  Calendar,
  Star,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal,
} from "lucide-react";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  cover_letter: string;
  resume_url: string | null;
  status: string;
  is_veteran: boolean | null;
  availability: string | null;
  created_at: string;
  updated_at: string;
}

const JobApplicationsList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);

  const { data: applications = [], isLoading, refetch } = useQuery({
    queryKey: ["job-applications", statusFilter, positionFilter],
    queryFn: async () => {
      let query = supabase
        .from("job_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as JobApplication[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("job_applications")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      toast({ title: "Status Updated", description: "Application status has been updated." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update status.", variant: "destructive" });
    },
  });

  // Calculate stats
  const stats = {
    total: applications.length,
    new: applications.filter((a) => a.status === "new" || a.status === "pending").length,
    reviewing: applications.filter((a) => a.status === "reviewing").length,
    interviewed: applications.filter((a) => a.status === "interviewed").length,
    hired: applications.filter((a) => a.status === "hired").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  // Get unique positions
  const positions = [...new Set(applications.map((a) => a.position))];

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPosition = positionFilter === "all" || app.position === positionFilter;
    return matchesSearch && matchesPosition;
  });

  const getStatusBadge = (status: string) => {
    const configs: Record<string, { variant: any; icon: React.ElementType; label: string }> = {
      new: { variant: "default", icon: Star, label: "New" },
      pending: { variant: "outline", icon: Clock, label: "Pending" },
      reviewing: { variant: "secondary", icon: Eye, label: "Reviewing" },
      interviewed: { variant: "default", icon: CheckCircle, label: "Interviewed" },
      hired: { variant: "success", icon: CheckCircle, label: "Hired" },
      rejected: { variant: "destructive", icon: XCircle, label: "Rejected" },
    };
    const config = configs[status] || configs.pending;
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const exportToCSV = () => {
    const headers = ["Date", "Name", "Email", "Phone", "Position", "Status", "Veteran"];
    const rows = filteredApplications.map((a) => [
      format(new Date(a.created_at), "yyyy-MM-dd"),
      a.name,
      a.email,
      a.phone,
      a.position,
      a.status,
      a.is_veteran ? "Yes" : "No",
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `job-applications-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();

    toast({ title: "Export Complete", description: `Exported ${filteredApplications.length} applications.` });
  };

  return (
    <AdminLayout title="Job Applications" subtitle="Review and manage job applications">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-6 mb-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <Briefcase className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">New</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.new}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Reviewing</p>
                <p className="text-2xl font-bold text-blue-400">{stats.reviewing}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Interviewed</p>
                <p className="text-2xl font-bold text-purple-400">{stats.interviewed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Hired</p>
                <p className="text-2xl font-bold text-green-400">{stats.hired}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Rejected</p>
                <p className="text-2xl font-bold text-red-400">{stats.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex-1 min-w-[250px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search by name, email, or position..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-white"
            />
          </div>
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700 text-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="reviewing">Reviewing</SelectItem>
            <SelectItem value="interviewed">Interviewed</SelectItem>
            <SelectItem value="hired">Hired</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Select value={positionFilter} onValueChange={setPositionFilter}>
          <SelectTrigger className="w-[200px] bg-slate-800/50 border-slate-700 text-white">
            <SelectValue placeholder="Position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Positions</SelectItem>
            {positions.map((pos) => (
              <SelectItem key={pos} value={pos}>
                {pos}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={() => refetch()} className="border-slate-700">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>

        <Button variant="outline" onClick={exportToCSV} className="border-slate-700">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Applications Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-800/50">
              <TableHead className="text-slate-300">Date</TableHead>
              <TableHead className="text-slate-300">Applicant</TableHead>
              <TableHead className="text-slate-300">Position</TableHead>
              <TableHead className="text-slate-300">Status</TableHead>
              <TableHead className="text-slate-300">Veteran</TableHead>
              <TableHead className="text-slate-300 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-cyan-400" />
                  <span className="text-slate-400">Loading applications...</span>
                </TableCell>
              </TableRow>
            ) : filteredApplications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-400">
                  <Briefcase className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  No applications found
                </TableCell>
              </TableRow>
            ) : (
              filteredApplications.map((app) => (
                <TableRow key={app.id} className="border-slate-700 hover:bg-slate-800/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <div>
                        <div className="text-sm font-medium text-white">
                          {format(new Date(app.created_at), "MMM d, yyyy")}
                        </div>
                        <div className="text-xs text-slate-400">
                          {format(new Date(app.created_at), "h:mm a")}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-white">{app.name}</div>
                      <div className="text-sm text-slate-400">{app.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
                      {app.position}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(app.status)}</TableCell>
                  <TableCell>
                    {app.is_veteran && (
                      <Badge variant="outline" className="border-green-500/50 text-green-400">
                        🎖️ Veteran
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedApplication(app)}
                        className="text-slate-400 hover:text-white"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(`mailto:${app.email}`)}
                        className="text-slate-400 hover:text-white"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => updateStatusMutation.mutate({ id: app.id, status: "reviewing" })}>
                            Mark as Reviewing
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatusMutation.mutate({ id: app.id, status: "interviewed" })}>
                            Mark as Interviewed
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatusMutation.mutate({ id: app.id, status: "hired" })}>
                            Mark as Hired
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatusMutation.mutate({ id: app.id, status: "rejected" })} className="text-red-500">
                            Reject Application
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Application Detail Dialog */}
      <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent className="max-w-2xl bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Application Details</DialogTitle>
            <DialogDescription className="text-slate-400">
              Review the full application from {selectedApplication?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-400">Name</label>
                  <p className="text-white">{selectedApplication.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-400">Position</label>
                  <p className="text-white">{selectedApplication.position}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-400">Email</label>
                  <p className="text-cyan-400">{selectedApplication.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-400">Phone</label>
                  <p className="text-white">{selectedApplication.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-400">Applied</label>
                  <p className="text-white">{format(new Date(selectedApplication.created_at), "PPP")}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-400">Availability</label>
                  <p className="text-white">{selectedApplication.availability || "Not specified"}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-400">Cover Letter</label>
                <div className="mt-2 p-4 rounded-lg bg-slate-800 border border-slate-700">
                  <p className="text-white whitespace-pre-wrap">{selectedApplication.cover_letter}</p>
                </div>
              </div>

              {selectedApplication.resume_url && (
                <div>
                  <label className="text-sm font-medium text-slate-400">Resume</label>
                  <Button
                    variant="outline"
                    className="mt-2 border-slate-700"
                    onClick={() => window.open(selectedApplication.resume_url!, "_blank")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    View Resume
                  </Button>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t border-slate-700">
                <Select
                  defaultValue={selectedApplication.status}
                  onValueChange={(value) => updateStatusMutation.mutate({ id: selectedApplication.id, status: value })}
                >
                  <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="reviewing">Reviewing</SelectItem>
                    <SelectItem value="interviewed">Interviewed</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => window.open(`mailto:${selectedApplication.email}`)} className="bg-cyan-600 hover:bg-cyan-700">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
                <Button variant="outline" onClick={() => window.open(`tel:${selectedApplication.phone}`)} className="border-slate-700">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default JobApplicationsList;
