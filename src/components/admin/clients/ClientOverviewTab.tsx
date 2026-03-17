import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wrench, MessageSquare, DollarSign, Pencil } from "lucide-react";

interface ClientOverviewTabProps {
  client: any;
}

export function ClientOverviewTab({ client }: ClientOverviewTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Services
            </CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{client.services}</div>
            <p className="text-xs text-muted-foreground">
              Click to view services
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{client.openTickets}</div>
            <p className="text-xs text-muted-foreground">Support requests</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unpaid Invoices
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${client.unpaidInvoices === 0 ? "text-green-600" : "text-red-600"}`}
            >
              {client.unpaidInvoices}
            </div>
            <p className="text-xs text-muted-foreground">Billing status</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Company Information</CardTitle>
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Company Name
              </label>
              <p className="text-base">{client.companyName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Industry
              </label>
              <p className="text-base">{client.industry}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Company Size
              </label>
              <p className="text-base">{client.companySize} employees</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Website
              </label>
              <a
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-primary hover:underline"
              >
                {client.website}
              </a>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Address
              </label>
              <p className="text-base whitespace-pre-line">{client.address}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Contact Information</CardTitle>
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Contact Person
              </label>
              <p className="text-base">{client.contactName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Job Title
              </label>
              <p className="text-base">{client.contactTitle}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Email
              </label>
              <a
                href={`mailto:${client.contactEmail}`}
                className="text-base text-primary hover:underline"
              >
                {client.contactEmail}
              </a>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Phone
              </label>
              <a
                href={`tel:${client.contactPhone}`}
                className="text-base text-primary hover:underline"
              >
                {client.contactPhone}
              </a>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Preferred Contact Method
              </label>
              <p className="text-base">{client.preferredContact}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Account ID
              </label>
              <p className="text-base font-mono">{client.accountId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Join Date
              </label>
              <p className="text-base">{client.joinDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Account Status
              </label>
              <p className="text-base">
                {client.status.charAt(0).toUpperCase() + client.status.slice(1)}{" "}
                since {client.joinDate}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Last Activity
              </label>
              <p className="text-base">
                {client.lastActivity} (logged into portal)
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Account Manager
              </label>
              <p className="text-base">{client.accountManager}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Tags
              </label>
              <div className="flex gap-2 mt-1">
                {client.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { icon: "🔐", text: "Logged into portal", time: "2 hours ago" },
              {
                icon: "💰",
                text: "Invoice #2045 paid ($149)",
                time: "yesterday",
              },
              { icon: "🎫", text: "Support ticket opened", time: "3 days ago" },
              {
                icon: "✨",
                text: "New service activated: AI Insurance",
                time: "1 week ago",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
              >
                <span className="text-2xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="text-base">{activity.text}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
