import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ClientMessage {
  id: string;
  client_id: string | null;
  sender_id: string | null;
  subject: string | null;
  content: string;
  message_type: string | null;
  is_from_client: boolean | null;
  is_read: boolean | null;
  is_starred: boolean | null;
  created_at: string | null;
}

export function useClientMessages(clientId: string) {
  return useQuery({
    queryKey: ["client-messages", clientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_messages")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching client messages:", error);
        throw error;
      }

      return data as ClientMessage[];
    },
    enabled: !!clientId,
  });
}

export function useSendClientMessage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (message: {
      client_id: string | null;
      content: string;
      message_type?: string | null;
      subject?: string | null;
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("client_messages")
        .insert({
          client_id: message.client_id,
          content: message.content,
          message_type: message.message_type || "direct",
          subject: message.subject || null,
          sender_id: user?.id || null,
          is_from_client: false,
          is_read: false,
          is_starred: false,
        })
        .select()
        .single();

      if (error) {
        console.error("Error sending message:", error);
        throw error;
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["client-messages", data.client_id],
      });
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Send Message",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useMarkMessageRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, clientId }: { id: string; clientId: string }) => {
      const { error } = await supabase
        .from("client_messages")
        .update({ is_read: true })
        .eq("id", id);

      if (error) {
        console.error("Error marking message read:", error);
        throw error;
      }

      return { clientId };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["client-messages", result.clientId],
      });
    },
  });
}

export function useToggleMessageStar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      clientId,
      starred,
    }: {
      id: string;
      clientId: string;
      starred: boolean;
    }) => {
      const { error } = await supabase
        .from("client_messages")
        .update({ is_starred: starred })
        .eq("id", id);

      if (error) {
        console.error("Error toggling star:", error);
        throw error;
      }

      return { clientId };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["client-messages", result.clientId],
      });
    },
  });
}
