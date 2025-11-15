import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, CreditCard, Calendar, DollarSign } from "lucide-react";

export const SubscriptionStatus = () => {
  const { subscriptions, loading, refreshSubscriptions } = useSubscription();

  const handleManageSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) {
        toast.error("Failed to open subscription management");
        return;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      toast.error("Failed to open subscription management");
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            You don't have any active subscriptions yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Active Subscriptions</CardTitle>
        <Button variant="outline" size="sm" onClick={handleManageSubscription}>
          <CreditCard className="w-4 h-4 mr-2" />
          Manage
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {subscriptions.map((sub) => (
          <div key={sub.id} className="flex flex-col gap-3 p-4 border rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{sub.plan_name}</h3>
                <Badge variant={sub.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                  {sub.status}
                </Badge>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <DollarSign className="w-3 h-3" />
                  <span className="text-sm">${(sub.amount / 100).toFixed(2)}/mo</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>
                {sub.cancel_at_period_end ? 'Ends on' : 'Renews on'}{' '}
                {new Date(sub.current_period_end).toLocaleDateString()}
              </span>
            </div>

            {sub.cancel_at_period_end && (
              <p className="text-sm text-orange-600">
                This subscription will be cancelled at the end of the billing period.
              </p>
            )}
          </div>
        ))}
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={refreshSubscriptions}
          className="w-full"
        >
          Refresh Status
        </Button>
      </CardContent>
    </Card>
  );
};
