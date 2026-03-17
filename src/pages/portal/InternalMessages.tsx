import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Send,
  Inbox,
  SendHorizontal,
  Mail,
  MailOpen,
  AlertCircle,
  Plus,
  Reply,
  LogOut,
} from "lucide-react";
import { useInternalMessages, useStaffProfiles, InternalMessage } from "@/hooks/useInternalMessages";
import { supabase } from "@/integrations/supabase/client";
import { MessagesLoadingSkeleton } from "@/components/portal/PortalLoadingSkeleton";

function InternalMessages() {
  const navigate = useNavigate();
  const { inbox, sent, unreadCount, loading, sendMessage, markAsRead } = useInternalMessages();
  const staffProfiles = useStaffProfiles();
  const [activeTab, setActiveTab] = useState<"inbox" | "sent">("inbox");
  const [selectedMessage, setSelectedMessage] = useState<InternalMessage | null>(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [replyTo, setReplyTo] = useState<InternalMessage | null>(null);

  // Compose form state
  const [recipientId, setRecipientId] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSelectMessage = async (msg: InternalMessage) => {
    setSelectedMessage(msg);
    if (!msg.is_read && activeTab === "inbox") {
      await markAsRead(msg.id);
    }
  };

  const handleSend = async () => {
    if (!recipientId || !body.trim()) return;
    setSending(true);
    const result = await sendMessage({
      recipient_id: recipientId,
      subject: subject || "(No Subject)",
      body,
      is_urgent: isUrgent,
    });
    setSending(false);
    if (!result.error) {
      setComposeOpen(false);
      setReplyTo(null);
      resetForm();
    }
  };

  const handleReply = (msg: InternalMessage) => {
    setReplyTo(msg);
    setRecipientId(msg.sender_id || "");
    setSubject(`Re: ${msg.subject || "(No Subject)"}`);
    setBody("");
    setIsUrgent(false);
    setComposeOpen(true);
  };

  const resetForm = () => {
    setRecipientId("");
    setSubject("");
    setBody("");
    setIsUrgent(false);
    setReplyTo(null);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const messages = activeTab === "inbox" ? inbox : sent;
  const getSenderName = (id: string | null) => {
    if (!id) return "System";
    const profile = staffProfiles.find((p) => p.id === id);
    return profile?.username || profile?.email || id.slice(0, 8);
  };

  if (loading) {
    return <MessagesLoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800/60 bg-[#111827]/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/5">
                <Link to="/portal"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-400" />
                  Internal Messages
                  {unreadCount > 0 && (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">{unreadCount}</Badge>
                  )}
                </h1>
                <p className="text-sm text-gray-500">Staff-to-staff communication</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={composeOpen} onOpenChange={(open) => { setComposeOpen(open); if (!open) resetForm(); }}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-1" />Compose
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#1F2937] border-gray-800/50 text-white max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      {replyTo ? `Reply to ${getSenderName(replyTo.sender_id)}` : "New Message"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-2">
                    <div>
                      <Label className="text-gray-400 text-xs">Recipient</Label>
                      <Select value={recipientId} onValueChange={setRecipientId}>
                        <SelectTrigger className="bg-[#111827] border-gray-700 text-white mt-1">
                          <SelectValue placeholder="Select staff member" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1F2937] border-gray-700">
                          {staffProfiles.map((p) => (
                            <SelectItem key={p.id} value={p.id} className="text-white hover:bg-white/10">
                              {p.username || p.email || p.id.slice(0, 8)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-400 text-xs">Subject</Label>
                      <Input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Message subject"
                        className="bg-[#111827] border-gray-700 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400 text-xs">Message</Label>
                      <Textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Write your message..."
                        rows={5}
                        className="bg-[#111827] border-gray-700 text-white mt-1 resize-none"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={isUrgent} onCheckedChange={setIsUrgent} />
                      <Label className="text-gray-400 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-red-400" />Mark as urgent
                      </Label>
                    </div>
                    <Button
                      onClick={handleSend}
                      disabled={!recipientId || !body.trim() || sending}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Send className="w-4 h-4 mr-2" />{sending ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-gray-400 hover:text-white hover:bg-white/5">
                <LogOut className="w-4 h-4 mr-2" />Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Tab Switcher */}
        <div className="flex gap-2 mb-6">
          <Button
            size="sm"
            variant={activeTab === "inbox" ? "default" : "ghost"}
            onClick={() => { setActiveTab("inbox"); setSelectedMessage(null); }}
            className={activeTab === "inbox" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}
          >
            <Inbox className="w-4 h-4 mr-1" />Inbox ({inbox.length})
          </Button>
          <Button
            size="sm"
            variant={activeTab === "sent" ? "default" : "ghost"}
            onClick={() => { setActiveTab("sent"); setSelectedMessage(null); }}
            className={activeTab === "sent" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}
          >
            <SendHorizontal className="w-4 h-4 mr-1" />Sent ({sent.length})
          </Button>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Message List */}
          <div className="lg:col-span-2 space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
            {messages.length === 0 ? (
              <Card className="bg-[#1F2937] border-gray-800/50 p-8">
                <p className="text-center text-gray-500">
                  {activeTab === "inbox" ? "No messages in your inbox" : "No sent messages"}
                </p>
              </Card>
            ) : (
              messages.map((msg) => (
                <Card
                  key={msg.id}
                  onClick={() => handleSelectMessage(msg)}
                  className={`bg-[#1F2937] border-gray-800/50 p-3 cursor-pointer transition-colors hover:border-blue-500/30 ${
                    selectedMessage?.id === msg.id ? "border-blue-500/50 bg-blue-500/5" : ""
                  } ${!msg.is_read && activeTab === "inbox" ? "border-l-2 border-l-blue-400" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        {!msg.is_read && activeTab === "inbox" ? (
                          <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        ) : (
                          <MailOpen className="w-3.5 h-3.5 text-gray-600 shrink-0" />
                        )}
                        <p className={`text-sm truncate ${!msg.is_read && activeTab === "inbox" ? "font-semibold text-white" : "text-gray-300"}`}>
                          {msg.subject || "(No Subject)"}
                        </p>
                      </div>
                      <p className="text-[11px] text-gray-500 ml-5.5">
                        {activeTab === "inbox" ? `From: ${getSenderName(msg.sender_id)}` : `To: ${getSenderName(msg.recipient_id)}`}
                      </p>
                      <p className="text-[10px] text-gray-600 ml-5.5 mt-0.5">
                        {new Date(msg.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      {msg.is_urgent && (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-[9px] px-1.5">URGENT</Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-3">
            {selectedMessage ? (
              <Card className="bg-[#1F2937] border-gray-800/50 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-bold text-white">{selectedMessage.subject || "(No Subject)"}</h2>
                      {selectedMessage.is_urgent && (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-[10px]">URGENT</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {activeTab === "inbox" ? "From" : "To"}: {getSenderName(activeTab === "inbox" ? selectedMessage.sender_id : selectedMessage.recipient_id)}
                    </p>
                    <p className="text-[10px] text-gray-600 mt-0.5">
                      {new Date(selectedMessage.created_at).toLocaleString()}
                    </p>
                  </div>
                  {activeTab === "inbox" && (
                    <Button size="sm" variant="ghost" onClick={() => handleReply(selectedMessage)} className="text-blue-400 hover:bg-blue-500/10">
                      <Reply className="w-4 h-4 mr-1" />Reply
                    </Button>
                  )}
                </div>
                <div className="bg-[#111827] rounded-lg border border-gray-800/40 p-4">
                  <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{selectedMessage.body}</p>
                </div>
                {selectedMessage.sender_role && (
                  <p className="text-[10px] text-gray-600 mt-3">Sender role: {selectedMessage.sender_role}</p>
                )}
              </Card>
            ) : (
              <Card className="bg-[#1F2937] border-gray-800/50 p-12">
                <div className="text-center text-gray-500">
                  <MailOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Select a message to read</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default InternalMessages;
