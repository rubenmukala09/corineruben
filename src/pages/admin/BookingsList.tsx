import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import {
  Calendar,
  Search,
  RefreshCw,
  Mail,
  Phone,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  UserCheck,
  CalendarClock,
  Download,
  Trash2,
  Ban,
  Check,
  Users,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";



import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface BookingRequest {
  id: string;
  request_number: string;
  full_name: string;
  email: string;
  phone: string | null;
  service_name: string;
  service_tier: string | null;
  service_type: string;
  base_price: number | null;
  final_price: number | null;
  discount_amount: number | null;
  preferred_dates: string | null;
  message: string | null;
  status: string;
  is_veteran: boolean | null;
  created_at: string;
}

const BookingsList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<BookingRequest | null>(null);
  const [denyDialogOpen, setDenyDialogOpen] = useState(false);
  const [bookingToDeny, setBookingToDeny] = useState<BookingRequest | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [bookingToAssign, setBookingToAssign] = useState<BookingRequest | null>(null);
  const [staffMembers, setStaffMembers] = useState<{ id: string; name: string; email: string }[]>([]);
  const [loadingStaff, setLoadingStaff] = useState(false);

  const { data: bookings = [], isLoading, refetch } = useQuery({
    queryKey: ["booking-requests", statusFilter],
    queryFn: async () => {
      let query = supabase
        .from("booking_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as BookingRequest[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("booking_requests")
        .update({ status })
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking-requests"] });
      toast({
        title: "Status Updated",
        description: "Booking status has been updated",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    },
  });

  // Delete booking mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("booking_requests")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking-requests"] });
      toast({
        title: "Booking Deleted",
        description: "The booking request has been removed",
      });
      setDeleteDialogOpen(false);
      setBookingToDelete(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete booking",
        variant: "destructive",
      });
    },
  });

  // Handle confirm booking (send confirmation email)
  const handleConfirmBooking = async (booking: BookingRequest) => {
    updateStatusMutation.mutate({ id: booking.id, status: "confirmed" });
    // Open email client with confirmation template
    const subject = encodeURIComponent(`Booking Confirmed: ${booking.service_name}`);
    const body = encodeURIComponent(
      `Dear ${booking.full_name},\n\n` +
      `We're pleased to confirm your booking for ${booking.service_name}.\n\n` +
      `Reference Number: ${booking.request_number}\n` +
      `Preferred Date: ${booking.preferred_dates || 'To be scheduled'}\n` +
      (booking.final_price ? `Total: $${booking.final_price.toFixed(2)}\n` : '') +
      `\nWe'll be in touch shortly with additional details.\n\n` +
      `Best regards,\nInVision Network Team`
    );
    window.open(`mailto:${booking.email}?subject=${subject}&body=${body}`, "_blank");
  };

  // Handle deny booking (send rejection email)
  const handleDenyBooking = async (booking: BookingRequest) => {
    updateStatusMutation.mutate({ id: booking.id, status: "cancelled" });
    // Open email client with denial template
    const subject = encodeURIComponent(`Booking Update: ${booking.service_name}`);
    const body = encodeURIComponent(
      `Dear ${booking.full_name},\n\n` +
      `Thank you for your interest in ${booking.service_name}.\n\n` +
      `Unfortunately, we are unable to accommodate your booking request at this time.\n\n` +
      `If you have any questions or would like to discuss alternative options, please don't hesitate to contact us.\n\n` +
      `Best regards,\nInVision Network Team`
    );
    window.open(`mailto:${booking.email}?subject=${subject}&body=${body}`, "_blank");
    setDenyDialogOpen(false);
    setBookingToDeny(null);
  };

  const pendingCount = bookings.filter(b => b.status === "pending").length;
  const confirmedCount = bookings.filter(b => b.status === "confirmed").length;
  const completedCount = bookings.filter(b => b.status === "completed").length;
  const totalRevenue = bookings.filter(b => b.status === "completed" || b.status === "confirmed").reduce((sum, b) => sum + (b.final_price || 0), 0);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.request_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      pending: { variant: "outline", label: "Pending" },
      contacted: { variant: "secondary", label: "Contacted" },
      confirmed: { variant: "default", label: "Confirmed" },
      completed: { variant: "success", label: "Completed" },
      cancelled: { variant: "destructive", label: "Cancelled" },
    };
    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const exportToCSV = () => {
    const headers = ["Date", "Reference", "Name", "Email", "Service", "Price", "Status"];
    const rows = filteredBookings.map(b => [
      format(new Date(b.created_at), "yyyy-MM-dd"),
      b.request_number,
      b.full_name,
      b.email,
      b.service_name,
      b.final_price?.toFixed(2) || "0",
      b.status
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    
    toast({
      title: "Export Complete",
      description: `Exported ${filteredBookings.length} bookings to CSV`,
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#F9FAFB]">Booking Requests</h1>
          <p className="text-[#9CA3AF]">Manage training and workshop bookings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => refetch()} className="border-gray-700 hover:bg-gray-800">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" onClick={exportToCSV} className="border-gray-700 hover:bg-gray-800">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Confirmed</p>
                  <p className="text-2xl font-bold">{confirmedCount}</p>
                </div>
                <CalendarClock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{completedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold text-green-600">${totalRevenue.toFixed(0)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, reference, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bookings Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Preferred Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                    Loading bookings...
                  </TableCell>
                </TableRow>
              ) : filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No booking requests found
                  </TableCell>
                </TableRow>
              ) : (
                filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div>
                        <span className="font-mono text-sm font-bold">
                          {booking.request_number}
                        </span>
                        {booking.is_veteran && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            🎖 Veteran
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{booking.full_name}</div>
                        <div className="text-xs text-muted-foreground">{booking.email}</div>
                        {booking.phone && (
                          <div className="text-xs text-muted-foreground">{booking.phone}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{booking.service_name}</div>
                        {booking.service_tier && (
                          <div className="text-xs text-muted-foreground">
                            {booking.service_tier}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {booking.final_price ? (
                        <div>
                          <span className="font-bold text-green-600">
                            ${booking.final_price.toFixed(2)}
                          </span>
                          {booking.discount_amount && booking.discount_amount > 0 && (
                            <div className="text-xs text-muted-foreground line-through">
                              ${booking.base_price?.toFixed(2)}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{booking.preferred_dates || "—"}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {format(new Date(booking.created_at), "MMM d, yyyy")}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(booking.created_at), "h:mm a")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {/* Status-based action buttons */}
                        {booking.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="default"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleConfirmBooking(booking)}
                              disabled={updateStatusMutation.isPending}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-500 border-red-500/30 hover:bg-red-500/10"
                              onClick={() => {
                                setBookingToDeny(booking);
                                setDenyDialogOpen(true);
                              }}
                              disabled={updateStatusMutation.isPending}
                            >
                              <Ban className="h-4 w-4 mr-1" />
                              Deny
                            </Button>
                          </>
                        )}
                        {booking.status === "contacted" && (
                          <Button
                            size="sm"
                            variant="default"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleConfirmBooking(booking)}
                            disabled={updateStatusMutation.isPending}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Confirm
                          </Button>
                        )}
                        {booking.status === "confirmed" && (
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => updateStatusMutation.mutate({ id: booking.id, status: "completed" })}
                            disabled={updateStatusMutation.isPending}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Complete
                          </Button>
                        )}
                        
                        {/* Quick contact buttons */}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => window.open(`mailto:${booking.email}`, "_blank")}
                          title="Send Email"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        {booking.phone && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => window.open(`tel:${booking.phone}`, "_blank")}
                            title="Call"
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {/* Delete button */}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                          onClick={() => {
                            setBookingToDelete(booking);
                            setDeleteDialogOpen(true);
                          }}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#1F2937] border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Booking Request</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete this booking from {bookingToDelete?.full_name}? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-700 text-gray-300 hover:bg-gray-800">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => bookingToDelete && deleteMutation.mutate(bookingToDelete.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Deny Confirmation Dialog */}
      <AlertDialog open={denyDialogOpen} onOpenChange={setDenyDialogOpen}>
        <AlertDialogContent className="bg-[#1F2937] border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Deny Booking Request</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This will mark the booking as cancelled and open your email client to send a 
              rejection notification to {bookingToDeny?.full_name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-700 text-gray-300 hover:bg-gray-800">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => bookingToDeny && handleDenyBooking(bookingToDeny)}
            >
              <Ban className="h-4 w-4 mr-2" />
              Deny & Send Email
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BookingsList;
