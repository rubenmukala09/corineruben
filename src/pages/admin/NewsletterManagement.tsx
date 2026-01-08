import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Download, Trash2, Search, RefreshCw, Mail, TrendingUp, Users } from "lucide-react";
import { format } from "date-fns";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default function NewsletterManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newSubscriber, setNewSubscriber] = useState("");

  const { data: subscribers, isLoading, refetch } = useQuery({
    queryKey: ["newsletter-subscribers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filteredSubscribers = subscribers?.filter((sub) =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubscriber = async () => {
    if (!newSubscriber || !newSubscriber.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const { error } = await supabase.from("newsletter_subscribers").insert({
        email: newSubscriber,
      });

      if (error) throw error;

      toast.success("Subscriber added successfully");
      setNewSubscriber("");
      refetch();
    } catch (error: any) {
      if (error.code === "23505") {
        toast.error("This email is already subscribed");
      } else {
        toast.error("Failed to add subscriber");
      }
    }
  };

  const handleRemoveSubscriber = async (id: string) => {
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Subscriber removed");
      refetch();
    } catch (error) {
      toast.error("Failed to remove subscriber");
    }
  };

  const handleExport = () => {
    if (!subscribers || subscribers.length === 0) {
      toast.error("No subscribers to export");
      return;
    }

    const csv = [
      ["Email", "Subscribed Date"],
      ...subscribers.map((sub) => [
        sub.email,
        format(new Date(sub.subscribed_at), "yyyy-MM-dd HH:mm:ss"),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("Subscribers exported successfully");
  };

  const stats = {
    total: subscribers?.length || 0,
    thisMonth: subscribers?.filter(
      (sub) => new Date(sub.subscribed_at).getMonth() === new Date().getMonth()
    ).length || 0,
  };

  return (
    <AdminLayout
      title="Newsletter Management"
      subtitle="Manage newsletter subscribers and campaigns"
      searchPlaceholder="Search subscribers..."
      onSearch={setSearchTerm}
      headerActions={
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Subscriber
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#111827] border-gray-800">
              <DialogHeader>
                <DialogTitle className="text-[#F9FAFB]">Add Subscriber</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[#9CA3AF]">Email Address</Label>
                  <Input
                    type="email"
                    placeholder="subscriber@example.com"
                    value={newSubscriber}
                    onChange={(e) => setNewSubscriber(e.target.value)}
                    className="bg-[#1F2937] border-gray-700 text-[#F9FAFB]"
                  />
                </div>
                <Button onClick={handleAddSubscriber} className="w-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white">
                  Add Subscriber
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={handleExport} className="border-gray-700 text-[#9CA3AF] hover:text-white">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      }
    >
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-[#3B82F6]/20 to-[#06B6D4]/20">
                <Users className="h-6 w-6 text-[#06B6D4]" />
              </div>
              <div>
                <p className="text-3xl font-bold text-[#F9FAFB]">{stats.total}</p>
                <p className="text-sm text-[#9CA3AF]">Total Subscribers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-[#10B981]/20 to-[#06B6D4]/20">
                <Mail className="h-6 w-6 text-[#10B981]" />
              </div>
              <div>
                <p className="text-3xl font-bold text-[#F9FAFB]">{stats.thisMonth}</p>
                <p className="text-sm text-[#9CA3AF]">New This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-[#8B5CF6]/20 to-[#06B6D4]/20">
                <TrendingUp className="h-6 w-6 text-[#8B5CF6]" />
              </div>
              <div>
                <p className="text-3xl font-bold text-[#F9FAFB]">
                  {stats.total > 0 ? ((stats.thisMonth / stats.total) * 100).toFixed(1) : 0}%
                </p>
                <p className="text-sm text-[#9CA3AF]">Growth Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscribers Table */}
      <Card className="bg-[#111827] border-gray-800">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#F9FAFB]">Subscribers</h3>
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
          ) : !filteredSubscribers || filteredSubscribers.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="h-16 w-16 mx-auto text-[#3B82F6]/50 mb-4" />
              <h3 className="text-xl font-semibold text-[#F9FAFB] mb-2">No Subscribers Yet</h3>
              <p className="text-[#9CA3AF]">Add your first subscriber to get started</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-transparent">
                  <TableHead className="text-[#9CA3AF]">Email</TableHead>
                  <TableHead className="text-[#9CA3AF]">Subscribed Date</TableHead>
                  <TableHead className="text-[#9CA3AF]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscribers.map((subscriber) => (
                  <TableRow key={subscriber.id} className="border-gray-800 hover:bg-[#1F2937]">
                    <TableCell className="font-medium text-[#F9FAFB]">{subscriber.email}</TableCell>
                    <TableCell className="text-[#9CA3AF]">
                      {format(new Date(subscriber.subscribed_at), "MMM dd, yyyy HH:mm")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSubscriber(subscriber.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
