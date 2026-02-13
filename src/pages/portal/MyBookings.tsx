import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useUserBookingRequests, getStatusColor, getStatusLabel } from "@/hooks/useBookingRequests";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Calendar, 
  Clock, 
  FileText, 
  DollarSign, 
  ArrowRight, 
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

function MyBookings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: bookings, isLoading } = useUserBookingRequests();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({ 
        title: "👋 Signed Out Successfully",
        description: "You've been securely logged out."
      });
      navigate("/auth");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unable to sign out";
      toast({
        title: "❌ Sign Out Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // Calculate stats
  const pending = bookings?.filter(b => b.status === "pending").length || 0;
  const confirmed = bookings?.filter(b => ["confirmed", "approved"].includes(b.status)).length || 0;
  const completed = bookings?.filter(b => b.status === "completed").length || 0;

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case "cancelled":
      case "rejected":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <DashboardHeader
        title="My Bookings"
        subtitle="Track your service requests"
        onSignOut={handleSignOut}
      />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-3xl font-bold">{pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Confirmed</p>
                  <p className="text-3xl font-bold">{confirmed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-3xl font-bold">{completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bookings List */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Your Booking Requests
            </CardTitle>
            <Button onClick={() => navigate("/services")} variant="outline">
              Book New Service
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                    <Skeleton className="w-12 h-12 rounded" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    <Skeleton className="h-6 w-24" />
                  </div>
                ))}
              </div>
            ) : bookings && bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col md:flex-row md:items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{booking.service_name}</h3>
                        <Badge 
                          variant="outline" 
                          className={getStatusColor(booking.status)}
                        >
                          {getStatusIcon(booking.status)}
                          <span className="ml-1">{getStatusLabel(booking.status)}</span>
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {booking.request_number}
                        </span>
                        {booking.service_tier && (
                          <Badge variant="secondary">{booking.service_tier}</Badge>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(booking.created_at), "MMM d, yyyy")}
                        </span>
                      </div>
                      {booking.preferred_dates && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Preferred: {booking.preferred_dates}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      {booking.final_price !== null && (
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="text-xl font-bold flex items-center">
                            <DollarSign className="w-4 h-4" />
                            {booking.final_price.toFixed(2)}
                          </p>
                          {booking.discount_amount && booking.discount_amount > 0 && (
                            <p className="text-xs text-green-600">
                              Saved ${booking.discount_amount.toFixed(2)}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Bookings Yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't made any service requests yet.
                </p>
                <Button onClick={() => navigate("/services")}>
                  Browse Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default MyBookings;
