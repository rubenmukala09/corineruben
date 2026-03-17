import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface InternalMessage {
  id: string;
  subject: string | null;
  body: string;
  sender_id: string | null;
  recipient_id: string | null;
  sender_role: string | null;
  message_type: string | null;
  is_read: boolean | null;
  is_urgent: boolean | null;
  is_pinned: boolean | null;
  read_at: string | null;
  created_at: string;
  attachments: any;
  // joined
  sender_name?: string;
  recipient_name?: string;
}

interface SendMessagePayload {
  recipient_id: string;
  subject: string;
  body: string;
  is_urgent?: boolean;
  message_type?: string;
}

export function useInternalMessages() {
  const [inbox, setInbox] = useState<InternalMessage[]>([]);
  const [sent, setSent] = useState<InternalMessage[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        await loadMessages(user.id);
        subscribeToRealtime(user.id);
      }
      setLoading(false);
    };
    init();
  }, []);

  const loadMessages = async (uid: string) => {
    const [{ data: inboxData }, { data: sentData }, { count }] = await Promise.all([
      supabase
        .from("internal_messages")
        .select("*")
        .eq("recipient_id", uid)
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("internal_messages")
        .select("*")
        .eq("sender_id", uid)
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("internal_messages")
        .select("*", { count: "exact", head: true })
        .eq("recipient_id", uid)
        .eq("is_read", false),
    ]);

    if (inboxData) setInbox(inboxData);
    if (sentData) setSent(sentData);
    setUnreadCount(count || 0);
  };

  const subscribeToRealtime = (uid: string) => {
    supabase
      .channel("internal-messages-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "internal_messages",
          filter: `recipient_id=eq.${uid}`,
        },
        (payload) => {
          const newMsg = payload.new as InternalMessage;
          setInbox((prev) => [newMsg, ...prev]);
          setUnreadCount((prev) => prev + 1);
          toast({
            title: newMsg.is_urgent ? "🔴 Urgent Message" : "📩 New Message",
            description: newMsg.subject || "You have a new internal message",
          });
        }
      )
      .subscribe();
  };

  const sendMessage = async (payload: SendMessagePayload) => {
    if (!userId) return { error: "Not authenticated" };

    const { error } = await supabase.from("internal_messages").insert({
      sender_id: userId,
      recipient_id: payload.recipient_id,
      subject: payload.subject,
      body: payload.body,
      is_urgent: payload.is_urgent || false,
      message_type: (payload.message_type || "direct") as any,
    });

    if (error) {
      toast({ title: "Error sending message", description: error.message, variant: "destructive" });
      return { error: error.message };
    }

    toast({ title: "✅ Message Sent" });
    if (userId) await loadMessages(userId);
    return { error: null };
  };

  const markAsRead = async (messageId: string) => {
    await supabase
      .from("internal_messages")
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq("id", messageId);

    setInbox((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, is_read: true, read_at: new Date().toISOString() } : m))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const refresh = useCallback(() => {
    if (userId) loadMessages(userId);
  }, [userId]);

  return { inbox, sent, unreadCount, loading, userId, sendMessage, markAsRead, refresh };
}

export function useStaffProfiles() {
  const [profiles, setProfiles] = useState<{ id: string; username: string | null; email: string | null }[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("profiles" as any)
        .select("id, username, email")
        .limit(100);
      if (data) setProfiles(data as any);
    };
    load();
  }, []);

  return profiles;
}
