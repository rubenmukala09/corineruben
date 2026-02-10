import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Shield, Loader2, Download, Package } from "lucide-react";

export const PurchaseRequestsTable = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadRequests = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("purchase_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Error loading requests:", error);
      toast({
        title: "Error loading requests",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setRequests(data || []);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    loadRequests();

    const channel = supabase
      .channel('purchase_requests_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'purchase_requests' },
        () => loadRequests()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadRequests]);

  const updateStatus = async (id: string, field: string, value: string) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from("purchase_requests")
      .update({ [field]: value })
      .eq("id", id);

    if (error) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Status Updated",
        description: `Request updated successfully`,
      });
      loadRequests();
    }
    setUpdatingId(null);
  };

  const downloadVeteranDoc = async (docUrl: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('veteran-docs')
        .download(docUrl);

      if (error) throw error;

      // Create download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = docUrl.split('/').pop() || 'veteran-doc';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error: any) {
      toast({
        title: "Download Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'refunded': return 'bg-orange-500';
      default: return 'bg-gray-400';
    }
  };

  if (loading) {
    return (
      <Card className="p-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Purchase Requests ({requests.length})</h3>
        <Button onClick={loadRequests} variant="outline" size="sm">
          Refresh
        </Button>
      </div>

      {requests.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No purchase requests yet
        </Card>
      ) : (
        requests.map((request) => (
          <Card key={request.id} className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h4 className="font-bold text-lg">{request.item_name}</h4>
                  <Badge variant="secondary">
                    {request.item_type.toUpperCase()}
                  </Badge>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                  <Badge className={getPaymentStatusColor(request.payment_status)}>
                    Payment: {request.payment_status}
                  </Badge>
                  {request.is_veteran && (
                    <Badge variant="outline" className="gap-1">
                      <Shield className="w-3 h-3" />
                      Veteran
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Order #{request.request_number}
                </p>
              </div>
              <div className="text-sm text-muted-foreground text-right">
                {new Date(request.created_at).toLocaleDateString()}<br/>
                {new Date(request.created_at).toLocaleTimeString()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold mb-1">Customer Information</p>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">{request.full_name}</p>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a href={`mailto:${request.email}`} className="hover:underline">
                      {request.email}
                    </a>
                  </div>
                  {request.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a href={`tel:${request.phone}`} className="hover:underline">
                        {request.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-1">Order Details</p>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span>Quantity: {request.quantity}</span>
                  </div>
                  {request.suggested_price > 0 && (
                    <div className="flex justify-between">
                      <span>Suggested:</span>
                      <span>${request.suggested_price.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Customer Price:</span>
                    <span>${request.customer_price.toFixed(2)}</span>
                  </div>
                  {request.discount_amount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount:</span>
                      <span>-${request.discount_amount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold border-t pt-1">
                    <span>Total:</span>
                    <span className="text-primary">${request.final_price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {request.is_veteran && (
              <div className="bg-primary/5 p-3 rounded-lg">
                <p className="text-sm font-semibold mb-2">🇺🇸 Veteran Verification</p>
                <div className="space-y-1 text-sm">
                  <p>Type: {request.veteran_type?.replace('_', ' ').toUpperCase()}</p>
                  <p>ID Last 4: {request.veteran_id_last4}</p>
                  {request.veteran_document_url && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2"
                      onClick={() => downloadVeteranDoc(request.veteran_document_url)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Verification Doc
                    </Button>
                  )}
                </div>
              </div>
            )}

            {request.message && (
              <div>
                <p className="text-sm font-semibold mb-1">Customer Message</p>
                <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded-lg">
                  {request.message}
                </p>
              </div>
            )}

            <div className="flex gap-2 pt-2 border-t flex-wrap">
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateStatus(request.id, 'payment_status', 'processing')}
                disabled={updatingId === request.id || request.payment_status !== 'pending'}
              >
                Mark Payment Processing
              </Button>
              <Button
                size="sm"
                variant="default"
                onClick={() => updateStatus(request.id, 'payment_status', 'completed')}
                disabled={updatingId === request.id || request.payment_status === 'completed'}
              >
                Payment Received
              </Button>
              {request.item_type === 'product' && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => updateStatus(request.id, 'status', 'shipped')}
                  disabled={updatingId === request.id || request.status === 'shipped'}
                >
                  Mark Shipped
                </Button>
              )}
              <Button
                size="sm"
                variant="secondary"
                onClick={() => updateStatus(request.id, 'status', 'completed')}
                disabled={updatingId === request.id || request.status === 'completed'}
              >
                Complete Order
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => updateStatus(request.id, 'status', 'cancelled')}
                disabled={updatingId === request.id}
              >
                Cancel
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};
