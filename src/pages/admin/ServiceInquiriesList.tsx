import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import {
  Briefcase,
  Search,
  RefreshCw,
  Mail,
  Phone,
  Building,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  MessageSquare,
  ExternalLink,
  ArrowRight,
} from "lucide-react";



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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ServiceInquiry {
  id: string;
  inquiry_number: string;
  full_name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  service_type: string;
  project_budget: string | null;
  timeline: string | null;
  requirements: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
}

const ServiceInquiriesList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<ServiceInquiry | null>(null);
  const [adminNotes, setAdminNotes] = useState("");

  const { data: inquiries = [], isLoading, refetch } = useQuery({
    queryKey: ["service-inquiries", statusFilter],
    queryFn: async () => {
      let query = supabase
        .from("service_inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as ServiceInquiry[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, notes }: { id: string; status: string; notes?: string }) => {
      const updates: any = { status };
      if (notes !== undefined) {
        updates.admin_notes = notes;
      }
      
      const { error } = await supabase
        .from("service_inquiries")
        .update(updates)
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-inquiries"] });
      toast({
        title: "Status Updated",
        description: "Inquiry status has been updated successfully",
      });
      setSelectedInquiry(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    },
  });

  // Calculate stats
  const newCount = inquiries.filter(i => i.status === "new").length;
  const inProgressCount = inquiries.filter(i => i.status === "in_progress").length;
  const quotedCount = inquiries.filter(i => i.status === "quoted").length;
  const convertedCount = inquiries.filter(i => i.status === "converted").length;

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.inquiry_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inquiry.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string; icon: any }> = {
      new: { variant: "default", label: "New", icon: Clock },
      in_progress: { variant: "outline", label: "In Progress", icon: RefreshCw },
      quoted: { variant: "secondary", label: "Quoted", icon: DollarSign },
      converted: { variant: "success", label: "Converted", icon: CheckCircle },
      closed: { variant: "destructive", label: "Closed", icon: XCircle },
    };
    const config = variants[status] || variants.new;
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getServiceBadge = (service: string) => {
    const colors: Record<string, string> = {
      "ai-automation": "bg-purple-100 text-purple-800",
      "website-design": "bg-blue-100 text-blue-800",
      "ai-consultation": "bg-green-100 text-green-800",
      "ai-receptionist": "bg-orange-100 text-orange-800",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[service] || "bg-gray-100 text-gray-800"}`}>
        {service.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())}
      </span>
    );
  };

  const handleStatusUpdate = (id: string, newStatus: string) => {
    updateStatusMutation.mutate({ id, status: newStatus, notes: adminNotes });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#F9FAFB]">Service Inquiries</h1>
          <p className="text-[#9CA3AF]">Manage B2B service leads and custom projects</p>
        </div>
        <Button variant="outline" onClick={() => refetch()} className="border-gray-700 hover:bg-gray-800">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">New</p>
                  <p className="text-2xl font-bold">{newCount}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">{inProgressCount}</p>
                </div>
                <RefreshCw className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Quoted</p>
                  <p className="text-2xl font-bold">{quotedCount}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Converted</p>
                  <p className="text-2xl font-bold">{convertedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, company, or reference #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="quoted">Quoted</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Inquiries Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                    Loading inquiries...
                  </TableCell>
                </TableRow>
              ) : filteredInquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No service inquiries found
                  </TableCell>
                </TableRow>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell>
                      <span className="font-mono text-sm font-bold">
                        {inquiry.inquiry_number}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{inquiry.full_name}</div>
                        {inquiry.company_name && (
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {inquiry.company_name}
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground">{inquiry.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getServiceBadge(inquiry.service_type)}</TableCell>
                    <TableCell>
                      <span className="font-medium">{inquiry.project_budget || "-"}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{inquiry.timeline || "-"}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {format(new Date(inquiry.created_at), "MMM d, yyyy")}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(inquiry.created_at), "h:mm a")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedInquiry(inquiry);
                                setAdminNotes(inquiry.admin_notes || "");
                              }}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Inquiry Details - {inquiry.inquiry_number}</DialogTitle>
                              <DialogDescription>
                                Review and update the inquiry status
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Contact</label>
                                  <p className="text-sm">{inquiry.full_name}</p>
                                  <p className="text-xs text-muted-foreground">{inquiry.email}</p>
                                  {inquiry.phone && (
                                    <p className="text-xs text-muted-foreground">{inquiry.phone}</p>
                                  )}
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Company</label>
                                  <p className="text-sm">{inquiry.company_name || "-"}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Service</label>
                                  <p className="text-sm">{inquiry.service_type}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Budget</label>
                                  <p className="text-sm">{inquiry.project_budget || "-"}</p>
                                </div>
                              </div>
                              
                              {inquiry.requirements && (
                                <div>
                                  <label className="text-sm font-medium">Requirements</label>
                                  <p className="text-sm bg-muted p-3 rounded-lg mt-1">
                                    {inquiry.requirements}
                                  </p>
                                </div>
                              )}

                              <div>
                                <label className="text-sm font-medium">Admin Notes</label>
                                <Textarea
                                  value={adminNotes}
                                  onChange={(e) => setAdminNotes(e.target.value)}
                                  placeholder="Add internal notes about this inquiry..."
                                  className="mt-1"
                                />
                              </div>

                              <div>
                                <label className="text-sm font-medium mb-2 block">Update Status</label>
                                <div className="flex gap-2 flex-wrap">
                                  <Button
                                    size="sm"
                                    variant={inquiry.status === "in_progress" ? "default" : "outline"}
                                    onClick={() => handleStatusUpdate(inquiry.id, "in_progress")}
                                    disabled={updateStatusMutation.isPending}
                                  >
                                    <ArrowRight className="h-4 w-4 mr-1" />
                                    In Progress
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant={inquiry.status === "quoted" ? "default" : "outline"}
                                    onClick={() => handleStatusUpdate(inquiry.id, "quoted")}
                                    disabled={updateStatusMutation.isPending}
                                  >
                                    <DollarSign className="h-4 w-4 mr-1" />
                                    Quoted
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant={inquiry.status === "converted" ? "default" : "outline"}
                                    onClick={() => handleStatusUpdate(inquiry.id, "converted")}
                                    disabled={updateStatusMutation.isPending}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Converted
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleStatusUpdate(inquiry.id, "closed")}
                                    disabled={updateStatusMutation.isPending}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Close
                                  </Button>
                                </div>
                              </div>

                              <div className="flex gap-2 pt-4 border-t">
                                <Button
                                  variant="outline"
                                  onClick={() => window.open(`mailto:${inquiry.email}`, "_blank")}
                                >
                                  <Mail className="h-4 w-4 mr-2" />
                                  Email
                                </Button>
                                {inquiry.phone && (
                                  <Button
                                    variant="outline"
                                    onClick={() => window.open(`tel:${inquiry.phone}`, "_blank")}
                                  >
                                    <Phone className="h-4 w-4 mr-2" />
                                    Call
                                  </Button>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`mailto:${inquiry.email}`, "_blank")}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default ServiceInquiriesList;
