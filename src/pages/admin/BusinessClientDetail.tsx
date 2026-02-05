import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Settings, Loader2 } from "lucide-react";
import { ClientOverviewTab } from "@/components/admin/clients/ClientOverviewTab";
import { ClientServicesTab } from "@/components/admin/clients/ClientServicesTab";
import { ClientBillingTab } from "@/components/admin/clients/ClientBillingTab";
import { ClientMessagesTab } from "@/components/admin/clients/ClientMessagesTab";
import { ClientPortalAccessTab } from "@/components/admin/clients/ClientPortalAccessTab";
import { ClientNotesTab } from "@/components/admin/clients/ClientNotesTab";

interface ClientData {
  id: string;
  logo: string;
  companyName: string;
  industry: string;
  companySize: string;
  website: string;
  address: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  contactPhone: string;
  preferredContact: string;
  accountId: string;
  joinDate: string;
  status: string;
  lastActivity: string;
  accountManager: string;
  tags: string[];
  services: number;
  openTickets: number;
  unpaidInvoices: number;
}

const emptyClient: ClientData = {
  id: "",
  logo: "",
  companyName: "Client Details",
  industry: "-",
  companySize: "-",
  website: "",
  address: "-",
  contactName: "-",
  contactTitle: "-",
  contactEmail: "-",
  contactPhone: "-",
  preferredContact: "Email",
  accountId: "-",
  joinDate: "-",
  status: "active",
  lastActivity: "-",
  accountManager: "-",
  tags: [],
  services: 0,
  openTickets: 0,
  unpaidInvoices: 0,
};

export default function BusinessClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [client, setClient] = useState<ClientData>(emptyClient);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchClientData(id);
    }
  }, [id]);

  const fetchClientData = async (clientId: string) => {
    try {
      setLoading(true);
      
      // Try to fetch from profiles table
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", clientId)
        .single();

      if (profileData) {
        setClient({
          id: profileData.id,
          logo: profileData.avatar_url || "",
          companyName: profileData.full_name || "Client",
          industry: "-",
          companySize: "-",
          website: "",
          address: profileData.address || "-",
          contactName: profileData.full_name || "-",
          contactTitle: "-",
          contactEmail: profileData.email || "-",
          contactPhone: profileData.phone || "-",
          preferredContact: "Email",
          accountId: `#${clientId.slice(0, 8).toUpperCase()}`,
          joinDate: profileData.created_at ? new Date(profileData.created_at).toLocaleDateString() : "-",
          status: "active",
          lastActivity: profileData.updated_at ? new Date(profileData.updated_at).toLocaleDateString() : "-",
          accountManager: "-",
          tags: [],
          services: 0,
          openTickets: 0,
          unpaidInvoices: 0,
        });
      }
    } catch (err) {
      console.error("Error fetching client data:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: "success" as const, text: "Active" },
      trial: { variant: "default" as const, text: "Trial" },
      inactive: { variant: "destructive" as const, text: "Inactive" },
    };
    const config = variants[status as keyof typeof variants] || variants.active;
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 bg-background border-b pb-6">
        <div className="flex items-start gap-6">
          <Avatar className="h-20 w-20 rounded-lg">
            <AvatarImage src={client.logo} />
            <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-2xl">
              {client.companyName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{client.companyName}</h1>
              {getStatusBadge(client.status)}
            </div>
            <p className="text-muted-foreground">Account ID: {client.accountId}</p>
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
          <ClientOverviewTab client={client} />
        </TabsContent>

        <TabsContent value="services" className="mt-6">
          <ClientServicesTab clientId={client.id} />
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <ClientBillingTab clientId={parseInt(client.id) || 0} />
        </TabsContent>

        <TabsContent value="messages" className="mt-6">
          <ClientMessagesTab clientId={client.id} />
        </TabsContent>

        <TabsContent value="portal" className="mt-6">
          <ClientPortalAccessTab clientId={parseInt(client.id) || 0} />
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <ClientNotesTab clientId={client.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
