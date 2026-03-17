import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Phone, Mail, Shield, Loader2 } from "lucide-react";

export const BookingRequestsTable = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    loadRequests();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("booking_requests_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "booking_requests" },
        () => loadRequests(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("booking_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Error loading requests:", error);
      toast({
        title: "Error loading requests",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setRequests(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from("booking_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Status Updated",
        description: `Request marked as ${status}`,
      });
      loadRequests();
    }
    setUpdatingId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "contacted":
        return "bg-blue-500";
      case "confirmed":
        return "bg-green-500";
      case "completed":
        return "bg-gray-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  if (loading) {
    return (
      <Card className="p-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">
          Service Booking Requests ({requests.length})
        </h3>
        <Button onClick={loadRequests} variant="outline" size="sm">
          Refresh
        </Button>
      </div>

      {requests.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No booking requests yet
        </Card>
      ) : (
        requests.map((request) => (
          <Card key={request.id} className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-lg">{request.service_name}</h4>
                  {request.service_tier && (
                    <Badge variant="secondary">{request.service_tier}</Badge>
                  )}
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                  {request.is_veteran && (
                    <Badge variant="outline" className="gap-1">
                      <Shield className="w-3 h-3" />
                      Veteran
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Request #{request.request_number}
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                {new Date(request.created_at).toLocaleDateString()} at{" "}
                {new Date(request.created_at).toLocaleTimeString()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold mb-1">
                  Contact Information
                </p>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={`mailto:${request.email}`}
                      className="hover:underline"
                    >
                      {request.email}
                    </a>
                  </div>
                  {request.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a
                        href={`tel:${request.phone}`}
                        className="hover:underline"
                      >
                        {request.phone}
                      </a>
                    </div>
                  )}
                  <p className="font-medium">{request.full_name}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-1">Pricing</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span>${request.base_price?.toFixed(2) || "0.00"}</span>
                  </div>
                  {request.discount_amount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount:</span>
                      <span>-${request.discount_amount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="text-primary">
                      ${request.final_price?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {request.is_veteran && (
              <div className="bg-primary/5 p-3 rounded-lg">
                <p className="text-sm font-semibold mb-1">
                  🇺🇸 Veteran Verification
                </p>
                <div className="space-y-1 text-sm">
                  <p>
                    Type:{" "}
                    {request.veteran_type?.replace("_", " ").toUpperCase()}
                  </p>
                  <p>ID Last 4: {request.veteran_id_last4}</p>
                </div>
              </div>
            )}

            {request.preferred_dates && (
              <div>
                <p className="text-sm font-semibold mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Preferred Dates/Times
                </p>
                <p className="text-sm whitespace-pre-wrap">
                  {request.preferred_dates}
                </p>
              </div>
            )}

            {request.message && (
              <div>
                <p className="text-sm font-semibold mb-1">
                  Additional Information
                </p>
                <p className="text-sm whitespace-pre-wrap">{request.message}</p>
              </div>
            )}

            <div className="flex gap-2 pt-2 border-t">
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateStatus(request.id, "contacted")}
                disabled={
                  updatingId === request.id || request.status !== "pending"
                }
              >
                Mark Contacted
              </Button>
              <Button
                size="sm"
                variant="default"
                onClick={() => updateStatus(request.id, "confirmed")}
                disabled={
                  updatingId === request.id || request.status === "confirmed"
                }
              >
                Confirm Booking
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => updateStatus(request.id, "completed")}
                disabled={updatingId === request.id}
              >
                Complete
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => updateStatus(request.id, "cancelled")}
                disabled={updatingId === request.id}
              >
                Cancel
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};
