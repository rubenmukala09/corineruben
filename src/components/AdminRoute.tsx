import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserRole } from "@/hooks/useUserRole";
import { Loader2, ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AdminRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

export const AdminRoute = ({ children, requiredPermission }: AdminRouteProps) => {
  const { user, roleConfig, loading, hasPermission, isAdmin } = useUserRole();
  const [permissionDenied, setPermissionDenied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && roleConfig && requiredPermission) {
      const allowed = isAdmin() || hasPermission(requiredPermission);
      setPermissionDenied(!allowed);
    }
  }, [loading, user, roleConfig, requiredPermission, hasPermission, isAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!roleConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <ShieldAlert className="h-12 w-12 text-destructive" />
              <h2 className="text-xl font-semibold">Access Denied</h2>
              <p className="text-muted-foreground">
                Your account does not have permission to access the admin portal.
                Please contact the administrator if you believe this is an error.
              </p>
              <Button onClick={() => navigate('/')} variant="outline">
                Return to Homepage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (permissionDenied && requiredPermission) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <ShieldAlert className="h-12 w-12 text-yellow-500" />
              <h2 className="text-xl font-semibold">Permission Required</h2>
              <p className="text-muted-foreground">
                You do not have permission to access this page.
                Your role: <strong>{roleConfig.displayName}</strong>
              </p>
              <Button onClick={() => navigate(-1)} variant="outline">
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};
