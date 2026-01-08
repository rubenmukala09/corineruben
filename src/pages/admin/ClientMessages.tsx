import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { RefreshCw, Send, Mail, MailOpen, MessageSquare, Users, Clock } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default function ClientMessages() {
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [newMessage, setNewMessage] = useState({ clientId: "", subject: "", body: "" });

  const { data: messages, isLoading, refetch } = useQuery({
    queryKey: ["client-communications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_communications")
        .select(`
          *,
          clients (
            first_name,
            last_name,
            email
          )
        `)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: clients } = useQuery({
    queryKey: ["clients-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("id, first_name, last_name, email")
        .order("first_name");
      if (error) throw error;
      return data;
    },
  });

  const handleSendMessage = async () => {
    if (!newMessage.clientId || !newMessage.subject || !newMessage.body) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const { error } = await supabase.from("client_communications").insert({
        client_id: newMessage.clientId,
        subject: newMessage.subject,
        body: newMessage.body,
        is_from_client: false,
      });

      if (error) throw error;

      toast.success("Message sent successfully");
      setNewMessage({ clientId: "", subject: "", body: "" });
      refetch();
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  const stats = {
    total: messages?.length || 0,
    fromClients: messages?.filter((m) => m.is_from_client).length || 0,
    sent: messages?.filter((m) => !m.is_from_client).length || 0,
  };

  return (
    <AdminLayout
      title="Client Messages"
      subtitle="Internal communication with clients"
      searchPlaceholder="Search messages..."
      headerActions={
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white">
              <Send className="h-4 w-4 mr-2" />
              New Message
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-[#111827] border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-[#F9FAFB]">Send Message to Client</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[#9CA3AF]">Select Client</Label>
                <Select
                  value={newMessage.clientId}
                  onValueChange={(value) => setNewMessage({ ...newMessage, clientId: value })}
                >
                  <SelectTrigger className="bg-[#1F2937] border-gray-700 text-[#F9FAFB]">
                    <SelectValue placeholder="Choose a client..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1F2937] border-gray-700">
                    {clients?.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.first_name} {client.last_name} ({client.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[#9CA3AF]">Subject</Label>
                <Input
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                  placeholder="Message subject"
                  className="bg-[#1F2937] border-gray-700 text-[#F9FAFB]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#9CA3AF]">Message</Label>
                <Textarea
                  value={newMessage.body}
                  onChange={(e) => setNewMessage({ ...newMessage, body: e.target.value })}
                  placeholder="Type your message..."
                  rows={6}
                  className="bg-[#1F2937] border-gray-700 text-[#F9FAFB]"
                />
              </div>
              <Button onClick={handleSendMessage} className="w-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-[#3B82F6]/20 to-[#06B6D4]/20">
                <MessageSquare className="h-6 w-6 text-[#06B6D4]" />
              </div>
              <div>
                <p className="text-3xl font-bold text-[#F9FAFB]">{stats.total}</p>
                <p className="text-sm text-[#9CA3AF]">Total Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-[#10B981]/20 to-[#06B6D4]/20">
                <Users className="h-6 w-6 text-[#10B981]" />
              </div>
              <div>
                <p className="text-3xl font-bold text-[#F9FAFB]">{stats.fromClients}</p>
                <p className="text-sm text-[#9CA3AF]">From Clients</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-[#8B5CF6]/20 to-[#06B6D4]/20">
                <Send className="h-6 w-6 text-[#8B5CF6]" />
              </div>
              <div>
                <p className="text-3xl font-bold text-[#F9FAFB]">{stats.sent}</p>
                <p className="text-sm text-[#9CA3AF]">Sent by Staff</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages Table */}
      <Card className="bg-[#111827] border-gray-800">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#F9FAFB]">Message History</h3>
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
          ) : !messages || messages.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 mx-auto text-[#3B82F6]/50 mb-4" />
              <h3 className="text-xl font-semibold text-[#F9FAFB] mb-2">No Messages Yet</h3>
              <p className="text-[#9CA3AF]">Start a conversation with a client</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-transparent">
                  <TableHead className="text-[#9CA3AF]">Client</TableHead>
                  <TableHead className="text-[#9CA3AF]">Subject</TableHead>
                  <TableHead className="text-[#9CA3AF]">Direction</TableHead>
                  <TableHead className="text-[#9CA3AF]">Date</TableHead>
                  <TableHead className="text-[#9CA3AF]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id} className="border-gray-800 hover:bg-[#1F2937]">
                    <TableCell className="font-medium text-[#F9FAFB]">
                      {message.clients ? `${message.clients.first_name} ${message.clients.last_name}` : "Unknown"}
                    </TableCell>
                    <TableCell className="text-[#9CA3AF]">{message.subject || "No subject"}</TableCell>
                    <TableCell>
                      <Badge className={`border-0 ${message.is_from_client ? "bg-[#10B981]/20 text-[#10B981]" : "bg-[#3B82F6]/20 text-[#3B82F6]"}`}>
                        {message.is_from_client ? "Received" : "Sent"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[#9CA3AF]">
                      {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedMessage(message)}
                            className="text-[#06B6D4] hover:text-white hover:bg-[#06B6D4]/20"
                          >
                            {message.is_from_client ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#111827] border-gray-800">
                          <DialogHeader>
                            <DialogTitle className="text-[#F9FAFB]">{message.subject || "No subject"}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-[#9CA3AF]">
                                {message.is_from_client ? "From" : "To"}:{" "}
                                {message.clients ? `${message.clients.first_name} ${message.clients.last_name}` : "Unknown"}
                              </p>
                              <p className="text-sm text-[#9CA3AF]">
                                Date: {format(new Date(message.created_at), "MMM dd, yyyy HH:mm")}
                              </p>
                            </div>
                            <div className="p-4 bg-[#1F2937] rounded-lg border border-gray-700">
                              <p className="whitespace-pre-wrap text-[#F9FAFB]">{message.body}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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
