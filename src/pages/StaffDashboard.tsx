import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    // Check if user has admin role (staff role doesn't exist yet in types)
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      });
      navigate("/");
      return;
    }
    
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text-primary">Staff Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>CRM Database Setup Required</AlertTitle>
          <AlertDescription>
            The CRM database tables need to be created. A migration has been prepared that will create:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Companies - Manage company information and relationships</li>
              <li>Contacts - Track leads, customers, and partners</li>
              <li>Deals - Monitor sales pipeline and opportunities</li>
              <li>Events - Schedule meetings, calls, and activities</li>
              <li>Services - Define your service offerings</li>
              <li>Bookings - Manage service appointments</li>
              <li>Courses - Create and manage training courses</li>
              <li>Enrollments - Track student progress</li>
              <li>Tickets - Support ticket management</li>
              <li>Invoices - Financial tracking and billing</li>
            </ul>
            <p className="mt-4 font-medium">
              Please scroll up in the chat to find and approve the database migration.
            </p>
          </AlertDescription>
        </Alert>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>What happens after migration?</CardTitle>
              <CardDescription>Once you approve the migration, the system will:</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>✓ Create all CRM database tables with proper relationships</p>
              <p>✓ Set up Row Level Security (RLS) policies for data protection</p>
              <p>✓ Add the 'staff' user role for team management</p>
              <p>✓ Generate TypeScript types for type-safe development</p>
              <p>✓ Enable this dashboard to display and manage all CRM data</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to approve the migration</CardTitle>
              <CardDescription>Follow these steps to activate the CRM system:</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary text-primary-foreground w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">1</div>
                <p>Scroll up in the chat window on the left side of the screen</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary text-primary-foreground w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">2</div>
                <p>Look for a message showing the database migration SQL code</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary text-primary-foreground w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">3</div>
                <p>Click the <strong>"Approve"</strong> button to execute the migration</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary text-primary-foreground w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">4</div>
                <p>Wait for the migration to complete (usually takes a few seconds)</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary text-primary-foreground w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">5</div>
                <p>Refresh this page to see your fully functional CRM dashboard!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
