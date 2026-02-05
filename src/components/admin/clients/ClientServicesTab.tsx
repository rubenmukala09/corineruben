import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Loader2, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ClientServicesTabProps {
  clientId: string;
}

interface Service {
  id: string;
  name: string;
  status: string;
  plan?: string;
  price?: number;
  startDate?: string;
  nextBilling?: string;
}

export function ClientServicesTab({ clientId }: ClientServicesTabProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (clientId) {
      fetchClientServices();
    }
  }, [clientId]);

  const fetchClientServices = async () => {
    try {
      setLoading(true);
      
      // Fetch subscriptions for this client
      const { data: subscriptions, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", clientId);

      if (subscriptions && subscriptions.length > 0) {
        const mappedServices = subscriptions.map((sub) => ({
          id: sub.id,
          name: sub.plan_name || "Service",
          status: sub.status || "active",
          plan: sub.plan_name,
          price: sub.amount,
          startDate: sub.created_at ? new Date(sub.created_at).toLocaleDateString() : "-",
          nextBilling: sub.current_period_end ? new Date(sub.current_period_end).toLocaleDateString() : "-",
        }));
        setServices(mappedServices);
      } else {
        setServices([]);
      }
    } catch (err) {
      console.error("Error fetching client services:", err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="space-y-6">
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">No Active Services</h3>
              <p className="text-muted-foreground text-sm">
                This client doesn't have any active services yet.
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">📦</span>
                <div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <Badge 
                    variant={service.status === "active" ? "success" : "secondary"} 
                    className="mt-1"
                  >
                    {service.status === "active" ? "● Active" : service.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {service.plan && (
                <div>
                  <p className="text-sm text-muted-foreground">Plan</p>
                  <p className="font-semibold">
                    {service.plan} {service.price ? `($${service.price}/month)` : ""}
                  </p>
                </div>
              )}
              {service.startDate && (
                <div>
                  <p className="text-sm text-muted-foreground">Started</p>
                  <p>{service.startDate}</p>
                </div>
              )}
              {service.nextBilling && (
                <div>
                  <p className="text-sm text-muted-foreground">Next Billing</p>
                  <p>{service.nextBilling}</p>
                </div>
              )}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">Manage</Button>
                <Button variant="outline" size="sm" className="flex-1">Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button size="lg" variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Another Service
        </Button>
      </div>
    </div>
  );
}
