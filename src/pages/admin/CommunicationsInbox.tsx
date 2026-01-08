import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { RefreshCw, Mail, Archive, Inbox, Clock, CheckCircle } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default function CommunicationsInbox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [replyText, setReplyText] = useState("");

  const { data: inquiries, isLoading, refetch } = useQuery({
    queryKey: ["website-inquiries", statusFilter],
    queryFn: async () => {
      let query = supabase
        .from("website_inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const filteredInquiries = inquiries?.filter(
    (inquiry) =>
      inquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("website_inquiries")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      toast.success(`Inquiry marked as ${status}`);
      refetch();
    } catch (error) {
      toast.error("Failed to update inquiry status");
    }
  };

  const handleReply = async () => {
    if (!selectedInquiry || !replyText) {
      toast.error("Please enter a reply message");
      return;
    }

    try {
      const { error } = await supabase
        .from("website_inquiries")
        .update({ status: "responded" })
        .eq("id", selectedInquiry.id);

      if (error) throw error;

      toast.success("Reply sent successfully");
      setReplyText("");
      setSelectedInquiry(null);
      refetch();
    } catch (error) {
      toast.error("Failed to send reply");
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-[#F97316]/20 text-[#F97316]",
      responded: "bg-[#10B981]/20 text-[#10B981]",
      archived: "bg-gray-700 text-gray-300",
    };
    return <Badge className={`${colors[status] || "bg-gray-700"} border-0`}>{status}</Badge>;
  };

  const stats = {
    total: inquiries?.length || 0,
    pending: inquiries?.filter((i) => i.status === "pending").length || 0,
    responded: inquiries?.filter((i) => i.status === "responded").length || 0,
  };

  return (
    <AdminLayout
      title="Communications Inbox"
      subtitle="Manage website inquiries and contact form submissions"
      searchPlaceholder="Search inquiries..."
      onSearch={setSearchTerm}
      headerActions={
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px] bg-[#1F2937] border-gray-700 text-[#F9FAFB]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-[#1F2937] border-gray-700">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="responded">Responded</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      }
    >
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-[#3B82F6]/20 to-[#06B6D4]/20">
                <Inbox className="h-6 w-6 text-[#06B6D4]" />
              </div>
              <div>
                <p className="text-3xl font-bold text-[#F9FAFB]">{stats.total}</p>
                <p className="text-sm text-[#9CA3AF]">Total Inquiries</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-[#F97316]/20 to-[#EF4444]/20">
                <Clock className="h-6 w-6 text-[#F97316]" />
              </div>
              <div>
                <p className="text-3xl font-bold text-[#F9FAFB]">{stats.pending}</p>
                <p className="text-sm text-[#9CA3AF]">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-[#10B981]/20 to-[#06B6D4]/20">
                <CheckCircle className="h-6 w-6 text-[#10B981]" />
              </div>
              <div>
                <p className="text-3xl font-bold text-[#F9FAFB]">{stats.responded}</p>
                <p className="text-sm text-[#9CA3AF]">Responded</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inquiries Table */}
      <Card className="bg-[#111827] border-gray-800">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#F9FAFB]">Inquiries</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refetch()}
            className="text-[#9CA3AF] hover:text-white"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center p-12">
              <RefreshCw className="h-8 w-8 animate-spin text-[#06B6D4]" />
            </div>
          ) : !filteredInquiries || filteredInquiries.length === 0 ? (
            <div className="text-center py-12">
              <Inbox className="h-16 w-16 mx-auto text-[#3B82F6]/50 mb-4" />
              <h3 className="text-xl font-semibold text-[#F9FAFB] mb-2">No Inquiries</h3>
              <p className="text-[#9CA3AF]">No inquiries found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-transparent">
                  <TableHead className="text-[#9CA3AF]">Name</TableHead>
                  <TableHead className="text-[#9CA3AF]">Email</TableHead>
                  <TableHead className="text-[#9CA3AF]">Message</TableHead>
                  <TableHead className="text-[#9CA3AF]">Status</TableHead>
                  <TableHead className="text-[#9CA3AF]">Date</TableHead>
                  <TableHead className="text-[#9CA3AF]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInquiries.map((inquiry) => (
                  <TableRow key={inquiry.id} className="border-gray-800 hover:bg-[#1F2937]">
                    <TableCell className="font-medium text-[#F9FAFB]">{inquiry.name}</TableCell>
                    <TableCell className="text-[#9CA3AF]">{inquiry.email}</TableCell>
                    <TableCell className="max-w-[200px] truncate text-[#9CA3AF]">{inquiry.message}</TableCell>
                    <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                    <TableCell className="text-[#9CA3AF]">
                      {formatDistanceToNow(new Date(inquiry.created_at), { addSuffix: true })}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedInquiry(inquiry)}
                              className="text-[#06B6D4] hover:text-white hover:bg-[#06B6D4]/20"
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl bg-[#111827] border-gray-800">
                            <DialogHeader>
                              <DialogTitle className="text-[#F9FAFB]">Reply to Inquiry</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="p-4 bg-[#1F2937] rounded-lg space-y-2 border border-gray-700">
                                <p className="font-medium text-[#F9FAFB]">{inquiry.name}</p>
                                <p className="text-sm text-[#9CA3AF]">{inquiry.email}</p>
                                <p className="mt-2 text-[#9CA3AF]">{inquiry.message}</p>
                              </div>
                              <Textarea
                                placeholder="Type your reply..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                rows={6}
                                className="bg-[#1F2937] border-gray-700 text-[#F9FAFB]"
                              />
                              <Button onClick={handleReply} className="w-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white">
                                <Mail className="h-4 w-4 mr-2" />
                                Send Reply
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStatusChange(inquiry.id, "archived")}
                          className="text-[#9CA3AF] hover:text-white"
                        >
                          <Archive className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
