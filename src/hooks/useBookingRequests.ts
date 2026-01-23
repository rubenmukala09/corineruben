import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BookingRequest {
  id: string;
  request_number: string;
  service_name: string;
  service_type: string;
  service_tier: string | null;
  preferred_dates: string | null;
  status: string;
  base_price: number | null;
  discount_amount: number | null;
  final_price: number | null;
  message: string | null;
  created_at: string;
  updated_at: string;
}

export function useUserBookingRequests() {
  return useQuery({
    queryKey: ["user-booking-requests"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      // Try to get from the view first, fallback to direct query
      const { data, error } = await supabase
        .from("booking_requests")
        .select("*")
        .or(`user_id.eq.${user.id},email.eq.${user.email}`)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching booking requests:", error);
        return [];
      }

      return data as BookingRequest[];
    },
  });
}

export function useBookingRequestById(requestId: string) {
  return useQuery({
    queryKey: ["booking-request", requestId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("booking_requests")
        .select("*")
        .eq("id", requestId)
        .single();

      if (error) {
        console.error("Error fetching booking request:", error);
        throw error;
      }

      return data as BookingRequest;
    },
    enabled: !!requestId,
  });
}

export function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30";
    case "confirmed":
    case "approved":
      return "bg-green-500/20 text-green-600 border-green-500/30";
    case "completed":
      return "bg-blue-500/20 text-blue-600 border-blue-500/30";
    case "cancelled":
    case "rejected":
      return "bg-red-500/20 text-red-600 border-red-500/30";
    case "in_progress":
      return "bg-purple-500/20 text-purple-600 border-purple-500/30";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function getStatusLabel(status: string) {
  switch (status.toLowerCase()) {
    case "pending":
      return "Pending Review";
    case "confirmed":
      return "Confirmed";
    case "approved":
      return "Approved";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
    case "rejected":
      return "Rejected";
    case "in_progress":
      return "In Progress";
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
}
