import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Store, TrendingUp, DollarSign, Package, CheckCircle, XCircle, Clock } from 'lucide-react';

export const PartnersTab = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'active' | 'suspended' | 'inactive'>('all');
  const [selectedPartner, setSelectedPartner] = useState<any>(null);

  const { data: partners, isLoading } = useQuery({
    queryKey: ['admin-partners', searchTerm, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('partners')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.ilike('business_name', `%${searchTerm}%`);
      }

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ partnerId, status }: { partnerId: string; status: 'pending' | 'active' | 'suspended' | 'inactive' }) => {
      const { error } = await supabase
        .from('partners')
        .update({ 
          status,
          approved_at: status === 'active' ? new Date().toISOString() : null 
        })
        .eq('id', partnerId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-partners'] });
      toast({ title: 'Partner status updated successfully' });
      setSelectedPartner(null);
    },
    onError: () => {
      toast({ title: 'Failed to update partner status', variant: 'destructive' });
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'suspended': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      active: 'default',
      pending: 'secondary',
      suspended: 'destructive',
    };
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading partners...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Input
          placeholder="Search partners..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {partners?.map((partner) => (
          <Card key={partner.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <Store className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">{partner.business_name}</h3>
                    {getStatusBadge(partner.status)}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <p className="font-medium capitalize">{partner.partner_type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium">{partner.business_email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground">Total Sales</p>
                        <p className="font-medium">${partner.total_sales?.toLocaleString() || 0}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground">Commission</p>
                        <p className="font-medium">${partner.total_commission?.toLocaleString() || 0}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4" />
                      <span>{partner.total_products || 0} products</span>
                    </div>
                    <span>Commission Rate: {partner.commission_rate}%</span>
                  </div>
                </div>

                <Dialog open={selectedPartner?.id === partner.id} onOpenChange={(open) => !open && setSelectedPartner(null)}>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setSelectedPartner(partner)}>
                      Manage
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Manage Partner: {partner.business_name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Current Status</Label>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(partner.status)}
                          {getStatusBadge(partner.status)}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Change Status</Label>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateStatusMutation.mutate({ partnerId: partner.id, status: 'active' })}
                            disabled={partner.status === 'active'}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateStatusMutation.mutate({ partnerId: partner.id, status: 'suspended' })}
                            disabled={partner.status === 'suspended'}
                          >
                            Suspend
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateStatusMutation.mutate({ partnerId: partner.id, status: 'pending' })}
                            disabled={partner.status === 'pending'}
                          >
                            Set Pending
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Business Details</Label>
                        <div className="text-sm space-y-1">
                          <p><span className="text-muted-foreground">Type:</span> {partner.partner_type}</p>
                          <p><span className="text-muted-foreground">Email:</span> {partner.business_email}</p>
                          <p><span className="text-muted-foreground">Phone:</span> {partner.business_phone || 'N/A'}</p>
                          <p><span className="text-muted-foreground">Website:</span> {partner.website_url || 'N/A'}</p>
                        </div>
                      </div>

                      {partner.description && (
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <p className="text-sm text-muted-foreground">{partner.description}</p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {partners?.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Store className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No partners found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
