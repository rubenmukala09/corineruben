import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ClientNote {
  id: string;
  client_id: string | null;
  title: string;
  content: string | null;
  author_id: string | null;
  importance: string | null;
  is_pinned: boolean | null;
  tags: string[] | null;
  created_at: string | null;
  updated_at: string | null;
}

export function useClientNotes(clientId: string) {
  return useQuery({
    queryKey: ["client-notes", clientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_notes")
        .select("*")
        .eq("client_id", clientId)
        .order("is_pinned", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching client notes:", error);
        throw error;
      }

      return data as ClientNote[];
    },
    enabled: !!clientId,
  });
}

export function useCreateClientNote() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (
      note: Omit<ClientNote, "id" | "created_at" | "updated_at">,
    ) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("client_notes")
        .insert({
          ...note,
          author_id: user?.id,
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating note:", error);
        throw error;
      }

      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["client-notes", variables.client_id],
      });
      toast({
        title: "Note Created",
        description: "The note has been added successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Create Note",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateClientNote() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      clientId,
      ...updates
    }: Partial<ClientNote> & { id: string; clientId: string }) => {
      const { data, error } = await supabase
        .from("client_notes")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating note:", error);
        throw error;
      }

      return { data, clientId };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["client-notes", result.clientId],
      });
      toast({
        title: "Note Updated",
        description: "The note has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Update Note",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteClientNote() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, clientId }: { id: string; clientId: string }) => {
      const { error } = await supabase
        .from("client_notes")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting note:", error);
        throw error;
      }

      return { clientId };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["client-notes", result.clientId],
      });
      toast({
        title: "Note Deleted",
        description: "The note has been removed.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Delete Note",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
