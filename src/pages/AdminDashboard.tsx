import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Users, CreditCard, Video, ShoppingCart, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface Subscription {
  id: string;
  user_id: string;
  plan_name: string;
  status: string;
  start_date: string;
  end_date: string | null;
  amount: number | null;
}

interface ZoomClass {
  id: string;
  title: string;
  description: string | null;
  zoom_link: string;
  scheduled_date: string;
  duration_minutes: number;
  max_participants: number | null;
}

interface Buyer {
  id: string;
  user_id: string;
  product_name: string;
  purchase_date: string;
  amount: number;
  status: string;
}

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  subscribed_at: string;
  status: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [zoomClasses, setZoomClasses] = useState<ZoomClass[]>([]);
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/login');
      return;
    }

    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin, isLoading, navigate]);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      const [subsData, classesData, buyersData, subscribersData] = await Promise.all([
        supabase.from('subscriptions').select('*').order('created_at', { ascending: false }),
        supabase.from('zoom_classes').select('*').order('scheduled_date', { ascending: true }),
        supabase.from('buyers').select('*').order('purchase_date', { ascending: false }),
        supabase.from('subscribers').select('*').order('subscribed_at', { ascending: false }),
      ]);

      if (subsData.error) throw subsData.error;
      if (classesData.error) throw classesData.error;
      if (buyersData.error) throw buyersData.error;
      if (subscribersData.error) throw subscribersData.error;

      setSubscriptions(subsData.data || []);
      setZoomClasses(classesData.data || []);
      setBuyers(buyersData.data || []);
      setSubscribers(subscribersData.data || []);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load data');
    } finally {
      setDataLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (isLoading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="subscriptions" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="subscriptions">
              <CreditCard className="w-4 h-4 mr-2" />
              Subscriptions ({subscriptions.length})
            </TabsTrigger>
            <TabsTrigger value="classes">
              <Video className="w-4 h-4 mr-2" />
              Zoom Classes ({zoomClasses.length})
            </TabsTrigger>
            <TabsTrigger value="buyers">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Buyers ({buyers.length})
            </TabsTrigger>
            <TabsTrigger value="subscribers">
              <Mail className="w-4 h-4 mr-2" />
              Subscribers ({subscribers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="subscriptions" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Active Subscriptions</h2>
              {subscriptions.length === 0 ? (
                <p className="text-muted-foreground">No subscriptions found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Plan</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Amount</th>
                        <th className="text-left p-2">Start Date</th>
                        <th className="text-left p-2">End Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscriptions.map((sub) => (
                        <tr key={sub.id} className="border-b hover:bg-muted/50">
                          <td className="p-2">{sub.plan_name}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              sub.status === 'active' ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
                            }`}>
                              {sub.status}
                            </span>
                          </td>
                          <td className="p-2">${sub.amount?.toFixed(2) || '0.00'}</td>
                          <td className="p-2">{new Date(sub.start_date).toLocaleDateString()}</td>
                          <td className="p-2">{sub.end_date ? new Date(sub.end_date).toLocaleDateString() : 'Ongoing'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Scheduled Zoom Classes</h2>
              {zoomClasses.length === 0 ? (
                <p className="text-muted-foreground">No classes scheduled</p>
              ) : (
                <div className="space-y-4">
                  {zoomClasses.map((cls) => (
                    <Card key={cls.id} className="p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-lg mb-2">{cls.title}</h3>
                      {cls.description && <p className="text-muted-foreground mb-2">{cls.description}</p>}
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <p><strong>Date:</strong> {new Date(cls.scheduled_date).toLocaleString()}</p>
                        <p><strong>Duration:</strong> {cls.duration_minutes} minutes</p>
                        <p><strong>Max Participants:</strong> {cls.max_participants || 'Unlimited'}</p>
                        <p><strong>Link:</strong> <a href={cls.zoom_link} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Join Class</a></p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="buyers" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Recent Buyers</h2>
              {buyers.length === 0 ? (
                <p className="text-muted-foreground">No purchases found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Product</th>
                        <th className="text-left p-2">Amount</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Purchase Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buyers.map((buyer) => (
                        <tr key={buyer.id} className="border-b hover:bg-muted/50">
                          <td className="p-2">{buyer.product_name}</td>
                          <td className="p-2">${buyer.amount.toFixed(2)}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              buyer.status === 'completed' ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
                            }`}>
                              {buyer.status}
                            </span>
                          </td>
                          <td className="p-2">{new Date(buyer.purchase_date).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="subscribers" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Email Subscribers</h2>
              {subscribers.length === 0 ? (
                <p className="text-muted-foreground">No subscribers found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Subscribed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((sub) => (
                        <tr key={sub.id} className="border-b hover:bg-muted/50">
                          <td className="p-2">{sub.email}</td>
                          <td className="p-2">{sub.name || 'N/A'}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              sub.status === 'active' ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
                            }`}>
                              {sub.status}
                            </span>
                          </td>
                          <td className="p-2">{new Date(sub.subscribed_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;