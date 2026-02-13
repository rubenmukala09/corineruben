import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Paperclip, Send, Smile, Star, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  useClientMessages,
  useSendClientMessage,
  useToggleMessageStar,
} from "@/hooks/useClientMessages";
import { format } from "date-fns";

interface ClientMessagesTabProps {
  clientId: string;
}

export function ClientMessagesTab({ clientId }: ClientMessagesTabProps) {
  const [messageFilter, setMessageFilter] = useState("all");
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: messages = [], isLoading } = useClientMessages(clientId);
  const sendMessageMutation = useSendClientMessage();
  const toggleStarMutation = useToggleMessageStar();

  const templates = [
    {
      value: "activation",
      label: "Service Activation",
      content: "Your service has been activated successfully!",
    },
    {
      value: "payment",
      label: "Payment Received",
      content: "We've received your payment. Thank you!",
    },
    {
      value: "support",
      label: "Support Ticket Response",
      content:
        "Thank you for contacting support. We're looking into your issue.",
    },
    {
      value: "followup",
      label: "Follow Up",
      content: "Just checking in to see how everything is going.",
    },
    {
      value: "meeting",
      label: "Meeting Scheduled",
      content:
        "Your meeting has been scheduled. We look forward to speaking with you.",
    },
  ];

  const getMessageIcon = (type: string | null) => {
    const icons: Record<string, string> = {
      direct: "💬",
      form: "📋",
      support: "🎫",
      notification: "⚙️",
      email: "📧",
    };
    return icons[type || "direct"] || "💬";
  };

  // Filter messages
  const filteredMessages = messages
    .filter((message) => {
      if (searchQuery) {
        return (
          message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.subject?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return true;
    })
    .filter((message) => {
      if (messageFilter === "all") return true;
      if (messageFilter === "unread") return !message.is_read;
      if (messageFilter === "support")
        return message.message_type === "support";
      if (messageFilter === "forms") return message.message_type === "form";
      return true;
    });

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    sendMessageMutation.mutate({
      client_id: clientId,
      content: messageText,
      message_type: "direct",
    });

    setMessageText("");
  };

  const handleTemplateSelect = (templateValue: string) => {
    const template = templates.find((t) => t.value === templateValue);
    if (template) {
      setMessageText(template.content);
    }
  };

  const handleToggleStar = (messageId: string, currentStarred: boolean) => {
    toggleStarMutation.mutate({
      id: messageId,
      clientId,
      starred: !currentStarred,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-muted-foreground">
          Loading messages...
        </div>
      </div>
    );
  }

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
              <Input
                placeholder="Search messages..."
                className="w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-[400px] overflow-y-auto space-y-4 p-4 bg-muted/20 rounded-lg">
              {filteredMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mb-4 opacity-30" />
                  <p>No messages yet</p>
                  <p className="text-sm">
                    Start a conversation with this client
                  </p>
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${!message.is_from_client ? "flex-row-reverse" : ""}`}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {message.is_from_client
                          ? "CL"
                          : !message.sender_id
                            ? "SYS"
                            : "AD"}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`flex-1 ${!message.is_from_client ? "text-right" : ""}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.is_from_client && (
                          <span className="text-sm font-semibold">Client</span>
                        )}
                        <span className="text-xs">
                          {getMessageIcon(message.message_type)}
                        </span>
                        {!message.is_from_client && (
                          <span className="text-sm font-semibold">
                            {message.sender_id ? "You" : "System"}
                          </span>
                        )}
                        <button
                          className="ml-auto"
                          onClick={() =>
                            handleToggleStar(
                              message.id,
                              message.is_starred || false,
                            )
                          }
                        >
                          <Star
                            className={`h-4 w-4 ${message.is_starred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                          />
                        </button>
                      </div>
                      {message.subject && (
                        <p
                          className={`text-xs font-medium mb-1 ${!message.is_from_client ? "text-right" : ""}`}
                        >
                          Re: {message.subject}
                        </p>
                      )}
                      <div
                        className={`p-3 rounded-lg inline-block max-w-[80%] ${
                          !message.is_from_client
                            ? "bg-primary text-primary-foreground"
                            : !message.sender_id
                              ? "bg-blue-50 text-blue-900 border border-blue-200 dark:bg-blue-950 dark:text-blue-100"
                              : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>
                          {message.created_at
                            ? format(
                                new Date(message.created_at),
                                "MMM d, yyyy 'at' h:mm a",
                              )
                            : "Unknown time"}
                        </span>
                        {!message.is_from_client && message.is_read && (
                          <span>✓✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Select onValueChange={handleTemplateSelect}>
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
                  <Button
                    onClick={handleSendMessage}
                    disabled={
                      !messageText.trim() || sendMessageMutation.isPending
                    }
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {sendMessageMutation.isPending
                      ? "Sending..."
                      : "Send Message"}
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
