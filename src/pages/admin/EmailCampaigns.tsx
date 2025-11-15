import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Send, Pause, Play, Plus, TrendingUp, Users, Clock } from "lucide-react";
import { toast } from "sonner";
import { AdminTopBar } from "@/components/AdminTopBar";
import { AdminSidebar } from "@/components/AdminSidebar";

interface EmailCampaign {
  id: string;
  name: string;
  description: string;
  campaign_type: string;
  status: string;
  sent_count: number;
  open_rate: number;
  click_rate: number;
  created_at: string;
}

const EmailCampaigns = () => {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    totalSent: 0,
    avgOpenRate: 0,
    avgClickRate: 0,
    activeCampaigns: 0,
  });

  useEffect(() => {
    fetchCampaigns();
    fetchStats();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from("email_campaigns")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      toast.error("Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data: campaignsData } = await supabase
        .from("email_campaigns")
        .select("sent_count, open_rate, click_rate, status");

      if (campaignsData) {
        const totalSent = campaignsData.reduce((sum, c) => sum + (c.sent_count || 0), 0);
        const avgOpenRate = campaignsData.reduce((sum, c) => sum + (c.open_rate || 0), 0) / (campaignsData.length || 1);
        const avgClickRate = campaignsData.reduce((sum, c) => sum + (c.click_rate || 0), 0) / (campaignsData.length || 1);
        const activeCampaigns = campaignsData.filter(c => c.status === "active").length;

        setStats({
          totalSent,
          avgOpenRate: Math.round(avgOpenRate * 100) / 100,
          avgClickRate: Math.round(avgClickRate * 100) / 100,
          activeCampaigns,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const toggleCampaignStatus = async (campaignId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "active" ? "paused" : "active";
      const { error } = await supabase
        .from("email_campaigns")
        .update({ status: newStatus })
        .eq("id", campaignId);

      if (error) throw error;
      
      toast.success(`Campaign ${newStatus === "active" ? "activated" : "paused"}`);
      fetchCampaigns();
      fetchStats();
    } catch (error) {
      console.error("Error updating campaign:", error);
      toast.error("Failed to update campaign");
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      draft: "secondary",
      active: "default",
      paused: "outline",
      completed: "secondary",
    };
    return (
      <Badge variant={variants[status] || "default"} className="capitalize">
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <AdminTopBar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <AdminSidebar isOpen={sidebarOpen} />
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Email Campaigns</h1>
                <p className="text-muted-foreground">
                  Manage automated email campaigns and monitor performance
                </p>
              </div>
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                New Campaign
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Total Sent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalSent.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Avg Open Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.avgOpenRate}%</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Avg Click Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.avgClickRate}%</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Active Campaigns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.activeCampaigns}</div>
                </CardContent>
              </Card>
            </div>

            {/* Campaigns List */}
            <Card>
              <CardHeader>
                <CardTitle>All Campaigns</CardTitle>
                <CardDescription>
                  Manage your email marketing and automated campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8 text-muted-foreground">Loading campaigns...</div>
                ) : campaigns.length === 0 ? (
                  <div className="text-center py-12">
                    <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No campaigns yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Create your first email campaign to start engaging with your audience
                    </p>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Create Campaign
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <div
                        key={campaign.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{campaign.name}</h3>
                            {getStatusBadge(campaign.status)}
                            <Badge variant="outline" className="capitalize">
                              {campaign.campaign_type}
                            </Badge>
                          </div>
                          {campaign.description && (
                            <p className="text-sm text-muted-foreground mb-3">
                              {campaign.description}
                            </p>
                          )}
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Send className="h-4 w-4" />
                              {campaign.sent_count} sent
                            </span>
                            <span>{campaign.open_rate}% open rate</span>
                            <span>{campaign.click_rate}% click rate</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {new Date(campaign.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleCampaignStatus(campaign.id, campaign.status)}
                            className="gap-2"
                          >
                            {campaign.status === "active" ? (
                              <>
                                <Pause className="h-4 w-4" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4" />
                                Activate
                              </>
                            )}
                          </Button>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailCampaigns;
