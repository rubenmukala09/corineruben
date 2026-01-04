import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Paperclip, Send, Smile, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ClientMessagesTabProps {
  clientId: number;
}

export function ClientMessagesTab({ clientId }: ClientMessagesTabProps) {
  const [messageFilter, setMessageFilter] = useState("all");
  const [messageText, setMessageText] = useState("");

  // Placeholder - will be fetched from database
  const messages: Array<{
    id: number;
    from: string;
    type: string;
    content: string;
    timestamp: string;
    read: boolean;
    starred: boolean;
  }> = [];

  const templates = [
    { value: "activation", label: "Service Activation" },
    { value: "payment", label: "Payment Received" },
    { value: "support", label: "Support Ticket Response" },
    { value: "followup", label: "Follow Up" },
    { value: "meeting", label: "Meeting Scheduled" },
  ];

  const getMessageIcon = (type: string) => {
    const icons = {
      direct: "💬",
      form: "📋",
      support: "🎫",
      notification: "⚙️",
      email: "📧",
    };
    return icons[type as keyof typeof icons] || "💬";
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Messages & Communication</CardTitle>
            <div className="flex gap-2">
              <Select value={messageFilter} onValueChange={setMessageFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Messages</SelectItem>
                  <SelectItem value="unread">Unread Only</SelectItem>
                  <SelectItem value="support">Support Tickets</SelectItem>
                  <SelectItem value="forms">Contact Forms</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Search messages..." className="w-[200px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-[400px] overflow-y-auto space-y-4 p-4 bg-muted/20 rounded-lg">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.from === "admin" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {message.from === "client" ? "JS" : message.from === "admin" ? "RN" : "SYS"}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex-1 ${message.from === "admin" ? "text-right" : ""}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {message.from !== "admin" && (
                        <span className="text-sm font-semibold">
                          {message.from === "client" ? "John Smith" : "System"}
                        </span>
                      )}
                      <span className="text-xs">{getMessageIcon(message.type)}</span>
                      {message.from === "admin" && (
                        <span className="text-sm font-semibold">You</span>
                      )}
                      <button className="ml-auto">
                        <Star className={`h-4 w-4 ${message.starred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                      </button>
                    </div>
                    <div
                      className={`p-3 rounded-lg inline-block max-w-[80%] ${
                        message.from === "admin"
                          ? "bg-primary text-primary-foreground"
                          : message.from === "system"
                          ? "bg-blue-50 text-blue-900 border border-blue-200"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span>{message.timestamp}</span>
                      {message.from === "admin" && message.read && <span>✓✓</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Use template..." />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.value} value={template.value}>
                        {template.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="min-h-[100px] resize-y"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Schedule Send</Button>
                  <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
