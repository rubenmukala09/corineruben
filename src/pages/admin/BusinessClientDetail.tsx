import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Settings, Calendar, Wrench, CreditCard, MessageSquare, Key, FileText } from "lucide-react";
import { ClientOverviewTab } from "@/components/admin/clients/ClientOverviewTab";
import { ClientServicesTab } from "@/components/admin/clients/ClientServicesTab";
import { ClientBillingTab } from "@/components/admin/clients/ClientBillingTab";
import { ClientMessagesTab } from "@/components/admin/clients/ClientMessagesTab";
import { ClientPortalAccessTab } from "@/components/admin/clients/ClientPortalAccessTab";
import { ClientNotesTab } from "@/components/admin/clients/ClientNotesTab";

const mockClient = {
  id: 1,
  logo: "",
  companyName: "TechCorp Solutions",
  industry: "Healthcare",
  companySize: "51-200",
  website: "https://techcorp.com",
  address: "123 Tech Street\nSan Francisco, CA 94105",
  contactName: "John Smith",
  contactTitle: "CEO",
  contactEmail: "john@techcorp.com",
  contactPhone: "(555) 123-4567",
  preferredContact: "Email",
  accountId: "#BUS-2024-001",
  joinDate: "January 15, 2025",
  status: "active",
  lastActivity: "2 hours ago",
  accountManager: "Ruben Nkulu",
  tags: ["Premium Client", "High Priority"],
  services: 3,
  openTickets: 2,
  unpaidInvoices: 0,
};

export default function BusinessClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: "success" as const, text: "Active" },
      trial: { variant: "default" as const, text: "Trial" },
      inactive: { variant: "destructive" as const, text: "Inactive" },
    };
    const config = variants[status as keyof typeof variants];
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  return (
    <div className="space-y-6">
      <BreadcrumbNav />

      <div className="sticky top-0 z-10 bg-background border-b pb-6">
        <div className="flex items-start gap-6">
          <Avatar className="h-20 w-20 rounded-lg">
            <AvatarImage src={mockClient.logo} />
            <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-2xl">
              {mockClient.companyName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{mockClient.companyName}</h1>
              {getStatusBadge(mockClient.status)}
            </div>
            <p className="text-muted-foreground">Account ID: {mockClient.accountId}</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Button>
            <Button variant="outline" size="sm">
              <Phone className="mr-2 h-4 w-4" />
              Schedule Call
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="portal">Portal Access</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <ClientOverviewTab client={mockClient} />
        </TabsContent>

        <TabsContent value="services" className="mt-6">
          <ClientServicesTab clientId={mockClient.id} />
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <ClientBillingTab clientId={mockClient.id} />
        </TabsContent>

        <TabsContent value="messages" className="mt-6">
          <ClientMessagesTab clientId={mockClient.id} />
        </TabsContent>

        <TabsContent value="portal" className="mt-6">
          <ClientPortalAccessTab clientId={mockClient.id} />
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <ClientNotesTab clientId={mockClient.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
