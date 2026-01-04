import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, Eye, LogOut, RotateCcw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ClientPortalAccessTabProps {
  clientId: number;
}

export function ClientPortalAccessTab({ clientId }: ClientPortalAccessTabProps) {
  const [portalStatus, setPortalStatus] = useState("active");
  const [features, setFeatures] = useState({
    dashboard: true,
    billing: true,
    support: true,
    settings: true,
    analytics: true,
    downloads: true,
    apiKeys: false,
    admin: false,
  });

  const activityLog = [
    { action: "Login", page: "Dashboard", date: "Jan 15, 2025 2:30 PM", device: "Chrome on Windows", ip: "192.168.1.1" },
    { action: "Viewed", page: "Billing", date: "Jan 15, 2025 2:32 PM", device: "Chrome on Windows", ip: "192.168.1.1" },
    { action: "Downloaded", page: "Invoice #2045", date: "Jan 14, 2025 10:15 AM", device: "Safari on Mac", ip: "192.168.1.5" },
    { action: "Logout", page: "-", date: "Jan 14, 2025 10:20 AM", device: "Safari on Mac", ip: "192.168.1.5" },
  ];

  const activeSessions = [
    { device: "Chrome on Windows", location: "Dayton, OH", time: "Active now", id: 1 },
    { device: "Safari on iPhone", location: "Columbus, OH", time: "2 hours ago", id: 2 },
  ];

  const toggleFeature = (feature: string) => {
    setFeatures(prev => ({ ...prev, [feature]: !prev[feature as keyof typeof features] }));
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Login Credentials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Username/Email</label>
              <p className="text-base font-medium text-muted-foreground">Not configured</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Password</label>
              <p className="text-base font-mono">••••••••••</p>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Password
              </Button>
              <Button variant="outline" size="sm">
                Send Reset Email
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Portal Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground">Last Login</label>
              <p className="font-medium">January 15, 2025 at 2:30 PM</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Total Logins</label>
              <p className="font-medium">47</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Device</label>
              <p className="font-medium">Chrome on Windows</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">IP Address</label>
              <p className="font-medium font-mono">192.168.1.1</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Location</label>
              <p className="font-medium">Dayton, OH</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Access Control</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Portal Status</p>
              <p className="text-sm text-muted-foreground">Client can currently access the portal</p>
            </div>
            <Badge variant={portalStatus === "active" ? "success" : "destructive"}>
              {portalStatus === "active" ? "● Active" : "● Suspended"}
            </Badge>
          </div>
          <Button variant="destructive" size="sm">
            Suspend Access
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Portal Features Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(features).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-sm font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <Switch checked={value} onCheckedChange={() => toggleFeature(key)} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Login as Client</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This allows you to see their portal. All actions are logged. Use responsibly.
            </AlertDescription>
          </Alert>
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            View Client Portal
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{session.device}</p>
                  <p className="text-sm text-muted-foreground">{session.location} • {session.time}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <LogOut className="mr-2 h-4 w-4" />
                  Force Logout
                </Button>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mt-4">
            Expire All Sessions
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Page/Resource</TableHead>
                <TableHead>Date/Time</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityLog.map((log, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{log.action}</TableCell>
                  <TableCell>{log.page}</TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.device}</TableCell>
                  <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="outline" size="sm" className="w-full mt-4">
            Export to CSV
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
