import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Send, Mail, MailOpen } from "lucide-react";
import { format } from "date-fns";

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

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Client Messages</h1>
          <p className="text-muted-foreground">Internal communication with clients</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              New Message
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Send Message to Client</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Client</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newMessage.clientId}
                  onChange={(e) => setNewMessage({ ...newMessage, clientId: e.target.value })}
                >
                  <option value="">Choose a client...</option>
                  {clients?.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.first_name} {client.last_name} ({client.email})
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                  placeholder="Message subject"
                />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  value={newMessage.body}
                  onChange={(e) => setNewMessage({ ...newMessage, body: e.target.value })}
                  placeholder="Type your message..."
                  rows={6}
                />
              </div>
              <Button onClick={handleSendMessage} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Message History</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : !messages || messages.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No messages yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Direction</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="font-medium">
                      {message.clients ? `${message.clients.first_name} ${message.clients.last_name}` : "Unknown"}
                    </TableCell>
                    <TableCell>{message.subject || "No subject"}</TableCell>
                    <TableCell>
                      <Badge variant={message.is_from_client ? "secondary" : "default"}>
                        {message.is_from_client ? "Received" : "Sent"}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(new Date(message.created_at), "MMM dd, yyyy HH:mm")}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedMessage(message)}>
                            {message.is_from_client ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{message.subject || "No subject"}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                {message.is_from_client ? "From" : "To"}:{" "}
                                {message.clients ? `${message.clients.first_name} ${message.clients.last_name}` : "Unknown"}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Date: {format(new Date(message.created_at), "MMM dd, yyyy HH:mm")}
                              </p>
                            </div>
                            <div className="p-4 bg-muted rounded-lg">
                              <p className="whitespace-pre-wrap">{message.body}</p>
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
    </div>
  );
}
