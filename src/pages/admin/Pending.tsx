import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

export default function Pending() {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const { data: pendingTestimonials, refetch: refetchTestimonials } = useQuery({
    queryKey: ["pending-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: pendingBookings, refetch: refetchBookings } = useQuery({
    queryKey: ["pending-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("booking_requests")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: pendingInquiries, refetch: refetchInquiries } = useQuery({
    queryKey: ["pending-inquiries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("website_inquiries")
        .select("*")
        .in("status", ["new", "pending"])
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('pending-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'testimonials' }, () => {
        refetchTestimonials();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'booking_requests' }, () => {
        refetchBookings();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'website_inquiries' }, () => {
        refetchInquiries();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetchTestimonials, refetchBookings, refetchInquiries]);

  const handleTestimonialAction = async (id: string, status: "approved" | "rejected") => {
    setUpdatingId(id);
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      toast.success(`Testimonial ${status}`);
      refetchTestimonials();
    } catch (error) {
      toast.error("Failed to update testimonial");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleBookingAction = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const { error } = await supabase
        .from("booking_requests")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      toast.success(`Booking ${status}`);
      refetchBookings();
    } catch (error) {
      toast.error("Failed to update booking");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleInquiryAction = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const { error } = await supabase
        .from("website_inquiries")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      toast.success(`Inquiry ${status}`);
      refetchInquiries();
    } catch (error) {
      toast.error("Failed to update inquiry");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#F9FAFB]">Pending Actions</h1>
        <p className="text-[#9CA3AF]">Review and manage items requiring attention</p>
      </div>

      <Tabs defaultValue="testimonials" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#111827]">
          <TabsTrigger value="testimonials">
            Testimonials
            {pendingTestimonials && pendingTestimonials.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {pendingTestimonials.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="bookings">
            Bookings
            {pendingBookings && pendingBookings.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {pendingBookings.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="inquiries">
            Inquiries
            {pendingInquiries && pendingInquiries.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {pendingInquiries.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="testimonials">
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-[#F9FAFB]">Pending Testimonials</CardTitle>
            </CardHeader>
            <CardContent>
              {!pendingTestimonials ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-[#9CA3AF]" />
                </div>
              ) : pendingTestimonials.length === 0 ? (
                <p className="text-center text-[#9CA3AF] py-8">No pending testimonials</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-[#9CA3AF]">Name</TableHead>
                      <TableHead className="text-[#9CA3AF]">Content</TableHead>
                      <TableHead className="text-[#9CA3AF]">Date</TableHead>
                      <TableHead className="text-[#9CA3AF]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingTestimonials.map((testimonial) => (
                      <TableRow key={testimonial.id} className="border-gray-700">
                        <TableCell className="font-medium text-[#F9FAFB]">{testimonial.name}</TableCell>
                        <TableCell className="max-w-md truncate text-[#9CA3AF]">{testimonial.content}</TableCell>
                        <TableCell className="text-[#9CA3AF]">{format(new Date(testimonial.created_at), "MMM dd, yyyy")}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleTestimonialAction(testimonial.id, "approved")}
                              disabled={updatingId === testimonial.id}
                            >
                              {updatingId === testimonial.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <CheckCircle className="h-4 w-4 mr-1" />
                              )}
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleTestimonialAction(testimonial.id, "rejected")}
                              disabled={updatingId === testimonial.id}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings">
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-[#F9FAFB]">Pending Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              {!pendingBookings ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-[#9CA3AF]" />
                </div>
              ) : pendingBookings.length === 0 ? (
                <p className="text-center text-[#9CA3AF] py-8">No pending bookings</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-[#9CA3AF]">Request #</TableHead>
                      <TableHead className="text-[#9CA3AF]">Name</TableHead>
                      <TableHead className="text-[#9CA3AF]">Service</TableHead>
                      <TableHead className="text-[#9CA3AF]">Date</TableHead>
                      <TableHead className="text-[#9CA3AF]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingBookings.map((booking) => (
                      <TableRow key={booking.id} className="border-gray-700">
                        <TableCell className="font-medium text-[#F9FAFB]">{booking.request_number}</TableCell>
                        <TableCell className="text-[#9CA3AF]">{booking.full_name}</TableCell>
                        <TableCell className="text-[#9CA3AF]">{booking.service_name}</TableCell>
                        <TableCell className="text-[#9CA3AF]">{format(new Date(booking.created_at), "MMM dd, yyyy")}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleBookingAction(booking.id, "confirmed")}
                              disabled={updatingId === booking.id}
                            >
                              {updatingId === booking.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <CheckCircle className="h-4 w-4 mr-1" />
                              )}
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleBookingAction(booking.id, "cancelled")}
                              disabled={updatingId === booking.id}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inquiries">
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-[#F9FAFB]">Pending Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              {!pendingInquiries ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-[#9CA3AF]" />
                </div>
              ) : pendingInquiries.length === 0 ? (
                <p className="text-center text-[#9CA3AF] py-8">No pending inquiries</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-[#9CA3AF]">Name</TableHead>
                      <TableHead className="text-[#9CA3AF]">Email</TableHead>
                      <TableHead className="text-[#9CA3AF]">Message</TableHead>
                      <TableHead className="text-[#9CA3AF]">Date</TableHead>
                      <TableHead className="text-[#9CA3AF]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingInquiries.map((inquiry) => (
                      <TableRow key={inquiry.id} className="border-gray-700">
                        <TableCell className="font-medium text-[#F9FAFB]">{inquiry.name}</TableCell>
                        <TableCell className="text-[#9CA3AF]">{inquiry.email}</TableCell>
                        <TableCell className="max-w-md truncate text-[#9CA3AF]">{inquiry.message}</TableCell>
                        <TableCell className="text-[#9CA3AF]">{format(new Date(inquiry.created_at), "MMM dd, yyyy")}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleInquiryAction(inquiry.id, "responded")}
                              disabled={updatingId === inquiry.id}
                            >
                              {updatingId === inquiry.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <CheckCircle className="h-4 w-4 mr-1" />
                              )}
                              Mark Responded
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-700"
                              onClick={() => handleInquiryAction(inquiry.id, "archived")}
                              disabled={updatingId === inquiry.id}
                            >
                              Archive
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
