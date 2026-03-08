import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Send } from "lucide-react";
import { format } from "date-fns";

interface TicketDetailProps {
  ticketId: string;
  onBack: () => void;
  isAdmin?: boolean;
}

export function TicketDetail({ ticketId, onBack, isAdmin }: TicketDetailProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [reply, setReply] = useState("");

  const { data: ticket } = useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("support_tickets")
        .select("*")
        .eq("id", ticketId)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const { data: replies } = useQuery({
    queryKey: ["ticket-replies", ticketId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ticket_replies")
        .select("*")
        .eq("ticket_id", ticketId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  // Realtime subscription for new replies
  useEffect(() => {
    const channel = supabase
      .channel(`ticket-${ticketId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "ticket_replies", filter: `ticket_id=eq.${ticketId}` }, () => {
        queryClient.invalidateQueries({ queryKey: ["ticket-replies", ticketId] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [ticketId, queryClient]);

  const sendReply = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("ticket_replies").insert({
        ticket_id: ticketId,
        user_id: user!.id,
        message: reply.trim(),
        is_staff_reply: isAdmin || false,
      });
      if (error) throw error;

      // If admin replies, update status to in_progress
      if (isAdmin && ticket?.status === "open") {
        await supabase.from("support_tickets").update({ status: "in_progress" as any }).eq("id", ticketId);
      }
    },
    onSuccess: () => {
      setReply("");
      queryClient.invalidateQueries({ queryKey: ["ticket-replies", ticketId] });
      queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] });
    },
    onError: () => toast.error("Failed to send reply"),
  });

  const updateStatus = useMutation({
    mutationFn: async (status: string) => {
      const { error } = await supabase.from("support_tickets").update({ status: status as any }).eq("id", ticketId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] });
      queryClient.invalidateQueries({ queryKey: ["admin-tickets"] });
    },
  });

  if (!ticket) return <div className="text-center py-12 text-muted-foreground">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Tickets
      </Button>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">{ticket.subject}</h2>
              <p className="text-sm text-muted-foreground">{ticket.ticket_number} · {format(new Date(ticket.created_at), "PPp")}</p>
            </div>
            <div className="flex gap-2">
              <Badge>{ticket.status.replace("_", " ")}</Badge>
              <Badge variant="outline">{ticket.priority}</Badge>
            </div>
          </div>
          <p className="text-foreground whitespace-pre-wrap">{ticket.description}</p>
          
          {isAdmin && (
            <div className="flex gap-2 mt-4 pt-4 border-t">
              {["open", "in_progress", "resolved", "closed"].map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant={ticket.status === s ? "default" : "outline"}
                  onClick={() => updateStatus.mutate(s)}
                  disabled={ticket.status === s}
                >
                  {s.replace("_", " ")}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-3 mb-6">
        {replies?.map((r: any) => (
          <div key={r.id} className={`flex ${r.is_staff_reply ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-[80%] rounded-lg p-3 ${r.is_staff_reply ? "bg-muted" : "bg-primary text-primary-foreground"}`}>
              <p className="text-sm font-medium mb-1">{r.is_staff_reply ? "Support Team" : "You"}</p>
              <p className="text-sm whitespace-pre-wrap">{r.message}</p>
              <p className={`text-xs mt-1 ${r.is_staff_reply ? "text-muted-foreground" : "text-primary-foreground/70"}`}>
                {format(new Date(r.created_at), "MMM d, h:mm a")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {ticket.status !== "closed" && (
        <div className="flex gap-2">
          <Textarea
            placeholder="Type your reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={2}
            className="flex-1"
          />
          <Button
            onClick={() => sendReply.mutate()}
            disabled={!reply.trim() || sendReply.isPending}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
